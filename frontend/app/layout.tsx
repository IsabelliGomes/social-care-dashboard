import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cuidado Social",
  description: "Painel de Acompanhamento de Crianças",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full" data-scroll-behavior="smooth">
      <body className="min-h-full bg-surface-light font-sans text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
