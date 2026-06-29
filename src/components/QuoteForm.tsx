/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, AlertTriangle, ArrowRight, Shield, Sparkles, Send } from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../data';
import { QuoteSubmission } from '../types';

interface QuoteFormProps {
  prefilledData?: Partial<QuoteSubmission>;
  onClearPrefill?: () => void;
}

export default function QuoteForm({ prefilledData, onClearPrefill }: QuoteFormProps) {
  const [formData, setFormData] = useState<QuoteSubmission>({
    name: '',
    email: '',
    phone: '',
    carYear: '',
    carMake: '',
    carModel: '',
    serviceType: '',
    message: '',
    preferredDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle auto pre-filling (e.g., from AI Diagnosis tool)
  useEffect(() => {
    if (prefilledData) {
      setFormData((prev) => ({
        ...prev,
        carYear: prefilledData.carYear || prev.carYear,
        carMake: prefilledData.carMake || prev.carMake,
        carModel: prefilledData.carModel || prev.carModel,
        serviceType: prefilledData.serviceType || prev.serviceType,
        message: prefilledData.message || prev.message,
      }));
    }
  }, [prefilledData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // Form Validation Check
    if (!formData.name || !formData.email || !formData.phone || !formData.carMake || !formData.carModel) {
      setErrorMessage('Please fill in all the required fields (*).');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate real-world lead delivery delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      if (onClearPrefill) onClearPrefill();
    } catch (err) {
      setErrorMessage('Something went wrong. Please call EG Evans Auto directly at (706) 864-1980.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      carYear: '',
      carMake: '',
      carModel: '',
      serviceType: '',
      message: '',
      preferredDate: '',
    });
    setSubmitSuccess(false);
  };

  // Find selected service info if any
  const selectedService = SERVICES.find((s) => s.id === formData.serviceType);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-[#121214] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden box-glow font-sans">
      
      {/* Visual Accent Corner Ribbon */}
      <div className="absolute top-0 right-0 bg-brand-orange text-white text-[10px] font-mono uppercase font-bold tracking-widest px-4 py-1.5 rounded-bl-xl shadow-md flex items-center gap-1.5">
        <Shield className="w-3 h-3" />
        <span>ASE Guaranteed</span>
      </div>

      {submitSuccess ? (
        <div className="text-center py-8 space-y-6 animate-in fade-in duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
            <CheckCircle className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-display font-bold text-2xl text-white tracking-tight">
              Quote Request Received!
            </h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Thank you, <span className="text-white font-medium">{formData.name}</span>. Our Dahlonega repair team is reviewing details for your <span className="text-white font-medium">{formData.carYear} {formData.carMake} {formData.carModel}</span>.
            </p>
          </div>

          <div className="bg-gray-950/60 border border-gray-800/80 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2.5 font-mono">
            <div className="flex justify-between border-b border-gray-800/60 pb-1.5 text-gray-400">
              <span>Primary Contact:</span>
              <span className="text-white">{formData.phone}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800/60 pb-1.5 text-gray-400">
              <span>Service category:</span>
              <span className="text-brand-orange uppercase">{selectedService?.title || 'General Mechanical Repair'}</span>
            </div>
            {formData.preferredDate && (
              <div className="flex justify-between border-b border-gray-800/60 pb-1.5 text-gray-400">
                <span>Preferred Date:</span>
                <span className="text-white">{formData.preferredDate}</span>
              </div>
            )}
            <div className="text-gray-500 text-[11px] leading-relaxed pt-1.5">
              💡 Our service writers typically contact customers within <span className="text-brand-orange font-bold">2 hours</span> of receipt during active workshop hours.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={handleReset}
              className="bg-gray-800 hover:bg-gray-750 text-white text-xs font-display font-semibold uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors border border-gray-700/60"
            >
              Submit Another Quote
            </button>
            <a
              href={`tel:${BUSINESS_INFO.contact.phone}`}
              className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-display font-semibold uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-1.5 justify-center"
            >
              Call Tech Directly
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5 border-b border-gray-800/60 pb-4">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight flex items-center gap-2">
              <span>Request a Custom Quote</span>
              {prefilledData && (
                <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border border-brand-orange/20 animate-pulse flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Prefilled
                </span>
              )}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              No obligation, free repair scope and diagnostic pricing. Fill in your vehicle and contact details below.
            </p>
          </div>

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 flex items-start gap-3 text-xs text-red-400 animate-in fade-in duration-200">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Customer Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
              1. Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-xs text-gray-300 font-medium">Name <span className="text-brand-orange">*</span></label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs text-gray-300 font-medium">Email <span className="text-brand-orange">*</span></label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs text-gray-300 font-medium">Phone <span className="text-brand-orange">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(706) 555-0100"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Vehicle Info */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
              2. Vehicle Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-xs text-gray-300 font-medium">Year <span className="text-gray-500">(Optional)</span></label>
                <input
                  type="text"
                  name="carYear"
                  maxLength={4}
                  value={formData.carYear}
                  onChange={handleChange}
                  placeholder="e.g., 2018"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs text-gray-300 font-medium">Make <span className="text-brand-orange">*</span></label>
                <input
                  type="text"
                  name="carMake"
                  required
                  value={formData.carMake}
                  onChange={handleChange}
                  placeholder="e.g., Ford"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs text-gray-300 font-medium">Model <span className="text-brand-orange">*</span></label>
                <input
                  type="text"
                  name="carModel"
                  required
                  value={formData.carModel}
                  onChange={handleChange}
                  placeholder="e.g., F-150"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Job Requirements */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
              3. Service Requirements
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs text-gray-300 font-medium">Primary Repair/Service Category</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-all"
                >
                  <option value="">-- Select Repair Type (or General) --</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                  <option value="other">Other Mechanical Issue</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-xs text-gray-300 font-medium">Preferred Booking Date <span className="text-gray-500">(Optional)</span></label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs text-gray-300 font-medium">
                Describe Symptoms, Noise, or Service Needed <span className="text-brand-orange">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Please describe exactly what you are experiencing. E.g., Squealing noise when braking on downhills, Check Engine light is on, fluid dripping underneath..."
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-all resize-y"
              />
            </div>
          </div>

          {/* Info Card when prefilled service type matches prices */}
          {selectedService && (
            <div className="bg-brand-orange/5 border border-brand-orange/15 rounded-xl p-3 flex justify-between items-center text-xs animate-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-4 h-4 text-brand-orange" />
                <span>Base service starts at: <span className="text-white font-semibold">{selectedService.priceEstimate}</span></span>
              </div>
              <span className="text-gray-500 font-mono text-[10px] hidden sm:inline">Est. duration: {selectedService.duration}</span>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 disabled:from-gray-800 disabled:to-gray-900 disabled:text-gray-500 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-display font-bold uppercase tracking-wider text-sm shadow-lg shadow-brand-orange/15 hover:shadow-brand-orange/25 active:scale-99 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Submitting Specifications...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Request Custom Quote & Booking</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
