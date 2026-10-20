import React, { useState, useId } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  Wrench, 
  Search, 
  ArrowRight, 
  MessageSquare, 
  Phone 
} from 'lucide-react';
import { siteContent } from '../content/siteContent';

export interface FAQItem {
  id?: string;
  category: 'consulting' | 'equipment';
  question: string;
  answer: string;
}

export const defaultFAQs: FAQItem[] = [
  {
    category: 'consulting',
    question: 'What happens during an on-site safety walkthrough?',
    answer: 'Our safety consultant visits your premises to conduct an observational walkthrough alongside your facility lead or administrator. We review corridor widths, emergency exits, electrical closets, hazardous material storage, and signage visibility. Afterward, we deliver a straightforward photographic debrief report with prioritized action items: immediate, low-cost fixes versus long-term facility enhancements.',
  },
  {
    category: 'consulting',
    question: 'Which industries and facility types do you consult for in Jharkhand?',
    answer: 'We consult for commercial office complexes, IT/BPO workplaces, educational campuses (schools, colleges, coaching institutes), healthcare centers, light manufacturing units, retail stores, and multi-tenant residential societies across Ranchi and Eastern India.',
  },
  {
    category: 'consulting',
    question: 'How do SMS recommendations align with Indian building and safety standards?',
    answer: 'All recommendations are grounded in established workplace life safety fundamentals and reference National Building Code of India (NBC) occupancy and means-of-egress guidelines. We translate complex technical rules into practical, premises-specific actions tailored to your daily operations.',
  },
  {
    category: 'consulting',
    question: 'How does emergency evacuation route mapping work?',
    answer: 'We convert your architectural floor plans into clear, standardized "You Are Here" emergency evacuation diagrams. These display primary and alternate escape paths, fire extinguisher positions, first-aid stations, and outdoor assembly areas in bilingual format (English and Hindi) for zero ambiguity during emergencies.',
  },
  {
    category: 'equipment',
    question: 'What types of fire extinguishers and safety equipment does SMS supply?',
    answer: 'We supply ABC Dry Chemical Powder (DCP), Carbon Dioxide (CO2), Clean Agent, and Water-type fire extinguishers, along with industrial first-aid kits, photo-luminescent glow-in-the-dark evacuation signage, personal protective equipment (PPE), and emergency exit lighting.',
  },
  {
    category: 'equipment',
    question: 'Can you assist with periodic extinguisher refilling, testing, and upkeep?',
    answer: 'Yes. Having expired or depressurized equipment puts lives at risk. SMS provides scheduled maintenance services including pressure gauge audits, safety pin inspections, hose/nozzle integrity checks, pressure tracking, and scheduled refilling across Ranchi and surrounding districts.',
  },
  {
    category: 'equipment',
    question: 'Do you conduct hands-on training for staff on using safety equipment?',
    answer: 'Yes. Equipment is only useful if people know how to use it under pressure. We organize practical workshops for staff, teachers, security personnel, and facility teams demonstrating the P.A.S.S. technique (Pull, Aim, Squeeze, Sweep) and calm evacuation procedures.',
  },
  {
    category: 'equipment',
    question: 'How can an organization schedule an initial consultation or request a quote?',
    answer: 'You can submit a consultation request through our online form, call our Ranchi office directly at +91 93347 01135, chat with us on WhatsApp, or visit our office on Walking Street, Main Road (opposite Capitol Hill, 4th Floor, Ranchi).',
  },
];

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  kicker?: string;
  items?: FAQItem[];
  onNavigate?: (path: string) => void;
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  title = 'Frequently Asked Questions',
  subtitle = 'Clear answers to common questions about our on-site safety consulting, evacuation blueprints, and equipment management.',
  kicker = 'Client Advisory & Support',
  items = defaultFAQs,
  onNavigate,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'consulting' | 'equipment'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First item open by default
  const baseId = useId();

  const toggleItem = (index: number) => {
    setOpenIndices((prev) => 
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section 
      className={`bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm ${className}`}
      aria-labelledby={`${baseId}-heading`}
    >
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#336E95] uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-[#F4974C]" />
          <span>{kicker}</span>
        </div>
        <h2 
          id={`${baseId}-heading`}
          className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47] tracking-tight mb-3"
        >
          {title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter FAQ Categories">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#0F2C47] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#0F2C47]'
            }`}
          >
            All Questions ({items.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'consulting'}
            onClick={() => setActiveCategory('consulting')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'consulting'
                ? 'bg-[#0F2C47] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#0F2C47]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#F4974C]" />
            <span>Safety Consulting</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'equipment'}
            onClick={() => setActiveCategory('equipment')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'equipment'
                ? 'bg-[#0F2C47] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#0F2C47]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-[#62B5DA]" />
            <span>Equipment & Maintenance</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            aria-label="Search frequently asked questions"
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#275079] focus:ring-2 focus:ring-[#F4974C]/20 transition-all text-slate-800"
          />
        </div>

      </div>

      {/* Accordion Questions List */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200/60 p-6">
          <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No matching questions found</p>
          <p className="text-xs text-slate-500 mt-1">Try searching for other terms like &ldquo;refill&rdquo;, &ldquo;walkthrough&rdquo;, or &ldquo;evacuation&rdquo;.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-3 text-xs font-bold text-[#1A456F] hover:text-[#F4974C] underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            const questionId = `${baseId}-q-${idx}`;
            const answerId = `${baseId}-a-${idx}`;

            return (
              <div 
                key={idx}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-[#336E95]/40 bg-slate-50/60 shadow-sm' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4974C] rounded-2xl"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        faq.category === 'consulting'
                          ? 'bg-[#1A456F]/10 text-[#1A456F]'
                          : 'bg-[#F4974C]/15 text-[#0F2C47]'
                      }`}>
                        {faq.category === 'consulting' ? 'Safety Consulting' : 'Equipment & Upkeep'}
                      </span>
                    </div>
                    <span className="text-sm sm:text-base font-bold text-[#0F2C47] block leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#1A456F] text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div 
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Contact Callout Banner */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#0F2C47] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#1A456F]">
        <div>
          <h3 className="text-base font-bold text-white mb-1">
            Have a specific premises question not listed here?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Speak directly with Director Sabir Hussain or our safety advisory team in Ranchi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={siteContent.contact.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] text-white text-xs font-bold rounded-lg hover:bg-[#1EBE5D] transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Us</span>
          </a>

          {onNavigate ? (
            <button
              type="button"
              onClick={() => onNavigate('/contact/')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F4974C] hover:bg-[#F0853F] text-[#0F2C47] text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <a
              href="/contact/"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F4974C] hover:bg-[#F0853F] text-[#0F2C47] text-xs font-bold rounded-lg transition-colors"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
