import React from 'react';
import { HardHat } from 'lucide-react';

interface HeroFeaturePanelProps {
  imageSrc?: string;
  imageAlt?: string;
  badge?: string;
  caption?: string;
  footerLeft?: string;
  footerRight?: string;
}

export const HeroFeaturePanel: React.FC<HeroFeaturePanelProps> = ({
  imageSrc,
  imageAlt = '',
  badge = 'On-site walkthroughs',
  caption = 'Practical safety walkthroughs, tailored to your premises.',
  footerLeft = 'Ranchi, Jharkhand',
  footerRight = 'Premises-tailored',
}) => (
  <div className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-[32px] border border-white/10 bg-[#1A456F]/80 shadow-2xl backdrop-blur-md">
    <div className="relative flex h-[420px] w-full flex-col justify-between p-6 sm:h-[440px]">
      {imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0F2C47]/95 via-[#0F2C47]/40 to-[#0F2C47]/20"
            aria-hidden="true"
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#163A5F] via-[#0F2C47] to-[#0A1D30] overflow-hidden">
          {/* Subtle Blueprint & Evacuation Path Schematic */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(rgba(98, 181, 218, 0.4) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px, 48px 48px, 48px 48px',
            }}
            aria-hidden="true"
          />
          {/* Subtle schematic route vectors */}
          <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" viewBox="0 0 400 400" fill="none">
            <path d="M40 80 H220 V260 H360" stroke="#62B5DA" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="220" cy="80" r="5" fill="#F4974C" />
            <circle cx="360" cy="260" r="6" fill="#62B5DA" />
            <rect x="60" y="140" width="100" height="70" rx="8" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <text x="75" y="180" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">SECTOR B-1</text>
          </svg>
        </div>
      )}

      <div className="relative z-10 flex items-start justify-between">
        <span className="inline-flex items-center rounded-full bg-[#0F2C47]/90 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wider text-[#62B5DA] border border-[#336E95]/40 backdrop-blur-sm shadow-sm">
          {badge}
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#F4974C] border border-white/10 backdrop-blur-md shadow-sm">
          <HardHat className="h-5 w-5" />
        </div>
      </div>

      <div className="relative z-10 mt-auto rounded-2xl bg-[#0F2C47]/95 border border-[#1A456F] p-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2 mb-2 text-[11px] font-bold uppercase tracking-wider text-[#F4974C]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F4974C]" />
          <span>Premises Inspection Walkthrough</span>
        </div>
        <p className="text-[15px] font-medium leading-snug text-white">{caption}</p>
        <div className="mt-3.5 flex items-center justify-between border-t border-[#1A456F] pt-3 text-[13px] text-slate-300">
          <span>{footerLeft}</span>
          <span className="font-semibold text-[#62B5DA]">{footerRight}</span>
        </div>
      </div>
    </div>
  </div>
);
