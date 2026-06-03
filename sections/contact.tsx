"use client";

import { useState } from "react";
import { z } from "zod";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Client-side Zod validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .optional(),
  website: z
    .string()
    .max(200, "Website URL must be less than 200 characters")
    .optional(),
});

interface FormData {
  name: string;
  email: string;
  message: string;
  company: string;
  website: string;
  honeypot: string; // Bot honeypot input field
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    company: "",
    website: "",
    honeypot: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error label when user starts editing
    if (formErrors[name as keyof FormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    setFormErrors({});
    setStatus("loading");
    setStatusMessage("");

    // 1. Client-side Zod validation
    const result = contactFormSchema.safeParse({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      company: formData.company,
      website: formData.website,
    });

    if (!result.success) {
      const errors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as keyof FormData] = err.message;
        }
      });
      setFormErrors(errors);
      setStatus("idle");
      return;
    }

    try {
      // 2. Submit to Next.js API Route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      // 3. Handle Success
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
        company: "",
        website: "",
        honeypot: "",
      });
    } catch (err: any) {
      // 4. Handle Error
      setStatus("error");
      setStatusMessage(err.message || "Failed to send message.");
    }
  };

  return (
    <Section
      id="contact"
      title="05 / Get in Touch"
      subtitle="Initiate communication, request tech consultations, or discuss open positions."
      className="border-t border-white/5 bg-bg-secondary"
    >
      <div className="max-w-2xl mx-auto w-full">
        <Card className="border border-white/5 bg-bg-primary/45 p-6 md:p-8 space-y-6 shadow-2xl">
          
          {/* Status feedback alerts */}
          {status === "success" && (
            <div
              className="p-4 rounded-xl border border-green-500/10 bg-green-500/5 text-green-400 text-sm flex items-center gap-3 transition-all duration-300"
              role="alert"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="leading-relaxed font-normal">
                Message delivered successfully! Thank you for getting in touch. I will respond to your inquiry shortly.
              </p>
            </div>
          )}

          {status === "error" && (
            <div
              className="p-4 rounded-xl border border-red-500/10 bg-red-500/5 text-red-400 text-sm flex items-center gap-3 transition-all duration-300"
              role="alert"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="leading-relaxed font-normal">{statusMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            {/* Honeypot field (hidden from visual users but filled by bots) */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="subject_confirm">Do not fill this field if you are human</label>
              <input
                id="subject_confirm"
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-semibold text-text-primary font-mono">
                  Name <span className="text-accent">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  required
                  aria-invalid={formErrors.name ? "true" : "false"}
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                  placeholder="Jane Doe"
                  className={`w-full bg-bg-primary/50 border rounded-lg p-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:ring-1 transition-all duration-300 ${
                    formErrors.name
                      ? "border-red-500/30 focus:border-red-500/40 focus:ring-red-500/40"
                      : "border-white/5 focus:border-accent/40 focus:ring-accent/40"
                  }`}
                />
                {formErrors.name && (
                  <span id="name-error" className="block text-[11px] text-red-400 font-mono">
                    {formErrors.name}
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-semibold text-text-primary font-mono">
                  Email Address <span className="text-accent">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  required
                  aria-invalid={formErrors.email ? "true" : "false"}
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                  placeholder="jane.doe@example.com"
                  className={`w-full bg-bg-primary/50 border rounded-lg p-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:ring-1 transition-all duration-300 ${
                    formErrors.email
                      ? "border-red-500/30 focus:border-red-500/40 focus:ring-red-500/40"
                      : "border-white/5 focus:border-accent/40 focus:ring-accent/40"
                  }`}
                />
                {formErrors.email && (
                  <span id="email-error" className="block text-[11px] text-red-400 font-mono">
                    {formErrors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Row 2: Company and Website (Optional) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="company" className="block text-xs font-semibold text-text-primary font-mono">
                  Company <span className="text-text-muted font-normal">(Optional)</span>
                </label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  placeholder="Enterprise Inc."
                  className="w-full bg-bg-primary/50 border border-white/5 focus:border-accent/40 focus:ring-1 focus:ring-accent/40 outline-none rounded-lg p-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-300"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="website" className="block text-xs font-semibold text-text-primary font-mono">
                  Website URL <span className="text-text-muted font-normal">(Optional)</span>
                </label>
                <input
                  id="website"
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  placeholder="https://example.com"
                  className="w-full bg-bg-primary/50 border border-white/5 focus:border-accent/40 focus:ring-1 focus:ring-accent/40 outline-none rounded-lg p-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-300"
                />
              </div>
            </div>

            {/* Row 3: Message Textarea */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-xs font-semibold text-text-primary font-mono">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={status === "loading"}
                rows={6}
                required
                aria-invalid={formErrors.message ? "true" : "false"}
                aria-describedby={formErrors.message ? "message-error" : undefined}
                placeholder="Details about your project inquiry or engineering opportunities..."
                className={`w-full bg-bg-primary/50 border rounded-lg p-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:ring-1 transition-all duration-300 resize-none ${
                  formErrors.message
                    ? "border-red-500/30 focus:border-red-500/40 focus:ring-red-500/40"
                    : "border-white/5 focus:border-accent/40 focus:ring-accent/40"
                }`}
              />
              {formErrors.message && (
                <span id="message-error" className="block text-[11px] text-red-400 font-mono">
                  {formErrors.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-mono tracking-wider uppercase border border-white/5 disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-accent" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-accent" />
                    Send Inquiry
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Section>
  );
}

export default Contact;
