import { AboutContact } from "@/components/sections/about-contact";
import { Footer } from "@/components/footer";
import { BeyondCode } from "@/components/sections/beyond-code";
import { Experience } from "@/components/sections/experience";
import { GitHubActivity } from "@/components/sections/github-activity";
import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";

export default function Home() {
  return (
    <>
      <main className="site-main" id="main-content" tabIndex={-1}>
        <Hero />
        <SelectedWork />
        <Experience />
        <BeyondCode />
        <GitHubActivity />
        <AboutContact />
      </main>
      <Footer />
    </>
  );
}
