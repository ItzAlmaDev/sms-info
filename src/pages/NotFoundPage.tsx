import React from 'react';
import { 
  Home, 
  ArrowRight, 
  MessageSquare, 
  Compass, 
  ShieldCheck, 
  Flame, 
  MapPin 
} from 'lucide-react';
import { siteContent } from '../content/siteContent';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const quickLinks = [
    {
      title: 'Safety Consulting & Services',
      description: 'On-site walkthroughs, risk reviews, and tailored workplace safety plans.',
      path: '/services/',
      icon: ShieldCheck,
      iconColor: 'text-[#62B5DA]',
    },
    {
      title: 'Evacuation Route Planning',
      description: 'Floor-plan escape diagrams, emergency exit signage, and assembly maps.',
      path: '/evacuation-planning/',
      icon: Compass,
      iconColor: 'text-[#F4974C]',
    },
    {
      title: 'Safety Equipment Supply',
      description: 'Fire extinguishers, first-aid stations, glow signage, and upkeep.',
      path: '/safety-equipment/',
      icon: Flame,
      iconColor: 'text-[#F4974C]',
    },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-[#0F2C47] text-white flex flex-col justify-center overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Ambient Radial Sky Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] md:w-[700px] h-[260px] sm:h-[360px] bg-[#336E95]/20 blur-[100px] rounded-full pointer-events-none"
        aria-hidden="true" 
      />

      <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
        
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A456F]/70 border border-[#336E95]/50 text-xs font-semibold text-[#62B5DA] tracking-wide mb-4 sm:mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#F4974C] animate-pulse" />
          <span>Error 404 · Page Not Found</span>
        </div>

        {/* Clean, Impactful Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3 sm:mb-4">
          Looking for a Way Forward?
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed mb-8">
          The page you requested may have been moved, renamed, or does not exist. Use the shortcuts below to return to the homepage or explore our core safety services.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#F4974C] hover:bg-[#F0853F] active:bg-[#E57737] text-[#0F2C47] text-sm font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#F4974C]/25 transition-all duration-200 cursor-pointer"
          >
            <Home className="w-4 h-4 text-[#0F2C47]" />
            <span>Return to Homepage</span>
          </a>

          <a
            href="/contact/"
            onClick={(e) => handleLinkClick(e, '/contact/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1A456F]/60 hover:bg-[#1A456F] border border-[#336E95]/60 text-white text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#62B5DA]" />
            <span>Contact Ranchi Office</span>
          </a>
        </div>

        {/* Helpful Wayfinding Destination Cards */}
        <div className="text-left mb-10">
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
              Popular Destinations
            </span>
            <span className="text-xs text-[#62B5DA]">Quick Access</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className="group p-4 sm:p-5 rounded-2xl bg-[#1A456F]/40 hover:bg-[#1A456F]/70 border border-[#336E95]/30 hover:border-[#62B5DA]/50 transition-all duration-200 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-[#0F2C47] border border-[#336E95]/50 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Icon className={`w-4 h-4 ${item.iconColor}`} />
                    </div>
                    <h2 className="text-sm font-bold text-white mb-1 group-hover:text-[#F4974C] transition-colors leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#336E95]/20 flex items-center gap-1.5 text-xs font-semibold text-[#62B5DA] group-hover:text-white transition-colors">
                    <span>Visit page</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Direct Contact & Support Footnote */}
        <div className="pt-6 border-t border-[#1A456F]/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Need immediate guidance?</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={siteContent.contact.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#25D366] hover:text-[#1EBE5D] font-semibold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
