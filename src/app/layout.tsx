import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/themes/Theme';
import {ReactNode} from 'react';
import {
  TEXT_PAGE_REPAYMENT_DESCRIPTION,
  TEXT_PAGE_REPAYMENT_TITLE
} from '@/constants/texts/RepaymentTexts';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: TEXT_PAGE_REPAYMENT_TITLE,
  description: TEXT_PAGE_REPAYMENT_DESCRIPTION,
};

/**
 * Start function des Frontends.
 * Hier wird der AppRouter und MUI initialisiert.
 *
 * @param children Die aktuelle Seite.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  return (
    <html lang='de'>
      <body className={roboto.variable} style={{overflowY: 'scroll'}}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme} defaultMode='system'>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
