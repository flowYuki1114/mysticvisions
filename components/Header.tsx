'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Menu, X, User, Star, Moon, Sun } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-mystical font-bold mystical-text">
              MysticVisions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/fortune" className="text-white/80 hover:text-white transition-colors">
              無料占い
            </Link>
            <Link href="/premium" className="text-white/80 hover:text-white transition-colors">
              プレミアム占い
            </Link>
            <Link href="/about" className="text-white/80 hover:text-white transition-colors">
              占い師について
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
              お問い合わせ
            </Link>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>ダッシュボード</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="btn-secondary"
                >
                  ログアウト
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => signIn()}
                  className="btn-secondary"
                >
                  ログイン
                </button>
                <button className="btn-primary">
                  無料会員登録
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/fortune"
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                無料占い
              </Link>
              <Link
                href="/premium"
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                プレミアム占い
              </Link>
              <Link
                href="/about"
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                占い師について
              </Link>
              <Link
                href="/contact"
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                お問い合わせ
              </Link>
              <div className="pt-4 border-t border-white/10">
                {session ? (
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>ダッシュボード</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut()
                        setIsMenuOpen(false)
                      }}
                      className="btn-secondary w-full"
                    >
                      ログアウト
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => {
                        signIn()
                        setIsMenuOpen(false)
                      }}
                      className="btn-secondary w-full"
                    >
                      ログイン
                    </button>
                    <button className="btn-primary w-full">
                      無料会員登録
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
