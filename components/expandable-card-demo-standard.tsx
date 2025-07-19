"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
// Custom hook for outside click detection
function useOutsideClick(ref: React.RefObject<HTMLElement | null>, callback: () => void) {
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.1,
                },
              }}
              transition={{ duration: 0.15 }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              key={`card-${active.title}-${id}`}
              ref={ref}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                type: "tween", 
                duration: 0.2,
                ease: "easeInOut"
              }}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white border border-[#F5F7FA] sm:rounded-3xl overflow-hidden"
            >
                <div>
                  <img
                    width={200}
                    height={200}
                    src={active.src}
                    alt={active.title}
                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  />
                </div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="w-full">
                    <h3
                      className="font-bold text-[#0A2540] text-xl mb-2"
                    >
                      {active.title}
                    </h3>
                    <p
                      className="text-[#00B3A6] text-lg"
                    >
                      {active.description}
                    </p>
                  </div>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="text-[#0A2540] text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-4xl mx-auto w-full gap-6">
        {cards.map((card, index) => (
          <div
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-6 flex flex-col md:flex-row justify-between items-center hover:bg-[#F5F7FA] border border-[#F5F7FA] hover:border-[#00B3A6] rounded-xl cursor-pointer transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex gap-6 flex-col md:flex-row ">
              <div>
                <img
                  width={120}
                  height={120}
                  src={card.src}
                  alt={card.title}
                  className="h-48 w-48 md:h-20 md:w-20 rounded-lg object-cover object-top"
                />
              </div>
              <div className="">
                <h3
                  className="font-medium text-[#0A2540] text-center md:text-left text-lg md:text-xl"
                >
                  {card.title}
                </h3>
                <p
                  className="text-[#0A2540] text-center md:text-left text-base md:text-lg"
                >
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-[#0A2540]"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Muscle Activation Techniques",
    title: "MAT Therapy",
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    ctaText: "Learn More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Muscle Activation Techniques (MAT) is a revolutionary approach to muscle function and biomechanics. 
          This specialized therapy identifies and addresses muscle imbalances that can lead to pain, injury, and decreased performance. <br /> <br /> 
          Our certified MAT specialists use precise assessment techniques to identify weakened or inhibited muscles, 
          then apply specific activation protocols to restore proper muscle function. This evidence-based approach 
          helps improve mobility, reduce pain, and enhance overall physical performance for athletes and everyday individuals alike.
        </p>
      );
    },
  },
  {
    description: "Targeted Pain Relief",
    title: "Shock Wave Therapy",
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    ctaText: "Learn More", 
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Extracorporeal Shock Wave Therapy (ESWT) is a non-invasive treatment that uses acoustic waves to 
          promote healing in injured tissues. This advanced therapy is highly effective for chronic pain conditions 
          and stubborn injuries that haven&apos;t responded to traditional treatments. <br /> <br /> 
          The focused shock waves stimulate blood flow, break down scar tissue, and trigger the body&apos;s natural 
          healing processes. Commonly used for plantar fasciitis, tennis elbow, and other tendon-related injuries, 
          this FDA-approved treatment offers patients a safe alternative to surgery with minimal downtime.
        </p>
      );
    },
  },
  {
    description: "Movement Restoration",
    title: "Manual Physiotherapy",
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2820&auto=format&fit=crop&ixlib=rb-4.0.3",
    ctaText: "Learn More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Our manual physiotherapy services combine hands-on techniques with evidence-based practices to restore 
          function and mobility. Our licensed physiotherapists use a comprehensive approach including joint 
          mobilization, soft tissue therapy, and corrective exercises. <br /> <br /> 
          Each treatment plan is customized to address your specific condition, whether recovering from injury, 
          managing chronic pain, or improving athletic performance. We focus on identifying the root cause of 
          dysfunction rather than just treating symptoms, ensuring long-lasting results and preventing future injuries.
        </p>
      );
    },
  },
  {
    description: "Injury Prevention & Performance",
    title: "Sports Rehabilitation",
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    ctaText: "Learn More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Our sports rehabilitation program is designed for athletes of all levels looking to recover from injury, 
          prevent future problems, or enhance their performance. We understand the unique demands placed on athletic bodies 
          and tailor our treatments accordingly. <br /> <br /> 
          Using advanced assessment tools and sport-specific protocols, we help athletes return to their sport stronger 
          and more resilient. Our integrated approach combines MAT, manual therapy, and progressive exercise programs 
          to address the complete kinetic chain and optimize athletic performance while minimizing injury risk.
        </p>
      );
    },
  },
  {
    description: "Comprehensive Assessment",
    title: "Movement Analysis",
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    ctaText: "Learn More",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Our comprehensive movement analysis uses state-of-the-art technology and clinical expertise to identify 
          movement dysfunctions and biomechanical imbalances. This detailed assessment forms the foundation of all 
          our treatment programs. <br /> <br /> 
          We analyze how you move during daily activities and sport-specific movements to pinpoint areas of concern. 
          This scientific approach allows us to create highly targeted treatment plans that address the underlying 
          causes of pain and dysfunction, leading to more effective outcomes and lasting improvements in your quality of life.
        </p>
      );
    },
  },
];
