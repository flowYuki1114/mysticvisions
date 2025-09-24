'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Star, Sparkles, Moon, Sun } from 'lucide-react'

export function Hero() {
  const [currentText, setCurrentText] = useState(0)
  const texts = [
    'あなたの運命を解き明かします',
    '未来への道筋を照らします',
    '真実の愛を見つけます',
    '成功への鍵を握ります'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 cosmic-gradient">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <Star className="w-4 h-4 text-purple-400/30 sparkle" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-mystical font-bold mb-6">
            <span className="mystical-text text-shadow">
              MysticVisions
            </span>
          </h1>
          <div className="h-16 flex items-center justify-center">
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-light transition-all duration-500">
              {texts[currentText]}
            </p>
          </div>
        </div>

        <p className="text-lg sm:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          タロット、星座占い、数秘術など、様々な占いであなたの未来を探ります。
          <br />
          プロの占い師による詳細な占いもご利用いただけます。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/fortune" className="btn-primary text-lg px-8 py-4">
            <Sparkles className="w-5 h-5 mr-2" />
            無料占いを始める
          </Link>
          <Link href="/premium" className="btn-secondary text-lg px-8 py-4">
            <Moon className="w-5 h-5 mr-2" />
            プレミアム占い
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="card">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">高精度占い</h3>
            <p className="text-white/70 text-sm">AIと伝統的な占いの融合</p>
          </div>
          <div className="card">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">24時間対応</h3>
            <p className="text-white/70 text-sm">いつでもどこでも占い可能</p>
          </div>
          <div className="card">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
              <Moon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">プライバシー保護</h3>
            <p className="text-white/70 text-sm">完全匿名で安心利用</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
