import { Check, Zap, Shield, Crown, Globe, Cpu, Headphones, Box } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export default function PricingView() {
  const [billingCycle, setBillingCycle] = useState<'quarterly' | 'annually'>('annually');

  const handlePlanSelect = (planName: string) => {
    toast.success(`${planName} initialization initiated.`, {
      description: 'System is preparing your modular architecture environment.'
    });
  };

  const plans = [
    {
      name: 'Foundation Package',
      description: 'Essential structural integrity for personal executive discipline and focused output.',
      price: billingCycle === 'annually' ? '1,200' : '350',
      period: billingCycle === 'annually' ? '/ ANNUALLY' : '/ QUARTERLY',
      buttonText: 'ESTABLISH FOUNDATION',
      features: [
        { icon: Box, text: '12 STRATEGIC FOCUS NODES' },
        { icon: Zap, text: 'STABILITY PERFORMANCE METRICS' },
        { icon: Shield, text: 'SECURE ARCHITECTURAL SUPPORT' },
      ],
      highlight: false
    },
    {
      name: 'Legacy Package',
      tag: 'Limited Intake',
      description: 'The pinnacle of strategic endurance. Architectural mastery for multi-generational visionaries.',
      price: billingCycle === 'annually' ? '3,500' : '950',
      period: billingCycle === 'annually' ? '/ ANNUALLY' : '/ QUARTERLY',
      buttonText: 'COMMAND LEGACY',
      features: [
        { icon: Globe, text: 'UNLIMITED STRATEGIC CLUSTERS' },
        { icon: Cpu, text: 'DEEP BIO-ARCHITECTURAL AUDITS' },
        { icon: Crown, text: 'DEDICATED EXECUTIVE CONCIERGE' },
        { icon: Zap, text: 'FULL INSTITUTIONAL API ACCESS' },
      ],
      highlight: true
    }
  ];

  const comparisonData = [
    { vector: 'NODE CAPACITY', foundation: '12 Nodes', legacy: 'Infinite Nodes' },
    { vector: 'ANALYTIC DEPTH', foundation: 'Core Visuals', legacy: 'Architectural Suite' },
    { vector: 'RESPONSE PROTOCOL', foundation: 'Standard Advisory', legacy: 'Instant Liaison' },
    { vector: 'INSTITUTIONAL BRIDGES', foundation: '—', legacy: true },
  ];

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <div className="text-center mb-16 lg:mb-24">
        <h1 className="text-4xl lg:text-7xl font-bold font-display text-gray-900 tracking-tight mb-6">
          The Architecture of <span className="italic text-brand-primary">Strategic Focus.</span>
        </h1>
        <p className="max-w-3xl mx-auto text-gray-500 font-medium text-sm lg:text-lg leading-relaxed">
          Cultivating long-term clarity for the modern executive. Engineered for permanence and architectural stability in a distracted world.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${billingCycle === 'quarterly' ? 'text-brand-primary' : 'text-gray-400'}`}>
            Quarterly
          </span>
          <button 
            onClick={() => setBillingCycle(billingCycle === 'annually' ? 'quarterly' : 'annually')}
            className="w-16 h-8 bg-gray-200 rounded-full p-1 relative flex items-center"
          >
            <motion.div 
              animate={{ x: billingCycle === 'annually' ? 32 : 0 }}
              className="w-6 h-6 bg-brand-primary rounded-full shadow-md shadow-brand-primary/20" 
            />
          </button>
          <div className="flex flex-col items-start">
            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${billingCycle === 'annually' ? 'text-brand-primary' : 'text-gray-400'}`}>
              Annually <span className="italic opacity-80 ml-1">INSTITUTIONAL</span>
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {plans.map((plan, idx) => (
          <div 
            key={idx}
            className={`rounded-[2rem] p-8 lg:p-12 border transition-all ${
              plan.highlight 
                ? 'bg-gray-900 text-white border-brand-primary shadow-2xl shadow-brand-primary/10 lg:scale-105 z-10' 
                : 'bg-white text-gray-900 border-black/5 shadow-sm'
            }`}
          >
            <div className="flex justify-between items-start mb-8">
              <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] ${plan.highlight ? 'text-brand-light' : 'text-brand-primary'}`}>{plan.name}</h3>
              {plan.tag && <span className="text-[10px] font-bold italic opacity-60">{plan.tag}</span>}
            </div>

            <p className={`text-sm lg:text-base font-medium mb-12 leading-relaxed ${plan.highlight ? 'opacity-80' : 'text-gray-500'}`}>
              {plan.description}
            </p>

            <div className="flex items-baseline gap-2 mb-12">
              <span className="text-5xl lg:text-7xl font-black font-display font-sans">$</span>
              <span className="text-6xl lg:text-8xl font-black font-display tracking-tighter">{plan.price}</span>
              <span className={`text-[10px] font-black uppercase tracking-widest opacity-60 ml-2`}>{plan.period}</span>
            </div>

            <button 
              onClick={() => handlePlanSelect(plan.name)}
              className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all mb-12 ${
                plan.highlight 
                  ? 'bg-brand-primary text-white hover:bg-brand-secondary shadow-lg shadow-brand-primary/20' 
                  : 'bg-white text-brand-primary border border-brand-primary/20 hover:bg-brand-light'
              }`}
            >
              {plan.buttonText}
            </button>

            <div className="space-y-6">
              <p className={`text-[10px] font-black uppercase tracking-widest opacity-40 mb-4`}>
                {plan.highlight ? 'INSTITUTIONAL SPECS' : 'CORE ARCHITECTURE'}
              </p>
              {plan.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                    plan.highlight ? 'bg-white/5 border-white/10 text-brand-light' : 'bg-brand-light/20 border-brand-light/50 text-brand-primary'
                  }`}>
                    <feature.icon size={16} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table Section */}
      <div className="mt-32">
        <h2 className="text-center text-4xl lg:text-7xl font-black font-display uppercase tracking-[0.5em] mb-20 opacity-10">
          TECHNICAL ARCHITECTURE
        </h2>
        
        <div className="bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm">
          <div className="grid grid-cols-3 border-b border-black/5">
            <div className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">STRATEGIC VECTORS</div>
            <div className="p-8 text-center italic font-display font-bold text-lg">Foundation</div>
            <div className="p-8 text-center italic font-display font-bold text-lg text-brand-primary">Legacy</div>
          </div>
          
          {comparisonData.map((row, idx) => (
            <div key={idx} className="grid grid-cols-3 border-b border-black/5 last:border-0 hover:bg-gray-50 transition-colors">
              <div className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">{row.vector}</div>
              <div className="p-8 text-center text-sm font-bold text-gray-900 flex items-center justify-center">{row.foundation}</div>
              <div className="p-8 text-center text-sm font-bold text-brand-primary flex items-center justify-center">
                {row.legacy === true ? <Check size={20} /> : row.legacy}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
