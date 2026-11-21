import { RosterEditor } from "@/components/portal/roster-editor";
import { getSiteContent } from "@/content/store";

export default async function PortalRosterPage() {
  const content = await getSiteContent();
  return (
    <RosterEditor
      initialRoster={content.roster}
      initialCoaches={content.coaches}
    />
  );
}
