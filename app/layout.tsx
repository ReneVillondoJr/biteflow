import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BiteFlow — Good Food, Good Mood',
    template: '%s | BiteFlow',
  },
  description:
    'Discover fresh, comforting favorites from BiteFlow. Explore our menu and order your next favorite meal online.',
  applicationName: 'BiteFlow',
  openGraph: {
    title: 'BiteFlow — Good Food, Good Mood',
    description:
      'Fresh favorites, thoughtfully made. Explore the BiteFlow menu and order online.',
    type: 'website',
    siteName: 'BiteFlow',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
