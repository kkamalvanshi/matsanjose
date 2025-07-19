import React from "react";
import ComesInGoesOutUnderline from "./underline-comes-in-goes-out";

const StickyFooter: React.FC = () => {
  return (
    <div className="relative w-full h-80 footer-gradient flex justify-center items-center">
      <div className="relative overflow-hidden w-full h-full flex justify-end px-12 text-right items-start py-12 text-white shadow-2xl">
        <div className="flex flex-row space-x-12 sm:space-x-16 md:space-x-24 text-sm sm:text-lg md:text-xl">
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-[#F5F5F5] transition-colors duration-200">
              <ComesInGoesOutUnderline direction="left">HOME</ComesInGoesOutUnderline>
            </li>
            <li className="cursor-pointer hover:text-[#F5F5F5] transition-colors duration-200">
              <ComesInGoesOutUnderline direction="left">MAT THERAPY</ComesInGoesOutUnderline>
            </li>
            <li className="cursor-pointer hover:text-[#F5F5F5] transition-colors duration-200">
              <ComesInGoesOutUnderline direction="left">SPORTS REHAB</ComesInGoesOutUnderline>
            </li>
          </ul>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-[#F5F5F5] transition-colors duration-200">
              <ComesInGoesOutUnderline direction="right">CONTACT</ComesInGoesOutUnderline>
            </li>
            <li className="cursor-pointer hover:text-[#F5F5F5] transition-colors duration-200">
              <ComesInGoesOutUnderline direction="right">TESTIMONIALS</ComesInGoesOutUnderline>
            </li>
            <li className="cursor-pointer hover:text-[#F5F5F5] transition-colors duration-200">
              <ComesInGoesOutUnderline direction="right">BOOK SESSION</ComesInGoesOutUnderline>
            </li>
          </ul>
        </div>
        
        <h2 className="absolute bottom-0 left-0 translate-y-1/3 sm:text-[192px] text-[80px] text-[#F5F5F5] font-bold uppercase">
          MATSANJOSE
        </h2>
        
        <div className="absolute bottom-4 right-4 text-xs text-white/60">
          Made with ❤️ in California
        </div>
      </div>
    </div>
  );
};

export default StickyFooter;
