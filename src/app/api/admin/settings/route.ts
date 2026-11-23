import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const info = await prisma.schoolInfo.findFirst();
    return NextResponse.json({ success: true, info });
  } catch (error) {
    return NextResponse.json({ success: false, info: null }, { status: 500 });
  }
}
