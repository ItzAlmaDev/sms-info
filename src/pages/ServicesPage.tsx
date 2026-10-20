import React, { useState, useEffect } from 'react';
import { siteContent, ConsolidatedService } from '../content/siteContent';
import { 
  ClipboardCheck, 
  Signpost, 
  ShieldCheck, 
  Megaphone, 
  Check, 
  ArrowRight, 
  ArrowUpRight, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Phone,
  Factory,
  GraduationCap,
  Building2,
  Cross,
  Home,
  Boxes
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  onSelectService?: (serviceName: string) => void;
  initialCategory?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ 
  onNavigate, 
  onSelectService,
  initialCategory,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Smooth scroll to targeted service category if URL has a hash or initialCategory prop
  useEffect(() => {
    const targetId = initialCategory || (typeof window !== 'undefined' && window.location.hash ? window.location.hash.replace('#', '') : null);
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    }
  }, [initialCategory]);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => prev === index ? null : index);
  };

  const handleEnquire = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    onNavigate('/contact/');
  };

  const getServiceIcon = (letter: string) => {
    switch (letter) {
      case 'A':
        return <ClipboardCheck className="w-6 h-6 text-[#F4974C]" />;
      case 'B':
        return <Signpost className="w-6 h-6 text-[#F4974C]" />;
      case 'C':
        return <ShieldCheck className="w-6 h-6 text-[#F4974C]" />;
      case 'D':
      default:
        return <Megaphone className="w-6 h-6 text-[#F4974C]" />;
    }
  };

  const getIndustryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Factory className="w-5 h-5 text-[#336E95]" />;
      case 1:
        return <GraduationCap className="w-5 h-5 text-[#336E95]" />;
      case 2:
        return <Building2 className="w-5 h-5 text-[#336E95]" />;
      case 3:
        return <Cross className="w-5 h-5 text-[#336E95]" />;
      case 4:
        return <Home className="w-5 h-5 text-[#336E95]" />;
      case 5:
      default:
        return <Boxes className="w-5 h-5 text-[#336E95]" />;
    }
  };

  return (
    <div className="bg-[#F3F7FA] text-[#0B1B2B]">
      
      {/* 
        ========================================================================
        1. COMPACT PAGE INTRODUCTION
        - Clear H1
        - Short description
        - Consultation CTA
        ========================================================================
      */}
      <section className="bg-[#0F2C47] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1A456F]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#62B5DA] block mb-2">
              Comprehensive Service Overview
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 text-balance">
              Our Safety Services & Solutions
            </h1>
            <p className="text-[15px] sm:text-[16px] text-slate-300 leading-relaxed mb-6 max-w-2xl">
              SMS delivers practical, premises-tailored safety services across Ranchi, Jharkhand, and Eastern India. Every engagement is grounded in physical walkthroughs, functional equipment, clear escape mapping, and educated staff.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/contact/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contact/');
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F4974C] hover:bg-[#F0853F] active:bg-[#E57737] text-[#0F2C47] text-[14px] font-bold rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Request a Safety Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-[#0F2C47]" />
              </a>
              <a
                href="#service-cards"
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <span>Browse Service Categories</span>
                <ChevronDown className="w-4 h-4 text-[#62B5DA]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        2-5. FOUR CONSOLIDATED SERVICE CARDS IN A BALANCED 2-COLUMN GRID
        Desktop: 2-column balanced grid
        Mobile: 1 card per row
        Each card includes:
        - Category key & title
        - Short purpose description
        - Complete, scannable sub-services list
        - "Enquire about this service" button
        ========================================================================
      */}
      <section id="service-cards" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="mb-10 max-w-2xl">
          <span className="text-[13px] font-bold uppercase tracking-wider text-[#336E95] block mb-1">
            Core Service Catalogue
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47] tracking-tight">
            Four Focused Pillars of Workplace & Premises Safety
          </h2>
          <p className="text-[14px] sm:text-[15px] text-slate-600 mt-2">
            Inspect our genuine service offerings below. All items are delivered with hands-on on-site execution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {siteContent.consolidatedServices.map((service: ConsolidatedService) => (
            <article
              key={service.id}
              id={service.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-[#336E95] transition-colors scroll-mt-28"
            >
              <div>
                {/* Header Lockup */}
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#0F2C47] flex items-center justify-center shrink-0">
                      {getServiceIcon(service.categoryLetter)}
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider font-bold text-[#336E95] block">
                        Category {service.categoryLetter}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2C47] tracking-tight">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Short Purpose Description */}
                <div className="mb-6">
                  <p className="text-[14px] font-medium text-slate-700 leading-relaxed">
                    {service.shortDesc}
                  </p>
                  <p className="text-[13px] text-slate-500 leading-relaxed mt-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <strong className="text-slate-700">Purpose:</strong> {service.purpose}
                  </p>
                </div>

                {/* Complete Scannable List of Sub-Services */}
                <div className="mb-6">
                  <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#0F2C47] mb-3">
                    Sub-Services & Deliverables Included:
                  </h4>
                  <ul className="space-y-2.5">
                    {service.subServices.map((sub, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-slate-600">
                        <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span className="leading-snug">{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action Area */}
              <div className="pt-5 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  onClick={() => handleEnquire(service.title)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0F2C47] hover:bg-[#1A456F] text-white text-[14px] font-bold rounded-xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4974C]"
                >
                  <span>Enquire about this service</span>
                  <ArrowRight className="w-4 h-4 text-[#F4974C]" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 
        ========================================================================
        6. ONE SHARED THREE-STEP PROCESS SECTION
        (Not repeated under every service)
        ========================================================================
      */}
      <section className="py-16 sm:py-20 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#336E95] block mb-1">
              Methodical Execution
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F2C47] tracking-tight">
              {siteContent.sharedProcess.title}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-600 mt-2 leading-relaxed">
              {siteContent.sharedProcess.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteContent.sharedProcess.steps.map((st) => (
              <div 
                key={st.number}
                className="bg-[#F3F7FA] rounded-2xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl sm:text-4xl font-black text-[#F4974C] tabular-nums block mb-3">
                    {st.number}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F2C47] mb-2">
                    {st.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        7. COMPACT LIST OF INDUSTRIES SERVED
        ========================================================================
      */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-[13px] font-bold uppercase tracking-wider text-[#336E95] block mb-1">
            Sector Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47] tracking-tight">
            Facilities & Industries We Support
          </h2>
          <p className="text-[14px] sm:text-[15px] text-slate-600 mt-2">
            Our practical safety methodologies are adapted to the physical conditions and daily workflows of various facility types across Eastern India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteContent.industriesCompact.map((ind, iIdx) => (
            <div 
              key={ind.name}
              className="p-5 rounded-xl bg-white border border-slate-200 flex items-start gap-3.5 hover:border-[#336E95] transition-colors"
            >
              <div className="p-2.5 rounded-lg bg-[#F3F7FA] shrink-0 mt-0.5">
                {getIndustryIcon(iIdx)}
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#0F2C47]">
                  {ind.name}
                </h4>
                <p className="text-[13px] text-slate-500 mt-1 leading-snug">
                  {ind.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        ========================================================================
        8. SHORT FAQ SECTION (Maximum 5 Useful Questions)
        ========================================================================
      */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#336E95] block mb-1">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[14px] sm:text-[15px] text-slate-600 mt-2">
              Straightforward answers about our walkthroughs, equipment supply, and evacuation planning.
            </p>
          </div>

          <div className="space-y-3">
            {siteContent.servicesFaqs.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full text-left p-4 sm:p-5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-4 text-[14px] sm:text-[15px] font-semibold text-[#0F2C47] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4974C]"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#336E95] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#336E95] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 bg-white text-[13px] sm:text-[14px] text-slate-600 leading-relaxed border-t border-slate-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        9. ONE FINAL CONSULTATION CTA
        ========================================================================
      */}
      <section className="bg-[#0F2C47] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#1A456F]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[13px] uppercase tracking-wider text-[#62B5DA] font-bold block mb-2">
            Premises Safety in Jharkhand
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 text-balance">
            Ready to Evaluate or Upgrade Your Facility Safety?
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Schedule a practical on-site walkthrough or discuss evacuation route planning and equipment supply for your premises.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact/');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#F4974C] hover:bg-[#F0853F] active:bg-[#E57737] text-[#0F2C47] text-[15px] font-bold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Request a Safety Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-[#0F2C47]" />
            </a>
            <a
              href={siteContent.contact.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1A456F] hover:bg-[#275079] text-white text-[14px] font-semibold rounded-xl border border-[#336E95] transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Inquiries (+91 93347 01135)</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
