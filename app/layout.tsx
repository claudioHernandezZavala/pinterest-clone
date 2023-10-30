import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
import {default as Header} from './components/Header'
import Provider from './Provider'
export const metadata: Metadata = {
  title: 'Pinterest Clone',
  description: 'Pinterest Clone',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      {/* <link rel="icon" href="./favicon.ico" sizes="any" /> */}
            <title>Pinterest</title>
            {/* Add other meta tags if needed */}
        </head>
      <body className={inter.className}>
        <Provider>
        <Header/>
        {children}

        </Provider>
        
        </body>
    </html>
  )
}
