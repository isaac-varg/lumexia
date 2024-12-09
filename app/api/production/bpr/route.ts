"use server"
import notion from '@/lib/notion';
import { NextResponse } from 'next/server';

// app/api/hello/route.ts


export async function GET() {
  console.log("Hello World");
  return NextResponse.json({ message: "Hello World" });
}

export async function POST() {
  console.log("Hello World");
  return NextResponse.json({ message: "Hello World" });
}
