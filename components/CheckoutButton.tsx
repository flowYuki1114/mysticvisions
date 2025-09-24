'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CreditCard, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface CheckoutButtonProps {
  plan: 'basic' | 'premium'
  className?: string
}

export function CheckoutButton({ plan, className = '' }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleCheckout = async () => {
    if (!session) {
      toast.error('ログインが必要です')
      router.push('/auth/signin')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Checkout session creation failed')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('決済の開始に失敗しました。もう一度お試しください。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`btn-primary ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          処理中...
        </>
      ) : (
        <>
          <CreditCard className="w-5 h-5 mr-2" />
          {plan === 'basic' ? 'ベーシックプランを始める' : 'プレミアムプランを始める'}
        </>
      )}
    </button>
  )
}
