/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Cpu, HelpCircle, Activity, Sparkles, AlertCircle, AlertTriangle, ArrowRight, ShieldCheck, Thermometer, Hammer, CheckCircle } from 'lucide-react';
import { DiagnosticResult, DiagnosticInput } from '../types';

interface AiDiagnosticsProps {
  onApplyDiagnosis: (prefill: {
    carYear: string;
    carMake: string;
    carModel: string;
    serviceType: string;
    message: string;
  }) => void;
}

export default function AiDiagnostics({ onApplyDiagnosis }: AiDiagnosticsProps) {
  const [input, setInput] = useState<DiagnosticInput>({
    carYear: '',
    carMake: '',
    carModel: '',
    symptoms: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState('');
  const [hasApplied, setHasApplied] = useState(false);

  // Simulated diagnostic messages during AI query
  const loadingPhases = [
    'Connecting to virtual OBD-II computer bus...',
    'Scanning vehicle diagnostic database...',
    'Analyzing Lumpkin County mountainous gradient impact...',
    'Synthesizing mechanical wear algorithms with ASE manuals...',
    'Formulating certified expert auto care diagnosis...'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingPhase(0);
      interval = setInterval(() => {
        setLoadingPhase((prev) => {
          if (prev < loadingPhases.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleRunDiagnostic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.carMake || !input.carModel || !input.symptoms) {
      setError('Please provide car make, model, and symptoms to scan.');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);
    setHasApplied(false);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error('Diagnostic system timed out. Please retry.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Connecting with AI mechanic failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookWithDiagnosis = () => {
    if (!result) return;
    
    // Auto map the AI diagnosis into form category
    let serviceType = 'other';
    const primaryCause = result.potentialCauses[0]?.title.toLowerCase() || '';
    if (primaryCause.includes('brake') || primaryCause.includes('rotor')) serviceType = 'brakes';
    else if (primaryCause.includes('diagnostic') || primaryCause.includes('sensor')) serviceType = 'diagnostics';
    else if (primaryCause.includes('ac') || primaryCause.includes('cool') || primaryCause.includes('radiator')) serviceType = 'cooling';
    else if (primaryCause.includes('oil') || primaryCause.includes('tune')) serviceType = 'maintenance';
    else if (primaryCause.includes('battery') || primaryCause.includes('alternator') || primaryCause.includes('starter')) serviceType = 'electrical';
    else if (primaryCause.includes('engine') || primaryCause.includes('belt') || primaryCause.includes('gasket')) serviceType = 'engine';

    const composedMessage = `AI diagnostic reference: ${result.urgency} (${result.estimateRange}). Symptoms: "${input.symptoms}". Potential Cause: ${result.potentialCauses[0]?.title} - ${result.potentialCauses[0]?.explanation}`;

    onApplyDiagnosis({
      carYear: input.carYear,
      carMake: input.carMake,
      carModel: input.carModel,
      serviceType,
      message: composedMessage,
    });

    setHasApplied(true);
    
    // Auto scroll down to the QuoteForm section
    const element = document.getElementById('lead-quote-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-[#121214] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden box-glow font-sans">
      {/* Glow background effects */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
        
        {/* Left Input Panel */}
        <div className="w-full md:w-[45%] space-y-5 shrink-0">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gemini Pro Powered</span>
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
              AI Automotive Assistant
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Describe symptoms (noises, dashboard lights, behaviors) and get an immediate professional diagnostic breakdown and repair cost range before you come to the shop.
            </p>
          </div>

          <form onSubmit={handleRunDiagnostic} className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1 space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400">Year</label>
                <input
                  type="text"
                  name="carYear"
                  maxLength={4}
                  value={input.carYear}
                  onChange={handleInputChange}
                  placeholder="2018"
                  disabled={isLoading}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
              <div className="col-span-1 space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400">Make *</label>
                <input
                  type="text"
                  name="carMake"
                  required
                  value={input.carMake}
                  onChange={handleInputChange}
                  placeholder="Subaru"
                  disabled={isLoading}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
              <div className="col-span-1 space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400">Model *</label>
                <input
                  type="text"
                  name="carModel"
                  required
                  value={input.carModel}
                  onChange={handleInputChange}
                  placeholder="Outback"
                  disabled={isLoading}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400">Describe Noise, Sensation, or Symptoms *</label>
              <textarea
                name="symptoms"
                required
                rows={4}
                value={input.symptoms}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="E.g., high-pitched squeal when stepping on brakes downhill, or clicking noise when turning steering wheel all the way right..."
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-orange resize-none"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white font-display font-bold uppercase tracking-wider text-xs py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Cpu className="w-4 h-4" />
              <span>Analyze Vehicle Symptoms</span>
            </button>
          </form>
        </div>

        {/* Right Output Screen */}
        <div className="w-full bg-gray-950/80 rounded-xl border border-gray-800/80 p-5 min-h-[340px] flex flex-col justify-between relative overflow-hidden">
          
          {isLoading ? (
            /* Scanning / Loading state */
            <div className="flex flex-col items-center justify-center my-auto py-10 text-center space-y-6 animate-pulse">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-brand-orange/20 border-t-brand-orange animate-spin" />
                <Cpu className="w-6 h-6 text-brand-orange absolute inset-0 m-auto animate-bounce" />
              </div>
              <div className="space-y-2 max-w-xs">
                <h4 className="font-display font-bold text-white text-sm">System Scanner Active</h4>
                <p className="text-xs text-brand-orange font-mono font-medium leading-relaxed tracking-wide min-h-[36px]">
                  {loadingPhases[loadingPhase]}
                </p>
              </div>
            </div>
          ) : result ? (
            /* Diagnostic Result */
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex justify-between items-start border-b border-gray-800 pb-3 gap-2">
                <div>
                  <h4 className="font-display font-bold text-white text-base">
                    {input.carYear} {input.carMake} {input.carModel} Diagnostic
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase mt-0.5">DTC Expert Analysis</p>
                </div>
                
                {/* Urgency Badge */}
                <div className={`px-2.5 py-1 rounded-full border text-[10px] font-mono uppercase tracking-wider font-bold shrink-0 flex items-center gap-1.5 ${
                  result.urgencyColor === 'red' 
                    ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                    : result.urgencyColor === 'yellow'
                    ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    : 'bg-green-500/10 text-green-400 border-green-500/20'
                }`}>
                  <AlertTriangle className="w-3 h-3" />
                  <span>{result.urgency}</span>
                </div>
              </div>

              {/* Technical Overview */}
              <p className="text-xs text-gray-300 leading-relaxed bg-[#121214]/60 p-3 rounded-lg border border-gray-850">
                <span className="text-brand-orange font-bold font-mono text-[10px] block uppercase mb-1">Shop Foreman Overview:</span>
                {result.technicalExplanation}
              </p>

              {/* Potential Causes List */}
              <div className="space-y-2.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block font-bold">Probable Causes:</span>
                
                <div className="grid grid-cols-1 gap-2">
                  {result.potentialCauses.map((cause, i) => (
                    <div key={i} className="bg-gray-900 border border-gray-800/80 p-3 rounded-xl space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white font-semibold font-display">{cause.title}</span>
                        <div className="flex gap-1.5 shrink-0 text-[9px] font-mono">
                          <span className={`px-1.5 py-0.5 rounded ${
                            cause.probability === 'High' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'
                          }`}>Prob: {cause.probability}</span>
                          <span className={`px-1.5 py-0.5 rounded ${
                            cause.severity === 'Critical' ? 'bg-red-500/10 text-red-400' : 'bg-gray-800 text-gray-400'
                          }`}>Sev: {cause.severity}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed font-sans">{cause.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estimate cost and Next Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-850 pt-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block font-bold">Estimated Cost Range:</span>
                  <div className="text-lg font-bold font-mono text-white glow-orange">{result.estimateRange}</div>
                  <span className="text-[9px] text-gray-500 leading-none block">Incl. full ASE diagnostic checks</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block font-bold">Actionable Next Steps:</span>
                  <ul className="text-[10px] text-gray-300 space-y-1 pl-1 font-mono">
                    {result.nextSteps.slice(0, 3).map((step, idx) => (
                      <li key={idx} className="flex gap-1.5 items-start">
                        <span className="text-brand-orange mt-0.5">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Button to Auto-Apply values to form */}
              <div className="pt-2 border-t border-gray-850">
                {hasApplied ? (
                  <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-xs p-3.5 rounded-xl flex items-center gap-2.5 justify-center">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Specifications applied to Quote form below!</span>
                  </div>
                ) : (
                  <button
                    onClick={handleBookWithDiagnosis}
                    className="w-full bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white border border-brand-orange/20 hover:border-brand-orange py-3 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Request Diagnostic Service Quote with this Info</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Idle Screen */
            <div className="flex flex-col items-center justify-center my-auto text-center py-10 px-4 space-y-4">
              <div className="p-4 rounded-full bg-gray-900 border border-gray-850 flex items-center justify-center">
                <Cpu className="w-8 h-8 text-gray-600" />
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h4 className="font-display font-bold text-white text-sm">Waiting for Vehicle Symtoms</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  Enter your vehicle specs and describe any noises, leaks, check engine codes, or issues in the left panel to scan your car engine and mechanical systems.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-500 pt-2 border-t border-gray-850/60 w-full max-w-xs">
                <div className="flex items-center gap-1.5 justify-center">
                  <Activity className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>DTC Code Scanner</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>Certified Advice</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
