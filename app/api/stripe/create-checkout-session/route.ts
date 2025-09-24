import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createCheckoutSession } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { plan } = await request.json()

    if (!plan || !['basic', 'premium'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Get or create Stripe customer
    let user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Create Stripe customer if not exists
    if (!user.stripeCustomerId) {
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id,
        },
      })

      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customer.id }
      })

      user.stripeCustomerId = customer.id
    }

    // Create checkout session
    const priceId = plan === 'basic' 
      ? process.env.STRIPE_BASIC_PRICE_ID 
      : process.env.STRIPE_PREMIUM_PRICE_ID

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID not configured' }, { status: 500 })
    }

    const checkoutSession = await createCheckoutSession(
      priceId,
      user.stripeCustomerId
    )

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
