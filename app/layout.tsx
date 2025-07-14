import type { Metadata } from 'next';
import './globals.css';
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import Script from 'next/script';

export const metadata: Metadata = {
  title: '스마일 메이트',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <Script
          src="https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
