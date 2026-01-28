import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "People's Justice - Legal Empowerment for Every Indian",
  description: "Affordable Legal Empowerment for Every Indian - RTI Generator, Know Your Rights, Legal Notices, Consumer Complaints at just ₹99 one-time.",
  keywords: ["People's Justice", "Legal India", "RTI", "Consumer Rights", "Legal Aid", "Indian Law", "Legal Notice", "Consumer Complaint"],
  authors: [{ name: "People's Justice Team" }],
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "People's Justice",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "People's Justice - Legal Empowerment",
    description: "Affordable Legal Empowerment for Every Indian - Make law simple, accessible, and usable for people without lawyers.",
    url: "https://peoplesjustice.app",
    siteName: "People's Justice",
    type: "website",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "People's Justice App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "People's Justice - Legal Empowerment",
    description: "Affordable Legal Empowerment for Every Indian - RTI, Rights, Notices, Complaints at ₹99",
    images: ["/icons/icon-512x512.png"],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "People's Justice",
    "application-name": "People's Justice",
    "msapplication-TileColor": "#2563eb",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <LanguageProvider>
          <SubscriptionProvider>
            {children}
            <Toaster />
          </SubscriptionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
