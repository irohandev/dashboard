import type React from 'react';
import {
  Briefcase,
  Compass,
  Building,
  FileText,
  Users,
  MapPin,
  Globe,
  Layers,
  Network,
  Database,
  Mail,
  BarChart2,
  Zap,
  ShoppingCart,
  Tag,
  Cpu,
} from 'lucide-react';

export type GridRow = {
  id: number;
  type: string;
  name: string;
  icon: React.ElementType | undefined;
  iconColor: string;
  bgColor: string;
  editedBy: { name: string; avatar: string };
  lastEdited: string;
  starred: boolean;
  expanded: boolean;
};

export const myGridsData: GridRow[] = [
  { id: 1, type: 'workbook', name: 'Workbook - Testing design Ideas for grid and workbook', icon: undefined, iconColor: '', bgColor: '', editedBy: { name: 'Sam Taylor', avatar: 'https://i.pravatar.cc/150?u=sam' }, lastEdited: '06 Aug, 2025', starred: false, expanded: true },
  { id: 2, type: 'other', name: 'LinkedIn', icon: Briefcase, iconColor: 'text-blue-600', bgColor: 'bg-blue-50', editedBy: { name: 'Chris Parker', avatar: 'https://i.pravatar.cc/150?u=chris' }, lastEdited: '06 Aug, 2025', starred: false, expanded: false },
  { id: 3, type: 'other', name: 'Sales nav', icon: Compass, iconColor: 'text-blue-500', bgColor: 'bg-blue-50', editedBy: { name: 'Jone Doe', avatar: 'https://i.pravatar.cc/150?u=jone1' }, lastEdited: '06 Aug, 2025', starred: false, expanded: false },
  { id: 4, type: 'other', name: 'find company', icon: Building, iconColor: 'text-green-600', bgColor: 'bg-green-50', editedBy: { name: 'Alex Morgan', avatar: 'https://i.pravatar.cc/150?u=alex' }, lastEdited: '06 Aug, 2025', starred: true, expanded: false },
  { id: 5, type: 'other', name: 'import csv', icon: FileText, iconColor: 'text-red-700', bgColor: 'bg-red-50', editedBy: { name: 'Drew Wilson', avatar: 'https://i.pravatar.cc/150?u=drew' }, lastEdited: '06 Aug, 2025', starred: true, expanded: false },
  { id: 6, type: 'other', name: 'Find people', icon: Users, iconColor: 'text-purple-600', bgColor: 'bg-purple-50', editedBy: { name: 'Jone Doe', avatar: 'https://i.pravatar.cc/150?u=jone2' }, lastEdited: '06 Aug, 2025', starred: true, expanded: false },
  { id: 7, type: 'other', name: 'Google maps', icon: MapPin, iconColor: 'text-blue-500', bgColor: 'bg-blue-50', editedBy: { name: 'Jone Doe', avatar: 'https://i.pravatar.cc/150?u=jone3' }, lastEdited: '06 Aug, 2025', starred: false, expanded: false },
  { id: 8, type: 'other', name: 'google search results', icon: Globe, iconColor: 'text-orange-500', bgColor: 'bg-orange-50', editedBy: { name: 'Jone Doe', avatar: 'https://i.pravatar.cc/150?u=jone4' }, lastEdited: '06 Aug, 2025', starred: false, expanded: false },
  { id: 9, type: 'other', name: 'factors', icon: Layers, iconColor: 'text-red-500', bgColor: 'bg-red-50', editedBy: { name: 'Jone Doe', avatar: 'https://i.pravatar.cc/150?u=jone5' }, lastEdited: '06 Aug, 2025', starred: false, expanded: false },
  { id: 10, type: 'other', name: 'Hubspot List - 10 (05 Aug 25)', icon: Network, iconColor: 'text-orange-600', bgColor: 'bg-orange-50', editedBy: { name: 'Jone Doe', avatar: 'https://i.pravatar.cc/150?u=jone6' }, lastEdited: '06 Aug, 2025', starred: true, expanded: false },
  { id: 11, type: 'other', name: 'CRM database export', icon: Database, iconColor: 'text-indigo-600', bgColor: 'bg-indigo-50', editedBy: { name: 'Alex Morgan', avatar: 'https://i.pravatar.cc/150?u=alex2' }, lastEdited: '05 Aug, 2025', starred: false, expanded: false },
  { id: 12, type: 'other', name: 'Email outreach list', icon: Mail, iconColor: 'text-sky-600', bgColor: 'bg-sky-50', editedBy: { name: 'Sam Taylor', avatar: 'https://i.pravatar.cc/150?u=sam2' }, lastEdited: '05 Aug, 2025', starred: false, expanded: false },
  { id: 13, type: 'other', name: 'Revenue analytics', icon: BarChart2, iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50', editedBy: { name: 'Drew Wilson', avatar: 'https://i.pravatar.cc/150?u=drew2' }, lastEdited: '05 Aug, 2025', starred: true, expanded: false },
  { id: 14, type: 'other', name: 'Automation triggers', icon: Zap, iconColor: 'text-yellow-600', bgColor: 'bg-yellow-50', editedBy: { name: 'Chris Parker', avatar: 'https://i.pravatar.cc/150?u=chris2' }, lastEdited: '04 Aug, 2025', starred: false, expanded: false },
  { id: 15, type: 'other', name: 'E-commerce orders', icon: ShoppingCart, iconColor: 'text-pink-600', bgColor: 'bg-pink-50', editedBy: { name: 'Jone Doe', avatar: 'https://i.pravatar.cc/150?u=jone7' }, lastEdited: '04 Aug, 2025', starred: false, expanded: false },
  { id: 16, type: 'other', name: 'Product tags mapping', icon: Tag, iconColor: 'text-rose-600', bgColor: 'bg-rose-50', editedBy: { name: 'Alex Morgan', avatar: 'https://i.pravatar.cc/150?u=alex3' }, lastEdited: '04 Aug, 2025', starred: true, expanded: false },
  { id: 17, type: 'other', name: 'Tech stack enrichment', icon: Cpu, iconColor: 'text-cyan-600', bgColor: 'bg-cyan-50', editedBy: { name: 'Sam Taylor', avatar: 'https://i.pravatar.cc/150?u=sam3' }, lastEdited: '03 Aug, 2025', starred: false, expanded: false },
  { id: 18, type: 'other', name: 'Partner leads', icon: Users, iconColor: 'text-violet-600', bgColor: 'bg-violet-50', editedBy: { name: 'Drew Wilson', avatar: 'https://i.pravatar.cc/150?u=drew3' }, lastEdited: '03 Aug, 2025', starred: false, expanded: false },
  { id: 19, type: 'other', name: 'Google maps batch 2', icon: MapPin, iconColor: 'text-blue-500', bgColor: 'bg-blue-50', editedBy: { name: 'Chris Parker', avatar: 'https://i.pravatar.cc/150?u=chris3' }, lastEdited: '03 Aug, 2025', starred: false, expanded: false },
  { id: 20, type: 'other', name: 'Outbound sequence A', icon: Mail, iconColor: 'text-sky-600', bgColor: 'bg-sky-50', editedBy: { name: 'Jone Doe', avatar: 'https://i.pravatar.cc/150?u=jone8' }, lastEdited: '02 Aug, 2025', starred: true, expanded: false },
  { id: 21, type: 'other', name: 'ICP filter list', icon: Compass, iconColor: 'text-blue-500', bgColor: 'bg-blue-50', editedBy: { name: 'Alex Morgan', avatar: 'https://i.pravatar.cc/150?u=alex4' }, lastEdited: '02 Aug, 2025', starred: false, expanded: false },
  { id: 22, type: 'other', name: 'Competitor analysis', icon: BarChart2, iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50', editedBy: { name: 'Sam Taylor', avatar: 'https://i.pravatar.cc/150?u=sam4' }, lastEdited: '02 Aug, 2025', starred: false, expanded: false },
  { id: 23, type: 'other', name: 'Agency contacts', icon: Building, iconColor: 'text-green-600', bgColor: 'bg-green-50', editedBy: { name: 'Drew Wilson', avatar: 'https://i.pravatar.cc/150?u=drew4' }, lastEdited: '01 Aug, 2025', starred: false, expanded: false },
  { id: 24, type: 'other', name: 'Zapier automation list', icon: Zap, iconColor: 'text-yellow-600', bgColor: 'bg-yellow-50', editedBy: { name: 'Chris Parker', avatar: 'https://i.pravatar.cc/150?u=chris4' }, lastEdited: '01 Aug, 2025', starred: true, expanded: false },
  { id: 25, type: 'other', name: 'Hubspot List - 25 (01 Aug 25)', icon: Network, iconColor: 'text-orange-600', bgColor: 'bg-orange-50', editedBy: { name: 'Jone Doe', avatar: 'https://i.pravatar.cc/150?u=jone9' }, lastEdited: '01 Aug, 2025', starred: false, expanded: false },
];

export const starredData: GridRow[] = [
  { id: 101, type: 'other', name: 'Workbook - Q3 Outreach', icon: Network, iconColor: 'text-orange-600', bgColor: 'bg-orange-50', editedBy: { name: 'Sam Taylor', avatar: 'https://i.pravatar.cc/150?u=s1' }, lastEdited: '06 Aug, 2025', starred: true, expanded: false },
  { id: 102, type: 'other', name: 'Enterprise leads batch', icon: Building, iconColor: 'text-green-600', bgColor: 'bg-green-50', editedBy: { name: 'Jone Doe', avatar: 'https://i.pravatar.cc/150?u=s2' }, lastEdited: '06 Aug, 2025', starred: true, expanded: false },
  { id: 103, type: 'other', name: 'LinkedIn Decision Makers', icon: Briefcase, iconColor: 'text-blue-600', bgColor: 'bg-blue-50', editedBy: { name: 'Chris Parker', avatar: 'https://i.pravatar.cc/150?u=s3' }, lastEdited: '05 Aug, 2025', starred: true, expanded: false },
  { id: 104, type: 'other', name: 'Revenue > $10M filter', icon: BarChart2, iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50', editedBy: { name: 'Alex Morgan', avatar: 'https://i.pravatar.cc/150?u=s4' }, lastEdited: '05 Aug, 2025', starred: true, expanded: false },
  { id: 105, type: 'other', name: 'SaaS founders list', icon: Zap, iconColor: 'text-yellow-600', bgColor: 'bg-yellow-50', editedBy: { name: 'Drew Wilson', avatar: 'https://i.pravatar.cc/150?u=s5' }, lastEdited: '05 Aug, 2025', starred: true, expanded: false },
  { id: 106, type: 'other', name: 'Google maps - HQ locations', icon: MapPin, iconColor: 'text-blue-500', bgColor: 'bg-blue-50', editedBy: { name: 'Jone Doe', avatar: 'https://i.pravatar.cc/150?u=s6' }, lastEdited: '04 Aug, 2025', starred: true, expanded: false },
  { id: 107, type: 'other', name: 'Email sequence - Cold B2B', icon: Mail, iconColor: 'text-sky-600', bgColor: 'bg-sky-50', editedBy: { name: 'Sam Taylor', avatar: 'https://i.pravatar.cc/150?u=s7' }, lastEdited: '04 Aug, 2025', starred: true, expanded: false },
  { id: 108, type: 'other', name: 'Product-led growth users', icon: Users, iconColor: 'text-purple-600', bgColor: 'bg-purple-50', editedBy: { name: 'Chris Parker', avatar: 'https://i.pravatar.cc/150?u=s8' }, lastEdited: '04 Aug, 2025', starred: true, expanded: false },
  { id: 109, type: 'other', name: 'Hubspot segments export', icon: Network, iconColor: 'text-orange-600', bgColor: 'bg-orange-50', editedBy: { name: 'Alex Morgan', avatar: 'https://i.pravatar.cc/150?u=s9' }, lastEdited: '03 Aug, 2025', starred: true, expanded: false },
  { id: 110, type: 'other', name: 'Tech stack - React companies', icon: Cpu, iconColor: 'text-cyan-600', bgColor: 'bg-cyan-50', editedBy: { name: 'Drew Wilson', avatar: 'https://i.pravatar.cc/150?u=s10' }, lastEdited: '03 Aug, 2025', starred: true, expanded: false },
  { id: 111, type: 'other', name: 'Partner referral pipeline', icon: Compass, iconColor: 'text-blue-500', bgColor: 'bg-blue-50', editedBy: { name: 'Jone Doe', avatar: 'https://i.pravatar.cc/150?u=s11' }, lastEdited: '02 Aug, 2025', starred: true, expanded: false },
  { id: 112, type: 'other', name: 'Zapier workflows - triggers', icon: Zap, iconColor: 'text-yellow-600', bgColor: 'bg-yellow-50', editedBy: { name: 'Sam Taylor', avatar: 'https://i.pravatar.cc/150?u=s12' }, lastEdited: '02 Aug, 2025', starred: true, expanded: false },
  { id: 113, type: 'other', name: 'Top 100 accounts - ICP', icon: Tag, iconColor: 'text-rose-600', bgColor: 'bg-rose-50', editedBy: { name: 'Chris Parker', avatar: 'https://i.pravatar.cc/150?u=s13' }, lastEdited: '01 Aug, 2025', starred: true, expanded: false },
];
