"use client";

import { useState } from "react";
import { toast } from "sonner";

import type { SiteContent } from "@/content/types";

export function useSaveSection() {
  const [saving, setSaving] = useState(false);

  async function saveSection<K extends keyof SiteContent>(
    section: K,
    value: SiteContent[K],
  ) {
    setSaving(true);
    try {
      const response = await fetch("/api/portal/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, value }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error ?? "Save failed.");
        return null;
      }
      toast.success("Saved — live on the public site.");
      return data.content as SiteContent;
    } catch {
      toast.error("Could not reach the server.");
      return null;
    } finally {
      setSaving(false);
    }
  }

  return { saving, saveSection };
}
