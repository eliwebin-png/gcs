import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const programs = await prisma.academicProgram.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, programs });
  } catch (error) {
    return NextResponse.json({ success: false, programs: [] }, { status: 500 });
  }
}
