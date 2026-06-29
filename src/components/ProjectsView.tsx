/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PROJECTS } from '../data';
import { ShieldCheck, User, Star, ArrowRight, Wrench, Settings, Calendar, Award } from 'lucide-react';

interface ProjectsViewProps {
  setCurrentTab: (tab: string) => void;
}

export default function ProjectsView({ setCurrentTab }: ProjectsViewProps) {
  const handleBookInspection = () => {
    setCurrentTab('contact');
    setTimeout(() => {
      const element = document.getElementById('lead-quote-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-sans">
      
      {/* Header */}
      <div className="text-center space-y-2.5">
        <span className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
          Proven Workmanship
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
          Recent Mechanical Repair Cases
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Explore real repairs completed in our Dahlonega workshop. We document our computer scanners, physical symptoms, and custom solutions to prove our certified expertise.
        </p>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
        {PROJECTS.map((project, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={project.id}
              className={`bg-gradient-to-b from-gray-900 to-[#121214] border border-gray-800 rounded-2xl overflow-hidden shadow-xl flex flex-col ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-[45%] shrink-0 relative aspect-[16/10] lg:aspect-auto min-h-[240px] bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 bg-brand-orange text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded shadow-md">
                  {project.serviceType}
                </div>
              </div>

              {/* Content Details */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  
                  {/* Vehicle Tag */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-400">
                    <span className="bg-gray-950 px-2.5 py-1 rounded text-gray-300 font-semibold border border-gray-850">
                      {project.vehicle}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                      <span>Year: {project.completionYear}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Settings className="w-3.5 h-3.5 text-brand-orange" />
                      <span>Duration: {project.duration}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {/* Challenges if any */}
                  {project.challenges && (
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-brand-orange font-bold block">
                        Our Technical Solution:
                      </span>
                      <p className="text-xs text-gray-400 italic">
                        {project.challenges}
                      </p>
                    </div>
                  )}

                </div>

                {/* Client Review Box */}
                {project.feedback && (
                  <div className="pt-5 border-t border-gray-850 bg-gray-950/40 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5 font-display text-xs text-white font-semibold">
                        <User className="w-4 h-4 text-brand-orange" />
                        <span>{project.feedback.author}</span>
                      </span>
                      <div className="flex text-brand-orange shrink-0">
                        {Array.from({ length: project.feedback.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-brand-orange" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans italic">
                      "{project.feedback.text}"
                    </p>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Signoff CTA */}
      <section className="bg-[#0f0f11] border border-gray-850 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto text-center space-y-4 font-sans">
        <h3 className="font-display font-bold text-lg text-white">Need a Similar Professional Assessment?</h3>
        <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
          Our mechanics are equipped with state-of-the-art diagnostics to solve complex problems without dealership overhead. Book a safe inspection today.
        </p>
        <button
          onClick={handleBookInspection}
          className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-display font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-1.5"
        >
          <Award className="w-4 h-4" />
          <span>Book Safe Mechanical Inspection</span>
        </button>
      </section>

    </div>
  );
}
