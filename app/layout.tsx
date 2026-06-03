import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kaushikpaykoli.dev"),

  title: "Kaushik Paykoli | Full Stack Software Engineer",
  description:
    "Portfolio of Kaushik Paykoli, a Full Stack Software Engineer specializing in Next.js, Node.js, and premium, production-grade applications that solve real-world problems.",

  authors: [{ name: "Kaushik Paykoli" }],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaushikpaykoli.dev",
    title: "Kaushik Paykoli | Full Stack Software Engineer",
    description:
      "Full Stack Software Engineer building high-performance web applications, developer tools, and defensive AI pipelines.",
    siteName: "Kaushik Paykoli Portfolio",

    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kaushik Paykoli Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kaushik Paykoli | Full Stack Software Engineer",
    description:
      "Full Stack Software Engineer building high-performance web applications, developer tools, and defensive AI pipelines.",

    images: ["/assets/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <ThemeProvider>
          {/* Header/Navbar */}
          <Navbar />
          
          {/* Main Application Shell Content Wrapper */}
          <main className="flex-1 flex flex-col pt-24">
            {children}
          </main>
          
          {/* Global Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
