"use client";

import React from "react";
import Link from "next/link";

export default function ServicesCardDemo() {
  const renderServiceSection = (title: string, services: typeof allServices, tagline?: string, isLast?: boolean) => (
    <div className={isLast ? "mb-8" : "mb-16"}>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1c4064] mb-2">{title}</h2>
        {tagline && (
          <p className="text-lg text-[#1c4064]/70 max-w-3xl mx-auto">{tagline}</p>
        )}
      </div>
      <div className="flex justify-center">
        <div className="overflow-visible max-w-full py-4">
          <div className="flex gap-6 px-4">
            {services.map((service) => (
              <Link 
                key={service.title} 
                href={`/services/${service.slug}`}
                className="group flex-shrink-0"
              >
                <div className="w-[200px] h-[240px] bg-white border border-[#F5F7FA] hover:border-[#007A7A] rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer mb-6">
                  <div className="flex flex-col h-full">
                    {/* Image */}
                    <div className="w-full h-[120px] mb-3">
                      <img
                        src={service.src}
                        alt={service.title}
                        className="w-full h-full rounded-xl transition-shadow duration-300 group-hover:shadow-lg object-cover"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col flex-1">
                      <h3 className="font-bold text-[#1c4064] text-xs text-center group-hover:text-[#007A7A] transition-colors duration-300 leading-tight px-1 mb-2 min-h-[32px] flex items-center justify-center">
                        <span className="text-center">{service.title}</span>
                      </h3>
                      
                      <div className="flex justify-center pb-4 mt-auto">
                        <div className="px-3 py-1.5 bg-[#007A7A] text-white text-xs font-medium rounded-2xl group-hover:bg-[#1c4064] transition-all duration-300 group-hover:scale-105">
                          Learn More
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-24">
      {renderServiceSection(
        "Core Therapies", 
        coreTherapies,
        "Our foundational muscle activation treatments that address the root causes of pain and dysfunction"
      )}
      {renderServiceSection(
        "Advanced Therapies", 
        advancedTherapies,
        "Specialized protocols for complex conditions, athletic performance, and comprehensive pain management"
      )}
      {renderServiceSection(
        "Targeted Programs", 
        targetedPrograms,
        "Customized solutions designed for specific lifestyles, age groups, and activity levels"
      )}
      {renderServiceSection(
        "Add-On / Complementary Services", 
        addOnServices,
        "Supporting services to enhance and maintain the benefits of your primary treatments",
        true
      )}
    </div>
  );
}

// Core Therapies
const coreTherapies = [
  {
    title: "Muscle Activation Technique (MAT®)",
    description: "Identify and correct muscular imbalances that cause chronic pain and limited range of motion.",
    src: "/matTherapy.jpg",
    slug: "muscle-activation-technique",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          MAT® is our flagship service that identifies and corrects muscular imbalances at their source. By targeting weak muscles with specific activation exercises, we restore your body's natural function.
        </p>
        <div>
          <h5 className="font-semibold text-[#1c4064] mb-2">Key Benefits:</h5>
          <ul className="space-y-1">
            <li>• Eliminates chronic pain at its source</li>
            <li>• Improves range of motion significantly</li>
            <li>• Restores proper muscle function</li>
            <li>• Prevents future injuries</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Isometric Muscle Testing",
    description: "Target weak muscles with specific activation exercises using precise testing protocols.",
    src: "/matTherapy.jpg",
    slug: "isometric-muscle-testing",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          Our precise isometric testing protocols identify exactly which muscles are weak or inhibited, allowing us to create targeted activation exercises for optimal results.
        </p>
      </div>
    ),
  },
  {
    title: "Neuro-Muscular System Reset",
    description: "Restore efficient communication between the brain and body for optimal function.",
    src: "/matTherapy.jpg",
    slug: "neuro-muscular-system-reset",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          Reset the communication pathways between your nervous system and muscles to restore natural movement patterns and eliminate compensation.
        </p>
      </div>
    ),
  },
  {
    title: "Joint Stabilization Therapy",
    description: "Improve joint stability to relieve pain in knees, hips, shoulders, and spine.",
    src: "/physiotherapy.png",
    slug: "joint-stabilization-therapy",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          Target the muscles responsible for joint stability to eliminate pain and improve function in major joints throughout your body.
        </p>
      </div>
    ),
  },
  {
    title: "StemWave™ Therapy",
    description: "Non-invasive shockwave therapy to stimulate natural healing and reduce inflammation.",
    src: "/shockwave.png",
    slug: "stemwave-therapy",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          Advanced acoustic wave therapy that stimulates your body's natural healing mechanisms to reduce inflammation and accelerate recovery.
        </p>
      </div>
    ),
  },
];

