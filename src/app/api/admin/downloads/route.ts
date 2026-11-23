import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const downloads = await prisma.downloadItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, downloads });
  } catch (error) {
    return NextResponse.json({ success: false, downloads: [] }, { status: 500 });
  }
}
