/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import ProjectsView from './components/ProjectsView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import AiDiagnostics from './components/AiDiagnostics';
import { QuoteSubmission } from './types';
import { Sparkles, Phone, Cpu } from 'lucide-react';
import { BUSINESS_INFO } from './data';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [prefilledData, setPrefilledData] = useState<Partial<QuoteSubmission> | undefined>(undefined);

  // Auto handle pre-filled symptoms from the AI Diagnostic Helper
  const handleApplyDiagnosis = (prefill: {
    carYear: string;
    carMake: string;
    carModel: string;
    serviceType: string;
    message: string;
  }) => {
    setPrefilledData(prefill);
    setCurrentTab('contact');
  };

  const handleClearPrefill = () => {
    setPrefilledData(undefined);
  };

  const handleSelectServiceForQuote = (serviceId: string) => {
    setPrefilledData({
      serviceType: serviceId,
    });
  };

  const renderCurrentView = () => {
    switch (currentTab) {
      case 'home':
        return <HomeView setCurrentTab={setCurrentTab} />;
      case 'services':
        return (
          <ServicesView 
            onSelectServiceForQuote={handleSelectServiceForQuote} 
            setCurrentTab={setCurrentTab} 
          />
        );
      case 'projects':
        return <ProjectsView setCurrentTab={setCurrentTab} />;
      case 'diagnostics':
        return <AiDiagnostics onApplyDiagnosis={handleApplyDiagnosis} />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return (
          <ContactView 
            prefilledData={prefilledData} 
            onClearPrefill={handleClearPrefill} 
          />
        );
      default:
        return <HomeView setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0b0b0c] text-gray-100 font-sans selection:bg-brand-orange selection:text-white">
      
      {/* Upper Announcement Alert Slider (Local Target SEO optimization) */}
      <div className="bg-gradient-to-r from-red-600 via-brand-orange to-red-600 text-white py-1.5 px-4 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-center shadow-md relative z-50 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
        <span>Grand Opening: Modern Auto care on Waterloo Dr, Dahlonega GA!</span>
        <span className="hidden sm:inline">|</span>
        <a href={`tel:${BUSINESS_INFO.contact.phone}`} className="hover:underline flex items-center gap-1">
          <Phone className="w-3 h-3 shrink-0" />
          <span>Call: {BUSINESS_INFO.contact.phone}</span>
        </a>
      </div>

      {/* Modern Navigation Header */}
      <SiteHeader currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Interactive Screen */}
      <main className="flex-grow py-8 sm:py-12 md:py-16 bg-[#0b0b0c] relative overflow-hidden">
        {/* Glow behind layouts */}
        <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="animate-in fade-in duration-300">
          {renderCurrentView()}
        </div>
      </main>

      {/* Floating Call to AI Mechanic action button for high engagement */}
      {currentTab !== 'diagnostics' && (
        <div className="fixed bottom-6 right-6 z-30 animate-bounce hover:animate-none">
          <button
            onClick={() => {
              setCurrentTab('diagnostics');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white font-display font-bold uppercase tracking-widest text-[10px] sm:text-xs px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-xl shadow-brand-orange/30 border border-brand-orange/20 hover:scale-105 transition-all"
            aria-label="Access AI Diagnostic Helper"
          >
            <Cpu className="w-4 h-4" />
            <span>AI Diagnostic Helper</span>
          </button>
        </div>
      )}

      {/* Foot navigation */}
      <SiteFooter setCurrentTab={setCurrentTab} />
    </div>
  );
}