// Advanced Therapies
const advancedTherapies = [
  {
    title: "Functional Range Restoration",
    description: "Improve mobility and flexibility with precise neuromuscular activation techniques.",
    src: "/physiotherapy.png",
    slug: "functional-range-restoration",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          Advanced techniques to restore your full range of motion by activating the specific muscles responsible for movement limitations.
        </p>
      </div>
    ),
  },
  {
    title: "Post-Surgical MAT Support",
    description: "Rebuild strength and stability post-injury or surgery (non-rehab approach).",
    src: "/sportsRehab.png",
    slug: "post-surgical-mat-support",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          Specialized MAT protocols designed to help you regain strength and stability after surgery or injury, focusing on muscle activation rather than traditional rehabilitation.
        </p>
      </div>
    ),
  },
  {
    title: "Athletic Recovery & Injury Prevention",
    description: "Enhance performance and reduce injury risk for athletes of all levels.",
    src: "/sportsRehab.png",
    slug: "athletic-recovery-injury-prevention",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          Comprehensive programs designed for athletes to prevent injuries, enhance performance, and accelerate recovery between training sessions.
        </p>
      </div>
    ),
  },
  {
    title: "Chronic Pain Management Program",
    description: "Customized MAT protocols to address back pain, neck pain, sciatica, and more.",
    src: "/matTherapy.jpg",
    slug: "chronic-pain-management",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          Specialized programs targeting chronic pain conditions using MAT principles to address root causes rather than just symptoms.
        </p>
      </div>
    ),
  },
];

// Targeted Programs
const targetedPrograms = [
  {
    title: "Workspace & Posture Wellness",
    description: "Ergonomic muscle activation routines to combat office stiffness and poor posture.",
    src: "/before.png",
    slug: "workspace-posture-wellness",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          Specialized programs for office workers and remote professionals to combat the effects of prolonged sitting and poor ergonomics.
        </p>
      </div>
    ),
  },
  {
    title: "Outdoor & Hiking Prep Program",
    description: "Prepare muscles and joints for Bay Area outdoor activities and adventures.",
    src: "/sportsRehab.png",
    slug: "outdoor-hiking-prep",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          Get your body ready for Bay Area hiking, climbing, and outdoor activities with targeted muscle activation and conditioning.
        </p>
      </div>
    ),
  },
  {
    title: "MAT for Seniors",
    description: "Improve stability, balance, and reduce age-related joint pain safely.",
    src: "/physiotherapy.png",
    slug: "mat-for-seniors",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          Gentle yet effective MAT protocols designed specifically for seniors to improve balance, stability, and reduce age-related aches and pains.
        </p>
      </div>
    ),
  },
  {
    title: "Travel & Mobility Recovery",
    description: "Reduce stiffness from flights, long commutes, or sedentary work schedules.",
    src: "/physiotherapy.png",
    slug: "travel-mobility-recovery",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          Quick and effective protocols to combat the stiffness and discomfort from travel, long commutes, or extended periods of sitting.
        </p>
      </div>
    ),
  },
];

// Add-On / Complementary Services
const addOnServices = [
  {
    title: "Nerve Pathway Activation",
    description: "Re-train nerve-to-muscle signaling for optimal performance and function.",
    src: "/matTherapy.jpg",
    slug: "nerve-pathway-activation",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          Advanced techniques to improve the communication between your nervous system and muscles for enhanced performance and pain relief.
        </p>
      </div>
    ),
  },
  {
    title: "Corrective Exercise Guidance",
    description: "At-home routines to reinforce and maintain the benefits of your MAT sessions.",
    src: "/sportsRehab.png",
    slug: "corrective-exercise-guidance",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          Personalized exercise programs you can do at home to maintain and enhance the results from your in-clinic MAT sessions.
        </p>
      </div>
    ),
  },
  {
    title: "Pain-Relief Workshops & Tips",
    description: "Personalized education for better long-term results and self-management.",
    src: "/physiotherapy.png",
    slug: "pain-relief-workshops",
    ctaLink: "#",
    content: () => (
      <div className="space-y-4">
        <p className="text-lg">
          Educational workshops and personalized tips to help you understand your body better and maintain pain-free living long-term.
        </p>
      </div>
    ),
  },
];

// Combine all services for the modal system
const allServices = [...coreTherapies, ...advancedTherapies, ...targetedPrograms, ...addOnServices]; 