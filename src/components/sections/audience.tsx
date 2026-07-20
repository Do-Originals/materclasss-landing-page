"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/content/copy";
import { GraduationCap, Briefcase, Rocket } from "lucide-react";

const icons = [GraduationCap, Briefcase, Rocket];

export function Audience() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Premium subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-end/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
            <span className="text-surface-dark">{siteContent.audience.heading.split(' ')[0]}</span>{' '}
            <span className="text-gradient">{siteContent.audience.heading.split(' ').slice(1).join(' ')}</span>
          </h2>
          <div className="mt-4 w-32 h-1.5 bg-gradient-to-r from-gradient-start to-gradient-end mx-auto rounded-full opacity-80" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {siteContent.audience.segments.map((segment, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-3xl p-8 text-center hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:border-brand-magenta/30 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-brand-magenta/10 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 group-hover:rotate-6 transition-transform">
                  <Icon className="w-8 h-8 text-brand-magenta" />
                </div>
                <h3 className="text-2xl font-bold text-surface-dark mb-4">{segment.title}</h3>
                <p className="text-surface-dark/70 leading-relaxed font-medium">{segment.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
