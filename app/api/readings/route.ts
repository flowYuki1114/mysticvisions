import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { type, title, result } = await request.json()

    if (!type || !title || !result) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const reading = await prisma.reading.create({
      data: {
        userId: session.user.id,
        type,
        title,
        result,
        isPaid: false, // Free readings
      }
    })

    return NextResponse.json({ reading }, { status: 201 })
  } catch (error) {
    console.error('Error creating reading:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '10')

    const readings = await prisma.reading.findMany({
      where: {
        userId: session.user.id,
        ...(type && { type })
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })

    return NextResponse.json({ readings })
  } catch (error) {
    console.error('Error fetching readings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
