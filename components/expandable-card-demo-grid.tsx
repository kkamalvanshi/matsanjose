"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
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
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px"; // Prevent layout shift
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      // Cleanup: Always restore scroll when component unmounts
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "";
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence mode="wait">
        {active && typeof active === "object" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-[9998]"
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[9999] pt-20">
            <motion.button
              key={`button-${active.title}-${id}`}
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
              className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6 z-[10000]"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] max-h-[80vh] flex flex-col bg-white border border-[#F5F7FA] sm:rounded-2xl overflow-hidden mx-4"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-60 sm:rounded-tr-2xl sm:rounded-tl-2xl object-cover object-top"
                />
              </motion.div>

              <motion.div 
                className="sticky top-0 bg-white z-10 border-b border-[#F5F7FA]"
                initial={{ opacity: 1 }}
                exit={{ 
                  opacity: 0,
                  transition: {
                    duration: 0
                  }
                }}
              >
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <h3 className="font-bold text-[#1c4064] text-xl md:text-2xl">
                      {active.title}
                    </h3>
                    <p className="text-[#007A7A] text-base md:text-lg">
                      {active.description}
                    </p>
                  </div>

                  <a
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 h-10 rounded-2xl text-base font-bold relative cursor-pointer transition duration-200 inline-flex items-center justify-center text-center leading-none bg-[#FF9500] hover:bg-[#FF9500]/90 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] hover:scale-105 transition-transform"
                  >
                    Schedule
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex-1 overflow-y-auto"
                initial={{ opacity: 1 }}
                exit={{ 
                  opacity: 0,
                  transition: {
                    duration: 0
                  }
                }}
              >
                <div className="px-4 pb-4 pt-2">
                                      <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-[#1c4064] text-base md:text-lg lg:text-xl"
                    >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-0">
        {cards.map((card, index) => (
          <li key={card.title} className={`${index === 0 || index === 1 ? '' : '-translate-y-24'} ${index % 2 === 1 ? '-ml-8' : ''}`}>
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card border border-[#F5F7FA] hover:border-[#007A7A] w-auto sm:w-[30rem] h-auto rounded-2xl p-4">
                <motion.div
                  layoutId={`card-${card.title}-${id}`}
                  onClick={() => setActive(card)}
                  className="flex flex-col hover:bg-[#F5F7FA] rounded-2xl cursor-pointer"
                >
                  <div className="flex gap-4 flex-col w-full">
                    <CardItem translateZ="200" className="w-full mt-4">
                      <motion.div layoutId={`image-${card.title}-${id}`}>
                        <img
                          width={100}
                          height={100}
                          src={card.src}
                          alt={card.title}
                          className="h-60 w-full rounded-2xl object-cover object-top group-hover/card:shadow-xl"
                        />
                      </motion.div>
                    </CardItem>
                    <div className="flex justify-center items-center flex-col">
                      <CardItem
                        translateZ="150"
                        className="text-xl font-bold text-[#1c4064]"
                      >
                        <motion.h3
                          layoutId={`title-${card.title}-${id}`}
                          className="font-bold text-[#1c4064] text-center md:text-left text-xl"
                        >
                          {card.title}
                        </motion.h3>
                      </CardItem>
                      <CardItem
                        translateZ="120"
                        className="text-[#1c4064] text-sm max-w-sm mt-2"
                      >
                        <motion.p
                          layoutId={`description-${card.description}-${id}`}
                          className="text-[#1c4064] text-center md:text-left text-base"
                        >
                          {card.description}
                        </motion.p>
                      </CardItem>
                    </div>
                  </div>
                  
                  <div className="flex justify-center items-center mt-4 w-full">
                    <div className="px-6 py-2 bg-[#007A7A] text-white text-sm font-medium rounded-2xl">
                      Learn More
                    </div>
                  </div>
                </motion.div>
              </CardBody>
            </CardContainer>
          </li>
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
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Unlock Your Body's Hidden Potential",
    title: "MAT Therapy",
    src: "/matTherapy.jpg",
    ctaText: "Learn More",
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-4">
          <h4 className="font-bold text-[#1c4064] text-xl md:text-2xl">Non-Invasive Joint Pain & Muscle Tightness Relief</h4>
          
          <p className="text-lg md:text-xl">
            Developed by Greg Roskopf, Muscle Activation Techniques (MAT) is a groundbreaking non-invasive approach that addresses muscle imbalances - often the root cause of chronic joint pain and muscle tightness.
          </p>
          
          <div>
            <h5 className="font-semibold text-[#1c4064] mb-2 text-lg md:text-xl">How MAT Works:</h5>
            <div className="grid grid-cols-1 gap-1 text-base md:text-lg">
              <div className="bg-[#F5F7FA] p-2 rounded">• Manual muscle testing to identify imbalances</div>
              <div className="bg-[#F5F7FA] p-2 rounded">• Targeted isometric exercises</div>
              <div className="bg-[#F5F7FA] p-2 rounded">• Precise palpation techniques</div>
              <div className="bg-[#F5F7FA] p-2 rounded">• Enhances contractile efficiency</div>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold text-[#1c4064] mb-2 text-lg md:text-xl">Proven Research Results:</h5>
            <ul className="text-base md:text-lg space-y-1">
              <li>• <strong>2018 Study:</strong> Significant pain decrease & increased range of motion</li>
              <li>• <strong>2020 Review:</strong> Improved muscle strength, flexibility & overall function</li>
              <li>• <strong>Case Studies:</strong> Enhanced quality of life for chronic pain sufferers</li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-[#1c4064] mb-2 text-lg md:text-xl">Applications:</h5>
            <ul className="text-base md:text-lg space-y-1">
              <li>• <strong>Rehabilitation:</strong> Post-injury & post-surgery recovery</li>
              <li>• <strong>Athletic Performance:</strong> Injury prevention & optimization</li>
              <li>• <strong>Chronic Pain Management:</strong> Alternative to medication/surgery</li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-[#1c4064] mb-2 text-lg md:text-xl">Our Comprehensive Approach:</h5>
            <p className="text-base md:text-lg">
              Rather than masking symptoms, we focus on improving your body&apos;s natural mechanisms. MAT discovers how your body compensates for stress, overuse, and injuries, then eliminates these compensations so your body can function properly and pain-free.
            </p>
          </div>
        </div>
      );
    },
  },
  {
    description: "Advanced Technology for Rapid Recovery",
    title: "Shock Wave Therapy",
    src: "/shockwave.png",
    ctaText: "Learn More", 
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-4">
          <video 
            width="100%" 
            height="200" 
            controls 
            className="rounded-2xl"
          >
            <source src="/SparkGapAcousticWaves_prog03.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <h4 className="font-bold text-[#1c4064] text-xl md:text-2xl">Harness the Power of Acoustic Waves</h4>
          
          <p className="text-lg md:text-xl">
            StemWave employs advanced regenerative medicine using harmless yet powerful acoustic waves to stimulate your body&apos;s natural healing mechanisms. This cutting-edge technology enhances blood flow and reduces inflammation for musculoskeletal conditions.
          </p>
          
          <div className="grid grid-cols-2 gap-2 text-base md:text-lg">
            <div className="bg-[#F5F7FA] p-2 rounded">• FDA Listed</div>
            <div className="bg-[#F5F7FA] p-2 rounded">• Safe & Effective</div>
            <div className="bg-[#F5F7FA] p-2 rounded">• 5-10 Min Treatments</div>
            <div className="bg-[#F5F7FA] p-2 rounded">• Non-Invasive</div>
          </div>
          
          <div>
            <h5 className="font-semibold text-[#1c4064] mb-2 text-lg md:text-xl">Treatment Areas:</h5>
            <ul className="text-base md:text-lg space-y-1">
              <li>• Neck & Back Conditions</li>
              <li>• Upper Extremities (Shoulder, Elbow, Wrist)</li>
              <li>• Lower Extremities (Knee, Ankle, Foot)</li>
              <li>• Soft Tissue Injuries (Muscles, Tendons, Ligaments)</li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-[#1c4064] mb-2 text-lg md:text-xl">What to Expect:</h5>
            <p className="text-base md:text-lg">
              Each 10-15 minute session uses focused acoustic waves applied with gel. Most patients see improvement after 3-4 treatments in an 8-12 session care plan. No anesthesia required.
            </p>
          </div>
        </div>
      );
    },
  },
  {
    description: "Hands-On Healing for Lasting Results",
    title: "Manual Physiotherapy",
    src: "/physiotherapy.png",
    ctaText: "Learn More",
    ctaLink: "#",
    content: () => {
      return (
        <p className="text-lg md:text-xl">
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
    description: "Elite Performance & Injury Prevention",
    title: "Sports Rehabilitation",
    src: "/sportsRehab.png",
    ctaText: "Learn More",
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-4">
          <h4 className="font-bold text-[#1c4064] text-xl md:text-2xl">Comprehensive Sports Injury Recovery</h4>
          
          <p className="text-lg md:text-xl">
            Our sports rehabilitation program helps athletes treat pain and return to optimal performance. We provide specialized treatment plans that restore pre-injury function, improve mobility restrictions, and prevent re-injury to get you back in the game faster.
          </p>
          
          <div>
            <h5 className="font-semibold text-[#1c4064] mb-2 text-lg md:text-xl">Common Sports Injuries We Treat:</h5>
            <div className="grid grid-cols-1 gap-1 text-base md:text-lg">
              <div className="bg-[#F5F7FA] p-2 rounded">• Hip Flexor Strain & ACL Tears</div>
              <div className="bg-[#F5F7FA] p-2 rounded">• Groin Pull & Hamstring Strain</div>
              <div className="bg-[#F5F7FA] p-2 rounded">• Golfer&apos;s Elbow & Shoulder Injuries</div>
              <div className="bg-[#F5F7FA] p-2 rounded">• Sciatica & Head Injuries</div>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold text-[#1c4064] mb-2 text-lg md:text-xl">5-Step Recovery Process:</h5>
            <ul className="text-base md:text-lg space-y-1">
              <li><strong>Step 1:</strong> Protect & stabilize the affected area</li>
              <li><strong>Step 2:</strong> Gradual strength retraining with MAT</li>
              <li><strong>Step 3:</strong> Build endurance, power, and agility</li>
              <li><strong>Step 4:</strong> Moderated return to sport activity</li>
              <li><strong>Step 5:</strong> Ongoing injury prevention training</li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-[#1c4064] mb-2 text-lg md:text-xl">Our Approach:</h5>
            <p className="text-base md:text-lg">
              Using advanced assessment tools and sport-specific protocols, we combine MAT, manual therapy, and progressive exercise programs. Our comprehensive approach addresses the complete kinetic chain to optimize performance while avoiding surgery whenever possible.
            </p>
          </div>
        </div>
      );
    },
  },
];
