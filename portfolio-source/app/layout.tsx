import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kerim Tilki | Veri Bilimi & Portfolyo',
  description: 'Büyük Veri Analistliği öğrencisi Kerim Tilki. Veri bilimi, veri analizi ve makine öğrenmesi üzerine kişisel portfolyo.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}

