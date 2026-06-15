/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface ProductCase {
  id: string;
  title: string;
  tagline: string;
  field: string; // 保密单位落地, 公安实战, 商业园区
  description: string;
  features: string[];
  techStack: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string; // Simple visual abbreviation
  experience: string;
  description: string;
  coreTech: string[];
}

export interface ROIProposalInput {
  industry: string;
  teamSize: number;
  mainProblem: string;
}

export interface ROIProposalResult {
  title: string;
  overview: string;
  estimatedSaving: string;
  productivityGain: string;
  modules: { name: string; desc: string; iconName: string }[];
  timeline: { phase: string; title: string; duration: string; details: string }[];
  architectureDiagram: { step: string; action: string; output: string }[];
}
