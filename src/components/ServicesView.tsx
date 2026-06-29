/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SERVICES } from '../data';
import { Service } from '../types';
import { Cpu, Disc, Wrench, Thermometer, Activity, Zap, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, Clock, HelpCircle } from 'lucide-react';

interface ServicesViewProps {
  onSelectServiceForQuote: (serviceId: string) => void;
  setCurrentTab: (tab: string) => void;
}

export default function ServicesView({ onSelectServiceForQuote, setCurrentTab }: ServicesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>('diagnostics'); // Expand diagnostics by default

  const categories = [
    { id: 'all', label: 'All Repair Services' },
    { id: 'diagnostics', label: 'Diagnostics' },
    { id: 'brakes', label: 'Brakes & Stopping' },
    { id: 'maintenance', label: 'Preventive' },
    { id: 'cooling', label: 'AC & Cooling' },
    { id: 'engine', label: 'Engine Repair' },
    { id: 'electrical', label: 'Electrical Systems' }
  ];

  const filteredServices = selectedCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === selectedCategory);

  const toggleExpand = (id: string) => {
    setExpandedServiceId(expandedServiceId === id ? null : id);
  };

  const handleBookService = (serviceId: string) => {
    onSelectServiceForQuote(serviceId);
    setCurrentTab('contact');
    
    // Smooth scroll down to form
    setTimeout(() => {
      const element = document.getElementById('lead-quote-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Map icon strings to actual Lucide components
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-brand-orange" />;
      case 'Disc':
        return <Disc className="w-5 h-5 text-brand-orange animate-spin-slow" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-brand-orange" />;
      case 'ThermometerSnowflake':
        return <Thermometer className="w-5 h-5 text-brand-orange" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-brand-orange" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-brand-orange animate-pulse" />;
      default:
        return <HelpCircle className="w-5 h-5 text-brand-orange" />;
    }
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-sans">
      
      {/* 1. Header and Categories */}
      <div className="text-center space-y-2.5">
        <span className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
          What We Do
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
          Professional Automotive Repair Services
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          From complex fuel diagnostics and ECU tracking to heavy-duty brake overhauls, our ASE-certified techs provide dealership-level precision at honest regional pricing.
        </p>

        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setExpandedServiceId(null);
              }}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-brand-orange text-white border-brand-orange shadow-md shadow-brand-orange/10'
                  : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white hover:border-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Expanding Accordion List */}
      <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
        {filteredServices.map((service) => {
          const isExpanded = expandedServiceId === service.id;
          return (
            <div
              key={service.id}
              className={`bg-[#121214] border rounded-2xl transition-all overflow-hidden ${
                isExpanded 
                  ? 'border-brand-orange/40 shadow-xl shadow-brand-orange/5' 
                  : 'border-gray-800 hover:border-gray-750'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleExpand(service.id)}
                className="w-full text-left px-5 sm:px-6 py-5 flex items-center justify-between gap-4 transition-colors hover:bg-gray-900/40"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-950/80 border border-gray-800 flex items-center justify-center shrink-0">
                    {renderIcon(service.iconName)}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-brand-orange">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-0.5 uppercase tracking-wider">
                      Fee: {service.priceEstimate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-flex text-[10px] font-mono bg-brand-orange/5 border border-brand-orange/15 text-brand-orange px-2.5 py-0.5 rounded-full uppercase">
                    {service.category}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-brand-orange shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                  )}
                </div>
              </button>

              {/* Accordion Expanded Content */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-gray-850/60 bg-gray-950/20 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    
                    {/* Descriptions */}
                    <div className="md:col-span-3 space-y-4">
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-brand-orange font-bold block">
                          Technical Breakdown
                        </span>
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                          {service.longDescription}
                        </p>
                      </div>

                      {/* Benefits checkmark list */}
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">
                          Included Deliverables:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {service.benefits.map((benefit, i) => (
                            <li key={i} className="flex gap-2 items-start text-gray-400">
                              <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                              <span className="font-sans">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Operational parameters & Booking card */}
                    <div className="md:col-span-2 bg-[#0b0b0c] border border-gray-850 p-5 rounded-xl flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-brand-orange font-bold border-b border-gray-850 pb-1.5">
                          Service Details
                        </h4>
                        
                        <div className="space-y-2 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Duration Range:</span>
                            <span className="text-white flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-brand-orange" />
                              <span>{service.duration}</span>
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Diagnostic Fee:</span>
                            <span className="text-white font-bold text-right">{service.priceEstimate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Warranty Scope:</span>
                            <span className="text-brand-orange font-bold">12-Mo / 12,000-Mi</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Tech Assigned:</span>
                            <span className="text-gray-300">ASE Certified Tech</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleBookService(service.id)}
                        className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold uppercase tracking-wider text-xs py-3 rounded-lg shadow-md shadow-brand-orange/10 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Book {service.title}</span>
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. FAQ Section */}
      <section className="bg-gradient-to-b from-gray-900 to-[#121214] border border-gray-850 rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto space-y-6">
        <div className="border-b border-gray-800 pb-3">
          <h3 className="font-display font-bold text-xl text-white tracking-tight flex items-center gap-2">
            <span>Frequently Asked Questions</span>
          </h3>
          <p className="text-xs text-gray-400">
            Learn more about our mechanic procedures and warranties.
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <h4 className="text-white font-semibold font-display">How much does check engine diagnosis cost?</h4>
            <p className="text-gray-400 font-sans leading-relaxed">Our comprehensive computerized scan, wire tracing, and physical mechanical inspection start at a flat $95. If you decide to proceed with the recommended repair at EG Evans, we typically waive or credit this diagnostic fee toward the total bill.</p>
          </div>
          <div className="space-y-1.5 pt-3 border-t border-gray-850">
            <h4 className="text-white font-semibold font-display">Do you work on imported or hybrid vehicles?</h4>
            <p className="text-gray-400 font-sans leading-relaxed">Yes! Our mechanics are ASE-certified and equipped with Snap-on Pro scanners configured specifically to handle European models (Subaru, Toyota, Honda, Volkswagen, BMW) and hybrid drivetrain electronic diagnostics.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
