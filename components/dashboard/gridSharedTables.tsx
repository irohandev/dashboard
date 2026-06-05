"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState, useMemo } from 'react';
import {
    Star, ChevronDown, Search, SlidersHorizontal, MoreHorizontal,
    ArrowUp, Building, FileText, Users, ChevronLeft,
    ChevronRight as ChevronRightIcon, LayoutGrid, List, X, ArrowRight,
    Clock,
} from 'lucide-react';
import { myGridsData, starredData, type GridRow } from '@/utils/gridData';

const ITEMS_PER_PAGE = 10;

// ─── Highlight matching text ───────────────────────────────────────────────
function Highlight({ text, query }: { text: string; query: string }) {
    if (!query.trim()) return <>{text}</>;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
        <>
            {parts.map((part, i) =>
                regex.test(part)
                    ? <mark key={i} className="bg-yellow-100 text-yellow-800 rounded px-0.5 not-italic font-semibold">{part}</mark>
                    : <span key={i}>{part}</span>
            )}
        </>
    );
}

// ─── Row icon ─────────────────────────────────────────────────────────────
function RowIcon({ row, size = 'md' }: { row: GridRow; size?: 'sm' | 'md' | 'lg' }) {
    const dim = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-10 h-10' : 'w-6 h-6';
    const iconDim = size === 'sm' ? 'h-2.5 w-2.5' : size === 'lg' ? 'h-5 w-5' : 'h-3 w-3';
    const stackDim = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-9 h-9' : 'w-6 h-6';
    if (row.type === 'workbook') {
        return (
            <div className="flex -space-x-1.5 shrink-0">
                <div className={`${stackDim} rounded-md bg-purple-50 flex items-center justify-center z-10 border-2 border-white shadow-sm`}><Users className={`${iconDim} text-purple-500`} /></div>
                <div className={`${stackDim} rounded-md bg-orange-50 flex items-center justify-center z-20 border-2 border-white shadow-sm`}><FileText className={`${iconDim} text-orange-500`} /></div>
                <div className={`${stackDim} rounded-md bg-green-50 flex items-center justify-center z-30 border-2 border-white shadow-sm`}><Building className={`${iconDim} text-green-600`} /></div>
            </div>
        );
    }
    return (
        <div className={`${dim} rounded-md ${row.bgColor} flex items-center justify-center shrink-0 border border-black/5 shadow-sm`}>
            {row.icon && <row.icon className={`${iconDim} ${row.iconColor}`} />}
        </div>
    );
}



