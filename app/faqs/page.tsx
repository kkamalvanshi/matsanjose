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

export default function FAQsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "#about" },
    { name: "Services", link: "#services" },
    { name: "Portfolio", link: "#portfolio" },
    { name: "FAQs", link: "/faqs" },
    { name: "Contact", link: "#contact" },
  ];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <NavbarButton variant="gradient" className="bg-[#FF6B35] hover:bg-[#00B3A6] text-white">Get Started</NavbarButton>
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
                className="block px-2 py-1 text-[#0A2540] hover:text-[#00B3A6] transition-colors duration-200"
                onClick={handleMobileMenuClose}
              >
                {item.name}
              </a>
            ))}
            <NavbarButton variant="gradient" className="w-full bg-[#FF6B35] hover:bg-[#00B3A6] text-white">
              Get Started
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Main Content */}
      <div className="min-h-screen bg-[#F5F7FA] pt-20">
        {/* Hero Section */}
        <div className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#0A2540]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Ask MAT San Jose
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-[#0A2540] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Chat directly with us to get answers under a minute about our services, processes, and how we can help bring your digital vision to life.
            </motion.p>
          </div>
        </div>

        {/* Chat Interface Section */}
        <div className="py-16 bg-[#F5F5F5]">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ChatInterface 
                agentId="YOUR_RETELL_CHAT_AGENT_ID"
                publicKey="YOUR_RETELL_PUBLIC_KEY"
                agentVersion="YOUR_RETELL_CHAT_AGENT_VERSION"
              />
            </motion.div>
          </div>
        </div>


      </div>

      {/* Sticky Footer */}
      <StickyFooter />
    </>
  );
} 