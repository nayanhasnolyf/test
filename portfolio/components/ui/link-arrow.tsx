import Link from "next/link";
import type { ComponentProps } from "react";

type LinkArrowProps = ComponentProps<typeof Link>;

export function LinkArrow({ className, ...props }: LinkArrowProps) {
  return (
    <Link
      className={["link-arrow", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