// ─── Desktop Card Grid ─────────────────────────────────────────────────────
function CardGrid({ data, searchQuery, onToggleStar, canStar }: {
    data: GridRow[]; searchQuery: string; onToggleStar: (id: number) => void; canStar: boolean;
}) {
    if (data.length === 0) return null;
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4 sm:p-6">
            {data.map((row) => (
                <div key={row.id} className="group relative bg-white border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col h-full">
                    <button
                        onClick={(e) => { e.stopPropagation(); if (canStar) onToggleStar(row.id); }}
                        className="absolute top-3 right-3 focus:outline-none"
                    >
                        <Star className={`h-3.5 w-3.5 transition-all ${row.starred ? 'fill-orange-400 text-orange-400' : 'text-gray-200 group-hover:text-gray-300'}`} />
                    </button>
                    <div className="mb-3"><RowIcon row={row} size="lg" /></div>
                    <p className="text-[13px] font-semibold text-gray-800 leading-tight line-clamp-2 mb-3 pr-5">
                        <Highlight text={row.name} query={searchQuery} />
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-auto">
                        <div className="flex items-center gap-1.5">
                            <img src={row.editedBy.avatar} alt={row.editedBy.name} className="w-5 h-5 rounded-full border border-gray-200" />
                            <span className="text-[11px] text-gray-400 truncate max-w-[80px]"><Highlight text={row.editedBy.name} query={searchQuery} /></span>
                        </div>
                        <span className="text-[10px] text-gray-400">{row.lastEdited.split(',')[0]}</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pb-3">
                        <button className="flex items-center gap-1 text-[11px] text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors">
                            Open <ArrowRight className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Mobile Compact Cards (2-column, auto on small screens) ───────────────
function MobileCards({ data, searchQuery, onToggleStar, canStar }: {
    data: GridRow[]; searchQuery: string; onToggleStar: (id: number) => void; canStar: boolean;
}) {
    if (data.length === 0) return null;
    return (
        <div className="grid grid-cols-2 gap-2 p-3">
            {data.map((row) => (
                <div
                    key={row.id}
                    className="group relative bg-white border border-gray-100 rounded-xl p-3 hover:border-blue-200 hover:shadow-sm active:scale-[0.98] transition-all duration-150 cursor-pointer flex flex-col h-full"
                >
                    {/* Top: icon + star */}
                    <div className="flex items-start justify-between mb-2">
                        <RowIcon row={row} size="sm" />
                        <button
                            onClick={(e) => { e.stopPropagation(); if (canStar) onToggleStar(row.id); }}
                            className="focus:outline-none -mt-0.5 -mr-0.5 p-1"
                        >
                            <Star className={`h-3 w-3 transition-all ${row.starred ? 'fill-orange-400 text-orange-400' : 'text-gray-200 group-hover:text-gray-300'}`} />
                        </button>
                    </div>

                    {/* Name — 2 line clamp */}
                    <p className="text-[11px] font-semibold text-gray-700 leading-tight line-clamp-2 mb-2.5">
                        <Highlight text={row.name} query={searchQuery} />
                    </p>

                    {/* Footer: avatar + date + actions */}
                    <div className="flex items-center gap-1.5 pt-1.5 border-t border-gray-50 mt-auto">
                        <img
                            src={row.editedBy.avatar}
                            alt={row.editedBy.name}
                            title={row.editedBy.name}
                            className="w-4 h-4 rounded-full border border-gray-200 shrink-0"
                        />
                        <span className="text-[9px] text-gray-400 truncate">{row.lastEdited.split(',')[0]}</span>
                        <button className="ml-auto p-1 text-gray-400 hover:bg-gray-100 rounded-md transition-all focus:outline-none">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Empty State ───────────────────────────────────────────────────────────
function EmptyState({ query, onClear }: { query: string; onClear: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100">
                <Search className="h-6 w-6 text-gray-300" />
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-600">No results found</p>
                {query && <p className="text-xs text-gray-400 mt-0.5">No matches for &ldquo;{query}&rdquo;</p>}
            </div>
            {query && (
                <button onClick={onClear} className="text-xs text-blue-500 hover:text-blue-700 font-medium hover:underline transition-colors">
                    Clear search
                </button>
            )}
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────
const GridSharedTables = () => {
    const [activeTab, setActiveTab] = useState('My Grids');
    const [currentPage, setCurrentPage] = useState(1);
    const [gridRows, setGridRows] = useState<GridRow[]>(myGridsData);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
    const [sortAsc, setSortAsc] = useState(true);
    const [mobileTabDropdownOpen, setMobileTabDropdownOpen] = useState(false);

    const starredTabData = useMemo(() => {
        const starredFromGrid = gridRows.filter((r) => r.starred);
        const existingIds = new Set(starredData.map((s) => s.id));
        const newlyStarred = starredFromGrid.filter((r) => !existingIds.has(r.id));
        return [...starredData, ...newlyStarred];
    }, [gridRows]);

    const baseData = activeTab === 'My Grids' ? gridRows : starredTabData;

    const filteredData = useMemo(() => {
        const data = searchQuery.trim()
            ? baseData.filter((r) =>
                r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.editedBy.name.toLowerCase().includes(searchQuery.toLowerCase()))
            : baseData;
        return sortAsc ? [...data] : [...data].reverse();
    }, [baseData, searchQuery, sortAsc]);

    const totalItems = filteredData.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedData = filteredData.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);
    const startItem = totalItems === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(safePage * ITEMS_PER_PAGE, totalItems);

    const handleTabChange = (tab: string) => { setActiveTab(tab); setCurrentPage(1); setSearchQuery(''); };
    const toggleStar = (id: number) => setGridRows((prev) => prev.map((r) => r.id === id ? { ...r, starred: !r.starred } : r));

    const pageNumbers = useMemo(() => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        const pages: (number | '…')[] = [1];
        if (safePage > 3) pages.push('…');
        for (let p = Math.max(2, safePage - 1); p <= Math.min(totalPages - 1, safePage + 1); p++) pages.push(p);
        if (safePage < totalPages - 2) pages.push('…');
        pages.push(totalPages);
        return pages;
    }, [totalPages, safePage]);

    return (
        <>
            <div className="w-full h-full bg-white font-sans flex flex-col min-h-0">

                {/* ── Top Bar ── */}
                <div className="flex items-end justify-between border-b border-gray-100 pt-4 sm:pt-5 px-3 sm:px-6 shrink-0 gap-2 flex-wrap">
                    {/* Tabs Desktop */}
                    <div className="hidden sm:flex space-x-6 shrink-0">
                        {['My Grids', 'Starred'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                                    activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-700'
                                }`}
                            >
                                {tab}
                                {tab === 'Starred' && starredTabData.length > 0 && (
                                    <span className="ml-1.5 text-[10px] bg-blue-50 text-blue-500 font-semibold px-1.5 py-0.5 rounded-full">
                                        {starredTabData.length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tabs Mobile Custom Dropdown */}
                    <div className="sm:hidden pb-3 relative">
                        <button
                            onClick={() => setMobileTabDropdownOpen(!mobileTabDropdownOpen)}
                            className="flex items-center justify-between bg-white border border-gray-200 text-gray-700 text-xs rounded-lg w-32 px-3 py-1.5 font-medium shadow-sm active:scale-[0.98] transition-all"
                        >
                            <span className="truncate flex-1 text-left">
                                {activeTab} {activeTab === 'Starred' && starredTabData.length > 0 && `(${starredTabData.length})`}
                            </span>
                            <ChevronDown className={`h-3 w-3 text-gray-400 ml-1.5 transition-transform duration-200 ${mobileTabDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {mobileTabDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setMobileTabDropdownOpen(false)} />
                                <div className="absolute top-full left-0 mt-1 w-36 bg-white border border-gray-100 rounded-lg shadow-lg shadow-black/5 z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-150 origin-top">
                                    {['My Grids', 'Starred'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => {
                                                handleTabChange(tab);
                                                setMobileTabDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                                                activeTab === tab ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50 font-medium'
                                            }`}
                                        >
                                            {tab}
                                            {tab === 'Starred' && starredTabData.length > 0 && (
                                                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                                                    activeTab === tab ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                    {starredTabData.length}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center gap-2 pb-3">
                        {/* Inline search input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                                <Search className="h-3.5 w-3.5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                placeholder="Search..."
                                className="pl-8 pr-7 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-[12px] sm:text-[13px] text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-colors w-36 sm:w-52"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                                    className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            )}
                        </div>

                        <button className="p-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-500 transition-colors">
                            <SlidersHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>

                        {/* View toggle — desktop only (mobile auto uses compact cards) */}
                        <div className="hidden sm:flex border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-1.5 sm:p-2 transition-colors ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-500'}`}
                                title="Table view"
                            >
                                <List className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 sm:p-2 transition-colors border-l border-gray-200 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-500'}`}
                                title="Grid view"
                            >
                                <LayoutGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Active search pill */}
                {searchQuery && (
                    <div className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-blue-50 border-b border-blue-100 shrink-0">
                        <Search className="h-3.5 w-3.5 text-blue-400" />
                        <span className="text-[12px] text-blue-700">
                            <strong>{totalItems}</strong> result{totalItems !== 1 ? 's' : ''} for &ldquo;<strong>{searchQuery}</strong>&rdquo;
                        </span>
                        <button onClick={() => setSearchQuery('')} className="ml-auto text-blue-400 hover:text-blue-600">
                            <X className="h-3.5 w-3.5" />
                        </button>
                    </div>
                )}

                {/* ── Content ── */}
                <div className="flex-1 overflow-auto min-h-0">

                    {/* MOBILE < sm: always compact 2-col cards */}
                    <div className="block sm:hidden">
                        {filteredData.length === 0
                            ? <EmptyState query={searchQuery} onClear={() => setSearchQuery('')} />
                            : <MobileCards data={paginatedData} searchQuery={searchQuery} onToggleStar={toggleStar} canStar={activeTab === 'My Grids'} />
                        }
                    </div>

                    {/* DESKTOP sm+: table or grid based on viewMode */}
                    <div className="hidden sm:block">
                        {viewMode === 'grid' ? (
                            filteredData.length === 0
                                ? <EmptyState query={searchQuery} onClear={() => setSearchQuery('')} />
                                : <CardGrid data={paginatedData} searchQuery={searchQuery} onToggleStar={toggleStar} canStar={activeTab === 'My Grids'} />
                        ) : (
                            <div className="min-w-[480px]">
                                {/* Table Header */}
                                <div className="flex items-center py-2.5 px-6 text-[12px] font-semibold text-gray-500 border-b border-gray-100 bg-white sticky top-0 z-40">
                                    <div className="flex-1 flex items-center gap-1 min-w-0">
                                        <button
                                            onClick={() => setSortAsc(!sortAsc)}
                                            className="flex items-center gap-1 hover:text-gray-700 transition-colors group"
                                        >
                                            Name
                                            <ArrowUp className={`h-3 w-3 text-gray-400 group-hover:text-gray-600 transition-transform ${!sortAsc ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                    <div className="w-[22%] lg:w-[20%]">Edited by</div>
                                    <div className="hidden md:block w-[18%] lg:w-[20%]">Last edited</div>
                                    <div className="w-[12%] text-right shrink-0">Actions</div>
                                </div>

                                {filteredData.length === 0
                                    ? <EmptyState query={searchQuery} onClear={() => setSearchQuery('')} />
                                    : (
                                        <div className="flex flex-col">
                                            {paginatedData.map((row) => (
                                                <div
                                                    key={row.id}
                                                    className="group flex items-center py-2.5 px-6 hover:bg-gray-50/80 border-b border-gray-50 text-[13px] transition-colors"
                                                >
                                                    <div className="flex-1 flex items-center gap-2.5 min-w-0">
                                                        <div className="w-3.5 flex items-center justify-center shrink-0">
                                                            {row.expanded && <ChevronDown className="h-3.5 w-3.5 text-gray-400 cursor-pointer" />}
                                                        </div>
                                                        <button
                                                            onClick={() => activeTab === 'My Grids' && toggleStar(row.id)}
                                                            className="shrink-0 focus:outline-none group/star"
                                                            title={row.starred ? 'Unstar' : 'Star'}
                                                        >
                                                            <Star className={`h-[13px] w-[13px] transition-all ${row.starred ? 'fill-orange-400 text-orange-400 scale-110' : 'text-gray-300 group-hover/star:text-orange-300'}`} />
                                                        </button>
                                                        <RowIcon row={row} size="sm" />
                                                        <span className="text-gray-700 font-medium truncate">
                                                            <Highlight text={row.name} query={searchQuery} />
                                                        </span>
                                                    </div>
                                                    <div className="w-[22%] lg:w-[20%] flex items-center gap-2 min-w-0">
                                                        <img src={row.editedBy.avatar} alt={row.editedBy.name} className="w-5 h-5 rounded-full border border-gray-200 shrink-0" />
                                                        <span className="text-gray-500 truncate hidden lg:block">
                                                            <Highlight text={row.editedBy.name} query={searchQuery} />
                                                        </span>
                                                    </div>
                                                    <div className="hidden md:block w-[18%] lg:w-[20%] text-gray-500 truncate">{row.lastEdited}</div>
                                                    <div className="w-[12%] flex justify-end shrink-0">
                                                        <button className="p-1.5 text-gray-400 opacity-100 hover:bg-gray-100 rounded-md transition-all">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Pagination ── */}
                {totalItems > 0 && (
                    <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 border-t border-gray-100 bg-white shrink-0 gap-2">
                        <span className="text-[11px] sm:text-[12px] text-gray-400 shrink-0">
                            {startItem}–{endItem} of {totalItems}
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={safePage === 1}
                                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-md text-[11px] sm:text-[12px] font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-gray-200"
                            >
                                <ChevronLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                <span className="hidden sm:inline">Prev</span>
                            </button>
                            <div className="flex items-center gap-0.5 mx-0.5 sm:mx-1">
                                {pageNumbers.map((page, i) =>
                                    page === '…' ? (
                                        <span key={`e${i}`} className="w-6 sm:w-7 text-center text-gray-400 text-[12px]">…</span>
                                    ) : (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page as number)}
                                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md text-[11px] sm:text-[12px] font-medium transition-colors flex items-center justify-center ${
                                                page === safePage ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}
                            </div>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={safePage === totalPages}
                                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-md text-[11px] sm:text-[12px] font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-gray-200"
                            >
                                <span className="hidden sm:inline">Next</span>
                                <ChevronRightIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default GridSharedTables;