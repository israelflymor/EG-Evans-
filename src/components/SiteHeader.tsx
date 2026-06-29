/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface SiteHeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function SiteHeader({ currentTab, setCurrentTab }: SiteHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open (Design Guardrail rule)
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Work Portfolio' },
    { id: 'diagnostics', label: 'AI Diagnostic Helper' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Upper Info Utility Bar (NAP Alignment + High Trust) */}
      <div className="bg-[#0b0b0c] border-b border-gray-800 text-xs py-2 px-4 hidden lg:block font-mono text-gray-400">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-orange" />
              <span>{BUSINESS_INFO.address.full}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-orange" />
              <span>Mon-Fri: 8AM-5:30PM | Sat: 9AM-1PM</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
              <span>ASE Certified Shop</span>
            </span>
            <a href={`tel:${BUSINESS_INFO.contact.phone}`} className="flex items-center gap-1.5 text-brand-orange font-bold hover:underline">
              <Phone className="w-3.5 h-3.5" />
              <span>{BUSINESS_INFO.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#0d0d0f]/95 backdrop-blur-md py-3 border-gray-800/80 shadow-lg shadow-black/20'
            : 'bg-[#0b0b0c] py-5 border-gray-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="bg-gradient-to-br from-brand-orange to-red-600 p-2 rounded-lg flex items-center justify-center shadow-md shadow-brand-orange/10 group-hover:scale-105 transition-transform duration-200">
              <span className="font-display font-bold text-white text-lg tracking-wider">EG</span>
            </div>
            <div>
              <span className="block font-display font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-brand-orange transition-colors">
                EG Evans <span className="text-brand-orange">Auto</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-mono -mt-1 font-medium">
                Services LLC
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                  currentTab === link.id
                    ? 'text-brand-orange bg-brand-orange/5 border border-brand-orange/20'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/40 border border-transparent'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Call To Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center justify-center bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white text-xs lg:text-sm font-display font-bold uppercase tracking-wider px-4.5 py-2.5 rounded-lg border border-brand-orange/30 shadow-lg shadow-brand-orange/15 hover:shadow-brand-orange/25 active:scale-98 transition-all duration-200"
            >
              Get a Quote
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/60 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Full Screen Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-[60px] sm:top-[73px] z-50 bg-[#0b0b0c] md:hidden flex flex-col justify-between border-t border-gray-800 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl font-display font-semibold text-lg transition-all ${
                    currentTab === link.id
                      ? 'text-brand-orange bg-brand-orange/5 border-l-4 border-brand-orange pl-3'
                      : 'text-gray-300 hover:bg-gray-800/40 border-l-4 border-transparent'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Footer Details */}
            <div className="p-6 bg-gray-900/40 border-t border-gray-800 space-y-4">
              <div className="space-y-2.5">
                <a
                  href={`tel:${BUSINESS_INFO.contact.phone}`}
                  className="flex items-center gap-3 text-white font-semibold font-display text-lg"
                >
                  <Phone className="w-5 h-5 text-brand-orange" />
                  <span>{BUSINESS_INFO.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${BUSINESS_INFO.contact.email}`}
                  className="flex items-center gap-3 text-gray-300 text-sm font-mono"
                >
                  <Mail className="w-5 h-5 text-brand-orange" />
                  <span>{BUSINESS_INFO.contact.email}</span>
                </a>
              </div>
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-3 rounded-xl font-display font-bold uppercase tracking-widest text-sm shadow-md transition-colors"
              >
                Request Custom Service Quote
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
