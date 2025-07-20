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
} from "../../components/ui/resizable-navbar";
import ServicesCardDemo from "../../components/services-expandable-card-demo";
import StickyFooter from "../../components/ui/sticky-footer";

// Services nav items
const navItems = [
  { name: "Home", link: "/" },
  { name: "Services", link: "/services" },
  { name: "Blog", link: "/blog" },
  { name: "FAQs", link: "/faqs" },
];

export default function ServicesPage() {
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
      <main className="relative z-10 min-h-screen bg-[#F5F5F5] pt-45 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1c4064] mb-6">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-[#1c4064] max-w-4xl mx-auto">
              Comprehensive muscle activation and pain relief solutions tailored to restore your body's natural function and eliminate chronic pain
            </p>
          </div>

          {/* Services Cards */}
          <ServicesCardDemo />
        </div>
      </main>

      <StickyFooter />
    </>
  );
} 