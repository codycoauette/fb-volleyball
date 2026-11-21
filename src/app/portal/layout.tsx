import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coach portal",
  robots: { index: false, follow: false },
};

export default function PortalRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Public site chrome (header/footer) is intentionally omitted — the coach
  // portal is a separate surface.
  return children;
}
