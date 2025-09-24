'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Star, Calendar, Heart, Briefcase, Sun, Moon, Sparkles, History } from 'lucide-react'
import Link from 'next/link'

interface Reading {
  id: string
  type: string
  title: string
  result: any
  createdAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [readings, setReadings] = useState<Reading[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (session?.user?.id) {
      fetchReadings()
    }
  }, [session, status, router])

  const fetchReadings = async () => {
    try {
      const response = await fetch('/api/readings?limit=5')
      const data = await response.json()
      setReadings(data.readings || [])
    } catch (error) {
      console.error('Failed to fetch readings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-spin">
            <Star className="w-8 h-8 text-white" />
          </div>
          <p className="text-white/80">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const getFortuneIcon = (type: string) => {
    switch (type) {
      case 'tarot': return <Star className="w-5 h-5" />
      case 'zodiac': return <Moon className="w-5 h-5" />
      case 'numerology': return <Sparkles className="w-5 h-5" />
      case 'crystal': return <Sun className="w-5 h-5" />
      default: return <Star className="w-5 h-5" />
    }
  }

  const getFortuneLabel = (type: string) => {
    switch (type) {
      case 'tarot': return 'タロット占い'
      case 'zodiac': return '星座占い'
      case 'numerology': return '数秘術'
      case 'crystal': return '水晶占い'
      default: return '占い'
    }
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-mystical font-bold mb-6">
            <span className="mystical-text">ダッシュボード</span>
          </h1>
          <p className="text-xl text-white/80">
            ようこそ、{session.user.name}さん
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/fortune/tarot" className="card group hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">タロット占い</h3>
              <p className="text-white/70 text-sm">3枚のカードで運命を占う</p>
            </div>
          </Link>

          <Link href="/fortune/zodiac" className="card group hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Moon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">星座占い</h3>
              <p className="text-white/70 text-sm">今日の運勢をチェック</p>
            </div>
          </Link>

          <Link href="/fortune/numerology" className="card group hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">数秘術</h3>
              <p className="text-white/70 text-sm">数字で運命を解読</p>
            </div>
          </Link>

          <Link href="/premium" className="card group hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">プレミアム占い</h3>
              <p className="text-white/70 text-sm">プロの占い師に相談</p>
            </div>
          </Link>
        </div>

        {/* Recent Readings */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <History className="w-6 h-6 mr-2 text-purple-400" />
              最近の占い結果
            </h2>
            <Link href="/readings" className="text-purple-400 hover:text-purple-300 text-sm">
              すべて見る
            </Link>
          </div>

          {readings.length === 0 ? (
            <div className="card text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-white/40" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                まだ占いをしていません
              </h3>
              <p className="text-white/70 mb-6">
                まずは無料占いから始めてみましょう
              </p>
              <Link href="/fortune" className="btn-primary">
                占いを始める
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readings.map((reading) => (
                <div key={reading.id} className="card group hover:scale-105 transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      {getFortuneIcon(reading.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {reading.title}
                      </h3>
                      <p className="text-sm text-purple-300 mb-2">
                        {getFortuneLabel(reading.type)}
                      </p>
                      <p className="text-xs text-white/60">
                        {new Date(reading.createdAt).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">アカウント情報</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/70">お名前</label>
              <p className="text-white">{session.user.name || '未設定'}</p>
            </div>
            <div>
              <label className="text-sm text-white/70">メールアドレス</label>
              <p className="text-white">{session.user.email}</p>
            </div>
            <div>
              <label className="text-sm text-white/70">会員ステータス</label>
              <p className="text-white">フリーメンバー</p>
            </div>
            <div>
              <label className="text-sm text-white/70">登録日</label>
              <p className="text-white">
                {new Date().toLocaleDateString('ja-JP')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
