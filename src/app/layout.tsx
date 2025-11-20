import type { Metadata } from "next";
import { Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Microsoft DCF Analysis Dashboard",
  description: "Interactive Discounted Cash Flow valuation model for MSFT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
