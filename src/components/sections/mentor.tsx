import { siteContent } from "@/content/copy";
import Image from "next/image";
import { Briefcase, Award, Users } from "lucide-react";
import { CheckoutButton } from "@/components/payment/CheckoutButton";

const iconMap = {
  briefcase: Briefcase,
  award: Award,
  users: Users,
};

export function Mentor() {
  const { heading, list } = siteContent.mentor;

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

        <div className="flex flex-col gap-12">
          {list.map((mentor, index) => (
            <div key={index} className="glass-card rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-shadow duration-500">
              
              <div className={`w-full md:w-1/3 shrink-0 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-white/50 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <Image 
                    src={mentor.image} 
                    alt={mentor.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={`w-full md:w-2/3 space-y-6 ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gradient-start to-gradient-end">
                  {mentor.name}
                </h3>
                
                <p className="text-surface-dark/80 text-lg leading-relaxed">
                  {mentor.bio}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  {mentor.stats.map((stat, idx) => {
                    const Icon = iconMap[stat.icon as keyof typeof iconMap];
                    return (
                      <div key={idx} className="flex flex-col gap-2">
                        <Icon className="w-6 h-6 text-brand-magenta" />
                        <span className="font-semibold text-surface-dark text-sm">{stat.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ))}
        </div>
        
        <div className="pt-16 text-center">
          <CheckoutButton 
            className="animate-cta-shake animate-cta-flash bg-brand-magenta hover:bg-brand-magenta/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(230,0,122,0.3)] hover:shadow-[0_0_30px_rgba(230,0,122,0.5)]" 
            text="Register Now — ₹4999" 
          />
        </div>

      </div>
    </section>
  );
}
