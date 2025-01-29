import { NextResponse } from "next/server";

// Hello world API route
export async function GET() {
  return NextResponse.json({ message: 'Hello, world!' });
}
