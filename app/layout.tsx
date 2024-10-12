import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { AdvisorProvider } from './context'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Zoe Financial',
  description: 'Financial Advisors Nationwide',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AdvisorProvider>
          {children}
        </AdvisorProvider>
      </body>
    </html>
  )
}
