'use client'

import Link from 'next/link'
import { Star, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-mystical font-bold mystical-text">
                MysticVisions
              </span>
            </Link>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              最新のテクノロジーと伝統的な占いの知識を融合し、
              あなただけの特別な占い体験を提供します。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">占いサービス</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/fortune/tarot" className="text-white/70 hover:text-white transition-colors text-sm">
                  タロット占い
                </Link>
              </li>
              <li>
                <Link href="/fortune/zodiac" className="text-white/70 hover:text-white transition-colors text-sm">
                  星座占い
                </Link>
              </li>
              <li>
                <Link href="/fortune/numerology" className="text-white/70 hover:text-white transition-colors text-sm">
                  数秘術
                </Link>
              </li>
              <li>
                <Link href="/fortune/crystal" className="text-white/70 hover:text-white transition-colors text-sm">
                  水晶占い
                </Link>
              </li>
              <li>
                <Link href="/premium" className="text-white/70 hover:text-white transition-colors text-sm">
                  プレミアム占い
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">会社情報</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors text-sm">
                  私たちについて
                </Link>
              </li>
              <li>
                <Link href="/fortune-tellers" className="text-white/70 hover:text-white transition-colors text-sm">
                  占い師紹介
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white/70 hover:text-white transition-colors text-sm">
                  料金プラン
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-white transition-colors text-sm">
                  ブログ
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white/70 hover:text-white transition-colors text-sm">
                  採用情報
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">サポート</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-white/70 hover:text-white transition-colors text-sm">
                  ヘルプセンター
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-white transition-colors text-sm">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-white/70 hover:text-white transition-colors text-sm">
                  返金ポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <Mail className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-white/70 text-sm">support@mysticvisions.com</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Phone className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-white/70 text-sm">03-1234-5678</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <MapPin className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-white/70 text-sm">東京都渋谷区</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 text-sm">
            © 2024 MysticVisions. All rights reserved. | 
            <span className="ml-1">神秘的な占いの世界へようこそ</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
