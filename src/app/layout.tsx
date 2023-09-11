import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { Inter } from 'next/font/google'
import Providers from './Providers'
import AppBar from './AppBar'


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
      <body className={font.className}>
        <Providers>
          <AppBar />
          <div className={"pt-14 relative h-full w-full bg-[url('/images/wallpaper.jpg')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen "}>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
