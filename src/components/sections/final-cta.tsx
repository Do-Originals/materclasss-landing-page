"use client";

import { siteContent } from "@/content/copy";
import { CheckoutButton } from "@/components/payment/CheckoutButton";
import { Clock } from "lucide-react";

export function FinalCta() {

  return (
    <section className="py-24 bg-surface-dark relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[150%] bg-brand-magenta/10 blur-[120px] rounded-full rotate-12" />
        <div className="absolute bottom-[-50%] right-[-10%] w-[50%] h-[120%] bg-gradient-end/10 blur-[100px] rounded-full -rotate-12" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center text-white">
        
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-magenta/30 bg-brand-magenta/10 px-4 py-2 text-sm font-medium text-brand-magenta mb-8">
          <Clock className="w-4 h-4" />
          {siteContent.finalCta.subheading}
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-10 leading-tight">
          {siteContent.finalCta.heading}
        </h2>
        
        <CheckoutButton 
          className="bg-brand-magenta text-white hover:bg-brand-magenta/90 h-14 px-12 text-xl rounded-lg inline-flex items-center justify-center font-bold transition-all shadow-[0_0_20px_rgba(230,0,122,0.4)] hover:shadow-[0_0_30px_rgba(230,0,122,0.6)] animate-cta-shake animate-cta-flash border-0"
          text={siteContent.finalCta.cta}
        />
      </div>
    </section>
  );
}
