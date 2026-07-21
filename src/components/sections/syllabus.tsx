"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "@/content/copy";
import { CheckoutButton } from "@/components/payment/CheckoutButton";

gsap.registerPlugin(ScrollTrigger);

export function Syllabus() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-surface-dark relative overflow-hidden border-t border-white/5">
      {/* Premium subtle background glow */}
      <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-brand-magenta/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold whitespace-pre-line font-heading mb-6">
            <span className="text-white">{siteContent.syllabus.heading.split(' ')[0]}</span>{' '}
            <span className="text-gradient">{siteContent.syllabus.heading.split(' ').slice(1).join(' ')}</span>
          </h2>
          <div className="mt-4 w-32 h-1.5 bg-gradient-to-r from-gradient-start to-gradient-end mx-auto rounded-full opacity-80" />
        </div>

        <div className="relative">
          {/* Background Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full" />
          
          {/* Animated Progress Line */}
          <div 
            ref={lineRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gradient-start to-gradient-end -translate-x-1/2 origin-top scale-y-0 rounded-full shadow-[0_0_15px_rgba(230,0,122,0.5)]" 
          />

          <div className="space-y-8">
            {siteContent.syllabus.sessions.map((session, idx) => (
              <div key={session.id} className={`relative flex items-center gap-6 md:justify-between group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Center Node */}
                <div className="absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                  <div className="w-10 h-10 bg-surface-dark border-2 border-brand-magenta rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(230,0,122,0.4)] transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_25px_rgba(230,0,122,0.8)] group-hover:bg-brand-magenta/20">
                    <span className="text-sm font-bold text-white drop-shadow-md">{session.id}</span>
                  </div>
                </div>

                {/* Content Card */}
                <div className="ml-16 md:ml-0 md:w-[calc(50%-4rem)] glass-card-dark rounded-2xl p-6 hover:-translate-y-1 hover:border-brand-magenta/30 hover:shadow-[0_20px_40px_rgba(230,0,122,0.15)] transition-all duration-300 w-full relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                  <p className="font-medium text-white/90 text-lg relative z-10">{session.title}</p>
                </div>
                
                {/* Empty space for alternating layout on desktop */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center relative z-20">
          <CheckoutButton 
            text="Claim Your Seat"
            className="animate-cta-shake animate-cta-flash inline-flex bg-brand-magenta hover:bg-brand-magenta/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(230,0,122,0.3)] hover:shadow-[0_0_30px_rgba(230,0,122,0.5)]"
          />
        </div>
      </div>
    </section>
  );
}
