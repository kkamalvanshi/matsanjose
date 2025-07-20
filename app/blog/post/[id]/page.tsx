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
} from "../../../../components/ui/resizable-navbar";
import { TracingBeam } from "../../../../components/ui/tracing-beam";
import StickyFooter from "../../../../components/ui/sticky-footer";
import Link from "next/link";
import { useParams } from "next/navigation";

import { navItems } from "../../../../lib/navigation";

// Sample blog posts data (same as blog page for consistency)
const blogPosts = [
  {
    id: 1,
    title: "Understanding Muscle Activation Techniques",
    category: "MAT Therapy",
    readTime: "5 min read",
    date: "Dec 15, 2024",
    author: "Scott Lamb",
    image: "/matTherapy.jpg",
    content: `
      <h2>What is Muscle Activation Techniques (MAT)?</h2>
      <p>Muscle Activation Techniques (MAT) represents a revolutionary approach to addressing muscle imbalances and dysfunction that goes far beyond traditional treatment methods. Unlike conventional approaches that focus primarily on stretching tight muscles, MAT takes a comprehensive approach by identifying and correcting the underlying causes of muscle weakness and compensation patterns that lead to pain and dysfunction.</p>
      
      <h3>The Science Behind MAT</h3>
      <p>The foundation of MAT lies in understanding how our muscular system responds to stress, overuse, and injury. When muscles become weak or inhibited due to these factors, our body's natural response is to recruit other muscles to compensate and maintain essential functions. While this compensation mechanism serves us in the short term, it ultimately creates imbalances throughout the kinetic chain that manifest as pain, reduced performance, and increased injury risk.</p>
      
      <p>MAT practitioners use precise assessment techniques to identify these weak or inhibited muscles through systematic testing protocols. Once identified, specific activation techniques are employed to restore proper muscle function, improve overall muscle balance and coordination, and enhance the body's natural healing capabilities. This targeted approach ensures that treatment addresses root causes rather than simply managing symptoms.</p>
      
      <h3>Benefits of MAT Therapy</h3>
      <p>Clients who undergo MAT therapy consistently report transformative results that extend far beyond pain relief. Many experience significant reductions in chronic pain that they've struggled with for months or even years. The therapy's focus on proper muscle activation leads to improved posture and alignment, which not only enhances appearance but also optimizes biomechanical function throughout daily activities.</p>
      
      <p>Athletes and active individuals particularly benefit from MAT's ability to enhance athletic performance through improved muscle coordination and power generation. The therapy also increases range of motion by addressing the muscular restrictions that limit movement, leading to better overall quality of life and the ability to engage in activities that may have been previously limited by pain or dysfunction.</p>
      
      <h3>What to Expect During Your MAT Session</h3>
      <p>A typical MAT session begins with a comprehensive assessment designed to identify specific muscle imbalances and movement restrictions. This evaluation process involves systematic testing of muscle function throughout the body, allowing the practitioner to develop a clear understanding of compensation patterns and areas requiring attention.</p>
      
      <p>Following the assessment, the practitioner implements specific activation techniques tailored to your individual needs. These techniques are gentle yet precise, focusing on re-establishing proper nerve-to-muscle communication and restoring optimal muscle function. Our certified MAT specialist works collaboratively with you throughout this process, developing a personalized treatment plan that addresses your specific concerns and goals while ensuring sustainable long-term results.</p>
    `
  },
  {
    id: 2,
    title: "The Science Behind Shockwave Therapy",
    category: "Shockwave Therapy",
    readTime: "4 min read",
    date: "Dec 12, 2024",
    author: "Scott Lamb",
    image: "/shockwave.png",
    content: `
      <h2>Revolutionary Healing with Acoustic Waves</h2>
      <p>Shockwave therapy, also known as Extracorporeal Shock Wave Therapy (ESWT), represents a groundbreaking advancement in non-invasive treatment for musculoskeletal conditions. This FDA-approved therapy harnesses the power of focused acoustic waves to stimulate healing in injured tissues, offering patients an effective alternative to invasive procedures and long-term medication dependence.</p>
      
      <h3>How Shockwave Therapy Works</h3>
      <p>The therapeutic mechanism of shockwave therapy involves delivering high-energy acoustic pulses to affected tissue areas, creating a cascade of beneficial biological responses. These controlled acoustic waves penetrate deep into tissues to increase blood flow and circulation, promoting the delivery of essential nutrients and oxygen to injured areas. The therapy effectively breaks down scar tissue and calcifications that may be impeding natural healing processes, while simultaneously stimulating the production of stem cells that are crucial for tissue regeneration.</p>
      
      <p>Additionally, the acoustic waves trigger the release of growth factors that accelerate the healing process and work to reduce inflammation throughout the treated area. This multi-faceted approach to healing addresses both the symptoms and underlying causes of many chronic musculoskeletal conditions, making it particularly effective for patients who have not responded well to traditional treatment methods.</p>
      
      <h3>Conditions Successfully Treated</h3>
      <p>Shockwave therapy has demonstrated remarkable effectiveness in treating a wide range of chronic and acute musculoskeletal conditions. Plantar fasciitis, one of the most common causes of heel pain, responds exceptionally well to this treatment, with many patients experiencing significant relief after just a few sessions. Tennis elbow, or lateral epicondylitis, which affects both athletes and office workers, has shown excellent response rates to shockwave therapy.</p>
      
      <p>The therapy is also highly effective for shoulder calcifications, where calcium deposits cause pain and restricted movement, and Achilles tendinopathy, a common injury among runners and athletes. Many chronic tendon injuries that have proven resistant to other treatment modalities often respond favorably to the targeted acoustic wave therapy, making it an invaluable tool in our treatment arsenal.</p>
      
      <h3>Treatment Process and Recovery</h3>
      <p>Each shockwave therapy session is carefully designed to maximize therapeutic benefit while ensuring patient comfort. Sessions typically last between 15-20 minutes, during which the acoustic waves are precisely targeted to the affected area. Most patients require a series of 3-5 sessions spaced approximately one week apart, allowing the body time to respond and heal between treatments.</p>
      
      <p>While patients may experience mild discomfort during the session, this sensation is temporary and often indicates that the therapy is effectively targeting the problem area. Many patients begin to notice improvement within the first few treatments, with continued and often dramatic improvement occurring over the following weeks as the body's natural healing processes are fully activated and optimized.</p>
    `
  },
  {
    id: 3,
    title: "Posture Correction: From Forward Head to Perfect Alignment",
    category: "Posture",
    readTime: "6 min read",
    date: "Dec 10, 2024",
    author: "Scott Lamb",
    image: "/before.png",
    content: `
      <h2>The Modern Posture Crisis</h2>
      <p>In our increasingly digital world, forward head posture has evolved from an occasional complaint to a widespread epidemic affecting millions of people across all age groups. The countless hours we spend hunched over computers, smartphones, and various digital devices have fundamentally altered how we hold ourselves, creating a generation of individuals suffering from chronic neck pain, persistent headaches, and progressive postural dysfunction that extends far beyond simple aesthetics.</p>
      
      <h3>Understanding Forward Head Posture</h3>
      <p>Forward head posture develops when the head gradually shifts forward from its natural, balanced position directly over the shoulders. This seemingly minor displacement has profound biomechanical consequences, as the laws of physics dictate that for every inch the head moves forward from its optimal position, the effective weight that the neck muscles must support essentially doubles. What begins as a 10-12 pound head can quickly become a 20-24 pound burden that the cervical spine and supporting musculature must constantly manage.</p>
      
      <h3>The Far-Reaching Consequences</h3>
      <p>The impact of poor posture extends well beyond cosmetic concerns, creating a complex web of health complications that can significantly diminish quality of life. Chronic neck and shoulder pain often develops as the muscles in these areas work overtime to support the improperly positioned head. This muscular strain frequently leads to frequent headaches and migraines as tension builds throughout the cervical region and affects surrounding nerve pathways.</p>
      
      <p>Perhaps more concerning are the systemic effects of forward head posture, including reduced lung capacity as the ribcage becomes compressed and breathing becomes more shallow and labored. TMJ disorders often develop as the jaw position shifts to accommodate the altered head position, while nerve compression can occur as postural changes create pressure on vital nerve pathways. Many patients also report decreased energy levels, likely due to the increased metabolic demands of maintaining poor posture and the resulting impact on breathing efficiency.</p>
      
      <h3>Our Comprehensive Treatment Approach</h3>
      <p>At MAT San Jose, we recognize that effective posture correction requires a multifaceted approach that addresses all contributing factors. Our treatment process begins with a comprehensive posture analysis that identifies specific imbalances and movement patterns unique to each individual. This detailed assessment allows us to understand not just what muscles are affected, but how the entire kinetic chain has adapted to accommodate postural dysfunction.</p>
      
      <p>Our MAT therapy focuses specifically on activating weak deep neck flexors and posterior chain muscles that are often inhibited in cases of forward head posture. We complement this with targeted manual therapy techniques designed to release chronically tight chest and anterior neck muscles that pull the head and shoulders into poor alignment. Each patient receives a specific exercise prescription tailored to their individual needs, focusing on strengthening weak muscles and maintaining proper alignment throughout daily activities.</p>
      
      <p>Education plays a crucial role in our approach, as we provide comprehensive ergonomic guidance and lifestyle modifications that address the root causes of postural dysfunction. This includes workspace setup recommendations, movement strategies for prolonged sitting, and daily habits that support optimal postural health.</p>
      
      <h3>Proven Success Stories</h3>
      <p>The transformative power of our comprehensive approach is best demonstrated through the remarkable results achieved by our clients. We have successfully helped hundreds of individuals completely transform their posture and eliminate chronic pain that had been affecting their lives for months or even years. Our extensive collection of before and after documentation clearly demonstrates the dramatic improvements possible when the right treatment approach is combined with patient commitment to positive change and long-term postural health.</p>
    `
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const postId = parseInt(params.id as string);
  const post = blogPosts.find(p => p.id === postId);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1c4064] mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-[#007A7A] hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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
      <main className="relative z-10 min-h-screen bg-[#F5F5F5] pt-32 pb-20">
        <TracingBeam className="px-6">
          <div className="max-w-2xl mx-auto antialiased pt-4 relative">
            {/* Back Link */}
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-[#007A7A] hover:text-[#1c4064] transition-colors mb-8 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Blog
            </Link>

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 text-sm text-[#007A7A] mb-4">
                <span className="bg-[#007A7A]/10 px-3 py-1 rounded-2xl">{post.category}</span>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-[#1c4064] mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-4 text-[#1c4064]">
                <span>By {post.author}</span>
              </div>
            </div>

            {/* Featured Image */}
            {post.image && (
              <div className="mb-8">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div 
              className="blog-content max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Call to Action */}
            <div className="mt-16 p-8 bg-gradient-to-br from-[#007A7A] to-[#1c4064] rounded-2xl text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Health?</h3>
              <p className="mb-6 opacity-90">
                Schedule a consultation with our expert team and start your journey to pain-free living.
              </p>
              <NavbarButton variant="primary" className="!bg-[#F5F5F5] !text-[#1c4064] !hover:bg-[#F5F5F5] !hover:text-[#1c4064] hover:scale-105 transition-transform duration-200">
                Book Your Session
              </NavbarButton>
            </div>

            {/* Navigation to other posts */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                {postId > 1 && (
                  <Link 
                    href={`/blog/post/${postId - 1}`}
                    className="text-[#007A7A] hover:text-[#1c4064] transition-colors"
                  >
                    ← Previous Post
                  </Link>
                )}
                {postId < blogPosts.length && (
                  <Link 
                    href={`/blog/post/${postId + 1}`}
                    className="text-[#007A7A] hover:text-[#1c4064] transition-colors ml-auto"
                  >
                    Next Post →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </TracingBeam>
      </main>

      <StickyFooter />
    </>
  );
} 