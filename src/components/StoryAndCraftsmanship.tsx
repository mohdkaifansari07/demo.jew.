import React from 'react';
import { Sparkles, Hammer, Crown, HeartHandshake, Calendar } from 'lucide-react';

interface StoryAndCraftsmanshipProps {
  onBookAppointment: () => void;
}

export const StoryAndCraftsmanship: React.FC<StoryAndCraftsmanshipProps> = ({ onBookAppointment }) => {
  return (
    <section id="story" className="py-24 bg-[#0D0D0F] border-b border-[#201F22] text-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-3">
              <Crown className="w-3.5 h-3.5" />
              <span>Heritage & Artistry</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FDFCF7] mb-6 leading-tight">
              A Legacy of Timeless <br />
              <span className="italic font-normal text-[#E8C97B]">Goldsmithing</span>
            </h2>
            <div className="w-16 h-[1.5px] bg-[#C5A059] mb-6"></div>
            
            <p className="text-sm sm:text-base text-[#D8D4CA] leading-relaxed mb-4">
              At Royal Gold Jewellers, our journey began with a profound reverence for India&apos;s royal heritage and age-old metalsmithing traditions. What began as an intimate family workshop dedicated to exquisite hand-carved gold ornaments has evolved into a premier destination for connoisseurs of fine jewellery.
            </p>
            <p className="text-sm sm:text-base text-[#A8A49C] leading-relaxed mb-8">
              Every creation reflects our unwavering devotion to beauty, proportion, and generational sentiment. From royal heirloom chokers to delicate contemporary daily wear, we believe fine jewellery is more than adornment—it is a treasured chronicle of life&apos;s most cherished celebrations.
            </p>

            {/* Quiet Editorial Milestones */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#232226]">
              <div>
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#E8C97B] block">
                  35+
                </span>
                <span className="text-xs text-[#8E8B83] uppercase tracking-wider">
                  Years of Heritage
                </span>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#E8C97B] block">
                  12,000+
                </span>
                <span className="text-xs text-[#8E8B83] uppercase tracking-wider">
                  Family Heirloom Pieces
                </span>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#E8C97B] block">
                  100%
                </span>
                <span className="text-xs text-[#8E8B83] uppercase tracking-wider">
                  Handcrafted Devotion
                </span>
              </div>
            </div>
          </div>

          {/* Right Image Stage */}
          <div className="relative rounded-lg overflow-hidden border border-[#272522] shadow-2xl aspect-[4/3] bg-[#161619]">
            <img
              src="/src/assets/images/craftsmanship_karigar_1793280082734.jpg"
              alt="Indian Master Goldsmith Handcrafting Gold Jewellery"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center brightness-[0.95] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] uppercase tracking-widest text-[#C5A059] block mb-1 font-medium">
                The Karigar Atelier
              </span>
              <p className="font-serif-luxury text-lg sm:text-xl font-bold text-white">
                Intricate Wire Filigree & Stone Setting by Master Craftsmen
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Craftsmanship Pillars */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
              The Artisan Process
            </p>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-[#FDFCF7]">
              Craftsmanship & Technique
            </h3>
            <div className="w-16 h-[1.5px] bg-[#C5A059] mx-auto mt-4 mb-3"></div>
            <p className="text-sm text-[#A8A49C] leading-relaxed">
              Every contour is shaped through meticulous collaboration between traditional Karigars and contemporary jewellery engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 bg-[#141416] border border-[#262422] rounded-lg">
              <div className="w-12 h-12 rounded bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mb-5 border border-[#C5A059]/20">
                <Hammer className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-xl font-bold text-[#FDFCF7] mb-2">
                Traditional Filigree & Jaali
              </h4>
              <p className="text-xs sm:text-sm text-[#9E9B92] leading-relaxed">
                Drawing pure gold into hair-thin strands, our master artisans hand-twist and weave intricate jaali patterns that give heavy jewellery an airy, ethereal drape.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-[#141416] border border-[#262422] rounded-lg">
              <div className="w-12 h-12 rounded bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mb-5 border border-[#C5A059]/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-xl font-bold text-[#FDFCF7] mb-2">
                Jadau & Polki Precision
              </h4>
              <p className="text-xs sm:text-sm text-[#9E9B92] leading-relaxed">
                Natural uncut polki diamonds are nested securely in pure 24-karat gold foil bezels, framed with reverse Meenakari enameling for vibrant artistic richness.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-[#141416] border border-[#262422] rounded-lg">
              <div className="w-12 h-12 rounded bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mb-5 border border-[#C5A059]/20">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-xl font-bold text-[#FDFCF7] mb-2">
                Ergonomic Bridal Comfort
              </h4>
              <p className="text-xs sm:text-sm text-[#9E9B92] leading-relaxed">
                Grandeur should never come at the expense of ease. Our haars and chokers feature articulated hinges and velvet-lined chords for seamless movement.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Personalised Bridal Trousseau Consultation */}
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[#17161A] to-[#121214] border border-[#2B2925] p-8 sm:p-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-2">
              Exclusive Showroom Feature
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#FDFCF7] mb-4">
              Personalised Jewellery Consultation
            </h3>
            <p className="text-xs sm:text-sm text-[#D8D4CA] leading-relaxed mb-6">
              Planning your wedding trousseau or a family heirloom milestone? Book an intimate session inside our private Mumbai salon. Our senior consultants will curate coordinated necklace sets, bangles, and bridal ornaments to complement your couture silhouettes.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onBookAppointment}
                className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#121214] text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Schedule a Consultation
              </button>
              <span className="text-xs text-[#8E8B83]">
                Complimentary 45-minute private styling suite
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
