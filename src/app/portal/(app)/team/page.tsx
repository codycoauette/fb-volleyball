import { TeamEditor } from "@/components/portal/team-editor";
import { getSiteContent } from "@/content/store";

export default async function PortalTeamPage() {
  const content = await getSiteContent();
  return <TeamEditor initial={content.team} />;
}
