"use client";

import React, { useState, useEffect, useRef } from "react";
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
  ChevronLeft,
  ChevronRight,
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

  const [activeMobileTab, setActiveMobileTab] = useState<"filters" | "results">("filters");

  // Columns definition for mobile table navigation
  const columns = [
    { id: "name", label: "Name", width: "18%" },
    { id: "title", label: "Title", width: "14%" },
    { id: "headline", label: "Headline", width: "18%" },
    { id: "linkedin", label: "Linkedin Url", width: "18%" },
    { id: "company", label: "Company", width: "16%" },
    { id: "companyUrl", label: "Company Url", width: "16%" },
  ];

  const [activeColumnIndex, setActiveColumnIndex] = useState(0);
  const tableScrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= columns.length) return;
    setActiveColumnIndex(index);
    
    const container = tableScrollRef.current;
    if (!container) return;
    
    const columnMinWidths = [144, 112, 144, 144, 128, 128];
    const scrollLeft = columnMinWidths.slice(0, index).reduce((sum, w) => sum + w, 0);
    
    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth"
    });
  };

  const handleTableScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    
    const columnMinWidths = [144, 112, 144, 144, 128, 128];
    let accumulatedWidth = 0;
    let detectedIndex = 0;
    
    for (let i = 0; i < columnMinWidths.length; i++) {
      accumulatedWidth += columnMinWidths[i];
      if (scrollLeft < accumulatedWidth - columnMinWidths[i] / 2) {
        detectedIndex = i;
        break;
      }
      detectedIndex = i;
    }
    
    if (detectedIndex !== activeColumnIndex) {
      setActiveColumnIndex(detectedIndex);
    }
  };

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
        
        {/* Close Button (Desktop) */}
        <button
          onClick={onClose}
          className="hidden md:flex absolute top-4 right-4 z-50 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3.5 bg-white border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-['Inter'] font-semibold text-[15px] text-gray-800">Find People</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 active:bg-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="md:hidden flex border-b border-gray-200 bg-white shrink-0">
          <button
            onClick={() => setActiveMobileTab("filters")}
            className={`flex-1 py-3 text-center font-['Inter'] text-[13px] font-semibold border-b-2 transition-all ${
              activeMobileTab === "filters"
                ? "border-[#1A56DB] text-[#1A56DB]"
                : "border-transparent text-gray-500"
            }`}
          >
            Filters
          </button>
          <button
            onClick={() => setActiveMobileTab("results")}
            className={`flex-1 py-3 text-center font-['Inter'] text-[13px] font-semibold border-b-2 transition-all ${
              activeMobileTab === "results"
                ? "border-[#1A56DB] text-[#1A56DB]"
                : "border-transparent text-gray-500"
            }`}
          >
            Results
          </button>
        </div>

        {/* LEFT COLUMN: Sidebar Filters */}
        <div className={`w-full md:w-[320px] lg:w-[350px] bg-[#F9FAFB] md:border-b-0 md:border-r border-gray-200/80 flex-col flex-1 h-0 md:h-full shrink-0 min-h-0 ${
          activeMobileTab === "filters" ? "flex" : "hidden md:flex"
        }`}>
          
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
            <button 
              onClick={() => setActiveMobileTab("results")}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#1F2A37] hover:bg-[#111827] rounded-lg font-['Inter'] font-medium text-[12px] leading-[1.5] tracking-[0px] text-[#FFFFFF] transition-all shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-[#FFFFFF]" />
              Preview Result
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Results Table Area */}
        <div className={`flex-1 flex-col h-0 md:h-full bg-white relative min-w-0 min-h-0 ${
          activeMobileTab === "results" ? "flex" : "hidden md:flex"
        }`}>
          
          {/* Header Action Info Row */}
          <div className="p-4 sm:p-5 sm:px-6 border-b border-gray-100 flex flex-col gap-3 shrink-0 bg-white z-10">
            {/* Top Row: Title/Status and Usage Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <span className="font-['Inter'] font-medium text-[12.5px] sm:text-[13px] leading-[1.5] text-[#4B5563]">
                  Found 0 companies. Click preview to view results
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FBECDD] text-[#D9730E] px-3 py-1 rounded-full font-['Lato'] font-semibold text-[11.5px] sm:text-[12px] leading-none shrink-0 self-end sm:self-auto">
                <Search className="w-3.5 h-3.5 text-[#D9730E]" />
                <span>8000/50000</span>
              </div>
            </div>
            
            {/* Bottom Row: Promotion/Callout */}
            <div className="flex items-center gap-2 text-[11.5px] sm:text-[12px] text-[#C27803] font-medium bg-[#FBECDD]/35 border border-[#FBECDD]/60 px-3.5 py-2 rounded-lg w-full">
              <Lock className="w-3.5 h-3.5 text-[#C27803] shrink-0" />
              <span className="leading-[1.4]">
                Unlock <span className="font-semibold text-[#B25E02]">100,000 leads</span> with Enterprise Plan*
              </span>
            </div>
          </div>

          {/* Table Headers Container (Scrollable horizontally on mobile) */}
          <div className="shrink-0 w-full border-b border-gray-100 bg-gray-50 flex flex-col">
            {/* Mobile Column Navigation Control */}
            <div className="2xl:hidden flex items-center justify-between px-6 py-3 bg-white border-b border-gray-150 select-none font-['Inter']">
              <button 
                onClick={() => scrollToIndex(activeColumnIndex - 1)}
                disabled={activeColumnIndex === 0}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 disabled:opacity-20 disabled:hover:bg-transparent transition-all"
                aria-label="Previous column"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="text-[13px] uppercase text-[#1F2A37] tracking-wider font-bold">
                {columns[activeColumnIndex].label}
              </span>
              
              <button 
                onClick={() => scrollToIndex(activeColumnIndex + 1)}
                disabled={activeColumnIndex === columns.length - 1}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 disabled:opacity-20 disabled:hover:bg-transparent transition-all"
                aria-label="Next column"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Column Headers (Hidden on Mobile) */}
            <div 
              ref={tableScrollRef} 
              onScroll={handleTableScroll}
              className="hidden 2xl:block overflow-x-auto no-scrollbar w-full scroll-smooth"
            >
              <div className="min-w-[800px] flex items-center py-3 px-6 select-none font-['Inter'] font-semibold text-[12px] leading-[1.5] tracking-[0px] uppercase text-[#6B7280]">
                {columns.map((col, idx) => (
                  <div 
                    key={col.id} 
                    style={{ width: col.width }}
                    className={`truncate transition-all duration-200 ${
                      activeColumnIndex === idx 
                        ? "text-[#1A56DB] font-extrabold bg-[#1A56DB]/5 py-0.5 px-1.5 rounded-md" 
                        : ""
                    }`}
                  >
                    {col.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table Body - Empty State Illustration (Completely outside scroll container to remain centered & fully responsive) */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto no-scrollbar bg-white">
            
            {/* SVG Checklist Illustration */}
            <div className="relative w-full max-w-[200px] sm:max-w-[240px] h-32 sm:h-48 mb-4 sm:mb-6 flex items-center justify-center">
              <Image
                src="/find-modal.svg"
                alt="Find People Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Empty State Instructions */}
            <div className="max-w-[480px] px-4">
              <p className="font-['Inter'] font-medium text-[11.5px] sm:text-[13px] md:text-[14px] leading-[1.5] text-gray-400">
                Start your Company search , preview, and import companies
              </p>
              <p className="font-['Inter'] font-medium text-[11.5px] sm:text-[13px] md:text-[14px] leading-[1.5] text-gray-400">
                for enrichment by applying any filter in the left panel.
              </p>
              
              <div className="my-2 flex items-center justify-center gap-3 text-gray-300 font-semibold text-[10px] uppercase tracking-wider">
                <div className="h-px bg-gray-200 w-6"></div>
                <span>or</span>
                <div className="h-px bg-gray-200 w-6"></div>
              </div>

              <p className="font-['Inter'] font-medium text-[11.5px] sm:text-[13px] md:text-[14px] leading-[1.5] text-gray-400">
                Import companies from saved Search.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
