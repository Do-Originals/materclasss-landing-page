"use client";

import { motion } from "framer-motion";
import { SiteContentType } from "@/content/copy";
import { Gift } from "lucide-react";

export function Bonuses({ content }: { content: SiteContentType }) {
  return (
    <section className="py-24 relative overflow-hidden bg-white border-y border-brand-magenta/10">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-start/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-brand-magenta/10 mb-8 shadow-[0_10px_30px_rgba(230,0,122,0.15)] rotate-3">
            <Gift className="w-10 h-10 text-brand-magenta" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            <span className="text-surface-dark">{content.bonuses.heading.split(' ')[0]}</span>{' '}
            <span className="text-gradient">{content.bonuses.heading.split(' ').slice(1).join(' ')}</span>
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          {content.bonuses.items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              className="glass-card rounded-2xl p-6 md:p-8 flex justify-between items-center hover:-translate-y-1 hover:border-brand-magenta/30 hover:shadow-[0_20px_40px_rgba(230,0,122,0.1)] transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-magenta flex items-center justify-center text-white font-bold shrink-0">
                  {idx + 1}
                </div>
                <p className="font-semibold text-surface-dark text-lg">{item.name}</p>
              </div>
              <p className="text-brand-magenta font-bold shrink-0 ml-4">{item.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gradient-start to-gradient-end rounded-3xl p-8 md:p-12 text-center text-white shadow-[0_20px_50px_rgba(255,51,102,0.3)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500"></div>
          <p className="text-xl font-medium opacity-90 mb-2 relative z-10 uppercase tracking-wider">Total Bonus Value</p>
          <p className="text-5xl md:text-7xl font-bold relative z-10 drop-shadow-md">{content.bonuses.totalValue}</p>
        </div>
      </div>
    </section>
  );
}
