import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const faculty = await prisma.facultyMember.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, faculty });
  } catch (error) {
    return NextResponse.json({ success: false, faculty: [] }, { status: 500 });
  }
}
