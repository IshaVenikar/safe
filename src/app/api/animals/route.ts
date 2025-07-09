import { NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prisma';

// GET /api/animals
export async function GET() {
  try {
    const animals = await prismaClient.animal.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(animals);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch fur babies', details: String(err) },
      { status: 500 }
    );
  }
}

// POST /api/animals
export async function POST(req: Request) {
  try {
    const { name, age, details, userId, imageUrl, contact } = await req.json();

    const newAnimal = await prismaClient.animal.create({
      data: {
        name,
        age,
        details,
        status: 'Avl',
        contact,
        imageUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json(newAnimal, { status: 201 });
  } catch (err) {
    console.error('Error registering fur baby:', err);
    return NextResponse.json(
      { error: 'Failed to register fur baby', details: String(err) },
      { status: 500 }
    );
  }
}

