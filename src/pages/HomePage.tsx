import React from 'react';
import heroFacilitySafety from '../assets/images/hero_facility_safety_1792434392427.jpg';
import bentoSiteInspection from '../assets/images/bento_site_inspection_1792434394313.jpg';
import { siteContent, ConsolidatedService } from '../content/siteContent';
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  ClipboardCheck, 
  Signpost, 
  ShieldCheck, 
  Megaphone,
  MessageSquare,
  Factory,
  GraduationCap,
  Building2,
  Cross,
  Home,
  Boxes
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenConsultationWithService?: (serviceName: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onOpenConsultationWithService 
}) => {
  const handleEnquireService = (serviceTitle: string) => {
    if (onOpenConsultationWithService) {
      onOpenConsultationWithService(serviceTitle);
    }
    onNavigate('/contact/');
  };

  const getServiceIcon = (letter: string) => {
    switch (letter) {
      case 'A':
        return <ClipboardCheck className="w-5 h-5 text-[#F4974C]" />;
      case 'B':
        return <Signpost className="w-5 h-5 text-[#F4974C]" />;
      case 'C':
        return <ShieldCheck className="w-5 h-5 text-[#F4974C]" />;
      case 'D':
      default:
        return <Megaphone className="w-5 h-5 text-[#F4974C]" />;
    }
  };

  const getIndustryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Factory className="w-4 h-4 text-[#336E95]" />;
      case 1:
        return <GraduationCap className="w-4 h-4 text-[#336E95]" />;
      case 2:
        return <Building2 className="w-4 h-4 text-[#336E95]" />;
      case 3:
        return <Cross className="w-4 h-4 text-[#336E95]" />;
      case 4:
        return <Home className="w-4 h-4 text-[#336E95]" />;
      case 5:
      default:
        return <Boxes className="w-4 h-4 text-[#336E95]" />;
    }
  };

  return (
    <div className="flex flex-col bg-[#0F2C47] text-white">
      
      {/* 
        ========================================================================
        1. HERO SECTION
        - Clear value proposition
        - Primary CTA: Request a Consultation
        - Secondary link: Explore Services
        - High-quality facility imagery
        ========================================================================
      */}
      <section className="relative overflow-hidden bg-[#0F2C47] border-b border-[#1A456F] pt-8 sm:pt-12 md:pt-14 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left 7 Columns: Authoritative Headline & Action Flow */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A456F]/70 border border-[#336E95]/40 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F4974C]" />
                <span className="text-[12px] sm:text-[13px] font-semibold text-[#62B5DA] tracking-wide">
                  Workplace & Facility Safety in Ranchi, Jharkhand
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.12] text-balance mb-4 sm:mb-5">
                Practical Safety Solutions for Workplaces & Facilities.
              </h1>

              <p className="text-[15px] sm:text-[16px] text-slate-300 leading-relaxed max-w-2xl mb-6 sm:mb-8">
                SMS delivers premises-tailored safety risk walkthroughs, floor-plan evacuation route mapping, basic safety equipment supply and upkeep, and practical workforce awareness training across Eastern India.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <a
                  href="/contact/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact/');
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[14px] font-bold text-[#0F2C47] bg-[#F4974C] hover:bg-[#F0853F] active:bg-[#E57737] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <span>Request a Consultation</span>
                  <ArrowUpRight className="w-4 h-4 text-[#0F2C47] shrink-0" />
                </a>

                <a
                  href="/services/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/services/');
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-[14px] font-semibold text-slate-200 hover:text-white bg-[#1A456F]/60 hover:bg-[#1A456F] border border-[#336E95]/40 rounded-xl transition-colors"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="w-4 h-4 text-[#62B5DA]" />
                </a>
              </div>

              {/* Trust Subtext */}
              <div className="mt-5 flex items-center gap-2 text-[12px] sm:text-[13px] text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Tailored to your physical premises · Aligned with good safety practice</span>
              </div>

            </div>

            {/* Right 5 Columns: Genuine Photography Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#336E95]/40 shadow-xl bg-[#0B1B2B]">
                <img 
                  src={heroFacilitySafety} 
                  alt="Safety layout and emergency exits inside a modern facility" 
                  width={640}
                  height={420}
                  loading="eager"
                  decoding="async"
                  className="w-full h-[260px] sm:h-[320px] lg:h-[360px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2C47]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-[#0F2C47]/90 backdrop-blur-md rounded-xl border border-white/10 text-xs text-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-white">Ranchi Head Office</span>
                  <span className="text-[#62B5DA]">Main Road, Walking Street</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        2. SHORT PREVIEW OF THE FOUR SERVICE CATEGORIES
        - Clear overview linking to the comprehensive Services page
        - Concise cards for A, B, C, D
        ========================================================================
      */}
      <section className="py-14 sm:py-20 bg-[#F3F7FA] text-[#0B1B2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#336E95] block mb-1">
                Core Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47] tracking-tight">
                Four Pillars of Workplace & Premises Safety
              </h2>
            </div>
            <a
              href="/services/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/services/');
              }}
              className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#1A456F] hover:text-[#0F2C47] transition-colors shrink-0"
            >
              <span>View Full Services Page</span>
              <ArrowRight className="w-4 h-4 text-[#F4974C]" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteContent.consolidatedServices.map((service: ConsolidatedService) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-[#336E95] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0F2C47] flex items-center justify-center mb-4">
                    {getServiceIcon(service.categoryLetter)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#336E95] block mb-1">
                    Category {service.categoryLetter}
                  </span>
                  <h3 className="text-lg font-bold text-[#0F2C47] mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-[13px] text-slate-600 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`/services/#${service.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/services/');
                      setTimeout(() => {
                        const el = document.getElementById(service.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="text-[13px] font-semibold text-[#1A456F] hover:text-[#0F2C47] inline-flex items-center gap-1"
                  >
                    <span>Learn details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleEnquireService(service.title)}
                    className="text-[12px] font-bold text-[#0F2C47] bg-[#F4974C] hover:bg-[#F0853F] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        3. WHY CHOOSE SMS (Using Verified Information)
        - Practical, not academic
        - Tailored to premises
        - Equipment upkeep & supply
        - Local presence in Walking Street, Ranchi
        ========================================================================
      */}
      <section className="py-14 sm:py-20 bg-[#0B1B2B] text-white border-t border-b border-[#1A456F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left 5 Columns: Core Philosophy & Photo */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#62B5DA] block mb-1">
                  Why Choose SMS
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Straightforward Safety for Real Facilities.
                </h2>
                <p className="text-[14px] sm:text-[15px] text-slate-300 mt-3 leading-relaxed">
                  We don’t produce thick, unreadable reports that sit on a shelf. We focus on visible floor plans, functional equipment, clear exit signage, and educated personnel.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-[#336E95]/40 shadow-lg">
                <img 
                  src={bentoSiteInspection} 
                  alt="On-site safety inspection and walkthrough inside an Indian facility" 
                  width={480}
                  height={260}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 object-cover object-center"
                />
              </div>
            </div>

            {/* Right 7 Columns: 4 Verified Differentiators */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {siteContent.whySms.points.map((pt) => (
                <div 
                  key={pt.num}
                  className="p-6 rounded-2xl bg-[#0F2C47] border border-[#1A456F] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl font-black text-[#F4974C] tabular-nums block mb-2">
                      {pt.num}
                    </span>
                    <h3 className="text-[16px] font-bold text-white mb-1.5">
                      {pt.title}
                    </h3>
                    <p className="text-[13px] text-slate-300 leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        4. INDUSTRIES SERVED
        - Compact, static presentation (no infinite marquee jitter)
        ========================================================================
      */}
      <section className="py-14 sm:py-20 bg-white text-[#0B1B2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#336E95] block mb-1">
              Sector Experience
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47] tracking-tight">
              Premises We Help Protect Across Jharkhand
            </h2>
            <p className="text-[14px] text-slate-600 mt-2">
              From industrial plants to educational campuses, our safety solutions are customized to your specific building layout and occupant flow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteContent.industriesCompact.map((ind, idx) => (
              <div 
                key={ind.name}
                className="p-4 rounded-xl bg-[#F3F7FA] border border-slate-200 flex items-center gap-3.5"
              >
                <div className="p-2 rounded-lg bg-white border border-slate-200 shrink-0">
                  {getIndustryIcon(idx)}
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#0F2C47]">
                    {ind.name}
                  </h3>
                  <p className="text-[12px] text-slate-500">
                    {ind.context}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        5. ONE CONCISE EXPLANATION OF HOW THE SERVICE PROCESS WORKS
        - Clean 3-step linear flow
        ========================================================================
      */}
      <section className="py-14 sm:py-20 bg-[#0F2C47] text-white border-t border-[#1A456F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#62B5DA] block mb-1">
              Practical Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How We Work With Your Facility
            </h2>
            <p className="text-[14px] text-slate-300 mt-2">
              A transparent, 3-step sequence designed to achieve safety readiness without interrupting daily business operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteContent.sharedProcess.steps.map((step) => (
              <div 
                key={step.number}
                className="p-6 rounded-2xl bg-[#1A456F]/50 border border-[#336E95]/40 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-[#F4974C] tabular-nums block mb-2">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        6. ONE FINAL CONSULTATION CTA
        ========================================================================
      */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#0F2C47] via-[#1A456F] to-[#0F2C47] text-white border-t border-[#1A456F] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[12px] uppercase tracking-wider text-[#62B5DA] font-bold block mb-2">
            Safety Management Solutions · Ranchi
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 text-balance">
            Strengthen Workplace & Facility Safety Today.
          </h2>
          <p className="text-[14px] sm:text-[15px] text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Contact our Ranchi office to discuss a practical walkthrough, evacuation diagrams, or equipment supply for your premises.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/contact/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact/');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#F4974C] hover:bg-[#F0853F] active:bg-[#E57737] text-[#0F2C47] text-[15px] font-bold rounded-xl transition-all shadow-md cursor-pointer"
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
