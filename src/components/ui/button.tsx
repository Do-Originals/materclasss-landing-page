"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={{ 
          rotate: [0, 0, -2, 2, -2, 2, 0],
          x: [0, 0, -3, 3, -3, 3, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.85, 0.88, 0.91, 0.94, 0.97, 1]
        }}
        className={cn(
          "animate-cta-flash inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "bg-gradient-to-r from-gradient-start to-gradient-end text-white shadow-md hover:shadow-lg",
          "h-12 px-8 py-3",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
