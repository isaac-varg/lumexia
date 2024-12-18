"use server"
import { NextResponse } from 'next/server';
import { getBprs } from './_functions/getBprs';
import { getNotionLumexiaEntry } from './_functions/getNotionLumexiaEntry';

export async function GET() {

    const bprs = await getBprs();
    return NextResponse.json(bprs);
}

export async function POST(request: Request) {
    
    const body = await request.json()

    const notionLumexiaEntry = await getNotionLumexiaEntry(body.id);




    return NextResponse.json(notionLumexiaEntry);
}
