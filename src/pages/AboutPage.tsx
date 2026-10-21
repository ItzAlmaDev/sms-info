import React from 'react';
import { siteContent } from '../content/siteContent';
import { Logo } from '../components/Logo';
import { FAQSection } from '../components/FAQSection';
import { 
  Shield, 
  Target, 
  Eye, 
  Quote, 
  ArrowRight,
  User
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F3F7FA] text-[#0B1B2B] pb-20">
      
      {/* Header Banner */}
      <section className="bg-[#0F2C47] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1A456F]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#62B5DA] uppercase tracking-wider mb-2">
              <Shield className="w-4 h-4 text-[#F4974C]" />
              <span>Company Background & Philosophy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              {siteContent.about.hero.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {siteContent.about.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Company Story & Ethos */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-wider text-[#336E95] font-bold block mb-2">
              Our Foundations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47] mb-6">
              {siteContent.about.story.heading}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              {siteContent.about.story.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-[#0F2C47] text-white rounded-3xl p-6 sm:p-10 border border-[#1A456F] shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1A456F] flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[#F4974C]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#62B5DA] block mb-2">
                Our Purpose
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {siteContent.about.mission.missionText}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F3F7FA] flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-[#1A456F]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#336E95] block mb-2">
                Future Vision
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2C47] mb-4">
                Our Vision
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {siteContent.about.mission.visionText}
              </p>
            </div>
          </div>

        </div>

        {/* Core Values */}
        <div>
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-wider text-[#336E95] font-bold block mb-1">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47]">
              Our Core Operational Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteContent.about.values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#0F2C47] text-[#F4974C] text-xs font-bold flex items-center justify-center mb-4 tabular-nums">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#0F2C47] mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Director's Message (Sabir Hussain) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Director Portrait Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-56 h-64 sm:w-64 sm:h-72 rounded-2xl bg-[#0F2C47] border border-[#336E95]/40 flex flex-col items-center justify-center text-center p-6 text-slate-300 relative overflow-hidden shadow-lg">
                <div className="w-16 h-16 rounded-full bg-[#1A456F] border border-[#62B5DA]/30 flex items-center justify-center mb-3 text-[#62B5DA]">
                  <User className="w-8 h-8" />
                </div>
                <span className="text-sm font-bold text-white block">
                  {siteContent.about.directorMessage.name}
                </span>
                <span className="text-xs text-[#62B5DA] block mt-0.5">
                  {siteContent.about.directorMessage.role}
                </span>
                <span className="text-xs text-[#62B5DA] font-semibold mt-3 bg-[#1A456F]/80 px-3 py-1 rounded-full border border-[#336E95]/40">
                  Leadership · Ranchi Office
                </span>
              </div>
            </div>

            {/* Message Body */}
            <div className="lg:col-span-8">
              <Quote className="w-10 h-10 text-[#F4974C] mb-4 opacity-80" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2C47] mb-4">
                A Message from Our Director
              </h2>
              <blockquote className="text-sm sm:text-base text-slate-700 italic leading-relaxed mb-6">
                &ldquo;{siteContent.about.directorMessage.quote}&rdquo;
              </blockquote>

              <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-base font-bold text-[#0F2C47]">
                    {siteContent.about.directorMessage.name}
                  </div>
                  <div className="text-xs text-slate-600">
                    {siteContent.about.directorMessage.role} · {siteContent.about.directorMessage.location}
                  </div>
                </div>

                <a
                  href="/contact/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact/');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A456F] hover:text-[#B45309] transition-colors"
                >
                  <span>Connect with our director</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* The Meaning of Our Logo */}
        <div className="bg-[#0F2C47] text-white rounded-3xl p-6 sm:p-10 border border-[#1A456F]">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-wider text-[#62B5DA] font-bold block mb-2">
              Identity & Symbolism
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {siteContent.about.logoMeaning.title}
            </h2>
            <p className="text-sm text-slate-300">
              {siteContent.about.logoMeaning.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteContent.about.logoMeaning.elements.map((elem, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#1A456F]/40 border border-[#336E95]/40"
              >
                <div className="text-xs uppercase tracking-wider font-bold text-[#F4974C] mb-1">
                  {elem.element}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {elem.meaning}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-[#1A456F] flex items-center justify-center">
            <Logo size="lg" isDarkTheme={true} showText={false} />
          </div>
        </div>

        {/* Frequently Asked Questions: Safety Consulting & Equipment */}
        <FAQSection onNavigate={onNavigate} />

      </div>
    </div>
  );
};
