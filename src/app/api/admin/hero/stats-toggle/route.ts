import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/siteSettings";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const settings = getSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to load settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const showHeroStats = Boolean(body.showHeroStats);
    const updated = updateSiteSettings({ showHeroStats });
    revalidatePath("/");
    revalidatePath("/admin/hero");
    revalidatePath("/admin/settings");
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
