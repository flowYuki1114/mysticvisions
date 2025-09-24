'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Star, Moon, Sun, Heart, Briefcase, Home, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

interface ZodiacSign {
  id: string
  name: string
  symbol: string
  element: string
  planet: string
  dates: string
  description: string
  traits: string[]
  today: {
    general: string
    love: string
    career: string
    health: string
    luckyColor: string
    luckyNumber: number
  }
}

const zodiacSigns: ZodiacSign[] = [
  {
    id: 'aries',
    name: '牡羊座',
    symbol: '♈',
    element: '火',
    planet: '火星',
    dates: '3月21日 - 4月19日',
    description: '情熱的で積極的なリーダータイプ。新しいことに挑戦する勇気があります。',
    traits: ['情熱的', '積極的', 'リーダーシップ', '直感的', '競争心旺盛'],
    today: {
      general: '今日は新しいプロジェクトを始めるのに最適な日です。',
      love: '積極的にアプローチすることで良い結果が得られるでしょう。',
      career: 'リーダーシップを発揮するチャンスが訪れます。',
      health: '適度な運動でエネルギーを発散させましょう。',
      luckyColor: '赤',
      luckyNumber: 7
    }
  },
  {
    id: 'taurus',
    name: '牡牛座',
    symbol: '♉',
    element: '土',
    planet: '金星',
    dates: '4月20日 - 5月20日',
    description: '安定感があり、美しいものを愛する実直な性格です。',
    traits: ['安定志向', '美的感覚', '忍耐強い', '実用的', '信頼できる'],
    today: {
      general: '今日は安定した基盤を築くのに良い日です。',
      love: '長期的な関係を築くチャンスが訪れます。',
      career: '着実に成果を積み重ねることで成功できます。',
      health: '規則正しい生活を心がけましょう。',
      luckyColor: '緑',
      luckyNumber: 4
    }
  },
  {
    id: 'gemini',
    name: '双子座',
    symbol: '♊',
    element: '風',
    planet: '水星',
    dates: '5月21日 - 6月21日',
    description: '好奇心旺盛でコミュニケーション能力が高い知的な性格です。',
    traits: ['好奇心旺盛', 'コミュニケーション能力', '知的', '適応力', '多才'],
    today: {
      general: '今日は新しい情報や知識を得るのに最適な日です。',
      love: '会話を通じて相手との絆を深められるでしょう。',
      career: 'ネットワーキングで新しい機会が生まれます。',
      health: '精神的な刺激を求めて外出してみましょう。',
      luckyColor: '黄色',
      luckyNumber: 3
    }
  },
  {
    id: 'cancer',
    name: '蟹座',
    symbol: '♋',
    element: '水',
    planet: '月',
    dates: '6月22日 - 7月22日',
    description: '感情豊かで家族を大切にする優しい性格です。',
    traits: ['感情豊か', '家族思い', '直感的', '保護的', '思いやり深い'],
    today: {
      general: '今日は家族や親しい人との時間を大切にしましょう。',
      love: '感情を素直に表現することで関係が深まります。',
      career: 'チームワークを重視することで成果が上がります。',
      health: 'ストレスを感じたら休息を取ることを忘れずに。',
      luckyColor: '銀',
      luckyNumber: 2
    }
  },
  {
    id: 'leo',
    name: '獅子座',
    symbol: '♌',
    element: '火',
    planet: '太陽',
    dates: '7月23日 - 8月22日',
    description: '自信に満ちたカリスマ性のあるリーダータイプです。',
    traits: ['自信家', 'カリスマ性', '創造的', '寛大', 'リーダーシップ'],
    today: {
      general: '今日はあなたの才能を発揮する絶好の機会です。',
      love: '自信を持ってアプローチすることで魅力的に見えるでしょう。',
      career: '創造性を活かしたプロジェクトで注目を集めます。',
      health: '太陽の下で活動することでエネルギーが高まります。',
      luckyColor: '金',
      luckyNumber: 1
    }
  },
  {
    id: 'virgo',
    name: '乙女座',
    symbol: '♍',
    element: '土',
    planet: '水星',
    dates: '8月23日 - 9月22日',
    description: '細やかで完璧主義的な実用的な性格です。',
    traits: ['細やか', '完璧主義', '実用的', '分析的', '献身的'],
    today: {
      general: '今日は細かい作業や整理整頓に集中するのに良い日です。',
      love: '相手の細かい気遣いが愛情表現として伝わります。',
      career: '詳細な計画を立てることで成功への道筋が見えます。',
      health: '規則正しい生活リズムを保ちましょう。',
      luckyColor: 'ベージュ',
      luckyNumber: 6
    }
  },
  {
    id: 'libra',
    name: '天秤座',
    symbol: '♎',
    element: '風',
    planet: '金星',
    dates: '9月23日 - 10月23日',
    description: 'バランス感覚に優れ、美と調和を愛する性格です。',
    traits: ['バランス感覚', '美的感覚', '協調性', '公正', '魅力的'],
    today: {
      general: '今日は調和とバランスを重視する日です。',
      love: '相手との調和を図ることで関係が深まります。',
      career: 'チームの調和を保つことで良い結果が得られます。',
      health: '心身のバランスを保つことを心がけましょう。',
      luckyColor: 'ピンク',
      luckyNumber: 9
    }
  },
  {
    id: 'scorpio',
    name: '蠍座',
    symbol: '♏',
    element: '水',
    planet: '冥王星',
    dates: '10月24日 - 11月22日',
    description: '深い洞察力と強い意志力を持つ神秘的な性格です。',
    traits: ['洞察力', '意志力', '神秘的', '情熱的', '変革力'],
    today: {
      general: '今日は深い洞察を得るのに最適な日です。',
      love: '深い絆を築くチャンスが訪れます。',
      career: '変革を起こすアイデアが浮かぶでしょう。',
      health: '内面の変化を受け入れることで成長できます。',
      luckyColor: '深紅',
      luckyNumber: 8
    }
  },
  {
    id: 'sagittarius',
    name: '射手座',
    symbol: '♐',
    element: '火',
    planet: '木星',
    dates: '11月23日 - 12月21日',
    description: '自由を愛し、冒険心旺盛な楽観的な性格です。',
    traits: ['自由志向', '冒険心', '楽観的', '哲学的', '独立心'],
    today: {
      general: '今日は新しい冒険を始めるのに最適な日です。',
      love: '自由な関係を築くことで幸せになれるでしょう。',
      career: '海外や新しい分野への挑戦が成功につながります。',
      health: '自然の中で活動することで活力が湧きます。',
      luckyColor: '紫',
      luckyNumber: 5
    }
  },
  {
    id: 'capricorn',
    name: '山羊座',
    symbol: '♑',
    element: '土',
    planet: '土星',
    dates: '12月22日 - 1月19日',
    description: '責任感が強く、目標に向かって着実に努力する性格です。',
    traits: ['責任感', '目標志向', '忍耐強い', '実用的', 'リーダーシップ'],
    today: {
      general: '今日は長期的な目標に向かって努力するのに良い日です。',
      love: '真剣な関係を築く準備が整っています。',
      career: '着実な努力が認められ、昇進のチャンスが訪れます。',
      health: '規則正しい生活で健康を維持しましょう。',
      luckyColor: '茶',
      luckyNumber: 10
    }
  },
  {
    id: 'aquarius',
    name: '水瓶座',
    symbol: '♒',
    element: '風',
    planet: '天王星',
    dates: '1月20日 - 2月18日',
    description: '独創的で革新的なアイデアを持つ個性的な性格です。',
    traits: ['独創的', '革新的', '個性的', '人道的', '進歩的'],
    today: {
      general: '今日は新しいアイデアを形にするのに最適な日です。',
      love: '個性を活かした関係を築くことができます。',
      career: '革新的なアプローチで注目を集めます。',
     健康: '新しい趣味や活動で心身をリフレッシュしましょう。',
      luckyColor: '水色',
      luckyNumber: 11
    }
  },
  {
    id: 'pisces',
    name: '魚座',
    symbol: '♓',
    element: '水',
    planet: '海王星',
    dates: '2月19日 - 3月20日',
    description: '直感的で感受性が豊かな芸術的な性格です。',
    traits: ['直感的', '感受性豊か', '芸術的', '共感的', '想像力豊か'],
    today: {
      general: '今日は直感を信じて行動するのに最適な日です。',
      love: '感情的なつながりを深めることができます。',
      career: '創造性を活かした仕事で成果を上げられます。',
      health: '瞑想やリラクゼーションで心を整えましょう。',
      luckyColor: '青',
      luckyNumber: 12
    }
  }
]

