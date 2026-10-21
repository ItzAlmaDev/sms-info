import React, { useState, useId } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  Wrench, 
  Search, 
  ArrowRight, 
  MessageSquare
} from 'lucide-react';
import { siteContent } from '../content/siteContent';

export interface FAQItem {
  id?: string;
  category: 'consulting' | 'equipment';
  question: string;
  answer: string;
}

export const defaultFAQs: FAQItem[] = siteContent.defaultFaqs;

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
  // Keyed by the question text, not by position in the filtered list, so changing
  // a filter cannot accidentally open a different FAQ.
  const [openQuestions, setOpenQuestions] = useState<string[]>(
    items.length > 0 ? [items[0].question] : []
  );
  const baseId = useId();

  const toggleItem = (question: string) => {
    setOpenQuestions((prev) =>
      prev.includes(question) ? prev.filter((q) => q !== question) : [...prev, question]
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
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter FAQ Categories">
          <button
            type="button"
            aria-pressed={activeCategory === 'all'}
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
            aria-pressed={activeCategory === 'consulting'}
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
            aria-pressed={activeCategory === 'equipment'}
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
          <p className="text-xs text-slate-600 mt-1">Try searching for other terms like &ldquo;servicing&rdquo;, &ldquo;walkthrough&rdquo;, or &ldquo;evacuation&rdquo;.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-3 text-xs font-bold text-[#1A456F] hover:text-[#B45309] underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((faq, idx) => {
            const isOpen = openQuestions.includes(faq.question);
            const questionId = `${baseId}-q-${idx}`;
            const answerId = `${baseId}-a-${idx}`;

            return (
              <div 
                key={faq.question}
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
                  onClick={() => toggleItem(faq.question)}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4974C] rounded-2xl"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
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
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] text-slate-950 text-xs font-bold rounded-lg hover:bg-[#1EBE5D] transition-colors"
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
