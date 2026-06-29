/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Phone, ArrowRight, ShieldCheck, Award, ThumbsUp, MapPin, Wrench, Clock, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO, SERVICES, PROJECTS } from '../data';

const HERO_SLIDES = [
  {
    image: '/src/assets/images/workshop_bay_hero_1782646124013.jpg',
    badge: 'ASE Certified Master Mechanics',
    title: 'Precision Auto Repair',
    accentTitle: 'Done Right.',
    description: 'Expert computer diagnostics, high-performance brake upgrades, and full-service mechanical repair on Waterloo Dr, Dahlonega. Engineered to handle rugged North Georgia terrain.',
    linkTab: 'contact',
    btnText: 'Book Quote & Inspection'
  },
  {
    image: '/src/assets/images/brake_service_hero_1782646139709.jpg',
    badge: 'Mountain Braking Specialists',
    title: 'High-Performance Brakes',
    accentTitle: 'Built for Descents.',
    description: 'Steep highway slopes cause massive thermal stresses on rotors and fluid. We fit custom, heavy-duty anti-warp rotors and high-friction brake pads to prevent brake fade.',
    linkTab: 'services',
    btnText: 'Explore Brake Services'
  },
  {
    image: '/src/assets/images/diagnostic_tech_hero_1782646154340.jpg',
    badge: 'Advanced System Diagnostics',
    title: 'Dealership-Level Scans',
    accentTitle: 'Error Pinpointing.',
    description: 'Equipped with factory-matching computerized diagnostic consoles. We scan electronic networks, program modules, and trace sensor signals for honest engine diagnostics.',
    linkTab: 'diagnostics',
    btnText: 'Run AI Diagnostic Scan'
  }
];

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
}

