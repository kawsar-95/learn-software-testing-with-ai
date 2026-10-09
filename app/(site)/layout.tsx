// Temporary: the site shell (header, sidebar, footer) replaces this.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <main>{children}</main>;
}
