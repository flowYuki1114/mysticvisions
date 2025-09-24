'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Star, Mail, Lock, User, Calendar, MapPin, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import bcrypt from 'bcryptjs'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      toast.error('パスワードが一致しません')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      toast.error('パスワードは6文字以上で入力してください')
      setIsLoading(false)
      return
    }

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 12)
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          password: hashedPassword,
        }),
      })

      if (response.ok) {
        toast.success('アカウントが作成されました！ログインしてください。')
        router.push('/auth/signin')
      } else {
        const error = await response.json()
        toast.error(error.message || 'アカウント作成に失敗しました')
      }
    } catch (error) {
      toast.error('エラーが発生しました。もう一度お試しください。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-mystical font-bold mystical-text">
              MysticVisions
            </span>
          </Link>
          <h2 className="text-3xl font-mystical font-bold text-white mb-2">
            新規登録
          </h2>
          <p className="text-white/70">
            無料アカウントを作成して占いを始めましょう
          </p>
        </div>

        <div className="card">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                お名前
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="山田 太郎"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                メールアドレス
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-white mb-2">
                生年月日（より正確な占いのため）
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="birthTime" className="block text-sm font-medium text-white mb-2">
                出生時刻（任意）
              </label>
              <input
                id="birthTime"
                name="birthTime"
                type="time"
                value={formData.birthTime}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="birthPlace" className="block text-sm font-medium text-white mb-2">
                出生地（任意）
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="birthPlace"
                  name="birthPlace"
                  type="text"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="東京都"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                パスワード
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="6文字以上で入力"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                パスワード確認
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="パスワードを再入力"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-white/70">
                <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                  利用規約
                </Link>
                と
                <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                  プライバシーポリシー
                </Link>
                に同意します
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? 'アカウント作成中...' : 'アカウントを作成'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/70">
              すでにアカウントをお持ちの方は{' '}
              <Link href="/auth/signin" className="text-purple-400 hover:text-purple-300 font-medium">
                ログイン
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
