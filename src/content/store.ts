import { promises as fs } from "fs";
import path from "path";
import { connection } from "next/server";

import { getSeedContent } from "@/content/seed";
import type { SiteContent } from "@/content/types";

/**
 * Content store.
 *
 * Today: JSON file at `data/site-content.json` (created on first portal save).
 * Next: swap the body of `readContent` / `writeContent` for Supabase queries —
 * keep the exported function signatures so pages and the portal stay the same.
 *
 *   // Pseudocode for the Supabase swap:
 *   const { data } = await supabase.from("site_content").select("payload").single();
 *   return data.payload as SiteContent;
 */

const CONTENT_PATH = path.join(process.cwd(), "data", "site-content.json");

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readContent(): Promise<SiteContent> {
  if (!(await fileExists(CONTENT_PATH))) {
    return getSeedContent();
  }

  const raw = await fs.readFile(CONTENT_PATH, "utf8");
  return JSON.parse(raw) as SiteContent;
}

async function writeContent(content: SiteContent): Promise<SiteContent> {
  const next: SiteContent = {
    ...content,
    version: content.version || 1,
    updatedAt: new Date().toISOString(),
  };

  await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
  await fs.writeFile(CONTENT_PATH, JSON.stringify(next, null, 2), "utf8");
  return next;
}

/** Public site and portal both call this to load the latest content. */
export async function getSiteContent(): Promise<SiteContent> {
  // Content can change after a portal save, so never serve a stale prerender.
  await connection();
  return readContent();
}

/** Replace the entire content document (portal save). */
export async function saveSiteContent(
  content: SiteContent,
): Promise<SiteContent> {
  return writeContent(content);
}

/** Patch one top-level section and persist. */
export async function updateSiteSection<K extends keyof SiteContent>(
  key: K,
  value: SiteContent[K],
): Promise<SiteContent> {
  const current = await readContent();
  return writeContent({ ...current, [key]: value });
}

export function contentFilePath() {
  return CONTENT_PATH;
}
