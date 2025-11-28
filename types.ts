export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  links?: {
    live?: string;
    github?: string;
    video?: string;
  };
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Core' | 'Web3' | 'Tools' | 'Web Dev' | 'Backend';
  icon: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  priceUsd: number;
  features: string[];
  image: string;
}

export interface UplinkFormData {
  identity: string;
  email: string;
  objective: string;
  parameters: string;
  budget: number;
}
