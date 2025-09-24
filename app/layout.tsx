import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MysticVisions - 占いサイト',
  description: 'あなたの運命を解き明かします',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}