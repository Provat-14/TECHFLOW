// app/layout.tsx
import './globals.css';
import Navbar from '@/component/shared/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TechFlow | Premium Development Services & Insights',
  description: 'High-performance web solutions and expert technical blogs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0a] text-white selection:bg-blue-500/30`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}