import type { Metadata } from "next";
import "./globals.css";
import { getStrapiData } from "@/lib/utils.ts";
import { Jua } from "next/font/google";

export async function generateMetadata(): Promise<Metadata> {
  const res = await getStrapiData("/api/general-information");

  const metadata = res.data;

  return {
    title: metadata.Title,
    description: metadata.Tagline,
  }
}

const jua = Jua({
  weight: ['400'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-jua',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${jua.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
