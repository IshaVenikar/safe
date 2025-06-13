import { NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const animal = await prismaClient.animal.findUnique({ where: { id: params.id } });
    if (!animal) {
      return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
    }
    return NextResponse.json(animal);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch animal' }, { status: 500 });
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
    return NextResponse.json({ error: 'Failed to update animal' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prismaClient.animal.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Animal deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete animal' }, { status: 500 });
  }
}
