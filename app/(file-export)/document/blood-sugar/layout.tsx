import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../../../globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { ModalProvider } from '@/shared/ui/Modal';
import { ToastContainer } from 'react-toastify';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HealthLog',
  description: '우리가족 혈당, 혈압 기록은 HealthLog 하나면 충분해요!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased !bg-(--color-white)`}>
        <QueryProvider>
          <ModalProvider>
            <div className="w-[794px]">{children}</div>
            <ToastContainer />
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
