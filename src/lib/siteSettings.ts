import fs from "fs";
import path from "path";

export interface SiteSettings {
  showHeroStats: boolean;
}

const DEFAULT_SETTINGS: SiteSettings = {
  showHeroStats: true,
};

const SETTINGS_FILE = path.join(process.cwd(), "data", "siteSettings.json");

export function getSiteSettings(): SiteSettings {
  try {
    if (!fs.existsSync(SETTINGS_FILE)) {
      // Ensure directory exists
      const dir = path.dirname(SETTINGS_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), "utf-8");
      return DEFAULT_SETTINGS;
    }
    const raw = fs.readFileSync(SETTINGS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      showHeroStats: parsed.showHeroStats !== undefined ? Boolean(parsed.showHeroStats) : true,
    };
  } catch (error) {
    console.error("Error reading site settings, using default:", error);
    return DEFAULT_SETTINGS;
  }
}

export function updateSiteSettings(partial: Partial<SiteSettings>): SiteSettings {
  try {
    const current = getSiteSettings();
    const updated: SiteSettings = {
      ...current,
      ...partial,
    };
    const dir = path.dirname(SETTINGS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2), "utf-8");
    return updated;
  } catch (error) {
    console.error("Error saving site settings:", error);
    return DEFAULT_SETTINGS;
  }
}
