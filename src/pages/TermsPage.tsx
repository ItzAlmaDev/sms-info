import React from 'react';
import { siteContent } from '../content/siteContent';
import { FileText, AlertTriangle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-[#F3F7FA] text-[#0B1B2B] pb-20">
      <section className="bg-[#0F2C47] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#1A456F]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#62B5DA] uppercase tracking-wider mb-2">
            <FileText className="w-4 h-4 text-[#F4974C]" />
            <span>Commercial Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            {siteContent.termsOfService.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Last Updated: {siteContent.termsOfService.lastUpdated}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              {siteContent.termsOfService.draftNotice}
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            {siteContent.termsOfService.sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h2 className="text-base font-bold text-[#0F2C47]">
                  {section.title}
                </h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 text-xs text-slate-500">
            Jurisdiction: Ranchi, Jharkhand, India.
          </div>
        </div>
      </div>
    </div>
  );
};
