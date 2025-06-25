export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from 'lodash';

const SidebarContent: MenuItem[] = [
  {
    heading: 'Academics',
    children: [
      {
        name: 'Academic Info',
        icon: 'lucide:school', // Lucide: minimal, clean, modern
        id: uniqueId(),
        url: '/',
      },
      {
        name: 'Academic Statistics',
        icon: 'lucide:bar-chart-4', // Lucide: elegant thin bar chart
        id: uniqueId(),
        url: '/academic-statistics',
      },
    ],
  },
  {
    heading: 'Content',
    children: [
      {
        name: 'Content Management',
        icon: 'carbon:content-delivery-network', // Carbon: elegant & clear
        id: uniqueId(),
        url: '/content-management',
      },
      {
        name: 'Media & Visual Content',
        icon: 'ph:image-square-duotone', // Phosphor: sleek image icon
        id: uniqueId(),
        url: '/media-visual-content',
      },
    ],
  },
  {
    heading: 'Configurations',
    children: [
      {
        name: 'Site Links',
        icon: 'ph:link-simple-horizontal-bold', // Phosphor: minimalist link
        id: uniqueId(),
        url: '/site-links',
      },
      {
        name: 'Utilities & Extras',
        icon: 'ph:sliders-bold', // Phosphor: modern settings/utility icon
        id: uniqueId(),
        url: '/utilities-extras',
      },
    ],
  },
];

export default SidebarContent;
