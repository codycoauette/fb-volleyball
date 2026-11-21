import { getPortalSession } from "@/content/auth";
import { getSiteContent, saveSiteContent, updateSiteSection } from "@/content/store";
import type { SiteContent } from "@/content/types";

export async function GET() {
  if (!(await getPortalSession())) {
    return Response.json({ error: "Sign in to edit content." }, { status: 401 });
  }

  const content = await getSiteContent();
  return Response.json({ content });
}

export async function PUT(request: Request) {
  if (!(await getPortalSession())) {
    return Response.json({ error: "Sign in to edit content." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Expected JSON." }, { status: 400 });
  }

  const payload = body as {
    content?: SiteContent;
    section?: keyof SiteContent;
    value?: SiteContent[keyof SiteContent];
  };

  try {
    if (payload.content) {
      const saved = await saveSiteContent(payload.content);
      return Response.json({ content: saved });
    }

    if (payload.section && payload.value !== undefined) {
      if (payload.section === "version" || payload.section === "updatedAt") {
        return Response.json(
          { error: "That field is managed automatically." },
          { status: 400 },
        );
      }
      const section = payload.section;
      const saved = await updateSiteSection(
        section,
        payload.value as SiteContent[typeof section],
      );
      return Response.json({ content: saved });
    }

    return Response.json(
      { error: "Send { content } or { section, value }." },
      { status: 400 },
    );
  } catch (error) {
    console.error("portal content save failed", error);
    return Response.json(
      {
        error:
          "Could not save content. On hosted deploys the filesystem may be read-only until Supabase is connected — locally the data/site-content.json file should write.",
      },
      { status: 500 },
    );
  }
}
