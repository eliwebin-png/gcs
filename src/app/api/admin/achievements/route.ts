import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, achievements });
  } catch (error) {
    return NextResponse.json({ success: false, achievements: [] }, { status: 500 });
  }
}
