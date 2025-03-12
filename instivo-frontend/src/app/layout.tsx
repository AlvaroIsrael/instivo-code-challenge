import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Instivo Code Challenge',
  description: 'Instivo Code Challenge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="hydrated">
      <body cz-shortcut-listen="true">{children}</body>
    </html>
  );
}
