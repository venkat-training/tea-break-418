import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tea Break 418 — Cricket Operations Platform',
  description:
    'The only cricket operations platform that treats tea compliance as a production dependency. Powered by HTTP 418.',
  openGraph: {
    title: 'Tea Break 418',
    description: 'Enterprise Tea Governance for Cricket Operations',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
