import { Page } from "@/components/Page";
import { GradientSection, SectionContent } from "@/components/GradientSection";
import { CyclingContent } from "@/components/CyclingContent";
import { LiveTime } from "@/components/LiveTime";
import { RotatingText } from "@/components/RotatingText";

export default function Home() {
  return (
    <Page>
      <GradientSection
        tone="dark"
        stars
        stops={["#090B1C", "#111735 60%", "#1D2C5C 100%"]}
        className="min-h-[80vh]"
      >
        <SectionContent>
          <div className="grid flex-1 content-center gap-8 md:grid-cols-2">
            <div>
            <h1 className="text-6xl font-extrabold tracking-tight">Max Raffel</h1>
              <p className="mt-3 text-md opacity-70">
                Computer Science &amp; Game Development
                <br /> @ USC - Class of 2028
              </p>
            </div>
            <CyclingContent
              items={[
                {
                  title: "Who",
                  body: (
                    <>
                      A student at USC who wants to push the limits of what is
                      possible. I love to produce{" "}
                      <RotatingText
                        fixedWidth
                        words={["Research", "Games", "Software"]}
                      />{" "}
                      that shatter all expectations and force you to take a step
                      back and think. I live for ideas that genuinely excite me,
                      and sharing that excitement with others.
                    </>
                  ),
                },
                {
                  title: "What",
                  body: (
                    <>
                      Adult human male. 6'3.41" / 191.5cm, approx 195lbs / 88.5kg. 20 years of age. Really bad farmer's tan.
                    </>
                  ),
                },
                {
                  title: "When",
                  body: (
                    <>
                      <LiveTime />
                    </>
                  ),
                },
                {
                  title: "Where",
                  body: (
                    <>
                      Usually Los Angeles or Boston. Anywhere with cheap eats is a good guess.
                    </>
                  ),
                },
                {
                  title: "How",
                  body: (
                    <>
                      Still figuring this one out. Always open to any hot tips!
                    </>
                  ),
                },
                {
                  title: "Why",
                  body: (
                    <>
                      Because why not!
                    </>
                  ),
                },
              ]}
            />
          </div>
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

      <GradientSection tone="light" stops={["#B7D6E4", "#B9D7C4 20%"]}>
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
