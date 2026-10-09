import type { ReactNode } from "react";

export function InfoCard({
  title,
  subtitle,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-bg-raised p-4">
      <p className="mb-2 text-base font-semibold text-text">{title}</p>
      {subtitle ? <p className="-mt-1 mb-2 text-sm text-text-dim">{subtitle}</p> : null}
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">{children}</div>
    </section>
  );
}
