"use client";

import React, { useState, useCallback, memo, useRef } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "../components/ui/resizable-navbar";
import { WavyBackground } from "../components/ui/wavy-background";
import { CardContainer, CardBody, CardItem } from "../components/ui/3d-card";
import { ContainerTextFlip } from "../components/ui/container-text-flip";
import ExpandableCardDemoGrid from "../components/expandable-card-demo-grid";
import { Compare } from "../components/ui/compare";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";
import StickyFooter from "../components/ui/sticky-footer";
import ImageTrail, { ImageTrailItem } from "../components/ui/image-trail";
import TextCursorProximity from "../components/ui/text-cursor-proximity";

// Memoize the nav items to prevent unnecessary re-renders
const navItems = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Services", link: "#services" },
  { name: "FAQs", link: "/faqs" },
  { name: "Contact", link: "#contact" },
];

// Memoized content component
const PageContent = memo(() => {
  const imageTrailContainerRef = useRef<HTMLDivElement>(null);
  
  return (
  <>
    <WavyBackground
      backgroundFill="#F5F5F5"
      colors={["#007A7A", "#4CAF50"]}
      waveWidth={50}
      blur={12}
      speed="fast"
      waveOpacity={0.3}
      className="flex items-center justify-center px-4 md:px-10 py-12 w-full min-h-screen"
      containerClassName="min-h-screen w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-18 lg:gap-16 w-full max-w-7xl mx-auto items-center -mt-8">
        {/* Left Side - Text Content */}
        <div className="text-left lg:text-left order-2 lg:order-1">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#1c4064] leading-tight">
              <div className="whitespace-nowrap">
                <ContainerTextFlip 
                  words={["Relieve Pain", "Improve Posture", "Boost Performance"]} 
                  interval={4000}
                  className="text-[#F5F5F5] inline-block"
                  textClassName="text-[#F5F5F5]"
                />
              </div>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1c4064]">
              without surgery or medication
            </h2>
          </div>
          <p className="text-[#1c4064] text-base md:text-m lg:text-m max-w-l mt-4">
          San Jose’s Trusted Muscle Activation Therapy for Pain Relief & Mobility
          </p>
        </div>

        {/* Right Side - 3D Card */}
        <div className="flex justify-center order-1 lg:order-2">
          <CardContainer className="inter-var">
            <CardBody className="bg-white relative group/card hover:shadow-2xl border border-[#F5F7FA] hover:border-[#007A7A] w-auto sm:w-[22rem] h-auto rounded-xl p-6 transition-all duration-300">
              
              <CardItem translateZ="200" className="w-full flex justify-center">
                <img
                  src="/scottHeadshot.png"
                  height="750"
                  width="750"
                  className="h-80 w-80 object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="Scott Lamb - MAT Specialist"
                />
              </CardItem>
              <CardItem
                translateZ="150"
                className="text-xl font-bold text-[#1c4064] mt-6 text-center"
              >
                Scott Lamb
              </CardItem>
              <CardItem
                translateZ="150"
                className="text-m font-bold text-[#1c4064] text-center"
              >
                Pain Management Specialist
              </CardItem>
              
              <CardItem
                translateZ="120"
                className="mt-2 text-center"
              >
                <ul className="text-[#1c4064] text-sm space-y-1 text-left">
                  <li>• 20+ years of experience in the fitness industry</li>
                  <li>• MAT Specialist Certified</li>
                  <li>• Former Division I Football Player</li>
                  <li>• BS in Kinesiology</li>
                  <li>• Certified Strength & Conditioning Specialist</li>
                  
                  
                </ul>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </WavyBackground>

    {/* Expandable Card Demo Standard Section */}
    <div className="bg-[#F5F5F5] py-0 -mt-32 relative z-10">
      <div className="text-center mb-2 pt-8 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 text-[#1c4064]">
          Our Most Popular Services
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-[#1c4064] max-w-2xl mx-auto">
          Discover our comprehensive range of Muscle Activation Techniques and other wellness services
        </p>
      </div>
      <ExpandableCardDemoGrid />
    </div>

    {/* Compare Component Section */}
    <div className="bg-[#F5F5F5] py-4 sm:py-6 lg:py-8 px-4 flex items-center justify-center">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#1c4064]">
            Before & After Results
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#1c4064] max-w-2xl mx-auto px-4">
            Real before & after results showing how MAT therapy has transformed our clients&apos; posture and quality of life
          </p>
        </div>
        
        <div className="flex flex-col gap-16">
          {/* Client 1: Kevin */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex flex-col items-center w-full lg:w-auto">
              <Compare
                firstImage="/before.png"
                secondImage="/after.png"
                className="w-[224px] h-[320px] sm:w-[256px] sm:h-[360px] md:w-[288px] md:h-[400px] lg:w-[320px] lg:h-[440px] rounded-2xl border border-[#007A7A] shadow-2xl"
                slideMode="hover"
                autoplay={true}
                autoplayDuration={4000}
              />
              <div className="text-center mt-4">
                <div className="inline-flex items-center gap-2 bg-white border border-[#007A7A] backdrop-blur-sm px-6 py-3 rounded-full">
                  <div className="w-2 h-2 bg-[#007A7A] rounded-full animate-pulse"></div>
                  <span className="text-[#1c4064] text-sm font-medium">Hover over images to see transformation results</span>
                </div>
              </div>
            </div>
            <div className="flex-1 max-w-md text-center lg:text-left -mt-8 lg:-mt-12">
              <div className="mb-2">
                <h3 className="text-xl md:text-5xl font-bold text-[#1c4064] inline">Kevin M.</h3>
              </div>
              <div className="mb-4">
                <span className="inline-block bg-[#007A7A] text-white px-3 py-1 rounded-full text-base font-medium mb-2">
                  Forward Head Posture
                </span>
              </div>
              <p className="text-[#1c4064] text-base md:text-lg leading-relaxed mb-4">
                &ldquo;After years of desk work, I developed chronic neck pain and forward head posture. 
                The MAT therapy sessions helped realign my cervical spine and strengthened my deep neck flexors. 
                Within 8 weeks, my posture improved dramatically and my daily headaches disappeared.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Animated Testimonials Section */}
    <div className="bg-[#F5F5F5] py-8">
      <div className="text-center mb-8 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#1c4064]">
          What Our Clients Say
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-[#1c4064] max-w-2xl mx-auto">
          Real testimonials from clients who&apos;ve experienced life-changing results with our therapy services
        </p>
      </div>
      <AnimatedTestimonials
        testimonials={[
          {
            quote: "After struggling with chronic lower back pain for years, the MAT therapy completely transformed my life. I can now play with my kids without pain and returned to my favorite activities.",
            name: "Sarah Chen",
            designation: "Teacher & Mom",
            src: "/testimonial1.png"
          },
          {
            quote: "The shock wave therapy was a game-changer for my tennis elbow. As a professional athlete, I needed something effective and fast. Within weeks, I was back to peak performance.",
            name: "Mike Rodriguez",
            designation: "Professional Tennis Player",
            src: "/testimonial2.png"
          },
          {
            quote: "I was skeptical about manual physiotherapy at first, but Scott's expertise and personalized approach helped me recover from my shoulder injury better than I ever imagined possible.",
            name: "Jennifer Walsh",
            designation: "Yoga Instructor",
            src: "/testimonial3.png"
          },
          {
            quote: "The sports rehabilitation program not only helped me recover from my ACL injury but made me stronger than before. I'm now injury-free and performing at my highest level.",
            name: "David Thompson",
            designation: "College Football Player",
            src: "/testimonial4.png"
          }
        ]}
        autoplay={true}
      />
    </div>

    {/* Image Trail Section */}
    <div className="w-full h-screen bg-[#F5F5F5] relative text-[#1c4064]">
      <ImageTrail
        threshold={100}
        intensity={1}
        keyframes={{ scale: [1, 1] }}
        keyframesOptions={{
          scale: { duration: 1, times: [1, 1] },
        }}
        repeatChildren={1}
      >
        {[
          "/marque/marque1.png",
          "/marque/marque2.png",
          "/marque/marque3.png",
          "/marque/marque4.png",
          "/marque/marque5.png",
          "/marque/marque6.png",
          "/marque/marque7.png",
          "/marque/marque8.png",
          "/marque/marque9.png",
          "/marque/marque10.png",
          "/marque/marque11.png",
          "/marque/marque12.png",
          "/marque/marque13.png"
        ].map((url, index) => (
          <ImageTrailItem key={index}>
            <div className="w-30 sm:w-42 h-full relative overflow-hidden">
              <img src={url} alt="social media image" className="object-cover" />
            </div>
          </ImageTrailItem>
        ))}
      </ImageTrail>
      
      {/* Social Media Container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <a 
          href="https://www.facebook.com/muscleactivationsanjose/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          <div
            ref={imageTrailContainerRef}
            className="relative min-w-[300px] max-w-[350px] sm:min-w-[300px] h-[325px] sm:h-[350px] w-full overflow-hidden flex flex-col justify-between items-center shadow-2xl p-4 sm:p-5 bg-gradient-to-br from-[#007A7A] to-[#1c4064] text-white select-none"
          >
          <div className="flex flex-col justify-start items-start uppercase space-y-2 pt-4 pl-4">
            <div className="text-xl sm:text-3xl lg:text-5xl font-bold text-[#F5F5F5] text-left">
              FOLLOW
            </div>
            <div className="text-lg sm:text-2xl lg:text-4xl font-bold text-[#F5F5F5] text-left">
              @matsanjose
            </div>
          </div>

          <div className="flex flex-col w-full leading-tight space-y-1 mt-auto">
            <div className="flex justify-end w-full">
              <div className="flex flex-col space-y-1 text-right">
                <div className="text-xs font-medium text-[#F5F5F5]">
                  DAILY WELLNESS TIPS & CLIENT WINS ⟡
                </div>

                <div className="text-xs font-medium text-[#F5F5F5]">
                  ⟨⟩ BEHIND THE SCENES & EXPERT ADVICE
                </div>

                <div className="text-xs font-medium text-[#F5F5F5]">
                  JOIN OUR HEALING COMMUNITY ♡
                </div>
              </div>
            </div>
          </div>
        </div>
        </a>
      </div>
    </div>
  </>
  );
});

PageContent.displayName = 'PageContent';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <NavbarButton variant="gradient" className="bg-[#FF9500] hover:bg-[#FF9500]/90 text-white">Get Started</NavbarButton>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={handleMobileMenuToggle}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                className="block px-2 py-1 text-[#1c4064] hover:text-[#007A7A]"
                onClick={handleMobileMenuClose}
              >
                {item.name}
              </a>
            ))}
            <NavbarButton variant="gradient" className="w-full bg-[#FF9500] hover:bg-[#FF9500]/90 text-white">
              Get Started
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <PageContent />
      <StickyFooter />
    </>
  );
}
