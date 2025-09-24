'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Star, 
  Moon, 
  Calculator, 
  Gem, 
  Heart, 
  Briefcase, 
  Home,
  Sparkles,
  ArrowRight
} from 'lucide-react'

const fortuneTypes = [
  {
    id: 'tarot',
    name: 'タロット占い',
    description: '78枚のカードからあなたの運命を読み解きます',
    icon: Star,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    isFree: true,
    features: ['3枚スプレッド', '詳細解説', 'アドバイス付き']
  },
  {
    id: 'zodiac',
    name: '星座占い',
    description: '生年月日からあなたの星座と運勢を分析',
    icon: Moon,
    color: 'from-blue-500 to-purple-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    isFree: true,
    features: ['今日の運勢', '週間予報', '相性占い']
  },
  {
    id: 'numerology',
    name: '数秘術',
    description: '生年月日から導き出される数字で運命を解読',
    icon: Calculator,
    color: 'from-green-500 to-blue-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    isFree: true,
    features: ['ライフパス数', '運命数', 'チャレンジ数']
  },
  {
    id: 'crystal',
    name: '水晶占い',
    description: 'パワーストーンのエネルギーで未来を占います',
    icon: Gem,
    color: 'from-pink-500 to-red-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    isFree: false,
    features: ['個別水晶選択', 'エネルギー分析', '開運アドバイス']
  },
  {
    id: 'love',
    name: '恋愛占い',
    description: '特別な人との関係性や結婚のタイミングを占います',
    icon: Heart,
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    isFree: false,
    features: ['相性診断', '結婚時期', '恋愛アドバイス']
  },
  {
    id: 'career',
    name: '仕事運占い',
    description: 'キャリアアップや転職のタイミングを占います',
    icon: Briefcase,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    isFree: false,
    features: ['適職診断', '転職時期', '成功の鍵']
  },
  {
    id: 'family',
    name: '家族運占い',
    description: '家族関係や子宝に恵まれる時期を占います',
    icon: Home,
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    isFree: false,
    features: ['家族関係', '子宝時期', '家庭円満']
  },
  {
    id: 'premium',
    name: 'プレミアム占い',
    description: 'プロの占い師による詳細な個人占い',
    icon: Sparkles,
    color: 'from-purple-500 via-pink-500 to-red-500',
    bgColor: 'bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10',
    borderColor: 'border-purple-500/50',
    isFree: false,
    features: ['個別相談', '詳細レポート', 'フォローアップ']
  }
]

export function FortuneTypes() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mystical font-bold mb-6">
            <span className="mystical-text">占いの種類</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            あなたの悩みや知りたいことに合わせて、最適な占い方法をお選びください。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fortuneTypes.map((fortune) => (
            <div
              key={fortune.id}
              className={`card group cursor-pointer transition-all duration-300 hover:scale-105 ${fortune.bgColor} ${fortune.borderColor} border-2`}
              onMouseEnter={() => setHoveredCard(fortune.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${fortune.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <fortune.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">
                  {fortune.name}
                </h3>
                
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {fortune.description}
                </p>

                <div className="mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    fortune.isFree 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  }`}>
                    {fortune.isFree ? '無料' : '有料'}
                  </span>
                </div>

                <div className="space-y-1 mb-6">
                  {fortune.features.map((feature, index) => (
                    <div key={index} className="text-xs text-white/60 flex items-center">
                      <div className="w-1 h-1 bg-white/40 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Link
                  href={fortune.isFree ? `/fortune/${fortune.id}` : `/premium/${fortune.id}`}
                  className={`inline-flex items-center justify-center w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    fortune.isFree
                      ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                  }`}
                >
                  {fortune.isFree ? '無料で占う' : '詳細を見る'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-2xl font-mystical font-bold mb-4 mystical-text">
              まずは無料占いから始めませんか？
            </h3>
            <p className="text-white/80 mb-6">
              登録不要で今すぐ占いを体験できます。あなたの運命が待っています。
            </p>
            <Link href="/fortune" className="btn-primary text-lg px-8 py-4">
              <Sparkles className="w-5 h-5 mr-2" />
              無料占いを始める
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
