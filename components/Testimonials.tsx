'use client'

import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: '田中 美咲',
    age: 28,
    occupation: '会社員',
    content: 'タロット占いで転職のタイミングを教えてもらい、本当にその時期に良い転職ができました。MysticVisionsの占いは本当に当たります！',
    rating: 5,
    fortuneType: 'タロット占い'
  },
  {
    name: '佐藤 健太',
    age: 35,
    occupation: '自営業',
    content: '恋愛占いで現在のパートナーとの相性を占ってもらい、結婚のタイミングも教えてもらいました。おかげで素晴らしい結婚ができました。',
    rating: 5,
    fortuneType: '恋愛占い'
  },
  {
    name: '山田 花子',
    age: 24,
    occupation: '学生',
    content: '数秘術で自分の性格や適性がよく分かりました。就職活動でも役立つアドバイスをもらえて、希望の会社に就職できました。',
    rating: 5,
    fortuneType: '数秘術'
  },
  {
    name: '鈴木 一郎',
    age: 42,
    occupation: '会社員',
    content: 'プレミアムプランでプロの占い師に相談しました。仕事の悩みを詳しく占ってもらい、具体的なアドバイスをもらえました。',
    rating: 5,
    fortuneType: 'プレミアム占い'
  },
  {
    name: '高橋 さくら',
    age: 31,
    occupation: '主婦',
    content: '家族運占いで子宝に恵まれる時期を教えてもらい、その通りに妊娠できました。家族計画に本当に役立ちました。',
    rating: 5,
    fortuneType: '家族運占い'
  },
  {
    name: '伊藤 大輔',
    age: 29,
    occupation: 'フリーランス',
    content: '仕事運占いで独立のタイミングを占ってもらい、勇気をもって独立しました。今では順調に事業を展開できています。',
    rating: 5,
    fortuneType: '仕事運占い'
  }
]

export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mystical font-bold mb-6">
            <span className="mystical-text">お客様の声</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            実際にMysticVisionsをご利用いただいたお客様からの
            ありがたいお声をご紹介します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card group hover:scale-105 transition-all duration-300">
              <div className="relative">
                <Quote className="w-8 h-8 text-purple-400/30 absolute -top-2 -left-2" />
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-purple-400 font-medium">
                    {testimonial.fortuneType}
                  </span>
                </div>

                <p className="text-white/90 mb-6 leading-relaxed">
                  「{testimonial.content}」
                </p>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-white/60 text-xs">
                        {testimonial.age}歳・{testimonial.occupation}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="card">
            <div className="text-3xl sm:text-4xl font-bold mystical-text mb-2">
              98%
            </div>
            <div className="text-white/70">お客様満足度</div>
          </div>
          <div className="card">
            <div className="text-3xl sm:text-4xl font-bold mystical-text mb-2">
              4.9
            </div>
            <div className="text-white/70">平均評価（5点満点）</div>
          </div>
          <div className="card">
            <div className="text-3xl sm:text-4xl font-bold mystical-text mb-2">
              95%
            </div>
            <div className="text-white/70">的中率</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-2xl font-mystical font-bold mb-4 mystical-text">
              あなたも体験してみませんか？
            </h3>
            <p className="text-white/80 mb-6">
              今なら新規登録で初回占いが無料でご利用いただけます。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                無料で始める
              </button>
              <button className="btn-secondary">
                もっと見る
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
