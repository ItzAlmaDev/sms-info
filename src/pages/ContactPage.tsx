import React from 'react';
import { siteContent } from '../content/siteContent';
import { ContactForm } from '../components/ContactForm';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Navigation, 
  ArrowUpRight 
} from 'lucide-react';

interface ContactPageProps {
  initialService?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialService }) => {
  return (
    <div className="bg-[#F3F7FA] text-[#0B1B2B] pb-20">
      
      {/* Header Banner */}
      <section className="bg-[#0F2C47] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1A456F]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#62B5DA] uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4 text-[#F4974C]" />
              <span>Ranchi Head Office & Inquiries</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              {siteContent.contactPage.hero.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {siteContent.contactPage.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Contact Cards & Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left 7 Columns: Validated Inquiry Form */}
          <div className="lg:col-span-7">
            <ContactForm initialService={initialService} />
          </div>

          {/* Right 5 Columns: Direct Contact Cards & Ranchi Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Direct Actions */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#0F2C47] pb-3 border-b border-slate-100">
                Direct Contact Pathways
              </h3>

              {/* Call */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#0F2C47] text-[#F4974C] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Phone Inquiries:</span>
                  <a
                    href={`tel:${siteContent.contact.phone.replace(/\s+/g, '')}`}
                    className="text-sm font-bold text-[#0F2C47] hover:text-[#336E95] tabular-nums"
                  >
                    {siteContent.contact.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Instant WhatsApp:</span>
                  <a
                    href={siteContent.contact.whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-[#25D366] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Chat on WhatsApp (+91 93347 01135)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#1A456F] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Official Email:</span>
                  <a
                    href={`mailto:${siteContent.contact.email}`}
                    className="text-sm font-bold text-[#0F2C47] hover:text-[#336E95] break-all"
                  >
                    {siteContent.contact.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0F2C47] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Office Address:</span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-snug font-medium">
                    {siteContent.contact.fullAddress}
                  </p>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Opposite Capitol Hill Hotel on Main Road Walking Street
                  </span>
                </div>
              </div>

              {/* Consultation Schedule */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Consultation Schedule:</span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Walk-in visits & on-site walkthroughs available by appointment. Contact us via phone or WhatsApp to coordinate your visit.
                  </p>
                </div>
              </div>

            </div>

            {/* Ranchi Location Guide & Preview Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#0F2C47]">
                  Location Preview & Directions Guide
                </h3>
                <span className="text-xs text-slate-500">Premises Schematic</span>
              </div>

              {/* Visual Map Canvas / Embedded Frame */}
              <div 
                className="w-full h-48 bg-[#0F2C47] rounded-xl relative overflow-hidden flex flex-col items-center justify-center text-center p-4 border border-[#1A456F]"
                role="region"
                aria-label="Premises location schematic and directions to Safety Management Solutions"
              >
                {/* Stylized Map Grid Motif */}
                <div 
                  className="absolute inset-0 opacity-20 bg-[radial-gradient(#62B5DA_1px,transparent_1px)] [background-size:16px_16px]" 
                  aria-hidden="true" 
                />

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-full bg-[#F4974C] text-[#0F2C47] flex items-center justify-center mx-auto mb-2 shadow-lg animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-bold text-white">
                    Walking Street, Main Road
                  </div>
                  <div className="text-xs text-[#62B5DA] mt-0.5">
                    Opposite Capitol Hill, 4th Floor
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    PIN: 834001, Ranchi
                  </div>
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteContent.contact.fullAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Safety Management Solutions location in Google Maps"
                  className="absolute bottom-2 right-2 px-2.5 py-1 bg-white/90 hover:bg-white text-[#0F2C47] text-[10px] font-bold rounded shadow transition-colors inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4974C]"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Visiting our office? The Capitol Hill landmark is situated directly opposite our building entrance on Walking Street.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
