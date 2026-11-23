import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: [{ isPinned: "desc" }, { publishDate: "desc" }],
    });
    return NextResponse.json({ success: true, notices });
  } catch (error) {
    return NextResponse.json({ success: false, notices: [] }, { status: 500 });
  }
}
