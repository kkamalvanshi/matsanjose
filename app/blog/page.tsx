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
import { BentoGrid, BentoGridItem } from "../../components/ui/bento-grid";
import { CardContainer, CardBody, CardItem } from "../../components/ui/3d-card";
import StickyFooter from "../../components/ui/sticky-footer";
import Link from "next/link";
import { motion } from "motion/react";

import { navItems } from "../../lib/navigation";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Understanding Muscle Activation Techniques",
    description: "Learn how MAT therapy works to restore muscle function and eliminate pain at its source.",
    category: "MAT Therapy",
    readTime: "5 min read",
    date: "Dec 15, 2024",
    featured: true,
    image: "/matTherapy.jpg"
  },
  {
    id: 2,
    title: "The Science Behind Shockwave Therapy",
    description: "Discover how acoustic waves stimulate healing and reduce inflammation in injured tissues.",
    category: "Shockwave Therapy",
    readTime: "4 min read", 
    date: "Dec 12, 2024",
    featured: false,
    image: "/shockwave.png"
  },
  {
    id: 3,
    title: "Posture Correction: From Forward Head to Perfect Alignment",
    description: "Real strategies to fix forward head posture and maintain healthy spinal alignment.",
    category: "Posture",
    readTime: "6 min read",
    date: "Dec 10, 2024",
    featured: false,
    image: "/before.png"
  },
  {
    id: 4,
    title: "Sports Injury Prevention: A Complete Guide",
    description: "Essential techniques and exercises to prevent common sports injuries and maintain peak performance.",
    category: "Sports Rehab",
    readTime: "8 min read",
    date: "Dec 8, 2024",
    featured: false,
    image: "/sportsRehab.png"
  },
  {
    id: 5,
    title: "Manual Physiotherapy vs Traditional Methods",
    description: "Understanding the differences and benefits of hands-on therapeutic approaches.",
    category: "Physiotherapy",
    readTime: "5 min read",
    date: "Dec 5, 2024",
    featured: false,
    image: "/physiotherapy.png"
  },
  {
    id: 6,
    title: "Success Stories: Client Transformations",
    description: "Real before and after stories from our clients who achieved pain-free living.",
    category: "Success Stories",
    readTime: "3 min read",
    date: "Dec 3, 2024",
    featured: false,
    image: "/after.png"
  }
];

export default function BlogPage() {
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
      <main className="relative z-10 min-h-screen bg-[#F5F5F5] pt-45 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1c4064] mb-2">
              Health & Wellness Blog
            </h1>
            <p className="text-lg md:text-xl text-[#1c4064] max-w-2xl mx-auto mb-2">
              Expert insights, success stories, and practical tips from our muscle activation and physiotherapy specialists
            </p>
          </div>

          {/* Blog Grid - Expandable Card Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-0">
            {blogPosts.map((post, index) => (
              <div key={post.id} className={`${index === 0 ? 'lg:col-span-2' : ''} ${index > 1 ? '-mt-24' : ''}`}>
                <CardContainer className="inter-var" containerClassName="py-0 flex items-center justify-center">
                  <CardBody className="bg-white relative group/card border border-[#F5F7FA] hover:border-[#007A7A] w-full h-auto rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300">
                    <Link href={`/blog/post/${post.id}`} className="block">
                      <motion.div
                        className="flex flex-col hover:bg-[#F5F7FA]/50 rounded-xl cursor-pointer transition-colors duration-300"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex gap-2 flex-col w-full">
                          <CardItem translateZ="200" className="w-full">
                            <motion.div className="relative overflow-hidden rounded-lg">
                              {post.image && (
                                <img
                                  src={post.image}
                                  alt={post.title}
                                  className={`w-full ${index === 0 ? 'h-64' : 'h-48'} object-cover object-center group-hover/card:scale-105 transition-transform duration-300`}
                                />
                              )}
                              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-2xl text-xs font-medium text-[#1c4064] shadow-sm">
                                {post.category}
                              </div>
                            </motion.div>
                          </CardItem>
                          
                          <div className="flex justify-center items-center flex-col space-y-1">
                            <CardItem
                              translateZ="150"
                              className="text-xl font-bold text-[#1c4064] w-full"
                            >
                              <motion.h3
                                className="font-bold text-[#1c4064] text-center md:text-left text-xl group-hover/card:text-[#007A7A] transition-colors duration-300"
                              >
                                {post.title}
                              </motion.h3>
                            </CardItem>
                            
                            <CardItem
                              translateZ="120"
                              className="text-[#1c4064] text-sm w-full"
                            >
                              <motion.p
                                className="text-[#1c4064] text-center md:text-left text-base opacity-80 line-clamp-3"
                              >
                                {post.description}
                              </motion.p>
                            </CardItem>
                          </div>
                        </div>

                        {/* Date/Time on left, Read Article button on right */}
                        <div className="flex justify-between items-center mt-4 mb-2 px-1">
                          <div className="flex flex-col items-start text-[#1c4064] text-xs">
                            <span className="font-medium">{post.date}</span>
                            <span className="opacity-70">{post.readTime}</span>
                          </div>
                          
                          <CardItem translateZ="100">
                            <motion.div 
                              className="px-4 py-2 bg-[#007A7A] text-white text-xs font-medium rounded-2xl group-hover/card:bg-[#1c4064] transition-colors duration-300 flex items-center gap-1"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Read Article
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </motion.div>
                          </CardItem>
                        </div>
                      </motion.div>
                    </Link>
                  </CardBody>
                </CardContainer>
              </div>
            ))}
          </div>
        </div>
      </main>

      <StickyFooter />
    </>
  );
} 