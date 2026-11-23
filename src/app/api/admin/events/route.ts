import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { eventDate: "asc" },
    });
    return NextResponse.json({ success: true, events });
  } catch (error) {
    return NextResponse.json({ success: false, events: [] }, { status: 500 });
  }
}
