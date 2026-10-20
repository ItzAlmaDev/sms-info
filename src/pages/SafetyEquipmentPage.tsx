import React, { useState } from 'react';
import { siteContent, EquipmentCategory } from '../content/siteContent';
import { 
  Flame, 
  HeartPulse, 
  HardHat, 
  Signpost, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare, 
  Phone,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';

interface SafetyEquipmentPageProps {
  onNavigate: (path: string) => void;
  onSelectEquipment?: (equipmentName: string) => void;
}

export const SafetyEquipmentPage: React.FC<SafetyEquipmentPageProps> = ({
  onNavigate,
  onSelectEquipment,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-[#EF4444]" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-[#10B981]" />;
      case 'HardHat': return <HardHat className="w-5 h-5 text-[#F4974C]" />;
      case 'Signpost': return <Signpost className="w-5 h-5 text-[#62B5DA]" />;
      default: return <ShieldCheck className="w-5 h-5 text-[#62B5DA]" />;
    }
  };

  const filteredCategories = activeCategory === 'all'
    ? siteContent.equipmentCatalogue
    : siteContent.equipmentCatalogue.filter(c => c.id === activeCategory);

  const handleEnquireItem = (itemName: string) => {
    if (onSelectEquipment) {
      onSelectEquipment(`Equipment: ${itemName}`);
    }
    onNavigate('/contact/');
  };

  return (
    <div className="bg-[#F3F7FA] text-[#0B1B2B] pb-20">
      
      {/* Header Banner */}
      <section className="bg-[#0F2C47] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1A456F]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#62B5DA] uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-[#F4974C]" />
              <span>Safety Equipment Supply & Management</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Basic Safety Equipment Catalogue
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We supply and maintain reliable safety equipment for offices, schools, and factories across Ranchi and Jharkhand. No cart, no hidden rates — direct enquiries and tailored premises quotations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Category Filters (Clean Segmented Tabs) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-[#0F2C47] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Equipment Categories
          </button>
          {siteContent.equipmentCatalogue.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-[#0F2C47] text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Equipment Categories & Item Cards */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <section
              key={category.id}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      {getCategoryIcon(category.iconName)}
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2C47]">
                        {category.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={`${siteContent.contact.whatsAppUrl}?text=${encodeURIComponent(`Hello SMS, I would like to inquire about safety equipment in the "${category.title}" category.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-lg hover:bg-[#1EBE5D] transition-colors shrink-0"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#F3F7FA] border border-slate-200/80 flex flex-col justify-between hover:border-[#336E95] transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-base font-bold text-[#0F2C47]">
                          {item.name}
                        </h3>
                        <span className="text-[11px] font-medium text-[#275079] bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                          Enquiry Item
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="space-y-1.5 text-xs text-slate-600 mb-5">
                        <div>
                          <strong className="text-slate-800">Ideal For:</strong> {item.usage}
                        </div>
                        <div>
                          <strong className="text-slate-800">Key Specifications:</strong> {item.specs}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => handleEnquireItem(item.name)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F4974C] hover:bg-[#F0853F] text-[#0F2C47] text-xs font-bold rounded-lg transition-colors"
                      >
                        <span>Enquire for Premises</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={`tel:${siteContent.contact.phone.replace(/\s+/g, '')}`}
                        className="text-xs text-slate-500 hover:text-[#0F2C47] font-semibold"
                      >
                        Call +91 93347 01135
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </section>
          ))}
        </div>

        {/* Ongoing Management & Servicing Strip */}
        <div className="bg-[#0F2C47] text-white rounded-3xl p-6 sm:p-10 border border-[#1A456F]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-[#62B5DA] font-bold uppercase tracking-wider mb-2">
                <CalendarCheck className="w-4 h-4 text-[#F4974C]" />
                <span>Ongoing Maintenance & Upkeep</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                Equipment Isn’t Finished Upon Installation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Fire extinguishers lose pressure, first-aid supplies expire, and signage can get displaced. SMS provides routine maintenance schedules and pressure checks to keep your gear ready.
              </p>
            </div>

            <a
              href="/contact/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact/');
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F4974C] hover:bg-[#F0853F] text-[#0F2C47] text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md shrink-0"
            >
              <span>Request Maintenance Contract Quote</span>
              <ArrowRight className="w-4 h-4 text-[#0F2C47]" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
