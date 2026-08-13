import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const syne = localFont({
  src: "./fonts/Syne-Variable.woff2",
  variable: "--font-syne",
  weight: "400 800",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Max Raffel",
  description: "Portfolio of Max Raffel, a Software Engineer, Game Developer, and Researcher",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#090B1C",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full min-h-dvh">{children}</body>
    </html>
  );
}
