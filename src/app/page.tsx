import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { QualifierGrid } from "@/components/sections/qualifier-grid";
import { Syllabus } from "@/components/sections/syllabus";
import { Audience } from "@/components/sections/audience";
import { VideoTestimonials } from "@/components/sections/video-testimonials";
import { Mentor } from "@/components/sections/mentor";
import { Certificate } from "@/components/sections/certificate";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { siteContent } from "@/content/copy";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header content={siteContent} />
      <Hero content={siteContent} />
      <QualifierGrid content={siteContent} />
      <Syllabus content={siteContent} />
      <Audience content={siteContent} />
      <VideoTestimonials />
      <Mentor content={siteContent} />
      <Certificate content={siteContent} />
      <Faq content={siteContent} />
      <FinalCta content={siteContent} />
    </main>
  );
}
