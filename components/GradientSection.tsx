import type { ComponentPropsWithoutRef } from "react";

/** A CSS color-stop, e.g. `"#e8eef5"`, `"#d4dde8 40%"`, or `"red 0% 20%"`. */
export type GradientStop = string;

export type SectionTone = "light" | "dark";

type GradientSectionProps = ComponentPropsWithoutRef<"section"> & {
  /**
   * Linear gradient direction (CSS angle or side/corner keyword).
   * @default "to bottom"
   */
  direction?: string;
  /** One or more CSS color-stops. A single stop paints a solid fill. */
  stops: GradientStop[];
  /** Content theme: drives inherited text (and later other) styles. */
  tone: SectionTone;
};

export function GradientSection({
  direction = "to bottom",
  stops,
  tone,
  className,
  style,
  children,
  ...props
}: GradientSectionProps) {
  return (
    <section
      data-tone={tone}
      className={["gradient-section", className].filter(Boolean).join(" ")}
      {...props}
      style={{
        ...style,
        backgroundImage: `linear-gradient(${direction}, ${stops.join(", ")})`,
      }}
    >
      {children}
    </section>
  );
}

type SectionContentProps = ComponentPropsWithoutRef<"div">;

export function SectionContent({
  className,
  children,
  ...props
}: SectionContentProps) {
  return (
    <div
      className={["section-content", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
