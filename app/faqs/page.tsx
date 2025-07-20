"use client";

import React from "react";
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
} from "../../components/ui/resizable-navbar";
import StickyFooter from "../../components/ui/sticky-footer";
import { ChatInterface } from "../../components/ui/chat-interface";
import { motion } from "motion/react";
import { navItems } from "../../lib/navigation";

export default function FAQsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Muscle Activation Techniques (MAT)?",
      answer: "MAT is a revolutionary approach that identifies and corrects muscle imbalances by activating weak or inhibited muscles. Unlike traditional methods that focus on stretching tight muscles, MAT addresses the root cause of dysfunction to restore proper muscle function and eliminate pain."
    },
    {
      question: "How effective is Shockwave Therapy?",
      answer: "Shockwave therapy has shown excellent results for chronic conditions like plantar fasciitis, tennis elbow, and tendinopathies. Studies show success rates of 70-90% for many conditions. The acoustic waves stimulate healing, increase blood flow, and break down scar tissue naturally."
    },
    {
      question: "How many sessions will I need?",
      answer: "Treatment plans vary by individual and condition. MAT typically requires 4-8 sessions, while Shockwave Therapy usually involves 3-5 sessions spaced one week apart. We'll assess your progress and adjust the plan as needed to achieve optimal results."
    },
    {
      question: "Do you accept insurance?",
      answer: "We work with most major insurance providers. Many of our services are covered under physiotherapy benefits. We recommend checking with your insurance provider about coverage details. We also offer flexible payment options for out-of-pocket expenses."
    },
    {
      question: "What should I expect during my first visit?",
      answer: "Your first session includes a comprehensive assessment of your movement patterns, muscle function, and pain areas. We'll discuss your health history, goals, and develop a personalized treatment plan. The initial visit typically takes 60-90 minutes."
    },
    {
      question: "Are your treatments suitable for athletes?",
      answer: "Absolutely! Many professional and amateur athletes use MAT and Shockwave Therapy for injury prevention, performance optimization, and faster recovery. Our techniques help identify muscle imbalances before they lead to injury and enhance overall athletic performance."
    }
  ];

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
      <main className="relative z-10 min-h-screen bg-[#F5F5F5] pt-45 pb-20">
        {/* Hero Section */}
        <div className="py-6">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#1c4064]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Ask MAT San Jose
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-[#1c4064] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Chat directly with us to get answers under a minute about our services, processes, and how we can help transform your health and wellness journey.
            </motion.p>
          </div>
        </div>

        {/* Chat Interface Section */}
        <div className="bg-[#F5F5F5]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br"
            >
              <ChatInterface 
                agentId=""
                publicKey="YOUR_RETELL_PUBLIC_KEY"
                agentVersion="YOUR_RETELL_CHAT_AGENT_VERSION"
              />
            </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-[#F5F5F5]">
          <div className="max-w-3xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1c4064]">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white rounded-2xl shadow-sm border border-[#007A7A]/10 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left p-6 flex justify-between items-center hover:bg-[#007A7A]/5 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-semibold text-[#1c4064] pr-4">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <svg 
                          className="w-5 h-5 text-[#007A7A]" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFAQ === index ? 'auto' : 0,
                        opacity: openFAQ === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-[#1c4064] opacity-80 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Section */}
              <motion.div 
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.0 }}
              >
                <div className="bg-gradient-to-br from-[#007A7A] to-[#1c4064] rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                  <p className="mb-6 opacity-90">
                    Schedule a consultation with our expert team to discuss your specific needs and goals.
                  </p>
                  <NavbarButton variant="primary" className="!bg-[#F5F5F5] !text-[#1c4064] !hover:bg-[#F5F5F5] !hover:text-[#1c4064] hover:scale-105 transition-transform duration-200">
                    Book Your Consultation
                  </NavbarButton>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

      </main>

      {/* Sticky Footer */}
      <StickyFooter />
    </>
  );
} 