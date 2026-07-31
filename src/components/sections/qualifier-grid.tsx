"use client";

import { motion, Variants } from "framer-motion";
import { SiteContentType } from "@/content/copy";
import { CheckCircle2 } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export function QualifierGrid({ content }: { content: SiteContentType }) {
  return (
    <section className="py-24 relative bg-surface-dark overflow-hidden">
      {/* Decorative dark background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-magenta/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-end/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
            <span className="text-white">{content.qualifierGrid.heading.split(' ')[0]}</span>{' '}
            <span className="text-gradient">{content.qualifierGrid.heading.split(' ').slice(1).join(' ')}</span>
          </h2>
          <div className="mt-4 w-32 h-1.5 bg-gradient-to-r from-gradient-start to-gradient-end mx-auto rounded-full opacity-80" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {content.qualifierGrid.bullets.map((bullet, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              className="glass-card-dark rounded-3xl p-8 flex items-start gap-5 hover:-translate-y-1 hover:border-brand-magenta/40 hover:shadow-[0_20px_40px_rgba(230,0,122,0.15)] transition-all duration-300"
            >
              <div className="mt-1 shrink-0 bg-brand-magenta/20 p-2 rounded-full border border-brand-magenta/30">
                <CheckCircle2 className="w-6 h-6 text-brand-magenta drop-shadow-[0_0_8px_rgba(230,0,122,0.8)]" />
              </div>
              <p className="text-white/90 font-medium leading-relaxed text-lg">
                {bullet}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
