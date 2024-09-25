import type { Metadata } from "next";
import "./globals.css";
import { getStrapiData } from "@/lib/utils.ts";

export async function generateMetadata(): Promise<Metadata> {
  const res = await getStrapiData("/api/general-information");
  
  const metadata = res.data;
  
  return {
    title: metadata.Title,
    description: metadata.Tagline,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
