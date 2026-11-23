import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [images, categories] = await Promise.all([
      prisma.galleryImage.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.galleryCategory.findMany({
        orderBy: { name: "asc" },
      }),
    ]);
    return NextResponse.json({ success: true, images, categories });
  } catch (error) {
    return NextResponse.json({ success: false, images: [], categories: [] }, { status: 500 });
  }
}
