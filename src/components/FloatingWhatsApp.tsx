import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { SHOWROOM_CONFIG, generateGeneralWhatsAppUrl } from '../data/showroomConfig';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const generalUrl = generateGeneralWhatsAppUrl();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Concierge Tooltip Bubble */}
      {showTooltip && (
        <div className="mb-2 max-w-xs bg-[#17161A] border border-[#2F2C26] text-[#F7F5F0] p-3 rounded-lg shadow-2xl relative animate-fade-in text-xs flex items-start gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#25D366] shrink-0 mt-1" />
          <div className="flex-1">
            <p className="font-semibold text-[#C5A059] mb-0.5">
              Live Showroom Concierge
            </p>
            <p className="text-[11px] text-[#A8A49C] leading-snug">
              Chat directly with our gold and bridal jewellery specialists on WhatsApp.
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-[#73706A] hover:text-[#F7F5F0] p-0.5 -mt-0.5 -mr-0.5 cursor-pointer"
            aria-label="Dismiss chat prompt"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={generalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-[#0E2012] flex items-center justify-center shadow-xl shadow-[#25D366]/25 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
        aria-label="Chat with Royal Gold Jewellers on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
