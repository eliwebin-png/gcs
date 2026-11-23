import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const facilities = await prisma.facility.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, facilities });
  } catch (error) {
    return NextResponse.json({ success: false, facilities: [] }, { status: 500 });
  }
}
