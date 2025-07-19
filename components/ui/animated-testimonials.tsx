"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";

import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    if (autoplay) {
      const newInterval = setInterval(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
      }, 7000);
      setIntervalId(newInterval);
    }
  };

  const resetAutoplay = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    startAutoplay();
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
    resetAutoplay();
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    resetAutoplay();
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoplay]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const randomRotateY = (index: number) => {
    // Use index to create deterministic "random" rotation
    const rotations = [-8, 5, -3, 7, -6, 4, -9, 2, -5, 8];
    return rotations[index % rotations.length];
  };
  return (
    <div className="mx-auto max-w-sm px-4 py-10 font-sans antialiased md:max-w-6xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-15 md:grid-cols-5">
        <div className="md:col-span-2 flex flex-col justify-between py-4 pt-8 md:pt-12">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-[#1c4064]">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-[#007A7A]">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-8 text-lg text-[#1c4064]">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 -mt-4 md:-mt-2">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-[#F5F7FA] hover:bg-[#007A7A] border border-[#1c4064] transition-colors duration-200"
            >
              <IconArrowLeft className="h-5 w-5 text-[#1c4064] group-hover/button:text-white transition-all duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-[#F5F7FA] hover:bg-[#007A7A] border border-[#1c4064] transition-colors duration-200"
            >
              <IconArrowRight className="h-5 w-5 text-[#1c4064] group-hover/button:text-white transition-all duration-300 group-hover/button:-rotate-12" />
            </button>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="relative h-96 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(index),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(index),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
