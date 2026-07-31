import { SiteContentType } from "@/content/copy";
import Image from "next/image";
import { Briefcase, Award, Users } from "lucide-react";
import { CheckoutButton } from "@/components/payment/CheckoutButton";

const iconMap = {
  briefcase: Briefcase,
  award: Award,
  users: Users,
};

export function Mentor({ content }: { content: SiteContentType }) {
  const { heading, list } = content.mentor;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-start/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            <span className="text-surface-dark">{heading.split(' ')[0]}</span>{' '}
            <span className="text-gradient">{heading.split(' ').slice(1).join(' ')}</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-gradient-start to-gradient-end rounded-full opacity-80 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {list.map((mentor, index) => (
            <div key={index} className="glass-card rounded-3xl p-6 md:p-8 flex flex-col items-center gap-6 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 text-center">
              
              <div className="w-full max-w-[280px] shrink-0">
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-white/50 group bg-surface-dark/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <Image 
                    src={mentor.image} 
                    alt={mentor.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gradient-start to-gradient-end">
                  {mentor.name}
                </h3>
              </div>

            </div>
          ))}
        </div>
        
        <div className="pt-16 flex justify-center">
          <CheckoutButton 
            className="animate-cta-shake animate-cta-flash bg-brand-magenta hover:bg-brand-magenta/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(230,0,122,0.3)] hover:shadow-[0_0_30px_rgba(230,0,122,0.5)]" 
            text={content.course.showPriceInCta ? `${content.hero.cta} - ₹${content.course.price}` : content.hero.cta}
            course={content.course}
          />
        </div>

      </div>
    </section>
  );
}
