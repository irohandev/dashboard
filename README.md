# ⚡Dshboard

Welcome to the **Dashboard**, a modern, responsive, and pixel-perfect Go-To-Market (GTM) workspace dashboard. Built with a premium tech stack consisting of **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, this application delivers a highly interactive, fast, and visually polished experience for managing workbooks, campaigns, data grids, and target leads.

---

## 🎨 Visual Design & UI Architecture

The interface utilizes a sleek, clean, modern SaaS aesthetic with subtle shadows, harmonious borders, glassmorphism highlights, custom typography pairings, and micro-interactions.

### 📐 Color Palette & Theme
- **Primary Accents**: High-fidelity corporate blues (`#1A56DB`, `#1F2A37`, `#347FA9`), paired with a minimal layout background (`#FFFFFF`, `#F9FAFB`).
- **Status & Type Badges**:
  - 🟢 **Success/Enrichment**: Light green (`#EDF3EC`) backgrounds with dark green (`#438361`) elements.
  - 🟡 **Warnings/Credits**: Soft oranges (`#FBECDD`) with amber elements (`#D9730E`).
  - 🟣 **Integrations/People**: Deep purples (`#FBF3DB`, `#8B5CF6`) and sky blues for messaging.
- **Dark Mode Hooks**: Initial settings mapped in CSS variables for system preference hooks.

### 🔤 Typography
Custom-mapped typography hierarchy defined via Google Fonts and CDN resources:
*   **Cal Sans**: Used for primary branding elements (`itscale`).
*   **Inter**: Utilized across all body copy, forms, and grid items for high readability.
*   **Lato**: Applied to metrics, pills, and numerical counters for tabular alignment.

---

## 🚀 Core Features & UI Components

### 1. 📂 Responsive Sidebar Shell
- **Desktop Layout**: A static sidebar with a width of `223px`, featuring workspace switchers (`GTM Spaces`), grouped menu sections (Home, Other), active path state indicators with chevron directions, support buttons, and micro-hover states.
- **Mobile Drawer Layout**: Collapses into a hamburger menu trigger. When opened, it reveals an animated, slide-out drawer matching the desktop styling, backed by a soft blur backdrop (`backdrop-blur-sm`).
- **Workspace Switcher**: Interactive dropdown with nested profile avatars simulating enterprise workspace hubs.

### 2. 👑 Global Header
- Contains a global usage indicator.
- **Credits Pill Tracker**: Visually displays credit limits (`450000/5500000`) with an embedded green CTAs for upgrading/boosting plans.
- **User Avatar Dropdown**: Profile icon loading from optimized remote URLs. Responsive profile details slide open on mobile viewports.

### 3. 👋 Greeting Section & Onboarding
- **"Latest from Bitscale" Carousel**: 
  - Dynamic sliding card slideshow showing feature walkthrough videos.
  - Integrated autoplay rotation (every 5 seconds) with custom dot-navigation indicators.
  - Features slide-resetting logic ensuring smooth transitions.
- **Checklist Progress Dashboard**:
  - Real-time progress bar representing onboarding completion (currently set at 75%).
  - Structured checklist showing completed tasks (green checks) and pending actions.

### 4. 📊 Data Grids & Shared Tables
- **Multi-Tab Categorization**: Switch tabs seamlessly between "My Grids" and "Starred".
- **Dynamic Search Filtering**:
  - Live filter updates matching entries by name or editor.
  - **Highlight Engine**: Matches search queries and wraps them dynamically inside a highlighted visual tag for instant user feedback.
- **Layout Toggle Views**:
  - **Table View**: Classic tabular spreadsheet layout displaying chevron dropdowns, starring icons, custom resource-type icons, editor profile pictures, last edited dates, and action menus.
  - **Grid View**: Modern card layout displaying rich previews of each workbook or sheet.
- **Pagination Control**: Robust paginated controls supporting dynamic page indexes, "Prev/Next" triggers, and page number ellipses (`…`) for large datasets.

