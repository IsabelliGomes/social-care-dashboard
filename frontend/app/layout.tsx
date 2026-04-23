import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Social Care Dashboard",
  description: "Sistema de acompanhamento de crianças em situação de vulnerabilidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