export default function ZodiacFortunePage() {
  const { data: session } = useSession()
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<'general' | 'love' | 'career' | 'health'>('general')

  const handleSignSelect = (sign: ZodiacSign) => {
    setSelectedSign(sign)
    setIsRevealed(true)
    
    // Save reading to database if user is logged in
    if (session?.user?.id) {
      saveReading(sign)
    }
  }

  const saveReading = async (sign: ZodiacSign) => {
    try {
      await fetch('/api/readings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'zodiac',
          title: `${sign.name}の今日の運勢`,
          result: {
            sign: sign.name,
            fortune: sign.today,
            timestamp: new Date().toISOString()
          }
        }),
      })
    } catch (error) {
      console.error('Failed to save reading:', error)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'love': return <Heart className="w-5 h-5" />
      case 'career': return <Briefcase className="w-5 h-5" />
      case 'health': return <Sun className="w-5 h-5" />
      default: return <Star className="w-5 h-5" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'love': return '恋愛運'
      case 'career': return '仕事運'
      case 'health': return '健康運'
      default: return '総合運'
    }
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-mystical font-bold mb-6">
            <span className="mystical-text">星座占い</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            あなたの星座を選んで、今日の運勢をチェックしましょう。
            恋愛、仕事、健康など、様々な角度から運勢をお伝えします。
          </p>
        </div>

        {!isRevealed ? (
          /* Zodiac Signs Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {zodiacSigns.map((sign) => (
              <button
                key={sign.id}
                onClick={() => handleSignSelect(sign)}
                className="card group hover:scale-105 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-3">{sign.symbol}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {sign.name}
                </h3>
                <p className="text-sm text-white/70 mb-2">
                  {sign.dates}
                </p>
                <div className="text-xs text-white/60">
                  {sign.element}・{sign.planet}
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Fortune Result */
          <div className="space-y-8">
            {/* Selected Sign Info */}
            <div className="card text-center">
              <div className="text-6xl mb-4">{selectedSign?.symbol}</div>
              <h2 className="text-3xl font-mystical font-bold text-white mb-2">
                {selectedSign?.name}
              </h2>
              <p className="text-white/80 mb-4">
                {selectedSign?.dates} | {selectedSign?.element}・{selectedSign?.planet}
              </p>
              <p className="text-white/70 max-w-2xl mx-auto">
                {selectedSign?.description}
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {(['general', 'love', 'career', 'health'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {getCategoryIcon(category)}
                  <span>{getCategoryLabel(category)}</span>
                </button>
              ))}
            </div>

            {/* Fortune Content */}
            <div className="card">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {getCategoryLabel(selectedCategory)}
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="text-center">
                <p className="text-lg text-white/90 mb-6 leading-relaxed">
                  {selectedSign?.today[selectedCategory]}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">ラッキーカラー</h4>
                    <div className="flex items-center justify-center space-x-2">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-white/20"
                        style={{ backgroundColor: selectedSign?.today.luckyColor }}
                      ></div>
                      <span className="text-white/80">{selectedSign?.today.luckyColor}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">ラッキーナンバー</h4>
                    <div className="text-2xl font-bold text-white">
                      {selectedSign?.today.luckyNumber}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personality Traits */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">
                性格の特徴
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {selectedSign?.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm text-white/80"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <button
                onClick={() => {
                  setIsRevealed(false)
                  setSelectedSign(null)
                }}
                className="btn-secondary"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                別の星座で占う
              </button>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-12 card max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Moon className="w-5 h-5 mr-2 text-purple-400" />
            星座占いのコツ
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>• 星座占いは生年月日から決定される基本的な性格傾向を表します</li>
            <li>• 運勢は日々変化するので、定期的にチェックしてみましょう</li>
            <li>• 他の星座の特徴も知ることで、人間関係がより良くなります</li>
            <li>• 占い結果は参考程度に考え、最終的な判断は自分で行ってください</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
