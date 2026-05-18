import type { Product, NavSection, BlogPost } from '../types';

export const NAV: NavSection[] = [
  {
    label: 'Products',
    href: '/products',
    items: [
      { label: 'Project Coffeemaker', href: '/products/coffeemaker', description: 'Our most ambitious project. Coming soon.' },
      { label: 'VERITAS', href: '/products/veritas', description: 'Deterministic AI evaluation engine' },
      { label: 'LUMEN', href: '/products/lumen', description: 'Mechanistic transformer interpretability' },
      { label: 'Dr. Help', href: '/products/dr-help', description: 'Multimodal clinical decision support' },
    ],
  },
  {
    label: 'Research',
    href: '/research',
    items: [
      { label: 'Overview', href: '/research', description: 'Our research philosophy and publications' },
      { label: 'Deterministic AI', href: '/research/deterministic', description: 'Non-determinism is an engineering failure' },
      { label: 'Mechanistic Interpretability', href: '/research/interpretability', description: 'Opening the black box' },
      { label: 'Medical AI', href: '/research/medical', description: 'AI for consequential clinical decisions' },
    ],
  },
  {
    label: 'Company',
    href: '/about',
    items: [
      { label: 'About', href: '/about', description: 'Who we are and what we believe' },
      { label: 'Blog', href: '/blog', description: 'Thoughts, announcements, research' },
      { label: 'Careers', href: '/careers', description: 'Build the next era of AI with us' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'coffeemaker',
    index: '00',
    name: 'Project Coffeemaker',
    tagline: 'Our Most Ambitious Project',
    description: 'The most ambitious project we have ever undertaken. We are pushing the frontier of what AI can do — building something that is verifiable, interpretable, and built to last. Not a product that demos well. Software that does something real. Coming soon.',
    category: 'Advanced AI Research',
    status: 'stealth',
    tags: ['Frontier AI', 'Verifiable AI', 'Interpretability', 'Stealth'],
    stats: [
      { label: 'Status', value: 'Stealth' },
      { label: 'Class', value: 'Frontier' },
      { label: 'Priority', value: 'Flagship' },
      { label: 'Stage', value: '2026' },
    ],
    year: '2026',
    flagship: true,
  },
  {
    id: 'veritas',
    index: '01',
    name: 'VERITAS',
    tagline: 'Deterministic AI Evaluation Engine',
    description: 'Nine independently deployable FastAPI microservices. SHA-256 cryptographic audit chains. Refusal-first decision logic with four explicit failure modes. Every evaluation is byte-for-byte reproducible on demand and cryptographically traceable to its inputs. Built for environments where "probably correct" is not acceptable.',
    category: 'AI Systems · Auditability',
    status: 'beta',
    tags: ['FastAPI', 'PostgreSQL', 'MinIO', 'Docker', 'Microservices', 'SHA-256'],
    stats: [
      { label: 'Microservices', value: '9' },
      { label: 'Tests Passing', value: '427' },
      { label: 'Coverage', value: '71%' },
      { label: 'Model/Schema', value: '100%' },
    ],
    year: '2025',
  },
  {
    id: 'lumen',
    index: '02',
    name: 'LUMEN',
    tagline: 'Mechanistic Transformer Interpretability Platform',
    description: 'A 10M+ parameter transformer language model built from scratch — no high-level libraries — paired with a full mechanistic interpretability toolkit. Attention visualization, activation probing, gradient attribution. Built to understand what neural networks are actually doing, not just what they output.',
    category: 'ML Research · Interpretability',
    status: 'beta',
    tags: ['PyTorch', 'Transformers', 'Interpretability', 'Mechanistic Interp', 'Ablation'],
    stats: [
      { label: 'Parameters', value: '10M+' },
      { label: 'Training Data', value: '30MB' },
      { label: 'Loss Reduction', value: '30%' },
      { label: 'Architecture', value: 'From Scratch' },
    ],
    year: '2026',
  },
  {
    id: 'dr-help',
    index: '03',
    name: 'Dr. Help',
    tagline: 'Multimodal Clinical Decision Support',
    description: 'Clinical AI synthesizing text, structured patient data, and medical imaging through a unified preprocessing pipeline for downstream diagnostic inference. Designed for real clinical workflows — not demo environments where inputs are clean and stakes are low.',
    category: 'Healthcare AI · Multimodal',
    status: 'stealth',
    tags: ['PyTorch', 'Multimodal', 'NLP', 'Clinical AI', 'Medical Imaging'],
    stats: [
      { label: 'Input Modalities', value: '3' },
      { label: 'Pipeline', value: 'Unified' },
      { label: 'Stage', value: 'Stealth' },
      { label: 'Domain', value: 'Clinical' },
    ],
    year: '2026',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'introducing-coffeemaker',
    title: 'Introducing Project Coffeemaker',
    category: 'Announcement',
    date: 'May 2026',
    excerpt: 'Today we are sharing, for the first time, the existence of Project Coffeemaker. We are not ready to say exactly what it is. We will say this: it is the most important thing we are working on.',
  },
  {
    slug: 'non-determinism-engineering-failure',
    title: 'Non-Determinism is an Engineering Failure',
    category: 'Research',
    date: 'April 2026',
    excerpt: 'The industry has accepted statistical inconsistency as an inevitable property of AI systems. We disagree. Here is why we built VERITAS and what we learned.',
  },
  {
    slug: 'lumen-interpretability',
    title: 'What We Found Inside a 10M Parameter Transformer',
    category: 'Research',
    date: 'March 2026',
    excerpt: 'Building LUMEN from scratch — tokenization, attention, optimization — was a prerequisite for trusting the interpretability results. Here is what the ablation experiments revealed.',
  },
  {
    slug: 'oral-cancer-99-5',
    title: 'Achieving 99.5% Accuracy on Oral Cancer Detection',
    category: 'Research',
    date: 'February 2026',
    excerpt: 'How our ensemble ViT + ResNet architecture surpassed prior published benchmarks on a 950-image clinical dataset, and what it means for early detection.',
  },
];

export const CAREERS = [
  { title: 'AI Research Scientist', dept: 'Research', type: 'Full-time', location: 'Pittsburgh, PA' },
  { title: 'Senior Systems Engineer', dept: 'Engineering', type: 'Full-time', location: 'Pittsburgh, PA' },
  { title: 'ML Infrastructure Engineer', dept: 'Engineering', type: 'Full-time', location: 'Remote' },
  { title: 'Clinical AI Researcher', dept: 'Medical AI', type: 'Full-time', location: 'Pittsburgh, PA' },
];
