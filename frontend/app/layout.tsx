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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark');})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-surface-light font-sans text-primary antialiased">
        <a href="#main-content" className="skip-link">
          Ir para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}
