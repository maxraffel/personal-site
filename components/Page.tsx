import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";
import styles from "./Page.module.css";

type PageProps = ComponentPropsWithoutRef<"main">;

export function Page({ className, children, ...props }: PageProps) {
  return (
    <main className={cx(styles.page, className)} {...props}>
      {children}
    </main>
  );
}
