import type { Metadata } from "next";
import { Hind } from "next/font/google";
import "./globals.css";

const hind = Hind({
  variable: "--font-hind",
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Digital Marketing Master Class",
  description: "Live 10-session digital marketing master class.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hind.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans text-text bg-bg selection:bg-brand-magenta selection:text-white">
        {children}
      </body>
    </html>
  );
}
