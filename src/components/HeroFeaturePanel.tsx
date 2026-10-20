import React from 'react';
import defaultSitePhoto from '../assets/images/bento_site_inspection_1792434394313.jpg';
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
    <div className="relative w-full overflow-hidden rounded-3xl border-2 border-[#336E95]/70 bg-[#0B1E32] shadow-2xl shadow-[#05111B]/90 ring-1 ring-white/10 group">
      {/* Photo Carrier - Enlarged Height and Bold Presence */}
      <div className="relative h-[440px] sm:h-[500px] md:h-[540px] lg:h-[520px] xl:h-[560px] w-full overflow-hidden">
        <img
          src={photoSrc}
          alt={imageAlt}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out brightness-[1.02] contrast-[1.06]"
        />
        
        {/* Measured gradient scrim for bold text contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#091522] via-[#091522]/60 via-45% to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Bottom Prominent Information Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-10">
          <p className="text-[18px] sm:text-[20px] md:text-[22px] font-extrabold text-white leading-snug tracking-tight mb-3 drop-shadow-md">
            {caption}
          </p>
          <div className="flex items-center gap-2 pt-3 border-t border-white/20 text-[13px] sm:text-[14px]">
            <div className="inline-flex items-center gap-2 text-slate-200 font-bold">
              <MapPin className="w-4 h-4 text-[#F4974C] shrink-0" />
              <span>{footerLeft}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
