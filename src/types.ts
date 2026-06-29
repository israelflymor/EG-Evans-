/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: 'maintenance' | 'diagnostics' | 'engine' | 'brakes' | 'cooling' | 'electrical';
  priceEstimate: string;
  duration: string;
  iconName: string;
  benefits: string[];
}

export interface Project {
  id: string;
  title: string;
  vehicle: string;
  serviceType: string;
  description: string;
  image: string;
  duration: string;
  completionYear: string;
  challenges?: string;
  feedback?: {
    author: string;
    rating: number;
    text: string;
  };
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface QuoteSubmission {
  name: string;
  email: string;
  phone: string;
  carYear: string;
  carMake: string;
  carModel: string;
  serviceType: string;
  message: string;
  preferredDate?: string;
}

export interface DiagnosticInput {
  carYear: string;
  carMake: string;
  carModel: string;
  symptoms: string;
}

export interface DiagnosticCause {
  title: string;
  probability: 'High' | 'Medium' | 'Low';
  explanation: string;
  severity: 'Critical' | 'Moderate' | 'Low';
}

export interface DiagnosticResult {
  potentialCauses: DiagnosticCause[];
  urgency: string;
  urgencyColor: 'red' | 'yellow' | 'green';
  estimateRange: string;
  technicalExplanation: string;
  nextSteps: string[];
}
