import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export const plans = {
  basic: {
    name: 'ベーシックプラン',
    price: 980,
    interval: 'month' as const,
    features: [
      '全種類の無料占い',
      '詳細な解説とアドバイス',
      '週間・月間運勢',
      '結果の保存（30日間）',
      '優先サポート',
      '広告なし体験'
    ]
  },
  premium: {
    name: 'プレミアムプラン',
    price: 2980,
    interval: 'month' as const,
    features: [
      'ベーシックプランの全機能',
      'プロ占い師との個別相談（月2回）',
      '詳細な個人レポート',
      '無制限の占い回数',
      '結果の永続保存',
      '専用サポート',
      '新機能の早期アクセス'
    ]
  }
}

export const createCheckoutSession = async (
  priceId: string,
  customerId?: string,
  successUrl?: string,
  cancelUrl?: string
) => {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer: customerId,
    success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    metadata: {
      plan: priceId.includes('basic') ? 'basic' : 'premium',
    },
  })

  return session
}

export const createCustomerPortalSession = async (customerId: string) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  })

  return session
}
