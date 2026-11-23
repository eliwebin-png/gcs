import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, slides });
  } catch (error) {
    return NextResponse.json({ success: false, slides: [] }, { status: 500 });
  }
}
