import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Notes App Demo',
  description: 'Notes App Demo - AWS CDK + Next.js 13',
  other: { google: 'notranslate' }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className='scroll-smooth'>
      <body>
        {children}
      </body>
    </html>
  )
}
