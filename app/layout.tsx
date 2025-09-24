import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MysticVisions - 神秘的な占いの世界へ',
  description: 'タロット、星座占い、数秘術など、様々な占いであなたの未来を探ります。プロの占い師による詳細な占いもご利用いただけます。',
  keywords: '占い, タロット, 星座占い, 数秘術, 未来予測, スピリチュアル',
  openGraph: {
    title: 'MysticVisions - 神秘的な占いの世界へ',
    description: 'タロット、星座占い、数秘術など、様々な占いであなたの未来を探ります。',
    type: 'website',
    locale: 'ja_JP',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
