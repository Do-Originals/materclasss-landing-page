"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { siteContent } from "@/content/copy";
import { Button } from "@/components/ui/button";
import { RegistrationModal } from "@/components/payment/RegistrationModal";
import { Clock, Monitor, IndianRupee } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const [selectedCourse, setSelectedCourse] = useState<{name: string, price: number} | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Subtle background animation
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          opacity: 0.6,
          duration: 4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
      }

      if (contentRef.current) {
        tl.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power4.out" }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="register" ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#050505] text-white">
      {/* Premium Minimalist Background Glow */}
      <div 
        ref={backgroundRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-brand-magenta/15 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none opacity-40 mix-blend-screen"
      />
      
      <div className="container mx-auto px-5 sm:px-6 max-w-5xl relative z-10">
        <div ref={contentRef} className="flex flex-col items-center text-center space-y-10">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs sm:text-sm font-medium text-white/80 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-magenta opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-magenta"></span>
            </span>
            {siteContent.hero.eyebrow}
          </div>
          
          {/* Headlines */}
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] font-heading bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              {siteContent.hero.headline}
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              {siteContent.hero.subheadline}
            </p>
          </div>
          
          {/* Subtle Details Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 py-5 px-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm w-full sm:w-auto">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
              <Clock className="w-5 h-5 text-brand-magenta opacity-80" />
              <div className="text-left">
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Duration</p>
                <p className="text-sm font-medium text-white/90">10 Sessions</p>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-8 bg-white/10"></div>
            <div className="block sm:hidden h-px w-full bg-white/10"></div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
              <Monitor className="w-5 h-5 text-brand-magenta opacity-80" />
              <div className="text-left">
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Format</p>
                <p className="text-sm font-medium text-white/90">Live 1:1 Online</p>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-8 bg-white/10"></div>
            <div className="block sm:hidden h-px w-full bg-white/10"></div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
              <IndianRupee className="w-5 h-5 text-brand-magenta opacity-80" />
              <div className="text-left">
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Investment</p>
                <p className="text-sm font-medium text-white/90">₹4999 (incl. GST)</p>
              </div>
            </div>
          </div>
          
          {/* Hook */}
          <p className="text-white/50 max-w-xl mx-auto text-sm font-light leading-relaxed">
            {siteContent.registrationHook.text}
          </p>

          {/* CTA */}
          <div className="pt-4">
            <Button 
              onClick={() => setSelectedCourse({name: "Digital Marketing Master Class", price: 4999})}
              className="group relative h-14 sm:h-16 px-10 sm:px-12 text-base sm:text-lg font-medium bg-white text-black hover:bg-white/90 rounded-full transition-all hover:scale-105 active:scale-95 border-0 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {siteContent.hero.cta}
              </span>
            </Button>
          </div>
          
        </div>
      </div>

      <RegistrationModal 
        course={selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
      />
    </section>
  );
}
