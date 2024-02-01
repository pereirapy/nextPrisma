'use client';

import { dir } from 'i18next';

import { ParamsApp } from '@/types/app';

import '@/styles/globals.css';

import { Inter as FontSans } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { cn } from '@/lib/utils';
import { useZodLocalized } from '@/hooks/use-zod-localized';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

type RootLayoutProps = ParamsApp &
  Readonly<{
    children: React.ReactNode;
  }>;

export default function RootLayout({
  children,
  params: { lng },
}: RootLayoutProps) {
  useZodLocalized(lng);

  return (
    <html
      lang={lng}
      dir={dir(lng)}
      suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable,
        )}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
