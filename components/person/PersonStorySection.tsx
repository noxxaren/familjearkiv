"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { StorySection } from "@/types/person";

interface PersonStorySectionProps {
  sections: StorySection[];
}

export function PersonStorySection({ sections }: PersonStorySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-6 md:p-10 card-shadow"
    >
      {/* Section label */}
      <div className="mb-8">
        <p className="text-xs font-medium text-text-muted tracking-[0.15em] uppercase mb-2">
          Berättelse
        </p>
        <h2 className="font-serif text-2xl font-bold text-text-primary">
          Livets berättelse
        </h2>
      </div>

      <div className="space-y-8 max-w-prose">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.08 + 0.15, duration: 0.4 }}
          >
            <h3 className="font-serif font-semibold text-lg text-text-primary mb-3 leading-snug">
              {section.title}
            </h3>
            <p
              className="text-text-secondary leading-[1.8] text-[0.95rem]"
              style={{ letterSpacing: "0.005em" }}
            >
              {section.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
