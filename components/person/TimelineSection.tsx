"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import type { TimelineEvent } from "@/types/person";

const eventDotColors: Record<TimelineEvent["type"], string> = {
  birth: "#1E3A1E",
  death: "#9A948E",
  marriage: "#8B6A10",
  move: "#3B6BA0",
  military: "#8B1F1F",
  work: "#B46A15",
  other: "#5A5450",
};

const eventTypeLabels: Record<TimelineEvent["type"], string> = {
  birth: "Född",
  death: "Avled",
  marriage: "Gifte sig",
  move: "Flyttade",
  military: "Militär",
  work: "Arbete",
  other: "Händelse",
};

interface TimelineSectionProps {
  timeline: TimelineEvent[];
}

export function TimelineSection({ timeline }: TimelineSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-6 md:p-8 card-shadow"
    >
      <div className="mb-7">
        <p className="text-xs font-medium text-text-muted tracking-[0.15em] uppercase mb-2">
          Tidslinje
        </p>
        <h2 className="font-serif text-2xl font-bold text-text-primary">
          Livslopp
        </h2>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-[3.25rem] top-2 bottom-2 w-px"
          style={{ background: "linear-gradient(to bottom, rgba(30,58,30,0.2), rgba(30,58,30,0.05))" }}
        />

        <div className="space-y-5">
          {timeline.map((event, i) => {
            const dotColor = eventDotColors[event.type];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.06 + 0.15, duration: 0.3 }}
                className="flex gap-4 relative items-start"
              >
                {/* Year */}
                <div className="w-10 text-right flex-shrink-0 pt-0.5">
                  <span className="font-mono text-xs text-text-muted tabular-nums">
                    {event.year}
                  </span>
                </div>

                {/* Dot */}
                <div className="flex-shrink-0 flex items-start pt-1.5 z-10">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: dotColor }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 pb-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-medium text-text-primary">
                      {event.title}
                    </span>
                    <span
                      className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: dotColor + "18",
                        color: dotColor,
                      }}
                    >
                      {eventTypeLabels[event.type]}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mt-0.5">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
