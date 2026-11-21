import { HistoryEditor } from "@/components/portal/history-editor";
import { getSiteContent } from "@/content/store";

export default async function PortalHistoryPage() {
  const content = await getSiteContent();
  return (
    <HistoryEditor
      initialRecords={content.programRecords}
      initialSeasons={content.seasonHistory}
      initialLeaders={content.careerLeaders}
      initialMilestones={content.programMilestones}
      initialHonors={content.honors}
    />
  );
}
