"use client";
import { cn } from "../../lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState, useCallback, useMemo } from "react";
import Link from "next/link";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  // Optimize scroll event with throttling
  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeVisible = latest > 100;
    if (shouldBeVisible !== visible) {
      setVisible(shouldBeVisible);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-10 z-[9999] w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, visible }: { children: React.ReactNode; visible?: boolean }) => {
  // Memoize animation values to prevent unnecessary re-renders
  const animationValues = useMemo(() => ({
    backdropFilter: visible ? "blur(8px)" : "none",
    boxShadow: visible
      ? "0 4px 20px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
      : "none",
    width: visible ? "40%" : "100%",
    y: visible ? 10 : 0,
  }), [visible]);

  return (
    <motion.div
      animate={animationValues}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 30,
        mass: 0.8,
      }}
      style={{
        minWidth: "800px",
        willChange: "transform, backdrop-filter, box-shadow",
      }}
      className={cn(
        "relative z-[9999] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-xl bg-transparent px-8 py-2 lg:flex gap-4",
        visible && "bg-white/70",
      )}
    >
      <div className="flex-1 flex justify-start">
        {React.Children.toArray(children)[0]}
      </div>
      <div className="flex-1 flex justify-center px-4">
        {React.Children.toArray(children)[1]}
      </div>
      <div className="flex-1 flex justify-end">
        {React.Children.toArray(children)[2]}
      </div>
    </motion.div>
  );
};

export const NavItems = ({ items }: { items: { name: string; link: string }[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredRect, setHoveredRect] = useState<{ width: number; height: number; left: number; top: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback((idx: number, event: React.MouseEvent<HTMLAnchorElement>) => {
    setHoveredIndex(idx);
    
    const target = event.currentTarget;
    const container = containerRef.current;
    
    if (target && container) {
      const targetRect = target.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      setHoveredRect({
        width: targetRect.width,
        height: targetRect.height,
        left: targetRect.left - containerRect.left,
        top: targetRect.top - containerRect.top,
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setHoveredRect(null);
  }, []);

  return (
    <div ref={containerRef} className="flex space-x-4 lg:space-x-6 relative">
      {items.map((item, idx) => (
        <a
          key={`link-${idx}`}
          href={item.link}
          className="relative text-[#1c4064] hover:text-[#007A7A] px-3 py-2 rounded-2xl text-base lg:text-lg font-medium transition-all duration-300 whitespace-nowrap hover:shadow-sm z-[9999]"
          onMouseEnter={(e) => handleMouseEnter(idx, e)}
          onMouseLeave={handleMouseLeave}
        >
          <span className="block relative z-[9999]">{item.name}</span>
        </a>
      ))}
      
      {/* Animated Background Indicator */}
      <AnimatePresence>
        {hoveredIndex !== null && hoveredRect && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute bg-[#007A7A]/10 border border-[#007A7A] rounded-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1,
              scale: 1,
              x: hoveredRect.left,
              y: hoveredRect.top,
              width: hoveredRect.width,
              height: hoveredRect.height,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  // Simplified animation values for mobile
  const mobileAnimationValues = useMemo(() => ({
    backdropFilter: visible ? "blur(8px)" : "none",
    boxShadow: visible
      ? "0 4px 20px rgba(0, 0, 0, 0.1)"
      : "none",
    width: visible ? "90%" : "100%",
    paddingRight: visible ? "12px" : "0px",
    paddingLeft: visible ? "12px" : "0px",
    borderRadius: visible ? "4px" : "2rem",
    y: visible ? 10 : 0,
  }), [visible]);

  return (
    <motion.div
      animate={mobileAnimationValues}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 30,
        mass: 0.8,
      }}
      style={{
        willChange: "transform, backdrop-filter, box-shadow",
      }}
      className={cn(
        "relative z-[9999] mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-white/70",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-[9999] flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white border border-[#F5F7FA] px-4 py-8 shadow-[0_0_24px_rgba(10,37,64,0.06),_0_1px_1px_rgba(10,37,64,0.05),_0_0_0_1px_rgba(10,37,64,0.04),_0_0_4px_rgba(10,37,64,0.08),_0_16px_68px_rgba(10,37,64,0.05)]",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-[#1c4064] hover:text-[#FF6B35] transition-colors duration-200 cursor-pointer" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-[#1c4064] hover:text-[#FF6B35] transition-colors duration-200 cursor-pointer" onClick={onClick} />
  );
};

export const NavbarLogo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn(
        "font-bold text-xl md:text-2xl lg:text-3xl text-[#1c4064] hover:opacity-80 transition-opacity whitespace-nowrap",
        className
      )}
    >
      MAT San Jose
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 h-10 rounded-2xl text-base font-bold relative cursor-pointer transition duration-200 inline-flex items-center justify-center text-center leading-none";

  const variantStyles = {
    primary:
      "bg-[#F5F7FA] text-[#1c4064] border border-[#1c4064] hover:bg-[#00B3A6] hover:text-white shadow-[0_0_24px_rgba(28,64,100,0.06),_0_1px_1px_rgba(28,64,100,0.05),_0_0_0_1px_rgba(28,64,100,0.04)]",
    secondary: "bg-transparent text-[#00B3A6] hover:text-[#1c4064] shadow-none",
    dark: "bg-[#1c4064] text-white hover:bg-[#00B3A6] shadow-[0_0_24px_rgba(28,64,100,0.06),_0_1px_1px_rgba(28,64,100,0.05)]",
    gradient:
      "bg-[#FF6B35] hover:bg-[#00B3A6] text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
