import { ScheduleEditor } from "@/components/portal/schedule-editor";
import { getSiteContent } from "@/content/store";

export default async function PortalSchedulePage() {
  const content = await getSiteContent();
  return (
    <ScheduleEditor
      initialSchedule={content.schedule}
      initialResults={content.lastSeasonResults}
      initialCurrentSeason={content.currentSeason}
      initialLastSeason={content.lastSeason}
      initialSnapshot={content.seasonSnapshot}
    />
  );
}
