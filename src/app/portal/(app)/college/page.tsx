import { CollegeEditor } from "@/components/portal/college-editor";
import { getSiteContent } from "@/content/store";

export default async function PortalCollegePage() {
  const content = await getSiteContent();
  return <CollegeEditor initialAthletes={content.collegeAthletes} />;
}
