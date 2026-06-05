"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Building2, User, Plus, Check, ClipboardList } from "lucide-react";
import FindPeopleModal from "./FindPeopleModal";

export default function Greeting() {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&h=250&auto=format&fit=crop",
      title: "How to Integrate 2 Way HubSpot",
      description: "Prerequisites for this Integration is that you should have a HubSpot account and Copy the API key. We simple add our API key through the integrations pa..."
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&h=250&auto=format&fit=crop",
      title: "Automating Email Workflows",
      description: "Learn how to save hours every week by setting up automated email workflows. We'll guide you through setting triggers and conditional logic."
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&h=250&auto=format&fit=crop",
      title: "Mastering the Analytics Dashboard",
      description: "Get the most out of your data with our advanced analytics dashboard. Discover hidden trends and optimize your strategies for maximum impact."
    }
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isFindPeopleOpen, setIsFindPeopleOpen] = useState(false);

  const extendedSlides = [...slides, slides[0]];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => prev + 1);
    }, 5000);

    const progressTimer = setTimeout(() => {
      setProgress(75);
    }, 300);

    return () => {
      clearInterval(timer);
      clearTimeout(progressTimer);
    };
  }, []);

  useEffect(() => {
    if (currentImage === slides.length) {
      const resetTimeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentImage(0);
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 700);
      return () => clearTimeout(resetTimeout);
    }
  }, [currentImage, slides.length]);

  return (
    <div className="flex flex-col w-full h-full">
      {/* Header Row: Welcome + Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <div className="min-w-0">
          <h1 className="font-['Inter'] font-semibold text-[16px] sm:text-[18px] leading-[1.4] tracking-[-0.44px] text-[#1A202C] truncate">
            Welcome back, Ron !
          </h1>
          <p className="font-['Inter'] font-normal text-[12px] sm:text-[14px] leading-[21px] tracking-[-0.15px] text-[#6B7280] mt-0.5 sm:mt-1">
            Here&apos;s your daily scoop on Bitscale!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-shrink-0">
          <button className="flex items-center justify-center gap-[6px] sm:gap-[8px] px-2.5 sm:px-3 h-[30px] sm:h-[34px] border-[1.02px] border-[#E5E7EB] rounded-[6.78px] bg-white text-[#1F2A37] font-['Inter'] font-medium text-[11px] sm:text-[12.26px] leading-[1.5] hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap">
            <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#059669] flex-shrink-0" />
            Find Companies
          </button>
          <button 
            onClick={() => setIsFindPeopleOpen(true)}
            className="flex items-center justify-center gap-[6px] sm:gap-[8px] px-2.5 sm:px-3 h-[30px] sm:h-[34px] border-[1.02px] border-[#E5E7EB] rounded-[6.78px] bg-white text-[#1F2A37] font-['Inter'] font-medium text-[11px] sm:text-[12.26px] leading-[1.5] hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap"
          >
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B5CF6] flex-shrink-0" />
            Find People
          </button>
          <button className="flex items-center justify-center gap-[6px] sm:gap-[8px] px-3 sm:px-4 h-[30px] sm:h-[34px] rounded-[6.78px] bg-[#1F2A37] text-white font-['Inter'] font-medium text-[11px] sm:text-[12.26px] leading-[1.5] hover:bg-[#111827] transition-colors shadow-sm whitespace-nowrap">
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            New Grid
          </button>
        </div>
      </div>

      {/* Cards Row */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-5">

        {/* Left Card: Latest from Bitscale */}
        <div className="bg-[#E7F3F8]/50 rounded-[8px] py-3 sm:py-4 px-4 sm:px-5 flex flex-col gap-3 w-full lg:w-1/2 border border-zinc-100 shadow-sm min-h-[130px] sm:min-h-[150px] lg:h-[166px]">
          {/* Card Header */}
          <div className="flex items-center justify-between flex-shrink-0">
            <h3 className="font-['Inter'] font-medium text-[13px] sm:text-[14px] leading-[21px] tracking-[-0.15px] text-[#347FA9]">Latest from Bitscale</h3>
            <div className="flex gap-1 items-center">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-[5px] sm:h-[6px] rounded-full transition-all duration-300 ${(currentImage % slides.length) === i ? 'w-[16px] sm:w-[18px] bg-[#4B8599]' : 'w-[5px] sm:w-[6px] bg-[#A1C5D3]'}`}
                ></div>
              ))}
            </div>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden w-full flex-1 min-h-0">
            <div
              className={`flex h-full gap-4 ease-in-out ${isTransitioning ? 'transition-transform duration-700' : ''}`}
              style={{ transform: `translateX(calc(-${currentImage * 100}% - ${currentImage * 16}px))` }}
            >
              {extendedSlides.map((slide, index) => (
                <div key={index} className="flex flex-row gap-3 sm:gap-4 min-w-full h-full">
                  {/* Video Thumbnail */}
                  <div className="relative w-[110px] sm:w-[143px] flex-shrink-0 rounded-[8px] sm:rounded-[10px] shadow-md overflow-hidden bg-gray-200 border border-zinc-200 self-stretch">
                    <Image
                      src={slide.image}
                      alt={`Video Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform">
                        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[9px] border-l-black border-b-[5px] border-b-transparent ml-0.5 sm:ml-1"></div>
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col justify-between py-0.5 min-w-0 flex-1">
                    <div>
                      <h4 className="font-['Inter'] font-medium text-[12px] sm:text-[13px] leading-[16px] tracking-[0px] text-[#1F2A37] mb-1 sm:mb-1.5 line-clamp-2">
                        {slide.title}
                      </h4>
                      <p className="font-['Inter'] font-normal text-[11px] sm:text-[12px] leading-[15px] sm:leading-[16px] tracking-[0px] text-[#6B7280] line-clamp-2 sm:line-clamp-3">
                        {slide.description}
                      </p>
                    </div>
                    <span className="font-['Inter'] font-normal text-[10px] leading-[16px] tracking-[0px] text-[#9CA3AF] mt-1 block">Posted today</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Complete product demo */}
        <div
          className="border border-[#E5E7EB] border-t-[#E7F3F8] rounded-[8px] px-4 sm:px-5 py-3 sm:py-4 lg:py-5 flex flex-col w-full lg:w-1/2 shadow-sm min-h-[130px] sm:min-h-[150px] lg:h-[166px] bg-[linear-gradient(332.99deg,rgba(255,255,255,0.5)_35.17%,rgba(231,243,248,0.5)_83.22%)]"
        >
          {/* Card Header */}
          <div className="flex items-start gap-2.5 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-[30px] h-[30px] sm:w-[33px] sm:h-[33px] rounded-full bg-[#4B5563] flex items-center justify-center flex-shrink-0">
              <ClipboardList className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-['Inter'] font-medium text-[13px] sm:text-[14px] leading-none tracking-[0px] align-middle text-[#383530]">Complete product demo</h3>
              <p className="font-['Inter'] font-normal text-[11px] sm:text-[12px] leading-[18px] sm:leading-[19.75px] tracking-[-0.26px] text-[#383530] mt-0.5">92% of users nailed BitScale after this walkthrough</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="flex-1 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#438361] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="font-['Inter'] font-semibold text-[10px] leading-[19.75px] tracking-[-0.26px] text-[#438361] min-w-[28px] text-right">75%</span>
          </div>

          {/* Checklist — 2x2 grid on sm+, stacked on mobile */}
          <div className="grid grid-cols-2 gap-y-2 sm:gap-y-2.5 gap-x-4 sm:gap-x-8 lg:gap-x-16">
            {[
              { done: true, label: "Create your data list" },
              { done: true, label: "Learn about BitAgent" },
              { done: true, label: "Connect an integration" },
              { done: false, label: "Customise waterfall providers" },
            ].map(({ done, label }) => (
              <div key={label} className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                {done ? (
                  <div className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] rounded-full bg-[#347FA9] flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] rounded-full border-2 border-[#D1D5DB] flex-shrink-0"></div>
                )}
                <span className={`font-['Inter'] font-medium text-[10px] sm:text-[12px] leading-[18px] sm:leading-[20px] tracking-[-0.15px] truncate ${done ? 'text-[#374151]' : 'text-[#4B5563]'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
      
      <FindPeopleModal isOpen={isFindPeopleOpen} onClose={() => setIsFindPeopleOpen(false)} />
    </div>
  );
}