### 5. 🔍 "Find People" Lead Modal
- A highly complex modal search interface triggered from the "Find People" action button.
- **Collapsible Sidebar Filters**: Form segments for keywords, job titles, website URLs, locations, headcounts, and management tiers.
- **Dual-Pane Viewports**:
  - **Desktop View**: Side-by-side split screen showing filters on the left and live tabular results on the right.
  - **Mobile View**: Tabbed layout toggling between the filter dashboard and preview lists on small screens.
- **Mobile Column Navigation**: Horizontal scroll manager with pagination indicators allowing users to scroll column metrics (`Name`, `Title`, `Headline`, `Company`, etc.) with helper arrows.
- **Custom Empty State**: Visual graphics prompting search criteria initialization.

---

## 🛠️ Technical Stack & Dependencies

The application utilizes modern libraries for high-performance builds:

| Technology | Purpose | Version / Details |
| :--- | :--- | :--- |
| **Next.js** | Core Framework (App Router, Server-Client layout) | `16.2.7` |
| **React** | User Interface library | `19.2.4` |
| **Tailwind CSS** | Premium layout design, grid controls, and transitions | `^4.0.0` (with PostCSS) |
| **TypeScript** | Strict static type definitions for grids and component APIs | `^5` |
| **Lucide React** | Clean SVG icons used throughout layouts, menus, and actions | `^1.17.0` |

---

## 🗂️ Project Directory Structure

```bash
dashboard/
├── .next/                  # Next.js compilation cache and build outputs
├── app/
│   ├── globals.css         # Font imports, Tailwind directives, custom font mappings
│   ├── layout.tsx          # Root shell layout, loading global Sidebar and Header
│   ├── page.tsx            # Main dashboard entry routing to Dashboard components
│   └── icon.png            # Main site favicon
├── components/
│   ├── common/
│   │   ├── header.tsx      # Top bar (credits, plan, avatar)
│   │   └── sidebar.tsx     # Navigation links, mobile menus, responsive panels
│   └── dashboard/
│       ├── FindPeopleModal.tsx # Multi-pane modal filters & mobile data column sliders
│       ├── greeting.tsx    # Welcome cards, autoplay video slider, progress tracker
│       ├── gridSharedTables.tsx # Core data logs, view toggle modes, search highlight
│       └── main.tsx        # Centralized container linking panels
├── public/
│   ├── find-modal.svg      # Visual empty-state SVG asset for Modal search
│   └── logo.png            # Bitscale branding asset
├── utils/
│   └── gridData.ts         # Sample data schemas & mock entries for Grids/Workbooks
├── package.json            # Configuration registry, scripts, and package dependencies
├── tsconfig.json           # Compiler rules for TypeScript
└── next.config.ts          # Next.js configuration, remote Unsplash assets whitelist
```

---

## ⚙️ Development & Setup Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher recommended) and `npm` installed.

### 1. Installation
Clone the repository, navigate to the folder, and install all package dependencies:
```bash
npm install
```

### 2. Run the Development Server
Launch the local development server:
```bash
npm run dev
```
Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**.

### 3. Build for Production
To compile and build a production-ready application bundle:
```bash
npm run build
```

### 4. Run Linter
Verify code quality and clean up formatting issues:
```bash
npm run lint
```

---

## 💡 Technical Implementation Highlights

### ⚡ Text Highlighter Engine
To make search filters instantly readable, a custom matching filter checks queries against workbook strings. It dynamically splits matching strings using case-insensitive regular expressions (`RegExp`) and maps them to styled highlight tags (`<mark>`) to highlight search key matches inline without disturbing the typography flow.

### ⚡ Infinite Loop Carousel Simulation
The video carousel utilizes a sliding layout driven by an extended slides array (duplicating the first element). It handles slide indexes by checking when the user reaches the end, temporarily turning off transition classes to reset the position back to zero instantaneously. This creates a seamless, infinite scrolling animation loop.

### ⚡ Dual-Tab Column Navigation for Mobile
On narrow mobile screen widths, tables with heavy column data (`Name`, `Title`, `Headline`, `Company`, `Company URL`) are compressed. A horizontal scroll panel combined with forward/back navigation triggers scrolls the table layout to specific column offsets. This allows users to inspect details cell-by-cell without breaking page constraints.