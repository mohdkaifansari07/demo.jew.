import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: "How do I book an exclusive showroom consultation?",
    answer: "You can click 'Book Showroom Visit' at the top of the website or select any jewellery piece to request an appointment. Fill in your preferred date and time, and your request will be prepared in WhatsApp to send directly to our showroom concierge team. We will review availability and confirm your salon slot within 2 business hours."
  },
  {
    question: "Are the prices shown on the website live gold rates?",
    answer: "No. All prices displayed on this demo website are illustrative reference prices for demonstration purposes. Gold market values fluctuate daily, and final pricing in our showroom is calculated based on exact bullion weight, karat purity (22K, 18K, 14K), stone carat weight, and making charges at the time of order confirmation."
  },
  {
    question: "Can I customize a necklace set, ring, or bangle design?",
    answer: "Yes, absolutely. Our in-house atelier provides bespoke customization services. You can adjust necklace chain lengths, alter bangle diameters (sizes 2.2 to 2.8), select your preferred gemstones (rubies, emeralds, pearls, or uncuts), and specify gold finish (bright yellow, antique rose, or matte burnish)."
  },
  {
    question: "How does the WhatsApp enquiry feature work?",
    answer: "When you click 'Enquire on WhatsApp' on any product card or detail screen, a pre-formatted message including the design name and demo reference price is created. You can send this directly to our showroom representative to request high-definition videos, weight breakdowns, and in-store availability."
  },
  {
    question: "Can we try on bridal jewellery before making a decision?",
    answer: "Yes. Our Bandra West showroom features private bridal trial suites where brides and families can try on entire trousseau sets alongside their bridal lehengas or sarees to ensure harmony with neckline cuts and color palettes."
  },
  {
    question: "How long does a customized heirloom piece take to craft?",
    answer: "Ready collection pieces can be previewed immediately in the showroom. For custom bespoke commissions involving hand-drawn jaali or polki setting, typical handcrafting timelines range from 2 to 4 weeks depending on the intricacy of the piece."
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#121214] border-b border-[#201F22] text-[#F7F5F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
            Inquiries & Guidance
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-[#FDFCF7]">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C5A059] mx-auto mt-4 mb-3"></div>
          <p className="text-sm text-[#A8A49C]">
            Everything you need to know about showroom appointments, bespoke design consultations, and our catalogue.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#161619] border border-[#272522] rounded-lg overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#1C1B1F] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif-luxury text-base sm:text-lg font-bold text-[#F7F5F0]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C5A059] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#A8A49C] leading-relaxed border-t border-[#232226]">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
