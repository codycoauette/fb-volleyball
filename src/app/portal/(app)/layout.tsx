import { redirect } from "next/navigation";

import { PortalShell } from "@/components/portal/portal-shell";
import {
  getPortalSession,
  isUsingDefaultPassword,
} from "@/content/auth";
import { getSiteContent } from "@/content/store";

/** Cookie session + editable content — always request-time. */
export const instant = false;

export default async function PortalAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await getPortalSession())) {
    redirect("/portal/login");
  }

  const content = await getSiteContent();

  return (
    <PortalShell
      updatedAt={content.updatedAt}
      usingDefaultPassword={isUsingDefaultPassword()}
    >
      {children}
    </PortalShell>
  );
}
