/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BUSINESS_INFO } from '../data';
import { ShieldCheck, MapPin, Award, CheckCircle, Clock, Heart, Wrench, ChevronRight } from 'lucide-react';

const mechanicImage = '/src/assets/images/mechanic_working_1782627918778.jpg';

export default function AboutView() {
  return (
    <div className="space-y-16 sm:space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-sans">
      
      {/* 1. Header & Vision */}
      <div className="text-center space-y-2.5">
        <span className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
          Our Story
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
          About EG Evans Auto Services LLC
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Delivering honest mechanical craftsmanship, dealership-level scanning systems, and a family-first policy from our Waterloo Dr workshop.
        </p>
      </div>

      {/* 2. Story Grid with Generated Asset */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Image Column */}
        <div className="bg-gray-900 border border-gray-800 p-2.5 rounded-2xl shadow-xl overflow-hidden group">
          <div className="rounded-xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] relative">
            <img
              src={mechanicImage}
              alt="EG Evans Automotive Technician inspecting engine bay"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm border border-gray-800 px-4 py-3 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              <div className="text-left">
                <span className="block text-xs font-mono font-bold text-white leading-none">ASE CERTIFIED TECH</span>
                <span className="block text-[10px] text-gray-400 mt-1 uppercase">Active Diagnostics Bus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Details Column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
              Est. 2026 in Dahlonega GA
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
              Hometown Mechanics You Can Trust
            </h2>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed font-sans">
            Founded with a commitment to technical precision and transparent consumer relations, EG Evans Auto Services LLC has established itself as the premier choice for regional drivers in Lumpkin County.
          </p>

          <p className="text-sm text-gray-300 leading-relaxed font-sans">
            Modern automobiles are complex electronic systems. That is why we invest heavily in factory-level diagnostic computers and continuous training. We bridge the gap between expensive dealership services and small mom-and-pop repair shops by offering cutting-edge computerized analytics at a fair, local price.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-850">
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono uppercase text-gray-500 font-bold block">Certified Credentials:</span>
              <ul className="text-xs text-gray-300 space-y-2">
                {BUSINESS_INFO.credentials.map((cred, idx) => (
                  <li key={idx} className="flex gap-2 items-center">
                    <CheckCircle className="w-4 h-4 text-brand-orange shrink-0" />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5">
              <span className="text-[10px] font-mono uppercase text-gray-500 font-bold block">Shop Operating Hours:</span>
              <div className="space-y-1.5 text-xs text-gray-400 font-mono">
                {BUSINESS_INFO.hours.map((item, idx) => (
                  <div key={idx} className="flex justify-between border-b border-gray-850/40 pb-1">
                    <span>{item.days}:</span>
                    <span className="text-white font-semibold">{item.times}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Service Area Regional Focus Checklist */}
      <section className="bg-gradient-to-b from-gray-900 to-[#121214] border border-gray-850 rounded-3xl p-8 sm:p-12 text-center md:text-left font-sans">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
              Regional Scope
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight">
              Proudly Serving North Georgia
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              We operate a physical workshop located at 321 Waterloo Dr, Dahlonega, GA, making it highly accessible to commuters and local businesses. Our service radius supports major neighboring communities.
            </p>
            <p className="text-xs text-gray-500 font-mono">
              📍 Area Served: Lumpkin, white, Dawson, and Gainesville counties.
            </p>
          </div>

          <div className="md:col-span-2 bg-gray-950/80 p-5 rounded-2xl border border-gray-850 space-y-3 shrink-0">
            <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-orange block">
              Core Cities Covered:
            </span>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              {BUSINESS_INFO.serviceArea.cities.map((city, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-gray-300 font-mono">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>{city}</span>
                </div>
              ))}
            </div>

            <div className="bg-brand-orange/5 border border-brand-orange/15 rounded-xl p-3 text-[11px] leading-relaxed text-gray-400 font-sans">
              ⛰️ <span className="text-white font-semibold">Mountain commute prep:</span> Ask us about customized transmission fluids and heavy-duty brake configurations optimized for local Georgia passes!
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
