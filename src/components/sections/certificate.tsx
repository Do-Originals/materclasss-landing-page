"use client";

import { SiteContentType } from "@/content/copy";
import Image from "next/image";
import { motion } from "framer-motion";

export function Certificate({ content }: { content: SiteContentType }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-dark font-heading relative z-10">
              {content.certificate.heading}
            </h2>
            <svg 
              className="absolute -inset-x-6 -inset-y-4 w-[calc(100%+3rem)] h-[calc(100%+2rem)] text-brand-magenta pointer-events-none"
              viewBox="0 0 300 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <motion.path 
                d="M 15 50 C 35 15, 265 15, 285 50 C 295 85, 245 95, 150 95 C 55 95, 5 80, 15 55 C 25 30, 85 10, 150 15" 
                stroke="currentColor"
                strokeWidth="5" 
                strokeLinecap="round" 
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              />
            </svg>
          </div>
          <p className="text-lg text-surface-dark/80">
            {content.certificate.description}
          </p>
        </div>

        <div className="bg-bg rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm max-w-3xl mx-auto">
          <div className="relative aspect-[4/3] md:aspect-[3/2] w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner">
            <Image 
              src={content.certificate.image} 
              alt="Course Certificate Mockup"
              fill
              className="object-contain p-2"
            />
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Issued By</p>
            <p className="text-xl font-bold text-surface-dark mt-1">{content.certificate.issuer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
