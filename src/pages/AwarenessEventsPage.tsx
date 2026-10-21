import React, { useState } from 'react';
import { siteContent, PosterItem } from '../content/siteContent';
import { PosterModal } from '../components/PosterModal';
import { 
  Megaphone, 
  Calendar, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle
} from 'lucide-react';

interface AwarenessEventsPageProps {
  onNavigate: (path: string) => void;
  onSelectService?: (serviceName: string) => void;
}

export const AwarenessEventsPage: React.FC<AwarenessEventsPageProps> = ({
  onNavigate,
  onSelectService,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPoster, setSelectedPoster] = useState<PosterItem | null>(null);

  const categories = ['All', 'Fire', 'Electrical', 'Workplace', 'Road', 'Health'];

  const filteredPosters = activeCategory === 'All'
    ? siteContent.awarenessShowcase.posters
    : siteContent.awarenessShowcase.posters.filter(p => p.category === activeCategory);

  return (
    <div className="bg-[#F3F7FA] text-[#0B1B2B] pb-20">
      
      {/* Header Banner */}
      <section className="bg-[#0F2C47] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1A456F]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#62B5DA] uppercase tracking-wider mb-2">
              <Megaphone className="w-4 h-4 text-[#F4974C]" />
              <span>Safety Awareness & Community Education</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Creative Safety Posters & Interactive Programs
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Real safety starts when people understand the hazards around them. We create high-impact bilingual posters and conduct hands-on workshops in Ranchi and across Eastern India.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* POSTER GALLERY SECTION */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#336E95] font-bold block mb-1">
                Visual Campaign Catalogue
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47]">
                Filterable Safety Posters
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Click any poster thumbnail to inspect details, dimensions, and order physical printed boards.
              </p>
            </div>

            {/* Category Segmented Controls */}
            <div
              className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 overflow-x-auto scrollbar-none"
              role="group"
              aria-label="Filter poster categories"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-[#0F2C47] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosters.map((poster) => (
              <button
                key={poster.id}
                type="button"
                onClick={() => setSelectedPoster(poster)}
                aria-label={`${poster.title} — Inspect & Order`}
                className="text-left w-full cursor-pointer group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#336E95] transition-all flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4974C]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                    <span className="font-bold text-[#1A456F]">{poster.category} Safety</span>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                      Tap to Preview
                    </span>
                  </div>

                  {/* Visual Card Canvas */}
                  <div className="bg-[#0F2C47] rounded-xl p-6 text-white text-center mb-4 border border-[#1A456F] group-hover:border-[#F4974C] transition-colors relative overflow-hidden">
                    <div className="inline-block px-2 py-0.5 bg-[#F4974C] text-[#0F2C47] text-xs font-black uppercase rounded mb-3">
                      SMS POSTER
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#62B5DA] transition-colors mb-2 leading-snug">
                      {poster.title}
                    </h3>
                    <p className="text-xs text-slate-300 italic mb-3">
                      &ldquo;{poster.tagline}&rdquo;
                    </p>
                    <div className="text-xs text-slate-400 line-clamp-2 text-left bg-[#0B1B2B]/60 p-2 rounded">
                      {poster.summary}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600">{poster.dimensions}</span>
                  <span className="font-bold text-[#1A456F] group-hover:text-[#B45309] inline-flex items-center gap-1">
                    <span>Inspect & Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-100 text-xs text-slate-600 flex items-center justify-between flex-wrap gap-3">
            <span>Need custom safety posters branded with your company logo and specific factory rules?</span>
            <a
              href="/contact/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact/');
              }}
              className="font-bold text-[#0F2C47] hover:text-[#B45309] underline"
            >
              Request Custom Poster Design
            </a>
          </div>
        </div>

        {/* WORKSHOPS & DRILLS SECTION */}
        <div>
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-wider text-[#336E95] font-bold block mb-1">
              Practical Training Sessions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47]">
              Workshops, Drills & Training Programs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Engaging, hands-on training sessions conducted on-site at your premises in Ranchi and nearby areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteContent.eventsSection.programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#336E95] font-bold uppercase tracking-wider mb-2">
                    <Calendar className="w-4 h-4 text-[#F4974C]" />
                    <span>{prog.category}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F2C47] mb-2 leading-snug">
                    {prog.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span><strong>Duration:</strong> {prog.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span><strong>For:</strong> {prog.targetGroup}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                    {prog.overview}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-bold text-[#0F2C47] block">
                      Core Topics Covered:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {prog.keyTopics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href="/contact/"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onSelectService) onSelectService(`Workshop: ${prog.title}`);
                      onNavigate('/contact/');
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F2C47] hover:bg-[#1A456F] text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    <span>Schedule for Your Team</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F4974C]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <PosterModal
        poster={selectedPoster}
        onClose={() => setSelectedPoster(null)}
        onEnquire={(posterTitle) => {
          if (onSelectService) {
            onSelectService(`Safety Posters: ${posterTitle}`);
          }
          onNavigate('/contact/');
        }}
      />
    </div>
  );
};
