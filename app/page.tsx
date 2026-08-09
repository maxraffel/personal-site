import { Page } from "@/components/Page";
import { GradientSection, SectionContent } from "@/components/GradientSection";

export default function Home() {
  return (
    <Page>
      <GradientSection
        tone="dark"
        stops={["#090B1C", "#111735 60%", "#1D2C5C 100%"]}
      >
        <SectionContent>
          <h1 className="text-4xl font-semibold tracking-tight">Hero</h1>
          <p className="mt-3 max-w-xl text-lg opacity-70">
            Full-width section with a vertical gradient.
          </p>
        </SectionContent>
      </GradientSection>

      <GradientSection
        tone="dark"
        stops={["#1D2C5C", "#557BB0 50%", "#B7D6E4 100%"]}
      >
        <SectionContent>
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          <p className="mt-3 max-w-xl opacity-70">
            Pass multiple stops with optional positions for uneven blends.
          </p>
        </SectionContent>
      </GradientSection>

      <GradientSection tone="light" stops={["#B7D6E4", "#B9D7C4 50%"]}>
        <SectionContent>
          <h2 className="text-2xl font-semibold tracking-tight">
            Cool stuff I work on
          </h2>
          <p className="mt-3 max-w-xl opacity-70">
            Set <code className="font-mono text-sm">direction</code> for any
            linear angle; a single stop is a solid fill.
          </p>
        </SectionContent>
      </GradientSection>
    </Page>
  );
}
