import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { siteContent } from '../content/siteContent';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and manage focus when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Focus close button inside drawer on open
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Let keyboard users dismiss the modal navigation with Escape and restore focus
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        triggerButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Focus trap inside the mobile drawer
  const handleDrawerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !drawerRef.current) return;
    const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    triggerButtonRef.current?.focus();
    onNavigate(href);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0F2C47]/95 backdrop-blur-md shadow-lg shadow-[#0B1B2B]/20 py-3.5 border-b border-[#336E95]/30'
            : 'bg-[#0F2C47] py-4 border-b border-[#1A456F]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            
            {/* Zone 1: Brand Wordmark & Official Logo */}
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4974C] rounded-lg"
              aria-label="Safety Management Solutions (SMS) Home"
            >
              <Logo size="sm" isDarkTheme={true} showText={false} />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">
                  SMS
                </span>
                <span className="text-[13px] font-medium tracking-wide text-[#62B5DA] whitespace-nowrap hidden sm:inline">
                  Safety Management Solutions
                </span>
              </div>
            </a>

            {/* Zone 2: Primary Navigation Links (Single-Line, Hover Underlines) */}
            <nav 
              className="hidden md:flex items-center gap-8 text-[14px] font-medium text-slate-200"
              aria-label="Main Navigation"
            >
              {siteContent.navigation.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`relative py-1 whitespace-nowrap transition-colors duration-200 ${
                      isActive 
                        ? 'text-white font-semibold' 
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F4974C] rounded-full" 
                        aria-hidden="true" 
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action Call to Action */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="/contact/"
                onClick={(e) => handleLinkClick(e, '/contact/')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-[14px] font-bold text-[#0F2C47] bg-[#F4974C] hover:bg-[#F0853F] active:bg-[#E57737] rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[#F4974C]/20 whitespace-nowrap shrink-0"
              >
                <span>Request a Consultation</span>
                <ArrowUpRight className="w-4 h-4 shrink-0 text-[#0F2C47]" />
              </a>

              {/* Mobile Menu Hamburger Button */}
              <button
                ref={triggerButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#1A456F] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4974C]"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Slide-in Navigation Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          ref={drawerRef}
          onKeyDown={handleDrawerKeyDown}
          className="fixed inset-0 z-50 md:hidden flex flex-col bg-[#0F2C47] text-white pt-20 px-6 pb-8 overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
        >
          <div className="flex items-center justify-between pb-6 border-b border-[#1A456F]">
            <span className="text-[13px] uppercase tracking-wider text-[#62B5DA] font-semibold">
              Menu Navigation
            </span>
            <button
              ref={closeButtonRef}
              onClick={() => {
                setMobileMenuOpen(false);
                triggerButtonRef.current?.focus();
              }}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-[#1A456F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4974C]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-2 py-6">
            {siteContent.navigation.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive 
                      ? 'bg-[#1A456F] text-[#F4974C] font-semibold' 
                      : 'text-slate-200 hover:bg-[#1A456F]/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-[#1A456F] flex flex-col gap-3">
            <div className="text-[13px] text-slate-400 leading-relaxed">
              Main Road, Walking Street, 4th Floor, Ranchi, Jharkhand
            </div>
            <a
              href="tel:+919334701135"
              className="flex items-center gap-2 text-[14px] text-white font-medium p-3 bg-[#1A456F] rounded-lg"
            >
              <Phone className="w-4 h-4 text-[#F4974C]" />
              <span className="tabular-nums">+91 93347 01135</span>
            </a>
            <a
              href="/contact/"
              onClick={(e) => handleLinkClick(e, '/contact/')}
              className="flex items-center justify-center py-3 text-center text-[14px] font-bold text-[#0F2C47] bg-[#F4974C] rounded-lg hover:bg-[#F0853F]"
            >
              Request Safety Consultation
            </a>
          </div>
        </div>
      )}
    </>
  );
};
