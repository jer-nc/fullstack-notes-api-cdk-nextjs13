import Navbar from '@/components/custom/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavbarHome from '@/components/custom/NavbarHome'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js 13 + Cognito',
  description: 'Next.js 13 + Cognito + TailwindCSS + TypeScript + Shadcn, client side authentication demo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className='scroll-smooth'>
      <body>
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  )
}
