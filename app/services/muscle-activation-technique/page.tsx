"use client";

import React, { useState, useCallback } from "react";
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
} from "../../../components/ui/resizable-navbar";
import StickyFooter from "../../../components/ui/sticky-footer";

import { navItems } from "../../../lib/navigation";

export default function MATServicePage() {
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
          <NavbarButton variant="gradient" className="bg-[#FF9500] hover:bg-[#FF9500]/90 text-white hover:scale-105 transition-transform duration-200">Schedule</NavbarButton>
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
            <NavbarButton variant="gradient" className="w-full bg-[#FF9500] hover:bg-[#FF9500]/90 text-white hover:scale-105 transition-transform duration-200">
              Get Started
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen bg-[#F5F5F5] pt-20 pb-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center min-h-[600px]">
            {/* Left Column - Content */}
            <div className="flex flex-col justify-center h-full ml-8 lg:ml-16">
              <div className="text-sm font-semibold text-[#007A7A] mb-4 uppercase tracking-wide">
                MUSCLE ACTIVATION TECHNIQUE
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1c4064] mb-6">
                What is Muscle Activation Technique?
              </h1>
              <p className="text-lg text-[#1c4064] mb-8">
                Experience advanced therapy to gain a competitive edge and enhance your body's healing.
              </p>
              
              {/* Benefits List */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#1c4064] mb-4 uppercase tracking-wide">
                  Benefits of MAT® MAY INCLUDE:
                </h3>
                <ul className="space-y-2 text-[#1c4064]">
                  <li>• Eliminates chronic pain</li>
                  <li>• Restores muscle function</li>
                  <li>• Improves range of motion</li>
                  <li>• Decreased injury recovery time</li>
                  <li>• Increased athletic performance</li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-[#007A7A] text-white font-semibold rounded-full hover:bg-[#005c5c] transition-colors duration-300">
                  Book MAT®
                </button>
                <button 
                  onClick={() => {
                    const element = document.getElementById('pricing-section');
                    if (element) {
                      const navbarHeight = 100; // Account for navbar height
                      const elementPosition = element.offsetTop - navbarHeight;
                      window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="px-6 py-3 border-2 border-[#007A7A] text-[#007A7A] font-semibold rounded-full hover:bg-[#007A7A] hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  Find Pricing
                </button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center items-center h-full">
              <div className="w-full max-w-lg">
                <img
                  src="/matTherapy.jpg"
                  alt="Muscle Activation Technique session"
                  className="w-full h-auto rounded-2xl shadow-lg object-cover"
                />
              </div>
            </div>
          </div>

          {/* What to Expect Section */}
          <div className="bg-white rounded-2xl p-6 md:p-9 shadow-lg mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1c4064] text-center mb-9">
              What to Expect During Your Muscle Activation Technique Session
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-9">
              {/* Session Duration */}
              <div className="footer-gradient rounded-xl p-6 shadow-lg">
                <div className="flex flex-col items-center justify-end text-center space-y-3 h-full min-h-[100px] pb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                      <span className="text-[#007A7A] text-base font-bold">⏱</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Session Duration</h3>
                    <p className="text-lg text-white/90 font-medium">60-90 minutes</p>
                  </div>
                </div>
              </div>

              {/* Frequency */}
              <div className="footer-gradient rounded-xl p-10 shadow-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-[#007A7A] text-xs font-bold">📅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1.5">
                      How Often to Use Muscle Activation Technique
                    </h3>
                    <p className="text-sm text-white/90">
                      We recommend a session once or twice weekly, and clients must wait four hours between sessions. To achieve results, a minimum of 6 total sessions are recommended. Maintenance and performance sessions may be optimal results.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Video */}
            <div className="w-full rounded-xl overflow-hidden shadow-lg">
              <div className="relative w-full h-0 pb-[56.25%]"> {/* More fitting aspect ratio for video content */}
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/1j6JVetcvI8"
                  title="Muscle Activation Technique Session"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* The MAT Experience Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-16">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1c4064] mb-4">
                The Muscle Activation Technique Experience
              </h2>
              <p className="text-[#1c4064]/70 mb-6">
                Our MAT sessions focus on identifying and correcting muscular imbalances to restore your body's natural function and eliminate pain.
              </p>
            </div>

            <div className="space-y-6 text-[#1c4064]/70">
              <p>
                Your MAT journey begins with a comprehensive muscle testing protocol. Your practitioner will use precise isometric testing to identify weak or inhibited muscles throughout your body. Once identified, we'll guide you through specific activation exercises targeting these problem areas.
              </p>
              
              <p>
                During the session, you'll experience targeted muscle activation techniques designed to restore proper nerve-to-muscle communication. This process helps eliminate compensation patterns and restores your body's natural movement capabilities. As your session progresses, you may feel enhanced muscle engagement and improved range of motion immediately.
              </p>
              
              <p>
                After your MAT session, many clients report feeling more balanced and stable immediately. Whether you're seeking pain relief, improved athletic performance, or injury prevention, we'll work together to optimize your muscular system. You may experience enhanced strength, better posture, and reduced stiffness throughout your daily activities.
              </p>
              
              <p>
                Some clients report feeling more energized and move with greater ease immediately after their MAT session.
              </p>
            </div>


          </div>

          {/* How Does MAT Work Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1c4064] mb-6">
                How Does Muscle Activation Technique Work?
              </h2>
              <div className="space-y-4 text-[#1c4064]/70">
                <p>
                  Muscle Activation Technique (MAT®) is a revolutionary approach that focuses on identifying and correcting muscular imbalances at their source, rather than just treating symptoms.
                </p>
                <p>
                  This innovative therapy targets weak or inhibited muscles through precise isometric testing and specific activation exercises. By restoring proper muscle function, MAT® eliminates the compensation patterns that lead to pain, limited mobility, and increased injury risk.
                </p>
                <p>
                  The MAT® process improves nerve-to-muscle communication, which helps optimize your body's natural movement patterns. This approach not only provides immediate relief but also creates lasting changes that improve your overall physical function and performance.
                </p>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center items-center">
              <div className="w-full max-w-md">
                <img
                  src="/physiotherapy.png"
                  alt="MAT therapy technique demonstration"
                  className="w-full h-auto rounded-2xl shadow-lg object-cover"
                />
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div id="pricing-section" className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1c4064] mb-4">
                MAT® Session Pricing
              </h2>
              <p className="text-lg text-[#1c4064]/70 max-w-3xl mx-auto">
                Choose the package that works best for your healing journey. All sessions are 60-90 minutes with our certified MAT® specialist.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Single Session */}
              <div className="bg-[#F5F7FA] rounded-2xl p-8 border border-[#007A7A]/10 hover:border-[#007A7A]/30 transition-all duration-300 hover:shadow-lg">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#1c4064] mb-2">
                    Single Session
                  </h3>
                  <div className="text-3xl font-bold text-[#007A7A] mb-6">
                    $150
                  </div>
                  <ul className="text-left space-y-3 text-[#1c4064]/70 mb-8">
                    <li>• 60-90 minute session</li>
                    <li>• Comprehensive muscle testing</li>
                    <li>• Targeted activation exercises</li>
                    <li>• Movement assessment</li>
                    <li>• Take-home recommendations</li>
                  </ul>
                  <button className="w-full px-6 py-3 bg-[#007A7A] text-white font-semibold rounded-full hover:bg-[#005c5c] transition-colors duration-300">
                    Book Single Session
                  </button>
                </div>
              </div>

              {/* 3-Session Package */}
              <div className="bg-white rounded-2xl p-8 border-2 border-[#007A7A] hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#007A7A] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#1c4064] mb-2">
                    3-Session Package
                  </h3>
                  <div className="text-3xl font-bold text-[#007A7A] mb-2">
                    $420
                  </div>
                  <div className="text-sm text-[#1c4064]/70 mb-6">
                    Save $30 • $140 per session
                  </div>
                  <ul className="text-left space-y-3 text-[#1c4064]/70 mb-8">
                    <li>• 3 comprehensive MAT® sessions</li>
                    <li>• Progressive treatment plan</li>
                    <li>• Detailed progress tracking</li>
                    <li>• Customized exercise program</li>
                    <li>• Email support between sessions</li>
                  </ul>
                  <button className="w-full px-6 py-3 bg-[#007A7A] text-white font-semibold rounded-full hover:bg-[#005c5c] transition-colors duration-300">
                    Book 3-Session Package
                  </button>
                </div>
              </div>

              {/* 6-Session Package */}
              <div className="bg-[#F5F7FA] rounded-2xl p-8 border border-[#007A7A]/10 hover:border-[#007A7A]/30 transition-all duration-300 hover:shadow-lg">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#1c4064] mb-2">
                    6-Session Package
                  </h3>
                  <div className="text-3xl font-bold text-[#007A7A] mb-2">
                    $780
                  </div>
                  <div className="text-sm text-[#1c4064]/70 mb-6">
                    Save $120 • $130 per session
                  </div>
                  <ul className="text-left space-y-3 text-[#1c4064]/70 mb-8">
                    <li>• 6 comprehensive MAT® sessions</li>
                    <li>• Complete transformation program</li>
                    <li>• Bi-weekly progress assessments</li>
                    <li>• Advanced movement coaching</li>
                    <li>• Priority scheduling</li>
                  </ul>
                  <button className="w-full px-6 py-3 bg-[#007A7A] text-white font-semibold rounded-full hover:bg-[#005c5c] transition-colors duration-300">
                    Book 6-Session Package
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center mt-12 p-6 bg-[#007A7A]/5 rounded-2xl">
              <p className="text-[#1c4064]/70 mb-4">
                <strong>Note:</strong> A minimum of 6 sessions is recommended for optimal results. 
                Sessions must be spaced at least 4 hours apart.
              </p>
              <p className="text-sm text-[#1c4064]/60">
                All packages include personalized treatment plans and take-home exercise recommendations.
              </p>
            </div>
          </div>
        </div>
      </main>

      <StickyFooter />
    </>
  );
} 