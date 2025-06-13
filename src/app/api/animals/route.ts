import { NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prisma';

// GET /api/animals
export async function GET() {
  try {
    const animals = await prismaClient.animal.findMany();
    return NextResponse.json(animals);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch animals' }, { status: 500 });
  }
}

// POST /api/animals
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const newAnimal = await prismaClient.animal.create({
      data: {
        kind: data.kind,
        age: data.age,
        details: data.details,
        status: data.status ?? 'Avl',
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });

    return NextResponse.json(newAnimal, { status: 201 });
  } catch (err) {
    console.error('Error registering animal:', err);
    return NextResponse.json(
      { error: 'Failed to register animal', details: String(err) },
      { status: 500 }
    );
  }
}

