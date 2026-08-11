import { Page } from "@/components/Page";
import { GradientSection, SectionContent } from "@/components/GradientSection";
import { type CardData } from "@/components/Card";
import { CyclingContent } from "@/components/CyclingContent";
import { LearnMoreDropdown } from "@/components/LearnMoreDropdown";
import { LiveTime } from "@/components/LiveTime";
import { ProjectFilterProvider } from "@/components/ProjectFilter";
import { ProjectGrid } from "@/components/ProjectGrid";
import { RotatingText } from "@/components/RotatingText";
import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
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
import { RotatingContent } from "@/components/RotatingContent";

const projects: CardData[] = [
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
    tags: ["Software", "Go", "Docker", "Kubernetes", "Leadership"],
    image: scopeCover,
  },
  {
    title: "Socra",
    subtitle: "Founding Engineer",
    year: "2026",
    description:
      "Re-imagining the future of education in a post-AI world by transforming any assignment into a Socratic dialogue. Actual classroom use by 100s of students.",
    tags: ["Software", "AI", "Education", "Full Stack", "React", "Typescript"],
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
    tags: ["Software", "Python", "Agentic AI", "AI"],
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

const filterTags = [
  "Game Dev",
  "Software",
  "Research",
  "Leadership",
  "AI",
  "Volunteer",
];

export default function Home() {
  return (
    <ProjectFilterProvider>
      <Page>
      <GradientSection
        tone="dark"
        stars
        overscroll="top"
        stops={["#090B1C", "#111735 60%", "#1D2C5C 100%"]}
        className="min-h-[80vh] min-h-[80dvh]"
        id="home"
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
                <LearnMoreDropdown />
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
                      that shatters all expectations and force you to take a step
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
                      <p>Happy to chat about any ideas or opportunities, anytime.</p>
                      <br />
                      <p>
                        <LiveTime /><br/>is as good a time as any. Don&apos;t
                        hesitate to reach out, I don&apos;t bite!
                      </p>
                      <br />
                      <Button href="#contact">Contact Me</Button>
                    </>
                  ),
                },
                {
                  title: "Where",
                  body: (
                    <>
                      <p>I&apos;m based primarily in <strong>Los Angeles</strong> and <strong>Boston</strong>, but open to opportunities anywhere. <br/> <br/> <strong>Some of my favorite places</strong> <Tooltip content="Fast food places, that is." /> </p>
                      <ul className="star-list">
                        <li>
                          <span className="font-semibold">Needham Street McDonald&apos;s</span>
                          <span className="block text-sm opacity-70">111 Needham St, Newton Upper Falls, MA 02464</span>
                        </li>
                        <li>
                          <span className="font-semibold">Taco Bell on Fig</span>
                          <span className="block text-sm opacity-70">2722 S Figueroa St, Los Angeles, CA 90007</span>
                        </li>
                        <li>
                          <span className="font-semibold">Campus Burgers near Cal</span>
                          <span className="block text-sm opacity-70">2506 Channing Way, Berkeley, CA 94720</span>
                        </li>
                      </ul>
                    </>
                  ),
                },
                {
                  title: "How",
                  body: (
                    <>
                      <p>Still figuring this one out.</p>
                    </>
                  ),
                },
                {
                  title: "Why",
                  body: <><p> I do what I love, and love what I do. Every project I work on is a chance to to learn something new, but also an attempt to make the world just a little bit better. Our world is full of so much beauty, and fascinating problems, I do this because I can't help but explore it.</p></>,
                },
              ]}
            />
          </div>
        </SectionContent>
      </GradientSection>

      <GradientSection
        tone="dark"
        stops={["#1D2C5C", "#557BB0 50%", "#B7D6E4 100%"]}
        id="about"
      >
        <SectionContent>
          <RotatingContent
            autoRotate
            autoRotateInterval={10}
            items={[
              { title: "Research", body: <p>I have the privilege of working under the mentorship of <a href="https://mimihuang.github.io/" target="_blank" rel="noopener noreferrer">Miryam Mi-Ying Huang</a>, a current postdoc at CMU. My primary research interests are in AI security, as well as quantum cryptography. I am interested in exploring potential Summer 2027 research opportunities in Theoretical Computer Science.</p> },
              { title: "Software", body: <p>I like to make software that actually gets used. So far, I have made a marketplace that has processed over $100,000 in transactions, and an AI learning tool with real classroom use by 100s of students. I am always looking for my next high-impact role, and am currently pursuing Summer 2027 software engineering internship opportunities.</p> },
              { title: "Game Dev", body: <p>I've been lucky to be a part of or lead dev teams for multiple games released across Steam, the App Store, and Google Play. Currently I am excited to be the Engineering Lead for Crease, which will be releasing in May 2027. I would love to keep making games, and am currently looking for opportunities in the games industry for Summer 2027! While the bulk of my experience has been in Unity, I am interested in exploring all game engines and technologies.</p> },
            ]}
          />
        </SectionContent>
      </GradientSection>

      <GradientSection tone="light" stops={["#B7D6E4", "#AED1BB 5%"]} id="projects">
        <SectionContent>
          <h2 className="mt-8 text-6xl font-extrabold tracking-tight">
            Cool stuff I work on
          </h2>
          <ProjectGrid projects={projects} tags={filterTags} />
        </SectionContent>
      </GradientSection>
      <GradientSection
        tone="dark"
        overscroll="bottom"
        stops={["#AED1BB", "#BCA885 10%"]}
        id="contact"
      >
        <SectionContent>
          <div className="grid min-w-0 w-full flex-1 content-center items-center gap-8 md:grid-cols-2">
            <div className="min-w-0">
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Contact Max
              </h2>
              <p className="mt-3 text-md opacity-70">
                Questions, opportunities, or just want to say hi?
                <br /> Shoot me a message — I'll get back to you jiffy quick!
              </p>
            </div>
            <div className="min-w-0 w-full">
              <ContactForm />
            </div>
          </div>
        </SectionContent>
      </GradientSection>
    </Page>
    </ProjectFilterProvider>
  );
}
