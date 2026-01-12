"use client";
import React from "react";
import { motion } from "motion/react";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-6 sm:p-8 rounded-2xl border border-border bg-background/80 shadow-sm shadow-black/5 max-w-[280px] sm:max-w-[320px] w-full"
                  key={i}
                >
                  <div className="text-sm text-foreground leading-relaxed">
                    {text}
                  </div>
                  <div className="flex items-center gap-2.5 mt-4">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-9 w-9 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="text-xs font-medium text-foreground tracking-tight leading-4">
                        {name}
                      </div>
                      <div className="text-xs text-muted-foreground tracking-tight leading-4 mt-0.5">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
