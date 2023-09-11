import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'



export const metadata: Metadata = {
  title: 'Kadmo',
  description: 'Meet new cultures with Kadmo',
}

const font = Montserrat ({ 
  subsets: ['latin'], 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
