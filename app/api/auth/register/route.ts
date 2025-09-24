import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, birthDate, birthTime, birthPlace } = await request.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'このメールアドレスは既に使用されています' },
        { status: 400 }
      )
    }

    // Calculate zodiac sign from birth date
    const getZodiacSign = (date: string) => {
      const birthDate = new Date(date)
      const month = birthDate.getMonth() + 1
      const day = birthDate.getDate()

      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return '牡羊座'
      if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return '牡牛座'
      if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return '双子座'
      if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return '蟹座'
      if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return '獅子座'
      if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return '乙女座'
      if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return '天秤座'
      if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return '蠍座'
      if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return '射手座'
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return '山羊座'
      if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return '水瓶座'
      if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return '魚座'
      return '不明'
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        birthDate: birthDate ? new Date(birthDate) : null,
        birthTime,
        birthPlace,
        zodiacSign: birthDate ? getZodiacSign(birthDate) : null,
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      { message: 'アカウントが正常に作成されました', user: userWithoutPassword },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}
