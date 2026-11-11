import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Elegant Wedding Invitation",
  description: "Premium interactive wedding invitation site",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-warmIvory text-olive font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
