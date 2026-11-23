import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      include: {
        category: {
          select: { name: true, slug: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, images });
  } catch (error) {
    return NextResponse.json({ success: false, images: [] }, { status: 500 });
  }
}
