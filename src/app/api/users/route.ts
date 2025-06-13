import { NextResponse } from 'next/server'
import { prismaClient } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { id, email } = await req.json()

    const existingUser = await prismaClient.user.findUnique({
      where: { id },
    })

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 200 })
    }

    const user = await prismaClient.user.create({
      data: { id, email },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
