import { Page } from "@/components/Page";
import { GradientSection, SectionContent } from "@/components/GradientSection";
import { Card, CardGrid } from "@/components/Card";
import { CyclingContent } from "@/components/CyclingContent";
import { DropdownButton } from "@/components/DropdownButton";
import { LiveTime } from "@/components/LiveTime";
import { RotatingText } from "@/components/RotatingText";
import hikeyCover from "@/public/projects/card-faces/hikey.png";
import kowalskiCover from "@/public/projects/card-faces/kowalski.png";
import campKesemCover from "@/public/projects/card-faces/kesem.png";
import advoctopusCover from "@/public/projects/card-faces/advoctopus.png";
import socraCover from "@/public/projects/card-faces/SocraLogo.png";
import creaseCover from "@/public/projects/card-faces/creasefancy.png";
import scopeCover from "@/public/projects/card-faces/scope.png";
import openYourBrowserCover from "@/public/projects/card-faces/openyourbrowser.png";
import smoothTalkingPickpocketCover from "@/public/projects/card-faces/smoothtalkingpickpocket.png";
import llmWatermarkingCover from "@/public/projects/card-faces/attribute.png";
import moveMoveMelonCover from "@/public/projects/card-faces/mmmsteam.jpg";

const projects = [
  {
    title: "Crease",
    subtitle: "Lead Engineer · USC AGP",
    year: "2026-Present",
    description:
      "A game about folding and flying paper airplanes as you navigate a girl's evolving relationship with her father. Includes a custom paper folding simulation engine, handwritten text system, flight physics, and more.",
    tags: ["Game Dev", "C#", "Unity", "Leadership"],
    image: creaseCover,
  },
  {
    title: "Attribute-based Watermarking",
    subtitle: "Researcher",
    year: "2026",
    description:
      "Watermarking scheme for LLMs utilizing PRC and CPRF for attribute-based key issuing and detection control. Currently in preprint with full code and experiment details.",
    tags: ["Research", "AI", "Cryptography", "Python", "PyTorch", "Hugging Face"],
    image: llmWatermarkingCover,
  },
  {
    title: "Scope",
    subtitle: "President",
    year: "2024-Present",
    description:
      "From hackathons to beach bonfires, late-night debugging to pumpkin painting, Scope is dedicated to fostering a tight-knit community of students who love Computer Science, and want to learn and build together.",
    tags: ["Software Engineer", "Go", "Docker", "Kubernetes", "Leadership"],
    image: scopeCover,
  },
  {
    title: "Socra",
    subtitle: "Founding Engineer",
    year: "2026",
    description:
      "Re-imagining the future of education in a post-AI world by transforming any assignment into a Socratic dialogue. Actual classroom use by 100s of students.",
    tags: ["Software", "Go", "Docker", "Kubernetes"],
    image: socraCover,
  },
  {
    title: "Advoctopus",
    subtitle: "G4C Student Challenge Finalist",
    year: "2026",
    description:
      "Play as Octavious, the Octopus defends his reef from human pollution with a mix of elbow grease, and dressing up as a human to engage in grassroots activism.",
    tags: ["Game Dev", "C#", "Unity"],
    image: advoctopusCover,
  },
  {
    title: "Hi-Key",
    subtitle: "Crowd Favorite · OpenAlpha x SCKeebies Game Jam",
    year: "2025",
    description:
      "A typing roguelike where you upgrade your keyboard, requiring fast typing and strategic planning to reveal the story, key by key.",
    tags: ["Game Dev", "C#", "Unity"],
    image: hikeyCover,
  },
  {
    title: "Kowalski Analysis",
    subtitle: "LaHacks 2026",
    year: "2026",
    description:
      "Stops AI coding agents from writing spaghetti code by providing them with original heuristics and guidance that they could never fit into their context window alone.",
    tags: ["Software", "Python", "Agentic AI"],
    image: kowalskiCover,
  },
  {
    title: "Camp Kesem",
    subtitle: "Operations Coord · Kesem USC",
    year: "2025-Present",
    description:
      "Handled logistics and programming for a week-long summer camp for 70+ children whose families are affected by cancer.",
    tags: ["Volunteer", "Leadership"],
    image: campKesemCover,
  },
  {
    title: "Open Your Browser",
    subtitle: "Programming Lead · OpenAlpha",
    year: "2025",
    description:
      "Navigate a chaotic desktop and defeat a gauntlet of minigames to save your art school application, in an 2000s internet quirky adventure.",
    tags: ["Game Dev", "C#", "Unity", "Leadership"],
    image: openYourBrowserCover,
  },
  {
    title: "Smooth Talking Pickpocket",
    subtitle: "Programming MVP · OpenAlpha",
    year: "2024",
    description:
      "A narrative-driven pickpocketing adventure where players must make conversation while stealing from a cast of memorable characters.",
    tags: ["Game Dev", "C#", "Unity"],
    image: smoothTalkingPickpocketCover,
  },
  {
    title: "Move, Move, Melon!!",
    subtitle: "QA Lead/Engineer · USC AGP",
    year: "2025-2026",
    description:
      "A cartoony 3D on-rails runner where you play Melon, a very determined hamster in her quest to roll the biggest scoop of ice cream ever. Play now on App Store, Google Play, and Steam.",
    tags: ["Game Dev", "C#", "Unity", "QA"],
    image: moveMoveMelonCover,
  },
];

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
              <div className="mt-16 flex flex-wrap items-center gap-3">
                <p className="text-xl font-semibold">Learn more about...</p>
                <DropdownButton
                  defaultValue="everything"
                  menuMinWidth="15rem"
                  options={[
                    { label: "the Software Engineer", value: "software" },
                    { label: "the Game Developer", value: "gamedev" },
                    { label: "the Researcher", value: "research" },
                    { label: "Everything", value: "everything" },
                  ]}
                />
              </div>
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
                      Adult human male. 6&apos;3.41&quot; / 191.5cm, approx
                      195lbs / 88.5kg. 20 years of age. Really bad farmer&apos;s
                      tan.
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
                      Usually Los Angeles or Boston. Anywhere with cheap eats is
                      a good guess.
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
                  body: <>Because why not!</>,
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

      <GradientSection tone="light" stops={["#B7D6E4", "#B9D7C4 5%"]}>
        <SectionContent>
          <h2 className="mt-8 text-6xl font-extrabold tracking-tight">
            Cool stuff I work on
          </h2>
          <CardGrid>
            {projects.map((project) => (
              <Card key={project.title} {...project} />
            ))}
          </CardGrid>
        </SectionContent>
      </GradientSection>
    </Page>
  );
}
