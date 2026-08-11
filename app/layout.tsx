import type { Metadata, Viewport } from "next";
import { Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
