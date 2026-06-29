/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BUSINESS_INFO } from '../data';
import { QuoteSubmission } from '../types';
import QuoteForm from './QuoteForm';
import { MapPin, Phone, Mail, Clock, ShieldCheck, HelpCircle } from 'lucide-react';

interface ContactViewProps {
  prefilledData?: Partial<QuoteSubmission>;
  onClearPrefill?: () => void;
}

export default function ContactView({ prefilledData, onClearPrefill }: ContactViewProps) {
  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-sans">
      
      {/* Header */}
      <div className="text-center space-y-2.5">
        <span className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
          Get in Touch
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
          Contact EG Evans Auto Services
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Schedule maintenance, request computer diagnostics, or submit your vehicle’s symptoms for an expert mechanical quote.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        
        {/* Left 2 Columns: Contact details and cards */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-[#121214] border border-gray-800 rounded-2xl p-6 space-y-5">
            <h3 className="font-display font-bold text-white text-lg border-b border-gray-850 pb-2">
              Workshop Contact Info
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-brand-orange mt-0.5 shrink-0" />
                <div>
                  <span className="block text-white font-semibold">Our Workshop Address</span>
                  <span className="block text-gray-400 mt-0.5">{BUSINESS_INFO.address.full}</span>
                  <span className="block text-[11px] text-gray-500 font-mono mt-1">Directly off Highway 19, Dahlonega</span>
                </div>
              </div>

              <div className="flex gap-3 border-t border-gray-850 pt-4">
                <Phone className="w-5 h-5 text-brand-orange mt-0.5 shrink-0" />
                <div>
                  <span className="block text-white font-semibold">Direct Workshop Line</span>
                  <a href={`tel:${BUSINESS_INFO.contact.phone}`} className="block text-brand-orange font-bold font-mono text-base mt-0.5 hover:underline">
                    {BUSINESS_INFO.contact.phone}
                  </a>
                  <span className="block text-[11px] text-gray-500 mt-1">Speak with head mechanic</span>
                </div>
              </div>

              <div className="flex gap-3 border-t border-gray-850 pt-4">
                <Mail className="w-5 h-5 text-brand-orange mt-0.5 shrink-0" />
                <div>
                  <span className="block text-white font-semibold">Service Desk Email</span>
                  <a href={`mailto:${BUSINESS_INFO.contact.email}`} className="block text-gray-300 font-mono mt-0.5 hover:underline">
                    {BUSINESS_INFO.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-3 border-t border-gray-850 pt-4">
                <Clock className="w-5 h-5 text-brand-orange mt-0.5 shrink-0" />
                <div>
                  <span className="block text-white font-semibold">Workshop Hours</span>
                  <div className="space-y-1 text-xs text-gray-400 font-mono mt-1">
                    {BUSINESS_INFO.hours.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.days}:</span>
                        <span className="text-white font-medium">{item.times}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantee Badges card */}
          <div className="bg-gradient-to-r from-brand-orange/5 to-transparent border border-brand-orange/15 rounded-2xl p-6 space-y-3">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-orange" />
              <span>Certified Service Shop</span>
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              All electrical diagnostics and mechanical component fittings are performed by certified ASE mechanics. We cover parts and labor under a nationwide warranty.
            </p>
          </div>

          {/* Map Placeholder Card (SEO NAP Support) */}
          <div className="bg-[#121214] border border-gray-800 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-orange font-bold block">
              Physical Location Context:
            </span>
            <div className="aspect-[16/10] w-full bg-gray-950 border border-gray-850 rounded-lg flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
              {/* Abstract map layout for beauty */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(#ff5500_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>
              
              <MapPin className="w-8 h-8 text-brand-orange mb-2 animate-bounce" />
              <span className="text-xs text-white font-display font-semibold">Waterloo Dr Workshop Map</span>
              <p className="text-[10px] text-gray-500 max-w-[180px] mt-1">
                Opposite Dahlonega Waterloo Station. Heavy-duty vehicle diagnostic lifts inside.
              </p>
            </div>
          </div>

        </div>

        {/* Right 3 Columns: Quote Lead Capture Form */}
        <div id="lead-quote-form" className="lg:col-span-3">
          <QuoteForm prefilledData={prefilledData} onClearPrefill={onClearPrefill} />
        </div>

      </div>

    </div>
  );
}
