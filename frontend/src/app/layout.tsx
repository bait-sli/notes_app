import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/css/global.css";
import icon from "@/app/favicon.ico";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Note Takeer App",
  description: "A nasty note taking app made with much love by Belks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
