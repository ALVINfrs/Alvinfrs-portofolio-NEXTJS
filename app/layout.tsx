import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Alvin Faris Portfolio", // Contoh: Ganti dengan title yang lebih sesuai
  description:
    "Portfolio website of Muhammad Alvin Faris, a Full Stack Developer.", // Contoh: Deskripsi yang lebih sesuai
  // generator: 'v0.dev', // Bisa dihapus atau disesuaikan
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
