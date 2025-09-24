'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Star, RotateCcw, Sparkles, Moon, Sun } from 'lucide-react'
import toast from 'react-hot-toast'

interface TarotCard {
  id: number
  name: string
  meaning: string
  reversed: string
  description: string
  imageUrl: string
  isReversed: boolean
}

const tarotCards: Omit<TarotCard, 'isReversed'>[] = [
  {
    id: 0,
    name: '愚者',
    meaning: '新しい始まり、冒険、可能性',
    reversed: '軽率、無謀、準備不足',
    description: '新しい旅立ちを表すカードです。純粋な心で新しいことに挑戦する時が来ています。',
    imageUrl: '/images/tarot/fool.jpg'
  },
  {
    id: 1,
    name: '魔術師',
    meaning: '意志力、創造力、行動力',
    reversed: '意志薄弱、怠惰、誤用',
    description: '自分の能力を信じて行動する時です。必要な道具はすべて揃っています。',
    imageUrl: '/images/tarot/magician.jpg'
  },
  {
    id: 2,
    name: '女教皇',
    meaning: '直感、神秘、内なる知恵',
    reversed: '直感の欠如、秘密主義、感情の混乱',
    description: '内なる声に耳を傾ける時です。直感を信じて行動しましょう。',
    imageUrl: '/images/tarot/high-priestess.jpg'
  },
  {
    id: 3,
    name: '女帝',
    meaning: '豊かさ、母性、創造性',
    reversed: '創造性の欠如、過保護、依存',
    description: '豊かさと創造性が満ち溢れています。自然の流れに身を任せましょう。',
    imageUrl: '/images/tarot/empress.jpg'
  },
  {
    id: 4,
    name: '皇帝',
    meaning: '権威、秩序、リーダーシップ',
    reversed: '独裁、権威主義、柔軟性の欠如',
    description: 'リーダーシップを発揮する時です。秩序と規律を大切にしましょう。',
    imageUrl: '/images/tarot/emperor.jpg'
  },
  {
    id: 5,
    name: '教皇',
    meaning: '伝統、教育、精神的な導き',
    reversed: '独断的、教条主義、精神的な迷い',
    description: '伝統的な価値観や教育が重要です。精神的な導きを求めましょう。',
    imageUrl: '/images/tarot/hierophant.jpg'
  },
  {
    id: 6,
    name: '恋人',
    meaning: '愛、選択、調和',
    reversed: '不調和、選択の困難、関係の破綻',
    description: '重要な選択を迫られています。心の声に従って決断しましょう。',
    imageUrl: '/images/tarot/lovers.jpg'
  },
  {
    id: 7,
    name: '戦車',
    meaning: '勝利、意志力、前進',
    reversed: '敗北、意志の弱さ、方向性の欠如',
    description: '困難を乗り越えて勝利を掴む時です。強い意志で前進しましょう。',
    imageUrl: '/images/tarot/chariot.jpg'
  },
  {
    id: 8,
    name: '力',
    meaning: '内なる強さ、忍耐、自制心',
    reversed: '弱さ、自制心の欠如、暴力的',
    description: '内なる強さを信じて困難に立ち向かいましょう。優しさと強さのバランスが大切です。',
    imageUrl: '/images/tarot/strength.jpg'
  },
  {
    id: 9,
    name: '隠者',
    meaning: '内省、探求、孤独',
    reversed: '孤立、内省の欠如、方向性の迷い',
    description: '一人の時間を大切にして内省する時です。内なる光を探しましょう。',
    imageUrl: '/images/tarot/hermit.jpg'
  }
]

