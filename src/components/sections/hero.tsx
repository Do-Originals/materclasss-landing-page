"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { siteContent } from "@/content/copy";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import { RegistrationModal } from "@/components/payment/RegistrationModal";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [selectedCourse, setSelectedCourse] = useState<{name: string, price: number} | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      if (leftContentRef.current) {
        tl.fromTo(
          leftContentRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
        );
      }
      
      if (formRef.current) {
        tl.fromTo(
          formRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="register" ref={containerRef} className="relative pt-24 pb-16 lg:pt-32 lg:pb-28 overflow-hidden bg-surface-dark text-white">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-surface-dark to-surface-dark pointer-events-none"></div>
      
      <div className="container mx-auto px-5 sm:px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Side - Digital Marketing Course */}
          <div ref={leftContentRef} className="space-y-8 lg:border-r border-b lg:border-b-0 border-white/20 pb-12 lg:pb-0 lg:pr-12">
            <div className="inline-flex items-center rounded-full border border-brand-magenta/50 bg-brand-magenta/10 px-4 py-1.5 text-sm font-medium text-brand-magenta shadow-[0_0_15px_rgba(230,0,122,0.5)] animate-pulse">
              <span className="relative flex h-2.5 w-2.5 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-magenta opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-magenta"></span>
              </span>
              {siteContent.hero.eyebrow}
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight lg:leading-tight font-heading">
              {siteContent.hero.headline}
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-white/90 font-medium">
              {siteContent.hero.subheadline}
            </p>
            
            <p className="text-white/70 max-w-2xl leading-relaxed text-xs sm:text-sm">
              {siteContent.registrationHook.text}
            </p>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 max-w-lg">
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 flex flex-col justify-center shadow-inner">
                <span className="text-white/60 text-[10px] sm:text-xs uppercase font-medium tracking-wider mb-0.5 sm:mb-1">Time</span>
                <span className="text-white font-semibold text-sm sm:text-lg">10 Sessions</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 flex flex-col justify-center shadow-inner relative overflow-hidden">
                 <span className="text-white/60 text-[10px] sm:text-xs uppercase font-medium tracking-wider mb-0.5 sm:mb-1">Online</span>
                 <span className="text-white font-semibold text-sm sm:text-lg">Live 1:1 Session</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 flex flex-col justify-center shadow-inner col-span-2">
                 <span className="text-white/60 text-[10px] sm:text-xs uppercase font-medium tracking-wider mb-0.5 sm:mb-1">Price</span>
                 <span className="text-white font-semibold text-base sm:text-lg">₹4999 incl. GST</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center lg:justify-center">
              <Button 
                onClick={() => setSelectedCourse({name: "Digital Marketing Master Class", price: 4999})}
                className="w-full sm:w-auto px-8 py-4 sm:py-5 text-sm sm:text-base font-semibold bg-brand-magenta hover:bg-brand-magenta/90 text-white rounded-lg transition-all shadow-[0_0_20px_rgba(230,0,122,0.4)] hover:shadow-[0_0_30px_rgba(230,0,122,0.6)] border-0 relative overflow-hidden"
              >
                {siteContent.hero.cta}
              </Button>
            </div>
          </div>

          {/* Right Side - Social Media Management Course */}
          <div className="space-y-8 pt-12 lg:pt-0 lg:pl-12" ref={formRef}>
            <div className="inline-flex items-center rounded-full border border-brand-magenta/50 bg-brand-magenta/10 px-4 py-1.5 text-sm font-medium text-brand-magenta shadow-[0_0_15px_rgba(230,0,122,0.5)] animate-pulse">
              <span className="relative flex h-2.5 w-2.5 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-magenta opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-magenta"></span>
              </span>
              Live · 3 Days · <span className="line-through text-white/50 mr-1">₹999</span> ₹499/-
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight lg:leading-tight font-heading">
              Social Media Management Course
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-white/90 font-medium">
              {siteContent.hero.subheadline}
            </p>
            
            <p className="text-white/70 max-w-2xl leading-relaxed text-xs sm:text-sm">
              बऱ्याच जणांना असं वाटतं कि माझा Business आहे. मी संपूर्ण Digital Marketing शिकून काय करू? त्यांच्यासाठी आम्ही त्यांच्या Business Related कोर्स Design करून Roadmap तयार करायला संपूर्ण मार्गदर्शन करू.
            </p>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 max-w-lg">
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 flex flex-col justify-center shadow-inner">
                <span className="text-white/60 text-[10px] sm:text-xs uppercase font-medium tracking-wider mb-0.5 sm:mb-1">Time</span>
                <span className="text-white font-semibold text-sm sm:text-lg">3 Days</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 flex flex-col justify-center shadow-inner relative overflow-hidden">
                 <span className="text-white/60 text-[10px] sm:text-xs uppercase font-medium tracking-wider mb-0.5 sm:mb-1">Online</span>
                 <span className="text-white font-semibold text-sm sm:text-lg">Live 1:1 Session</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 flex flex-col justify-center shadow-inner col-span-2">
                 <span className="text-white/60 text-[10px] sm:text-xs uppercase font-medium tracking-wider mb-0.5 sm:mb-1">Price</span>
                 <span className="text-white font-semibold text-base sm:text-lg"><span className="line-through text-white/50 mr-2">₹999</span>₹499 incl. GST</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center lg:justify-center">
              <Button 
                onClick={() => setSelectedCourse({name: "Social Media Management Course", price: 499})}
                className="w-full sm:w-auto px-8 py-4 sm:py-5 text-sm sm:text-base font-semibold bg-brand-magenta hover:bg-brand-magenta/90 text-white rounded-lg transition-all shadow-[0_0_20px_rgba(230,0,122,0.4)] hover:shadow-[0_0_30px_rgba(230,0,122,0.6)] border-0 relative overflow-hidden"
              >
                {siteContent.hero.cta}
              </Button>
            </div>
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
