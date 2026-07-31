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
import { socialMediaContent } from "@/content/socialMediaCopy";

export default function SocialMediaManagementPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header content={socialMediaContent} />
      <Hero content={socialMediaContent} />
      <QualifierGrid content={socialMediaContent} />
      <Syllabus content={socialMediaContent} />
      <Audience content={socialMediaContent} />
      <VideoTestimonials />
      <Mentor content={socialMediaContent} />
      <Certificate content={socialMediaContent} />
      <Faq content={socialMediaContent} />
      <FinalCta content={socialMediaContent} />
    </main>
  );
}
