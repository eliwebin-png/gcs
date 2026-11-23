import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { publishDate: "desc" },
    });
    return NextResponse.json({ success: true, news });
  } catch (error) {
    return NextResponse.json({ success: false, news: [] }, { status: 500 });
  }
}
