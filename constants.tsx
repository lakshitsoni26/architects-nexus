import { Project, Product, Skill } from './types';
import React from 'react';
import {
  Code2,
  Cpu,
  Globe,
  ShieldCheck,
  Database,
  Layers
} from 'lucide-react';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'SENTINEL PROTOCOL',
    category: 'DeFi Security',
    description: 'Autonomous smart contract auditing infrastructure utilizing AI-driven heuristics to detect re-entrancy attacks in real-time.',
    tech: ['Solidity', 'Rust', 'TensorFlow', 'React'],
    image: '/images/sentinel_protocol.png',
    links: {
      live: 'https://sentinellai.netlify.app/',
      github: 'https://github.com/Dakshx07/Sentinel-ML-Back4app'
    }
  },
  {
    id: 'p2',
    title: 'MEDICHAIN VAULT',
    category: 'Healthcare DAO',
    description: 'Decentralized patient record management system ensuring zero-knowledge privacy for medical data exchange.',
    tech: ['IPFS', 'Next.js', 'ZK-Snarks', 'Ethereum'],
    image: '/images/medichain_vault.png',
    links: {
      video: 'https://youtu.be/IzPafU6Re-w',
      github: 'https://github.com/ssid18/MediChain'
    }
  },
  {
    id: 'p3',
    title: 'AYUCHAIN',
    category: 'Supply Chain',
    description: 'Blockchain-based supply chain management system for Ayurvedic medicines ensuring authenticity and traceability.',
    tech: ['Solidity', 'React', 'Ethereum', 'Web3.js'],
    image: '/images/ayuchain.png',
    links: {
      github: 'https://github.com/lakshitsoni26/ayuuchain'
    }
  }
];

export const SKILLS: Skill[] = [
  // Web Development
  { name: 'HTML', level: 98, category: 'Web Dev', icon: 'FileCode' },
  { name: 'CSS', level: 95, category: 'Web Dev', icon: 'Palette' },
  { name: 'JavaScript', level: 98, category: 'Web Dev', icon: 'FileJson' },
  { name: 'React/Next.js', level: 98, category: 'Web Dev', icon: 'Globe' },
  { name: 'TypeScript', level: 95, category: 'Web Dev', icon: 'Code2' },

  // Backend Development
  { name: 'C', level: 80, category: 'Backend', icon: 'Terminal' },
  { name: 'C++', level: 85, category: 'Backend', icon: 'Cpu' },
  { name: 'Java', level: 88, category: 'Backend', icon: 'Coffee' },
  { name: 'Solidity', level: 95, category: 'Web3', icon: 'Cpu' },
  { name: 'Rust', level: 85, category: 'Web3', icon: 'Code2' },

  // Core Skills
  { name: 'DSA', level: 90, category: 'Core', icon: 'Binary' },
  { name: 'Machine Learning', level: 85, category: 'Core', icon: 'Brain' },
  { name: 'Problem Solving', level: 95, category: 'Core', icon: 'Puzzle' },
  { name: 'Time Management', level: 90, category: 'Core', icon: 'Clock' },

  // Tools
  { name: 'Git', level: 95, category: 'Tools', icon: 'GitBranch' },
  { name: 'GitHub', level: 95, category: 'Tools', icon: 'Github' },
  { name: 'Docker', level: 85, category: 'Tools', icon: 'Container' },
  { name: 'Supabase', level: 88, category: 'Tools', icon: 'Database' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'dev-1',
    title: 'Web3 Starter Kit',
    description: 'Complete boilerplate for dApp development. Includes WalletConnect, Wagmi, and Tailwind setup.',
    priceUsd: 29.99,
    features: ['Next.js 14 Template', 'RainbowKit Integration', 'Smart Contract Mockups'],
    image: '/images/web3_starter_kit.png'
  },
  {
    id: 'dev-2',
    title: 'Audit Checklist Pro',
    description: 'The definitive manual for securing Solidity contracts. Over 200 vectors analyzed.',
    priceUsd: 89.00,
    features: ['PDF Guide', 'Automated Script', 'Consultation Credit'],
    image: '/images/audit_checklist_pro.png'
  },
  {
    id: 'dev-3',
    title: 'The Rust Primer',
    description: 'Accelerated learning path for Solana development using Rust.',
    priceUsd: 59.00,
    features: ['Video Modules', 'Code Snippets', 'Private Discord'],
    image: '/images/rust_primer.png'
  }
];

export const ETH_PRICE_USD = 2800; // Mock current price