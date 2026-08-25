import type { ReactNode } from "react";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function SectionShell({ children, className, id }: SectionShellProps) {
  return (
    <section
      className={["section-spacing", className].filter(Boolean).join(" ")}
      id={id}
    >
      {children}
    </section>
  );
}
