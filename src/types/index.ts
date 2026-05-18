export interface Product {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  status: 'live' | 'beta' | 'stealth' | 'research';
  tags: string[];
  stats: { label: string; value: string }[];
  year: string;
  flagship?: boolean;
}

export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavSection {
  label: string;
  href: string;
  items?: NavDropdownItem[];
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
}
