import React from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  ExternalLink, 
  Mail, 
  ShieldCheck, 
  Instagram, 
  Facebook, 
  Navigation,
  SlidersHorizontal
} from 'lucide-react';
import { SHOWROOM_CONFIG, generateGeneralWhatsAppUrl } from '../data/showroomConfig';

interface ContactAndFooterProps {
  onOpenGuide: () => void;
  onOpenAppointment: () => void;
}

export const ContactAndFooter: React.FC<ContactAndFooterProps> = ({ 
  onOpenGuide,
  onOpenAppointment
}) => {
  const generalWhatsAppUrl = generateGeneralWhatsAppUrl();

  return (
    <footer id="contact" className="bg-[#0B0B0C] border-t border-[#201F22] text-[#F7F5F0]">
      
      {/* Showroom Visit & Directions Banner */}
      <div className="border-b border-[#201F22] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Column 1: Address & Landmark */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded bg-[#18181C] border border-[#2B2925] text-[#C5A059] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-lg font-bold text-[#FDFCF7] mb-1">
                Mumbai Flagship Showroom
              </h4>
              <p className="text-xs text-[#A8A49C] leading-relaxed">
                {SHOWROOM_CONFIG.address.line1}<br />
                {SHOWROOM_CONFIG.address.line2}<br />
                {SHOWROOM_CONFIG.address.city}, {SHOWROOM_CONFIG.address.state} — {SHOWROOM_CONFIG.address.pincode}<br />
                <span className="text-[#C5A059] text-[11px] block mt-0.5">
                  ({SHOWROOM_CONFIG.address.landmark})
                </span>
              </p>
              
              <div className="mt-3 flex items-center gap-3">
                <a
                  href={SHOWROOM_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#C5A059] hover:text-[#E8C97B] font-medium"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Hours & Instant Contacts */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded bg-[#18181C] border border-[#2B2925] text-[#C5A059] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-lg font-bold text-[#FDFCF7] mb-1">
                Visiting Hours
              </h4>
              <p className="text-xs text-[#A8A49C] leading-relaxed mb-2">
                {SHOWROOM_CONFIG.openingHours}
              </p>
              
              <div className="flex flex-col gap-1 text-xs">
                <a
                  href={`tel:${SHOWROOM_CONFIG.displayPhone.replace(/[^0-9+]/g, '')}`}
                  className="text-[#D8D4CA] hover:text-[#C5A059] flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3 h-3 text-[#C5A059]" />
                  <span>Phone: {SHOWROOM_CONFIG.displayPhone}</span>
                </a>
                
                <a
                  href={generalWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#55E685] hover:text-[#76F7A0] flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3 h-3 fill-current" />
                  <span>WhatsApp: +{SHOWROOM_CONFIG.whatsappNumber}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Showroom Quick Action */}
          <div className="p-6 bg-[#141417] border border-[#272522] rounded-lg flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium block mb-1">
                Private Experience
              </span>
              <h5 className="font-serif-luxury text-base font-bold text-white mb-2">
                Visiting the Showroom?
              </h5>
              <p className="text-xs text-[#8E8B83] mb-4">
                Schedule a reserved viewing suite with complimentary refreshments and dedicated stylist.
              </p>
            </div>
            <button
              onClick={onOpenAppointment}
              className="w-full py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#121214] text-xs font-bold uppercase tracking-wider rounded transition-colors text-center cursor-pointer"
            >
              Request Showroom Slot
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-[#F7F5F0] block mb-2">
              {SHOWROOM_CONFIG.brandName}
            </span>
            <p className="text-xs text-[#A8A49C] max-w-sm leading-relaxed mb-6">
              Crafting heirloom jewellery of pure elegance for life&apos;s celebrated milestones. Highlighting authentic Indian goldsmith traditions with contemporary finesse.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={SHOWROOM_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-[#17161A] border border-[#2B2925] text-[#A8A49C] hover:text-[#C5A059] hover:border-[#C5A059] flex items-center justify-center transition-colors"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={SHOWROOM_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-[#17161A] border border-[#2B2925] text-[#A8A49C] hover:text-[#C5A059] hover:border-[#C5A059] flex items-center justify-center transition-colors"
                aria-label="Facebook page"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${SHOWROOM_CONFIG.email}`}
                className="w-8 h-8 rounded bg-[#17161A] border border-[#2B2925] text-[#A8A49C] hover:text-[#C5A059] hover:border-[#C5A059] flex items-center justify-center transition-colors"
                aria-label="Email showroom"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs uppercase tracking-widest text-[#C5A059] font-medium mb-4">
              Showroom Signatures
            </h5>
            <ul className="space-y-2 text-xs text-[#A8A49C]">
              <li><a href="#products" className="hover:text-[#F7F5F0] transition-colors">22K Gold Collections</a></li>
              <li><a href="#products" className="hover:text-[#F7F5F0] transition-colors">Diamond Solitaires</a></li>
              <li><a href="#products" className="hover:text-[#F7F5F0] transition-colors">Bridal Kundan & Polki</a></li>
              <li><a href="#products" className="hover:text-[#F7F5F0] transition-colors">Temple Antique Haars</a></li>
              <li><a href="#products" className="hover:text-[#F7F5F0] transition-colors">Modern Mangalsutras</a></li>
            </ul>
          </div>

          {/* Client Demo / Customization */}
          <div>
            <h5 className="text-xs uppercase tracking-widest text-[#C5A059] font-medium mb-4">
              Website Demo Notice
            </h5>
            <p className="text-xs text-[#8E8B83] leading-relaxed mb-4">
              This is a fully customizable jewellery e-commerce demo created to showcase website development capabilities for Indian showrooms.
            </p>
            <button
              onClick={onOpenGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#3E3A33] hover:border-[#C5A059] text-[11px] text-[#C5A059] rounded transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Showroom Setup Instructions</span>
            </button>
          </div>
        </div>

        {/* Bottom Disclaimer Banner */}
        <div className="mt-12 pt-6 border-t border-[#1C1B1F] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-[#73706A]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>
              DEMO WEBSITE — Fictional Brand and Illustrative Product Prices. All product details and contact links are fully editable.
            </span>
          </div>
          <div>
            <span>© {new Date().getFullYear()} {SHOWROOM_CONFIG.brandName}. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
