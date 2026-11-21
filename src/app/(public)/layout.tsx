import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteContent } from "@/content/store";

/** Content is edited live in the coach portal, so public pages render per request. */
export const instant = false;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getSiteContent();

  return (
    <>
      <SiteHeader team={content.team} />
      <main className="flex-1">{children}</main>
      <SiteFooter team={content.team} />
    </>
  );
}
