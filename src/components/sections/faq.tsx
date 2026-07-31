"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteContentType } from "@/content/copy";
import { ChevronDown } from "lucide-react";

export function Faq({ content }: { content: SiteContentType }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-bg">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-surface-dark font-heading">
            {content.faq.heading}
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-gradient-start to-gradient-end mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {content.faq.questions.map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <div 
                key={idx} 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus-visible:bg-gray-50"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-surface-dark pr-4">{faq.q}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-brand-magenta shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 text-surface-dark/80">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
