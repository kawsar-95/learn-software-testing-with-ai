import { SearchPalette } from "@/components/navigation/SearchPalette";
import { SiteShell } from "@/components/layout/SiteShell";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteShell searchSlot={<SearchPalette />}>{children}</SiteShell>;
}
