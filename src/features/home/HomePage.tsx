import { Seo, personJsonLd } from "@/components/seo/Seo";
import { Hero } from "./sections/Hero";
import { About, Skills, ClientFocus } from "./sections/AboutSkills";
import { FeaturedProjects, Timeline, TechStack } from "./sections/WorkExperience";
import { Testimonials, LatestBlogs, TravelPreview, ContactCTA } from "./sections/Closing";

export function HomePage() {
  return (
    <>
      <Seo path="/" jsonLd={personJsonLd} />
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <ClientFocus />
      <Timeline />
      <TechStack />
      <Testimonials />
      <LatestBlogs />
      <TravelPreview />
      <ContactCTA />
    </>
  );
}
