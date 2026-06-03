import { NextResponse } from "next/server";
import { z } from "zod";

// Zod payload schema validation
const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .max(200, "Website URL must be less than 200 characters")
    .optional()
    .or(z.literal("")),
  honeypot: z.string().optional(), // Bot honeypot field
});

// Ephemeral in-memory rate limiter (limits to 3 messages per 5 minutes per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes
  const limit = rateLimitMap.get(ip);

  if (!limit) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (limit.count >= 3) {
    return true;
  }

  limit.count++;
  return false;
}

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting check
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    if (checkRateLimit(ip)) {
      console.warn(`[API Rate Limit] Request blocked for IP: ${ip}`);
      return NextResponse.json(
        { error: "Too many messages. Please try again after 5 minutes." },
        { status: 429 }
      );
    }

    // 2. Parse request JSON
    const body = await req.json();

    // 3. Schema validation using Zod
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.issues.map((e) => e.message).join(", ");
      return NextResponse.json(
        { error: `Validation failed: ${errorMsg}` },
        { status: 400 }
      );
    }

    const { name, email, message, company, website, honeypot } = validation.data;

    // 4. Honeypot check (bot trap)
    // If the honeypot field is filled, silently ignore it and return 200 to trick spam bots
    if (honeypot && honeypot.trim() !== "") {
      console.warn("[Bot Ingestion] Honeypot field filled. Drop request silently.");
      return NextResponse.json(
        { success: true, message: "Submission parsed successfully." },
        { status: 200 }
      );
    }

    // 5. Check environment variable for Discord webhook
    const discordUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!discordUrl) {
      console.error("[Configuration Error] DISCORD_WEBHOOK_URL is not configured.");
      // Return a clean error message to client, do not expose internal config details
      return NextResponse.json(
        { error: "Submission failed due to a server configuration issue." },
        { status: 500 }
      );
    }

    // 6. Format message for Discord delivery
    const timestamp = new Date().toISOString();

    const discordPayload = {
      embeds: [
        {
          title: "📬 New Portfolio Inquiry",
          color: 3889814, // Discord Blue accent decimal color
          timestamp: timestamp,
          fields: [
            { name: "👤 Sender Name", value: name, inline: true },
            { name: "✉️ Email Address", value: email, inline: true },
            { name: "🏢 Company", value: company || "N/A", inline: true },
            { name: "🌐 Website URL", value: website || "N/A", inline: true },
            { name: "📝 Message Content", value: message, inline: false },
          ],
          footer: {
            text: `IP Reference: ${ip.split(",")[0].trim()}`,
          },
        },
      ],
    };

    // 7. Deliver message to Discord webhook
    const response = await fetch(discordUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error(`[Discord API Error] Failed to send message. Code: ${response.status}. Response: ${responseText}`);
      return NextResponse.json(
        { error: "Failed to deliver message. Please try again later." },
        { status: 502 }
      );
    }

    // 8. Return success
    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Unexpected Contact Error]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your message." },
      { status: 500 }
    );
  }
}
