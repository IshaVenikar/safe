import { NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const animal = await prismaClient.animal.findUnique({ where: { id: params.id }, include: {
      user: {
        select: {
          email: true,
          location: true
        },
      },
    } });

    if (!animal) {
      return NextResponse.json({ error: 'Fur baby not found' }, { status: 404 });
    }

    return NextResponse.json(animal);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch fur baby' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const updated = await prismaClient.animal.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update fur baby' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prismaClient.animal.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Fur baby deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete fur baby' }, { status: 500 });
  }
}
