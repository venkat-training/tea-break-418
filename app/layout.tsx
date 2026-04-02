import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tea Break 418',
  description: 'A satirical cricket operations dashboard powered by tea compliance.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
