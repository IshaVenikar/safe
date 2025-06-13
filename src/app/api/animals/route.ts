import { NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prisma';

// GET /api/animals
export async function GET() {
  try {
    const animals = await prismaClient.animal.findMany();
    return NextResponse.json(animals);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch fur babies' }, { status: 500 });
  }
}

// POST /api/animals
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const newAnimal = await prismaClient.animal.create({
      data: {
        name: data.name,
        age: data.age,
        details: data.details,
        status: data.status ?? 'Avl',
        contact: data.contact,
        user: {
          connect: {
            id: data.userId,
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

