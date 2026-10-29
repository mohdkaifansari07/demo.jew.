import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  Calendar,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { SHOWROOM_CONFIG } from '../data/showroomConfig';
import { JewelleryCategory } from '../types/jewellery';

interface HeaderProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenAppointment: () => void;
  onOpenSearch: () => void;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectCategory,
  wishlistCount,
  onOpenWishlist,
  onOpenAppointment,
  onOpenSearch,
  onOpenGuide
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navCategories: { label: string; value: string; hash?: string }[] = [
    { label: "Home", value: "all", hash: "#hero" },
    { label: "Gold", value: "Gold", hash: "#products" },
    { label: "Diamond", value: "Diamond", hash: "#products" },
    { label: "Bridal", value: "Bridal", hash: "#products" },
    { label: "Collections", value: "all", hash: "#collections" },
    { label: "About Us", value: "about", hash: "#story" },
    { label: "Contact", value: "contact", hash: "#contact" }
  ];

  const handleNavClick = (nav: typeof navCategories[0]) => {
    if (nav.hash === "#products") {
      onSelectCategory(nav.value);
    } else if (nav.hash === "#collections") {
      onSelectCategory("all");
    }
    
    if (nav.hash) {
      const element = document.querySelector(nav.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#0B0B0C] border-b border-[#242220] text-xs text-[#C5A059] py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 tracking-widest uppercase font-medium text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>{SHOWROOM_CONFIG.announcement}</span>
          </div>
          
          <div className="flex items-center gap-4 text-[#A8A49C] text-[11px]">
            <span className="hidden md:inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#C5A059]" />
              {SHOWROOM_CONFIG.address.city} Flagship Showroom
            </span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <a 
              href={`tel:${SHOWROOM_CONFIG.displayPhone.replace(/[^0-9+]/g, '')}`} 
              className="hover:text-[#F5F3EF] transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#C5A059]" />
              <span>{SHOWROOM_CONFIG.displayPhone}</span>
            </a>
            <span aria-hidden="true">·</span>
            <button 
              onClick={onOpenGuide}
              className="text-[#C5A059] hover:underline cursor-pointer font-medium flex items-center gap-1"
              title="Showroom Owner Setup Guide"
            >
              <SlidersHorizontal className="w-3 h-3" />
              Demo Setup Guide
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#121214]/95 backdrop-blur-md border-b border-[#272522] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#E2DFD7] hover:text-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] rounded"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo & Wordmark */}
          <a 
            href="#hero" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col items-center group cursor-pointer text-center"
          >
            <span className="font-serif-luxury text-xl sm:text-2xl lg:text-2xl font-bold tracking-[0.2em] uppercase text-[#F7F5F0] group-hover:text-[#D4AF37] transition-colors">
              {SHOWROOM_CONFIG.brandName}
            </span>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#A8A49C] -mt-0.5">
              Haute Joaillerie · Mumbai
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navCategories.map((nav) => (
              <button
                key={nav.label}
                onClick={() => handleNavClick(nav)}
                className="text-xs uppercase tracking-[0.16em] text-[#D8D4CA] hover:text-[#D4AF37] transition-colors py-2 relative group whitespace-nowrap cursor-pointer font-medium"
              >
                {nav.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A059] group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>

          {/* Action Icons & CTAs */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#D8D4CA] hover:text-[#D4AF37] hover:bg-[#1C1B1E] rounded-full transition-colors cursor-pointer"
              aria-label="Search jewellery designs"
              title="Search designs"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#D8D4CA] hover:text-[#D4AF37] hover:bg-[#1C1B1E] rounded-full transition-colors relative cursor-pointer"
              aria-label="View saved designs"
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C5A059] text-[#121214] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={onOpenAppointment}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#121214] text-xs font-semibold uppercase tracking-wider transition-all duration-200 rounded cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Showroom Visit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#141416] border-r border-[#272522] p-6 flex flex-col justify-between shadow-2xl z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#272522]">
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold tracking-widest text-[#F7F5F0]">
                    {SHOWROOM_CONFIG.brandName}
                  </h3>
                  <p className="text-[10px] tracking-widest text-[#A8A49C] uppercase">
                    Showroom Catalogue
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#A8A49C] hover:text-[#F7F5F0]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation List */}
              <nav className="py-6 flex flex-col gap-1">
                {navCategories.map((nav) => (
                  <button
                    key={nav.label}
                    onClick={() => handleNavClick(nav)}
                    className="text-left px-3 py-3 text-sm uppercase tracking-widest text-[#E2DFD7] hover:text-[#D4AF37] hover:bg-[#1E1D21] rounded transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{nav.label}</span>
                    <span className="text-[#65615A] text-xs">→</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#272522] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointment();
                }}
                className="w-full py-3 bg-[#C5A059] text-[#121214] text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 hover:bg-[#D4AF37] transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book Showroom Visit
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGuide();
                }}
                className="w-full py-2.5 border border-[#3E3A33] text-[#A8A49C] hover:text-[#F5F3EF] text-xs uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Showroom Demo Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