export default function TarotFortunePage() {
  const { data: session } = useSession()
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([])
  const [isRevealed, setIsRevealed] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const [question, setQuestion] = useState('')

  const shuffleCards = () => {
    setIsShuffling(true)
    setIsRevealed(false)
    
    // Shuffle animation
    setTimeout(() => {
      const shuffled = [...tarotCards]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(card => ({
          ...card,
          isReversed: Math.random() > 0.5
        }))
      
      setSelectedCards(shuffled)
      setIsShuffling(false)
    }, 2000)
  }

  const revealCards = () => {
    setIsRevealed(true)
    
    // Save reading to database if user is logged in
    if (session?.user?.id) {
      saveReading()
    }
  }

  const saveReading = async () => {
    try {
      await fetch('/api/readings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'tarot',
          title: 'タロット占い',
          result: {
            question,
            cards: selectedCards,
            timestamp: new Date().toISOString()
          }
        }),
      })
    } catch (error) {
      console.error('Failed to save reading:', error)
    }
  }

  useEffect(() => {
    if (selectedCards.length === 0) {
      shuffleCards()
    }
  }, [])

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-mystical font-bold mb-6">
            <span className="mystical-text">タロット占い</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            78枚のタロットカードから3枚を選び、あなたの運命を読み解きます。
            心を静めて、質問を思い浮かべながらカードを選んでください。
          </p>
        </div>

        {/* Question Input */}
        <div className="card max-w-2xl mx-auto mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            占いたいことを心に思い浮かべてください
          </h3>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="例：恋愛について、仕事について、将来について..."
            className="w-full h-24 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Cards Display */}
        <div className="mb-8">
          {isShuffling ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-spin">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <p className="text-white/80">カードをシャッフル中...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedCards.map((card, index) => (
                <div
                  key={card.id}
                  className={`card group cursor-pointer transition-all duration-500 hover:scale-105 ${
                    isRevealed ? 'animate-slide-up' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onClick={!isRevealed ? revealCards : undefined}
                >
                  <div className="text-center">
                    <div className="relative mb-4">
                      <div className="w-32 h-48 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
                        {isRevealed ? (
                          <div className="text-center">
                            <div className="text-4xl mb-2">
                              {card.isReversed ? '🔮' : '✨'}
                            </div>
                            <div className="text-sm text-white/80">
                              {card.isReversed ? '逆位置' : '正位置'}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Star className="w-8 h-8 text-white/60 mx-auto mb-2" />
                            <div className="text-sm text-white/60">
                              {index === 0 ? '過去' : index === 1 ? '現在' : '未来'}
                            </div>
                          </div>
                        )}
                      </div>
                      {isRevealed && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {index + 1}
                          </span>
                        </div>
                      )}
                    </div>

                    {isRevealed && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-white">
                          {card.name}
                        </h3>
                        <div className="text-sm">
                          <p className="text-purple-300 font-medium mb-1">
                            {card.isReversed ? card.reversed : card.meaning}
                          </p>
                          <p className="text-white/70 text-xs leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          {!isRevealed ? (
            <button
              onClick={revealCards}
              disabled={isShuffling}
              className="btn-primary text-lg px-8 py-4"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              カードをめくる
            </button>
          ) : (
            <div className="space-y-4">
              <div className="card max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-white mb-3">
                  占い結果の解釈
                </h3>
                <div className="space-y-2 text-sm text-white/80">
                  <p><span className="font-medium text-purple-300">過去:</span> {selectedCards[0]?.isReversed ? selectedCards[0].reversed : selectedCards[0]?.meaning}</p>
                  <p><span className="font-medium text-purple-300">現在:</span> {selectedCards[1]?.isReversed ? selectedCards[1].reversed : selectedCards[1]?.meaning}</p>
                  <p><span className="font-medium text-purple-300">未来:</span> {selectedCards[2]?.isReversed ? selectedCards[2].reversed : selectedCards[2]?.meaning}</p>
                </div>
              </div>
              
              <button
                onClick={shuffleCards}
                className="btn-secondary"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                もう一度占う
              </button>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-12 card max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Moon className="w-5 h-5 mr-2 text-purple-400" />
            タロット占いのコツ
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>• 占う前に心を静めて、具体的な質問を思い浮かべてください</li>
            <li>• カードを選ぶ時は直感を大切にしてください</li>
            <li>• 結果は参考程度に考え、最終的な判断は自分で行ってください</li>
            <li>• 定期的に占うことで、運勢の変化を感じ取ることができます</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
