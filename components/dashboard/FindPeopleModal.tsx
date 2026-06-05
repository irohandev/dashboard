"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Search,
  User,
  Users,
  Briefcase,
  Globe,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Save,
  Eye,
  Lock,
  Building2,
  Bookmark
} from "lucide-react";

interface FindPeopleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FindPeopleModal({ isOpen, onClose }: FindPeopleModalProps) {
  // State for collapsible filter sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    peopleKeyword: true,
    jobTitle: false,
    companyWebsite: false,
    personLocation: false,
    companyLocation: false,
    companyHeadcount: false,
    managementLevel: false,
  });

  // Input states for form fields
  const [filters, setFilters] = useState({
    peopleKeyword: "",
    jobTitle: "",
    companyWebsite: "",
    personLocation: "",
    companyLocation: "",
    companyHeadcount: "",
    managementLevel: "",
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      peopleKeyword: "",
      jobTitle: "",
      companyWebsite: "",
      personLocation: "",
      companyLocation: "",
      companyHeadcount: "",
      managementLevel: "",
    });
  };

  useEffect(() => {
    const mainElement = document.querySelector("main");
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (mainElement) mainElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (mainElement) mainElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      if (mainElement) mainElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md transition-opacity duration-300 animate-in fade-in">
      {/* Click outside to close backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-[1200px] h-[90vh] max-h-[850px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-200/80 z-10 animate-in zoom-in-95 duration-200">
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LEFT COLUMN: Sidebar Filters */}
        <div className="w-full md:w-[320px] lg:w-[350px] bg-[#F9FAFB] border-r border-gray-200/80 flex flex-col h-full shrink-0">
          
          {/* Sidebar Header */}
          <div className="p-4 sm:p-5 pb-3 flex items-center justify-between border-b border-gray-100 bg-white shrink-0">
            <h2 className="font-['Inter'] font-semibold text-[16px] sm:text-[18px] text-[#1F2A37] tracking-tight">
              Find People
            </h2>
            <button className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-gray-700 bg-gray-100/70 hover:bg-gray-200/80 border border-gray-200/50 rounded-md transition-all">
              <ChevronDown className="w-3 h-3 text-gray-500" />
              Saved Search
            </button>
          </div>

          {/* Collapsible Inputs Area */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-5 space-y-4">
            
            {/* 1. People Keyword */}
            <div className="border-b border-gray-200/50 pb-3">
              <button
                onClick={() => toggleSection("peopleKeyword")}
                className="w-full flex items-center justify-between text-left text-gray-700 hover:text-gray-900 focus:outline-none py-1 group"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                  <span className="font-['Inter'] font-semibold text-[14px] leading-[1.5] tracking-[0px] text-[#111928]">
                    People Keyword
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${
                    expandedSections.peopleKeyword ? "" : "rotate-180"
                  }`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${
                  expandedSections.peopleKeyword
                    ? "grid-rows-[1fr] opacity-100 mt-2.5"
                    : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="relative">
                    <Search className="absolute left-3 top-[11px] w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      value={filters.peopleKeyword}
                      onChange={(e) => handleInputChange("peopleKeyword", e.target.value)}
                      placeholder="Enter single keyword here..."
                      className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Job Title */}
            <div className="border-b border-gray-200/50 pb-3">
              <button
                onClick={() => toggleSection("jobTitle")}
                className="w-full flex items-center justify-between text-left text-gray-700 hover:text-gray-900 focus:outline-none py-1 group"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                  <span className="font-['Inter'] font-semibold text-[14px] leading-[1.5] tracking-[0px] text-[#111928]">
                    Job Title
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${
                    expandedSections.jobTitle ? "" : "rotate-180"
                  }`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${
                  expandedSections.jobTitle
                    ? "grid-rows-[1fr] opacity-100 mt-2.5"
                    : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <input
                    type="text"
                    value={filters.jobTitle}
                    onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                    placeholder="E.g: Manager, Software Engineer"
                    className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* 3. Company Website */}
            <div className="border-b border-gray-200/50 pb-3">
              <button
                onClick={() => toggleSection("companyWebsite")}
                className="w-full flex items-center justify-between text-left text-gray-700 hover:text-gray-900 focus:outline-none py-1 group"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                  <span className="font-['Inter'] font-semibold text-[14px] leading-[1.5] tracking-[0px] text-[#111928]">
                    Company Website
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${
                    expandedSections.companyWebsite ? "" : "rotate-180"
                  }`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${
                  expandedSections.companyWebsite
                    ? "grid-rows-[1fr] opacity-100 mt-2.5"
                    : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <input
                    type="text"
                    value={filters.companyWebsite}
                    onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
                    placeholder="Eg: Google.com, LinkedIn.com"
                    className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* 4. Person Location */}
            <div className="border-b border-gray-200/50 pb-3">
              <button
                onClick={() => toggleSection("personLocation")}
                className="w-full flex items-center justify-between text-left text-gray-700 hover:text-gray-900 focus:outline-none py-1 group"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                  <span className="font-['Inter'] font-semibold text-[14px] leading-[1.5] tracking-[0px] text-[#111928]">
                    Person Location
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${
                    expandedSections.personLocation ? "" : "rotate-180"
                  }`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${
                  expandedSections.personLocation
                    ? "grid-rows-[1fr] opacity-100 mt-2.5"
                    : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <input
                    type="text"
                    value={filters.personLocation}
                    onChange={(e) => handleInputChange("personLocation", e.target.value)}
                    placeholder="Eg: London, Great New York City"
                    className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* 5. Company Location */}
            <div className="border-b border-gray-200/50 pb-3">
              <button
                onClick={() => toggleSection("companyLocation")}
                className="w-full flex items-center justify-between text-left text-gray-700 hover:text-gray-900 focus:outline-none py-1 group"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                  <span className="font-['Inter'] font-semibold text-[14px] leading-[1.5] tracking-[0px] text-[#111928]">
                    Company Location
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${
                    expandedSections.companyLocation ? "" : "rotate-180"
                  }`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${
                  expandedSections.companyLocation
                    ? "grid-rows-[1fr] opacity-100 mt-2.5"
                    : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <input
                    type="text"
                    value={filters.companyLocation}
                    onChange={(e) => handleInputChange("companyLocation", e.target.value)}
                    placeholder="E.g: United States, UAE"
                    className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* 6. Company Headcount */}
            <div className="border-b border-gray-200/50 pb-3">
              <button
                onClick={() => toggleSection("companyHeadcount")}
                className="w-full flex items-center justify-between text-left text-gray-700 hover:text-gray-900 focus:outline-none py-1 group"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                  <span className="font-['Inter'] font-semibold text-[14px] leading-[1.5] tracking-[0px] text-[#111928]">
                    Company Headcount
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${
                    expandedSections.companyHeadcount ? "" : "rotate-180"
                  }`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${
                  expandedSections.companyHeadcount
                    ? "grid-rows-[1fr] opacity-100 mt-2.5"
                    : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <input
                    type="text"
                    value={filters.companyHeadcount}
                    onChange={(e) => handleInputChange("companyHeadcount", e.target.value)}
                    placeholder="E.g: 11-50 , 10000+"
                    className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* 7. Management Level */}
            <div className="pb-1">
              <button
                onClick={() => toggleSection("managementLevel")}
                className="w-full flex items-center justify-between text-left text-gray-700 hover:text-gray-900 focus:outline-none py-1 group"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                  <span className="font-['Inter'] font-semibold text-[14px] leading-[1.5] tracking-[0px] text-[#111928]">
                    Management Level
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${
                    expandedSections.managementLevel ? "" : "rotate-180"
                  }`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${
                  expandedSections.managementLevel
                    ? "grid-rows-[1fr] opacity-100 mt-2.5"
                    : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <input
                    type="text"
                    value={filters.managementLevel}
                    onChange={(e) => handleInputChange("managementLevel", e.target.value)}
                    placeholder="E.g: Owner, Founder"
                    className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-xs"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Bottom Action Buttons */}
          <div className="p-4 bg-white border-t border-gray-150 flex items-center gap-2 shrink-0">
            <button
              onClick={handleClearFilters}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#E5E7EB] hover:bg-[#D1D5DB] border border-[#D1D5DB]/50 rounded-lg font-['Inter'] font-medium text-[12px] leading-[1.5] tracking-[0px] text-[#1F2A37] transition-all shadow-xs"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#1F2A37]" />
              Save Search
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#1F2A37] hover:bg-[#111827] rounded-lg font-['Inter'] font-medium text-[12px] leading-[1.5] tracking-[0px] text-[#FFFFFF] transition-all shadow-sm">
              <Eye className="w-3.5 h-3.5 text-[#FFFFFF]" />
              Preview Result
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Results Table Area */}
        <div className="flex-1 flex flex-col h-full bg-white relative">
          
          {/* Header Action Info Row */}
          <div className="px-6 pt-4 pb-4 border-b border-gray-100 flex flex-col gap-1 shrink-0 pr-16 bg-white z-10">
            {/* Top Row: Usage badge aligned right */}
            <div className="flex justify-end">
              <div className="flex items-center gap-1.5 bg-[#FBECDD] text-[#D9730E] px-3 py-1 rounded-full font-['Lato'] font-medium text-[12px] leading-none tracking-[0px] text-center">
                <Search className="w-3.5 h-3.5 text-[#D9730E]" />
                <span>8000/50000</span>modal 
              </div>
            </div>
            
            {/* Bottom Row: Both texts horizontally aligned */}
            <div className="flex flex-row items-center justify-between font-['Inter']">
              <div>
                <span className="font-['Inter'] font-medium text-[12px] leading-[1.5] tracking-[0px] text-[#4B5563]">
                  Found 0 companies. Click preview to view results
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-[#C27803] font-medium">
                <Lock className="w-3.5 h-3.5 text-[#C27803]" />
                <span>
                  Unlock <span className="font-semibold">100,000 leads</span> with Enterprise Plan*
                </span>
              </div>
            </div>
          </div>

          {/* Table Headers */}
          <div className="flex items-center py-3 px-6 bg-gray-50 border-b border-gray-100 select-none shrink-0 font-['Inter'] font-semibold text-[12px] leading-[1.5] tracking-[0px] uppercase text-[#6B7280]">
            <div className="w-[18%]">Name</div>
            <div className="w-[14%]">Title</div>
            <div className="w-[18%]">Headline</div>
            <div className="w-[18%]">Linkedin Url</div>
            <div className="w-[16%]">Company</div>
            <div className="w-[16%]">Company Url</div>
          </div>

          {/* Table Body - Empty State Illustration */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
            
            {/* SVG Checklist Illustration */}
            <div className="relative w-64 h-48 mb-6 flex items-center justify-center">
              <Image
                src="/find-modal.svg"
                alt="Find People Illustration"
                width={190}
                height={150}
                className="object-contain"
                priority
              />
            </div>

            {/* Empty State Instructions */}
            <div className="max-w-[480px] px-4">
              <p className="font-['Inter'] font-medium text-[13px] sm:text-[14px] leading-[21px] text-gray-400">
                Start your Company search , preview, and import companies
              </p>
              <p className="font-['Inter'] font-medium text-[13px] sm:text-[14px] leading-[21px] text-gray-400">
                for enrichment by applying any filter in the left panel.
              </p>
              
              <div className="my-2.5 flex items-center justify-center gap-3 text-gray-300 font-semibold text-[11px] uppercase tracking-wider">
                <div className="h-px bg-gray-200 w-8"></div>
                <span>or</span>
                <div className="h-px bg-gray-200 w-8"></div>
              </div>

              <p className="font-['Inter'] font-medium text-[13px] sm:text-[14px] leading-[21px] text-gray-400">
                Import companies from saved Search.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
