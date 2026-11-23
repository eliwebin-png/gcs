import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const disclosures = await prisma.mandatoryDisclosure.findMany();
    return NextResponse.json({ success: true, disclosures });
  } catch (error) {
    return NextResponse.json({ success: false, disclosures: [] }, { status: 500 });
  }
}
