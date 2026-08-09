import type { ComponentPropsWithoutRef } from "react";

type PageProps = ComponentPropsWithoutRef<"main">;

export function Page({ className, children, ...props }: PageProps) {
  return (
    <main
      className={["page", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </main>
  );
}
