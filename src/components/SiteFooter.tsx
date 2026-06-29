/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, MapPin, Clock, Shield, Star, Award, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface SiteFooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function SiteFooter({ setCurrentTab }: SiteFooterProps) {
  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0b0c] border-t border-gray-800 text-gray-400 font-sans">
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          
          {/* Column 1: Brand & Credentials */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="bg-brand-orange p-1.5 rounded-md text-white font-display font-bold text-sm tracking-wider">
                EG
              </div>
              <span className="font-display font-bold text-lg text-white">
                EG Evans <span className="text-brand-orange">Auto</span> Services
              </span>
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              Precision diagnostic and repair specialists serving Dahlonega, Lumpkin County, and surrounding communities. Providing ASE-certified mechanical excellence with a hometown guarantee.
            </p>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-gray-300 font-mono">
                <Shield className="w-4 h-4 text-brand-orange shrink-0" />
                <span>ASE Certified Master Techs</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-300 font-mono">
                <Award className="w-4 h-4 text-brand-orange shrink-0" />
                <span>12-Month / 12,000-Mile Parts Warranty</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-300 font-mono">
                <Heart className="w-4 h-4 text-brand-orange shrink-0" />
                <span>Family-Owned & Local GA Business</span>
              </div>
            </div>
          </div>

          {/* Column 2: Sitemap / Fast Navigation */}
          <div className="space-y-5">
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider border-b border-gray-800 pb-2">
              Our Sitemap
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavClick('home')} 
                  className="hover:text-brand-orange transition-colors flex items-center gap-1.5 text-left py-1"
                >
                  <span className="text-brand-orange">›</span> Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('services')} 
                  className="hover:text-brand-orange transition-colors flex items-center gap-1.5 text-left py-1"
                >
                  <span className="text-brand-orange">›</span> Auto Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('projects')} 
                  className="hover:text-brand-orange transition-colors flex items-center gap-1.5 text-left py-1"
                >
                  <span className="text-brand-orange">›</span> Case Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('diagnostics')} 
                  className="hover:text-brand-orange transition-colors flex items-center gap-1.5 text-left py-1"
                >
                  <span className="text-brand-orange">›</span> AI Diagnostic
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('about')} 
                  className="hover:text-brand-orange transition-colors flex items-center gap-1.5 text-left py-1"
                >
                  <span className="text-brand-orange">›</span> Our Story
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('contact')} 
                  className="hover:text-brand-orange transition-colors flex items-center gap-1.5 text-left py-1"
                >
                  <span className="text-brand-orange">›</span> Get Quote
                </button>
              </li>
            </ul>

            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 space-y-2">
              <span className="text-xs uppercase font-mono tracking-wider block text-brand-orange font-bold">
                Local Area Focus
              </span>
              <p className="text-xs leading-relaxed text-gray-400">
                Operating out of Waterloo Dr, we frequently service vehicles from Lumpkin County, white, Dawson, and Gainesville areas.
              </p>
            </div>
          </div>

          {/* Column 3: Contact Details & Hours */}
          <div className="space-y-5">
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider border-b border-gray-800 pb-2">
              Contact & Hours
            </h3>
            
            <div className="space-y-3.5 text-sm">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">EG Evans Workshop</span>
                  <span className="block text-gray-400">{BUSINESS_INFO.address.full}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">Service Line</span>
                  <a href={`tel:${BUSINESS_INFO.contact.phone}`} className="hover:text-brand-orange transition-colors text-brand-orange font-bold font-mono">
                    {BUSINESS_INFO.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">Business Hours</span>
                  {BUSINESS_INFO.hours.map((item, index) => (
                    <span key={index} className="block text-xs text-gray-400">
                      {item.days}: {item.times}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lower Copyright Row */}
      <div className="bg-[#080809] border-t border-gray-800/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500">
          <p>© {currentYear} {BUSINESS_INFO.name}. All Rights Reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => handleNavClick('about')} className="hover:text-brand-orange transition-colors">Privacy & Scope</button>
            <span>•</span>
            <span className="text-gray-400">SEO Optimized for Lumpkin County GA</span>
            <span>•</span>
            <span className="text-brand-orange hover:underline cursor-pointer" onClick={() => handleNavClick('diagnostics')}>AI Diagnostics Beta</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
