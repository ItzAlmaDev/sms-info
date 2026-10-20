import React from 'react';
import defaultSitePhoto from '../assets/images/facility_safety_audit_1792510451928.jpg';
import { MapPin } from 'lucide-react';

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
  imageAlt = 'Safety specialist conducting an on-site facility inspection in Ranchi',
  caption = 'Practical safety walkthroughs, tailored to your premises.',
  footerLeft = 'Ranchi, Jharkhand',
}) => {
  const photoSrc = imageSrc || defaultSitePhoto;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#336E95]/70 hover:border-[#62B5DA]/80 bg-[#0B1E32] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.75)] ring-1 ring-white/10 transition-all duration-300 group">
      {/* Photo Carrier - Sized to fill 45-50% hero column width */}
      <div className="relative h-[340px] sm:h-[400px] md:h-[440px] lg:h-[460px] xl:h-[500px] w-full overflow-hidden">
        <img
          src={photoSrc}
          alt={imageAlt}
          width={1200}
          height={896}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-[1.01] contrast-[1.05]"
        />
        
        {/* Subtle top indicator badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F2C47]/85 backdrop-blur-md border border-[#336E95]/60 text-[12px] font-semibold text-slate-200 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#F4974C] animate-pulse" />
            <span>On-Site Facility Safety</span>
          </div>
        </div>

        {/* Measured gradient scrim for bold text contrast meeting WCAG AA */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#081523] via-[#081523]/60 via-40% to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Bottom Prominent Information Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-7 z-10">
          <p className="text-[17px] sm:text-[19px] md:text-[21px] font-extrabold text-white leading-snug tracking-tight mb-2.5 drop-shadow-md">
            {caption}
          </p>
          <div className="flex items-center gap-2 pt-2.5 border-t border-white/20 text-[13px] sm:text-[14px]">
            <div className="inline-flex items-center gap-2 text-slate-200 font-semibold">
              <MapPin className="w-4 h-4 text-[#F4974C] shrink-0" />
              <span>{footerLeft}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
