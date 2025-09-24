import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        if (session.mode === 'subscription') {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
          const customerId = session.customer as string
          
          // Find user by Stripe customer ID
          const user = await prisma.user.findFirst({
            where: { stripeCustomerId: customerId }
          })

          if (user) {
            // Create or update subscription
            await prisma.subscription.upsert({
              where: { stripeId: subscription.id },
              update: {
                status: subscription.status,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              },
              create: {
                userId: user.id,
                plan: session.metadata?.plan || 'basic',
                status: subscription.status,
                stripeId: subscription.id,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              }
            })
          }
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
        await prisma.subscription.updateMany({
          where: { stripeId: subscription.id },
          data: {
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          }
        })
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        await prisma.subscription.updateMany({
          where: { stripeId: subscription.id },
          data: {
            status: 'cancelled',
          }
        })
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
          const customerId = subscription.customer as string
          
          const user = await prisma.user.findFirst({
            where: { stripeCustomerId: customerId }
          })

          if (user) {
            // Record payment
            await prisma.payment.create({
              data: {
                userId: user.id,
                amount: invoice.amount_paid,
                currency: invoice.currency,
                status: 'completed',
                stripeId: invoice.id,
                description: `Subscription payment for ${subscription.id}`,
              }
            })
          }
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
          const customerId = subscription.customer as string
          
          const user = await prisma.user.findFirst({
            where: { stripeCustomerId: customerId }
          })

          if (user) {
            // Record failed payment
            await prisma.payment.create({
              data: {
                userId: user.id,
                amount: invoice.amount_due,
                currency: invoice.currency,
                status: 'failed',
                stripeId: invoice.id,
                description: `Failed subscription payment for ${subscription.id}`,
              }
            })
          }
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