export default function HomeView({ setCurrentTab }: HomeViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Cinematic Hero Section with Image Slider */}
      <section 
        className="relative min-h-[550px] lg:min-h-[640px] flex items-center justify-center py-16 sm:py-24 overflow-hidden bg-black font-sans select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img
                src={HERO_SLIDES[currentSlide].image}
                alt={HERO_SLIDES[currentSlide].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-35 object-center scale-102"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0c] via-transparent to-transparent hidden md:block" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            
            {/* Slide Content Side */}
            <div className="md:col-span-3 space-y-6 min-h-[380px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  {/* Trust Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs font-mono uppercase tracking-wider font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{HERO_SLIDES[currentSlide].badge}</span>
                  </div>

                  {/* Headings */}
                  <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
                    {HERO_SLIDES[currentSlide].title} <br />
                    <span className="text-brand-orange">{HERO_SLIDES[currentSlide].accentTitle}</span>
                  </h1>

                  <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
                    {HERO_SLIDES[currentSlide].description}
                  </p>

                  {/* Quick Actions CTAs */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-2">
                    <button
                      onClick={() => handleNavClick(HERO_SLIDES[currentSlide].linkTab)}
                      className="w-full sm:w-auto bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white font-display font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-xl shadow-lg shadow-brand-orange/20 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{HERO_SLIDES[currentSlide].btnText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleNavClick('diagnostics')}
                      className="w-full sm:w-auto bg-[#121214] hover:bg-gray-800 text-gray-200 border border-gray-800 hover:border-gray-750 font-display font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Run AI Diagnostic</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Fast trust checklist */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4 text-xs font-mono text-gray-400 pt-4 border-t border-gray-800/60 max-w-lg mx-auto md:mx-0">
                <div className="flex items-center gap-1.5 justify-center md:justify-start">
                  <span className="text-brand-orange text-lg leading-none">•</span>
                  <span>12-Month/12,000-Mile Warranty</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center md:justify-start">
                  <span className="text-brand-orange text-lg leading-none">•</span>
                  <span>Modern Dealership Scanners</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center md:justify-start">
                  <span className="text-brand-orange text-lg leading-none">•</span>
                  <span>Local Dahlonega Owned</span>
                </div>
              </div>

            </div>

            {/* Quick Promo Contact Card */}
            <div className="md:col-span-2 hidden md:block">
              <div className="bg-[#121214]/90 border border-gray-800 p-6 rounded-2xl space-y-4 backdrop-blur-sm box-glow">
                <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider border-b border-gray-800 pb-2">
                  Emergency Mechanical Assistance
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Experiencing dashboard lights or mechanical failure? Speak with our head diagnostic tech directly.
                </p>
                <div className="space-y-3 pt-2">
                  <a href={`tel:${BUSINESS_INFO.contact.phone}`} className="flex items-center gap-3 bg-brand-orange/5 border border-brand-orange/25 p-3 rounded-xl hover:bg-brand-orange/10 transition-colors">
                    <Phone className="w-5 h-5 text-brand-orange shrink-0 animate-bounce" />
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase font-mono leading-none">Call Workshop</span>
                      <span className="block text-white font-bold font-mono text-sm mt-1">{BUSINESS_INFO.contact.phone}</span>
                    </div>
                  </a>
                  <div className="flex items-start gap-3 text-xs text-gray-400 font-sans">
                    <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <span>321 Waterloo Dr, Dahlonega, GA 30533 (Opposite Waterloo Station)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Left/Right Slider Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-brand-orange/25 text-white/70 hover:text-white border border-gray-850 hover:border-brand-orange/40 flex items-center justify-center transition-all cursor-pointer hidden md:flex animate-in fade-in"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-brand-orange/25 text-white/70 hover:text-white border border-gray-850 hover:border-brand-orange/40 flex items-center justify-center transition-all cursor-pointer hidden md:flex animate-in fade-in"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bullet Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === index ? 'w-8 bg-brand-orange' : 'w-2.5 bg-gray-600/60 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Bento-Grid Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-sans">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
            The EG Evans Difference
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
            Designed for Reliability, Engineered for Safety
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            We don’t just swap parts; we diagnose vehicle networks, trace electrical lines, and custom configure components to deliver ultimate reliability on Georgia highways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Advanced Scanners */}
          <div className="bg-gradient-to-b from-gray-900 to-[#121214] border border-gray-800 hover:border-brand-orange/30 p-6 rounded-2xl space-y-4 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Dealership Diagnostics</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Our workshop is outfitted with exact-equivalent factory scanning computers (Snap-on Pro and Autel Elite systems), allowing us to program modules, reset adaptation values, and read DTCs directly.
            </p>
          </div>

          {/* Card 2: Mountain Mountain Driving Specs */}
          <div className="bg-gradient-to-b from-gray-900 to-[#121214] border border-gray-800 hover:border-brand-orange/30 p-6 rounded-2xl space-y-4 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Mountain Braking Specialist</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Commuting downhill causes extreme thermal stress. We specialize in severe-duty cooling fluids, performance brake pads, and anti-warp cross-drilled rotor designs that guarantee zero brake fade.
            </p>
          </div>

          {/* Card 3: Authentic Local Guarantee */}
          <div className="bg-gradient-to-b from-gray-900 to-[#121214] border border-gray-800 hover:border-brand-orange/30 p-6 rounded-2xl space-y-4 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">100% Honest Local Business</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              No dealership markup, no hidden fees, and zero unrequested repairs. We walk you through every computer scan, show you the worn component physically, and ask your express permission first.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Services Highlights Preview */}
      <section className="bg-gray-950 border-y border-gray-850 py-16 sm:py-20 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
                Professional Care
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight mt-1">
                Bumper-to-Bumper Mechanical Care
              </h2>
            </div>
            <button
              onClick={() => handleNavClick('services')}
              className="text-xs font-display font-bold text-brand-orange uppercase tracking-wider hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Explore All Repair Categories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map((service) => (
              <div 
                key={service.id} 
                className="bg-gradient-to-b from-[#121214] to-[#0b0b0c] border border-gray-850 rounded-2xl p-6 flex flex-col justify-between hover:scale-101 hover:border-brand-orange/25 transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="text-brand-orange font-mono text-xs font-semibold uppercase bg-brand-orange/5 border border-brand-orange/15 w-fit px-2.5 py-0.5 rounded-full">
                    {service.category}
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">{service.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">{service.shortDescription}</p>
                </div>
                <div className="pt-6 border-t border-gray-850/60 mt-6 flex justify-between items-center text-xs">
                  <span className="font-mono text-gray-400">Fee: {service.priceEstimate}</span>
                  <button 
                    onClick={() => handleNavClick('services')} 
                    className="text-brand-orange hover:text-white font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Details</span>
                    <span>›</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. High-Trust Projects/Case study Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
              Proven Workmanship
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight leading-none">
              Overcoming High-Thermal Brake Fade
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              David, a Dahlonega local commuter, experienced severe steering wheel shaking when driving down Highway 19 mountain passes. Standard local mechanics quoted thousands for unrelated suspension swaps.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              We hooked up our run-out diagnostics, proved that high-thermal brake descent had glazed his pads and warped his stock rotors, and completed a severe-duty ceramic overhaul. Driving Waterloo is now flawless.
            </p>
            
            <div className="bg-gray-900 border border-gray-800 p-4.5 rounded-xl text-xs space-y-2.5 border-l-4 border-l-brand-orange font-mono">
              <span className="text-[10px] text-gray-500 block uppercase font-bold">Active Diagnosis Applied:</span>
              <p className="text-gray-300 italic font-sans">
                "EG Evans Auto diagnosed the exact rotor warping that other shops tried to charge me thousands in control-arms to solve. Honest mechanics exist!"
              </p>
              <span className="block text-white font-semibold text-right">- David L., Commuter</span>
            </div>

            <button
              onClick={() => handleNavClick('projects')}
              className="bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white font-display font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-lg border border-brand-orange/20 hover:border-brand-orange transition-all duration-200 inline-flex items-center gap-2"
            >
              <span>View Repair Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-2.5 shadow-2xl overflow-hidden group">
            <div className="rounded-xl overflow-hidden aspect-[16/10] relative">
              <img
                src="/src/assets/images/jeep_mountain_brakes_1782646194307.jpg"
                alt="ASE Automotive Brake Overhaul"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex justify-between items-end">
                <span className="text-xs font-mono bg-brand-orange text-white font-bold px-2 py-0.5 rounded uppercase">Brake Upgrade Case</span>
                <span className="text-xs text-gray-300 font-mono">Completed June 2026</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Pre-appointment Call-out */}
      <section className="bg-gradient-to-r from-brand-orange/10 to-transparent border border-brand-orange/15 rounded-3xl p-8 sm:p-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left relative overflow-hidden font-sans">
        <div className="absolute right-[-10%] bottom-[-20%] w-[40%] h-[120%] bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 relative z-10">
          <div className="space-y-3 max-w-xl">
            <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight">
              Get an Immediate Diagnostic Assessment
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Don’t let that dashboard warning light linger. Bring your car to EG Evans Auto Services LLC or consult our certified mechanics online right now.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={() => handleNavClick('diagnostics')}
              className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl transition-all shadow-md text-center"
            >
              Consult AI Mechanic
            </button>
            <a
              href={`tel:${BUSINESS_INFO.contact.phone}`}
              className="w-full sm:w-auto bg-gray-950 hover:bg-gray-800 text-white font-display font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl transition-all border border-gray-800 text-center inline-flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-brand-orange animate-pulse" />
              <span>Call (706) 864-1980</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
