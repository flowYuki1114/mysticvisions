'use client'

import { Check, Star, Crown, Zap } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'フリー',
    price: 0,
    period: '月',
    description: '基本的な占いを無料でお楽しみいただけます',
    icon: Star,
    color: 'from-gray-500 to-gray-600',
    features: [
      'タロット占い（3枚スプレッド）',
      '星座占い（今日の運勢）',
      '数秘術（基本診断）',
      '結果の保存（7日間）',
      'コミュニティ参加'
    ],
    limitations: [
      '1日3回まで',
      '詳細解説なし',
      '履歴保存期間限定'
    ],
    cta: '無料で始める',
    href: '/fortune',
    popular: false
  },
  {
    name: 'ベーシック',
    price: 980,
    period: '月',
    description: 'より詳細な占いとアドバイスが受けられます',
    icon: Zap,
    color: 'from-blue-500 to-purple-500',
    features: [
      '全種類の無料占い',
      '詳細な解説とアドバイス',
      '週間・月間運勢',
      '結果の保存（30日間）',
      '優先サポート',
      '広告なし体験'
    ],
    limitations: [],
    cta: 'ベーシックプランを始める',
    href: '/signup?plan=basic',
    popular: true
  },
  {
    name: 'プレミアム',
    price: 2980,
    period: '月',
    description: 'プロの占い師による個別相談と詳細レポート',
    icon: Crown,
    color: 'from-purple-500 via-pink-500 to-red-500',
    features: [
      'ベーシックプランの全機能',
      'プロ占い師との個別相談（月2回）',
      '詳細な個人レポート',
      '無制限の占い回数',
      '結果の永続保存',
      '専用サポート',
      '新機能の早期アクセス'
    ],
    limitations: [],
    cta: 'プレミアムプランを始める',
    href: '/signup?plan=premium',
    popular: false
  }
]

export function Pricing() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mystical font-bold mb-6">
            <span className="mystical-text">料金プラン</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            あなたのニーズに合わせて最適なプランをお選びください。
            いつでもアップグレード・ダウングレード可能です。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`card relative transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'ring-2 ring-purple-500/50 shadow-2xl shadow-purple-500/20' 
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    人気No.1
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-white/70 text-sm mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold mystical-text">
                    ¥{plan.price.toLocaleString()}
                  </span>
                  <span className="text-white/60 ml-1">/{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-white">含まれる機能:</h4>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="font-semibold text-white/60 mt-6">制限事項:</h4>
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-start">
                        <div className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0">×</div>
                        <span className="text-white/60 text-sm">{limitation}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <Link
                href={plan.href}
                className={`w-full py-3 px-6 rounded-lg text-center font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'btn-primary'
                    : plan.price === 0
                    ? 'btn-secondary'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="card max-w-4xl mx-auto">
            <h3 className="text-2xl font-mystical font-bold mb-6 mystical-text">
              よくある質問
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-semibold text-white mb-2">解約はいつでも可能ですか？</h4>
                <p className="text-white/70 text-sm">
                  はい、いつでも解約可能です。解約後も現在の期間まではサービスをご利用いただけます。
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">支払い方法は何がありますか？</h4>
                <p className="text-white/70 text-sm">
                  クレジットカード、PayPal、銀行振込に対応しています。
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">無料トライアルはありますか？</h4>
                <p className="text-white/70 text-sm">
                  ベーシックプランは7日間の無料トライアルをご利用いただけます。
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">プラン変更は可能ですか？</h4>
                <p className="text-white/70 text-sm">
                  はい、いつでもプランの変更が可能です。変更は翌月から適用されます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
