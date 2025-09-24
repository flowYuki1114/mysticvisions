'use client'

import { Star, Shield, Clock, Users, Heart, Zap } from 'lucide-react'

const features = [
  {
    icon: Star,
    title: '多様な占い方法',
    description: 'タロット、星座占い、数秘術、水晶占いなど、様々な方法であなたの運命を読み解きます。',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Shield,
    title: '完全プライベート',
    description: 'あなたの個人情報は厳重に保護され、完全匿名で占いを楽しめます。',
    color: 'from-blue-500 to-purple-500'
  },
  {
    icon: Clock,
    title: '24時間いつでも',
    description: '深夜でも早朝でも、あなたの都合に合わせて占いを受けることができます。',
    color: 'from-green-500 to-blue-500'
  },
  {
    icon: Users,
    title: 'プロの占い師',
    description: '経験豊富なプロの占い師による詳細な個人占いもご利用いただけます。',
    color: 'from-pink-500 to-red-500'
  },
  {
    icon: Heart,
    title: '恋愛・結婚',
    description: '特別な人との関係性や結婚のタイミングなど、恋愛に関する占いが充実。',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: Zap,
    title: '即座に結果',
    description: '複雑な計算も瞬時に完了し、すぐに結果をお伝えします。',
    color: 'from-yellow-500 to-orange-500'
  }
]

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mystical font-bold mb-6">
            <span className="mystical-text">なぜMysticVisionsなのか？</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            最新のテクノロジーと伝統的な占いの知識を融合し、
            あなただけの特別な占い体験を提供します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card group hover:scale-105 transition-all duration-300"
            >
              <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-white/70 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="card">
            <div className="text-3xl sm:text-4xl font-bold mystical-text mb-2">
              10,000+
            </div>
            <div className="text-white/70">満足したユーザー</div>
          </div>
          <div className="card">
            <div className="text-3xl sm:text-4xl font-bold mystical-text mb-2">
              95%
            </div>
            <div className="text-white/70">的中率</div>
          </div>
          <div className="card">
            <div className="text-3xl sm:text-4xl font-bold mystical-text mb-2">
              24/7
            </div>
            <div className="text-white/70">対応時間</div>
          </div>
          <div className="card">
            <div className="text-3xl sm:text-4xl font-bold mystical-text mb-2">
              15+
            </div>
            <div className="text-white/70">占いの種類</div>
          </div>
        </div>
      </div>
    </section>
  )
}
