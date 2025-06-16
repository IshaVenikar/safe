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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url!)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'User id is required' }, { status: 400 })
    }
    const user = await prismaClient.user.findUnique({
      where: { id },
      include: { animals: true },
    })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}
