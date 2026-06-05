import React from "react";
import Image from "next/image";
import { Coins } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full h-[70px] bg-white border-b border-zinc-100 flex items-center justify-end px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        {/* Credits Pill */}
        <div className="flex items-center gap-[2px] bg-[#EDF3EC] rounded-[10.5px] h-[34px] pl-3 pr-[8px]">
          <div className="flex items-center justify-center gap-2 text-[#438361] mr-2 h-[25px]">
            <Coins className="w-4 h-4" />
            <span className="font-['Lato'] font-medium text-[14px] leading-none text-center">450000/5500000</span>
          </div>
          <button className="flex items-center justify-center w-[89px] h-[22px] gap-[3.5px] bg-[#438361] text-white font-sans font-medium text-[12px] leading-[16px] px-[7px] py-[1.75px] rounded-[8.5px] hover:bg-[#36694e] transition-colors">
            Booster Plan
          </button>
        </div>

        {/* User Avatar */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-200 cursor-pointer">
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=120&h=120&auto=format&fit=crop"
            alt="User Avatar"
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}