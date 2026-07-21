import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DoveSphere Technology Limited",
  description:
    "Bridging the gap between complex technology and business success. IT solutions, consultancy, and training based in Lagos, Nigeria.",
  metadataBase: new URL("https://www.dovesphere.com"),
  openGraph: {
    title: "DoveSphere Technology Limited",
    description: "Bridging the gap between complex technology and business success.",
    url: "https://www.dovesphere.com",
    siteName: "DoveSphere Technology Limited",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DoveSphere Technology Limited",
    description: "Bridging the gap between complex technology and business success.",
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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-obsidian">
        {children}
      </body>
    </html>
  );
}
