import React from 'react';
import { siteContent } from '../content/siteContent';
import { MessageSquare, Phone } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  return (
    <>
      {/* Desktop Floating WhatsApp Button (Bottom-Right) */}
      <aside 
        aria-label="Quick Contact Actions"
        className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-2 group"
      >
        <div className="hidden group-hover:block bg-[#0F2C47] text-white text-xs font-medium py-1.5 px-3 rounded-lg shadow-lg border border-[#336E95]/40 whitespace-nowrap transition-all duration-200">
          Chat with SMS on WhatsApp
        </div>
        <a
          href={siteContent.contact.whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-slate-950 rounded-full shadow-lg shadow-[#0B1B2B]/30 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
          aria-label="Direct WhatsApp Chat with Safety Management Solutions (+91 9334701135)"
        >
          {/* Custom crisp SVG WhatsApp icon */}
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.974.564 1.777.818 2.78.819h.001c3.18 0 5.767-2.587 5.767-5.768 0-3.18-2.586-5.766-5.767-5.766zm3.364 8.163c-.144.406-.837.774-1.171.824-.312.045-.718.067-2.338-.601-1.428-.588-2.346-2.036-2.417-2.13-.07-.095-.579-.771-.579-1.47 0-.7.366-1.045.497-1.189.13-.144.285-.18.38-.18.095 0 .191.001.274.005.087.004.204-.033.319.244.12.288.408.996.444 1.069.036.072.06.156.012.251-.048.096-.072.156-.144.24-.072.084-.152.188-.217.253-.072.072-.148.15-.064.294.084.144.373.616.8 1.001.551.492 1.015.644 1.159.716.144.072.228.06.312-.036.084-.096.36-.419.456-.563.096-.144.192-.12.324-.072.132.048.837.395.981.467.144.072.24.108.276.168.036.06.036.349-.108.755z" />
          </svg>
        </a>
      </aside>

      {/* 
        Mobile Sticky Bottom Bar:
        Strictly under 15% mobile viewport height (height ~ 56px).
        Provides rapid 1-tap call and WhatsApp actions for local mobile visitors.
      */}
      <nav 
        aria-label="Mobile Emergency and Quick Actions"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F2C47]/95 backdrop-blur-md border-t border-[#1A456F] py-2 px-4 shadow-xl"
      >
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          <a
            href="tel:+919334701135"
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#1A456F] text-white rounded-lg text-xs font-semibold active:bg-[#275079] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#F4974C]" />
            <span className="tabular-nums">Call Now</span>
          </a>

          <a
            href={siteContent.contact.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#25D366] text-slate-950 rounded-lg text-xs font-bold active:bg-[#1EBE5D] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          >
            <MessageSquare className="w-4 h-4 text-slate-950 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </nav>
    </>
  );
};
