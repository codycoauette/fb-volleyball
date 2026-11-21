import { FundraisingEditor } from "@/components/portal/fundraising-editor";
import { getSiteContent } from "@/content/store";

export default async function PortalFundraisingPage() {
  const content = await getSiteContent();
  return (
    <FundraisingEditor
      initialCampaigns={content.campaigns}
      initialTiers={content.sponsorTiers}
      initialEvents={content.fundraisingEvents}
      initialDesignations={content.designations}
      initialFaq={content.fundraisingFaq}
    />
  );
}
