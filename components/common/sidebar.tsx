"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutGrid,
  BookOpen,
  Link2,
  FileText,
  Settings,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  Rocket,
  ArrowUpRight,
} from "lucide-react";

interface SidebarProps {
  currentPath?: string;
}

export default function Sidebar({ currentPath = "/dashboard" }: SidebarProps) {
  const [activeItem, setActiveItem] = useState(currentPath);
  const menuItems = [
    {
      group: "Home",
      items: [
        {
          name: "My Dashboard",
          icon: LayoutGrid,
          path: "/dashboard",
          hasArrow: true,
        },
        {
          name: "Playbooks",
          icon: BookOpen,
          path: "/playbooks",
          badge: {
            icon: Rocket,
            color: "w-[36px] h-[24px] flex items-center justify-center rounded-[12px] bg-[#FBF3DB]",
            iconColor: "w-[12px] h-[12px] text-[#CB912E]",
          },
        },
        {
          name: "Integrations",
          icon: Link2,
          path: "/integrations",
        },
      ],
    },
    {
      group: "Other",
      items: [
        {
          name: "Documentation",
          icon: FileText,
          path: "/documentation",
        },
        {
          name: "Settings",
          icon: Settings,
          path: "/settings",
        },
      ],
    },
  ];

  return (
    <aside className="w-[223px] h-screen border-r border-zinc-100 bg-white flex flex-col justify-between font-sans select-none shrink-0">
      {/* Top Section */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-zinc-100/80 flex items-center">
          <div className="flex items-center">
            <div className="relative w-7 h-7 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Bitscale Logo"
                fill
                sizes="28px"
                className="object-contain"
                priority
              />
            </div>
            <span className="font-cal font-semibold text-[25.62px] leading-[18.35px] tracking-[-0.07px] text-black text-center align-middle translate-y-[4px]">
              itscale
            </span>
          </div>
        </div>

        {/* Workspace Switcher */}
        <div className="px-4 py-3 border-b border-zinc-100/80">
          <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-zinc-50 transition-colors duration-200 group text-left">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-200">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&h=120&auto=format&fit=crop"
                  alt="Workspace Avatar"
                  fill
                  sizes="32px"
                  className="object-cover"
                  priority
                />
              </div>
              <span className="font-inter font-medium text-[14px] leading-[150%] tracking-normal text-[#1F2A37]">
                GTM Spaces
              </span>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 px-2 py-4 space-y-6">
          {menuItems.map((group) => (
            <div key={group.group} className="space-y-1.5">
              <h4 className="px-[8px] font-sans font-medium text-[12px] leading-[16px] tracking-normal text-[#6B7280]">
                {group.group}
              </h4>
              <ul className="space-y-2">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.path;

                  const isPlaybook = item.name === "Playbooks";

                  return (
                    <li key={item.name}>
                      <button
                        onClick={() => setActiveItem(item.path)}
                        className={`w-[207px] h-[34px] flex items-center justify-between p-[8px] rounded-[8px] border-l text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-[#F3F4F6] text-[#1A56DB] border-l-transparent"
                            : isPlaybook
                            ? "bg-transparent text-[#9CA3AF] border-l-transparent hover:bg-zinc-50"
                            : "bg-transparent text-[#1F2A37] border-l-transparent hover:bg-zinc-50"
                        }`}
                      >
                        <div className="flex items-center gap-[8px]">
                          <Icon
                            className={`w-4 h-4 stroke-[2.2] ${
                              isActive
                                ? "text-[#1A56DB]"
                                : isPlaybook
                                ? "text-[#9CA3AF]"
                                : "text-[#1F2A37]"
                            }`}
                          />
                          <span className="font-inter font-normal text-[14px] leading-[17.14px] tracking-normal">
                            {item.name}
                          </span>
                        </div>

                        {/* Badge or Arrow indicator */}
                        {isActive && item.hasArrow && (
                          <ChevronRight className="w-4 h-4 text-[#1A56DB] stroke-[2.5]" />
                        )}

                        {item.badge && (
                          <span
                            className={item.badge.color}
                          >
                            <item.badge.icon className={item.badge.iconColor} />
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-zinc-100/80 bg-zinc-50/50">
        <div className="bg-white border border-zinc-200/80 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <div className="relative w-6 h-6 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Bitscale Logo"
                  fill
                  sizes="24px"
                  className="object-contain"
                />
              </div>
              <span className="font-cal font-semibold text-[21.96px] leading-[15.73px] tracking-[-0.07px] text-black text-center align-middle translate-y-[5px]">
                itscale
              </span>
            </div>
            <ChevronUp className="w-4 h-4 text-zinc-400 cursor-pointer hover:text-zinc-600 transition-colors" />
          </div>
          <Link
            href="#"
            className="font-inter font-medium text-[12px] leading-[150%] tracking-normal text-[#4B5563] hover:text-zinc-800 transition-colors flex items-center gap-1 group"
          >
            Get Support at Bitscale
          </Link>
        </div>
      </div>
    </aside>
  );
}
