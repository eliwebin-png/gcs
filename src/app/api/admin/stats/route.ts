import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const stats = await prisma.statCounter.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    return NextResponse.json({ success: false, stats: [] }, { status: 500 });
  }
}
