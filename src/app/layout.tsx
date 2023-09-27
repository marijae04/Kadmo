import './globals.css'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { Inter } from 'next/font/google'
import Providers from './Providers'
import AppBar from './AppBar'

const metadata: Metadata = {
  title: 'Kadmo',
  description: 'Meet new cultures with Kadmo',
}

const font = Outfit({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
  showAppBar = true,
}: {
  children: React.ReactNode;
  showAppBar?: boolean;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          {showAppBar && <AppBar />}
          <div className={"pt-14 relative h-full w-full bg-[url('/images/wallpaper.jpg')] bg-no-repeat bg-center bg-fixed bg-cover min-h-screen"}>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
