"use server"
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lotNumber = searchParams.get('lot_number');

    if (!lotNumber) {
        return NextResponse.json({ error: 'lot_number is required' }, { status: 400 });
    }

    const lot = await prisma.lot.findFirst({
        where: { lotNumber },
        select: { id: true },
    });

    if (!lot) {
        return NextResponse.json({ error: 'Lot not found' }, { status: 404 });
    }

    return NextResponse.json({ id: lot.id });
}
