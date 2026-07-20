"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

const videos = [
  "https://res.cloudinary.com/ld9snrnx/video/upload/v1784553410/new_page_1_wighaw.mp4",
  "https://res.cloudinary.com/ld9snrnx/video/upload/v1784553405/new_page_2_cbwiwh.mp4",
  "https://res.cloudinary.com/ld9snrnx/video/upload/v1784553404/new_page_3_ydxjgc.mp4"
];

function VideoCard({ src, index }: { src: string; index: number }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      className="relative aspect-[9/16] w-full max-w-[340px] mx-auto rounded-3xl overflow-hidden glass-card-dark border border-brand-magenta/20 shadow-[0_10px_40px_rgba(230,0,122,0.1)] hover:border-brand-magenta/50 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(230,0,122,0.2)] transition-all duration-500"
    >
      <div className="absolute inset-0 bg-brand-magenta/5 animate-pulse" /> {/* Placeholder loading state effect */}
      <video 
        ref={videoRef}
        src={src}
        className="absolute inset-0 w-full h-full object-cover z-10"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 z-20 flex flex-col justify-end p-4 pointer-events-none" />
      
      {/* Mute/Unmute Button */}
      <button 
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-brand-magenta/90 flex items-center justify-center backdrop-blur-md transition-all duration-300 text-white border border-white/10 hover:scale-110"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>
    </motion.div>
  );
}

export function VideoTestimonials() {
  return (
    <section className="py-24 bg-surface-dark text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-brand-magenta/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight">
            Real Stories, <span className="text-transparent bg-clip-text bg-gradient-to-r from-gradient-start to-gradient-end">Real Results</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Don't just take our word for it. Hear directly from students who have transformed their careers and lives with our masterclass.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {videos.map((src, index) => (
            <VideoCard key={index} src={src} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
