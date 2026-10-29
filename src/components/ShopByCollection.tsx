import React from 'react';
import { CATEGORIES_DATA } from '../data/products';
import { JewelleryCategory } from '../types/jewellery';
import { ArrowUpRight } from 'lucide-react';

interface ShopByCollectionProps {
  onSelectCategory: (category: JewelleryCategory) => void;
}

export const ShopByCollection: React.FC<ShopByCollectionProps> = ({ onSelectCategory }) => {
  const handleCategoryClick = (categoryId: JewelleryCategory) => {
    onSelectCategory(categoryId);
    const productSection = document.querySelector('#products');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="py-20 bg-[#0F0F10] border-b border-[#201F22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
            Curated Categories
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F7F5F0]">
            Shop by Collection
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C5A059] mx-auto mt-4 mb-3"></div>
          <p className="text-sm text-[#A8A49C] leading-relaxed">
            Select a jewellery signature to view our hand-finished masterpieces and request an exclusive showroom preview.
          </p>
        </div>

        {/* 8 Collection Image Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCategoryClick(item.id)}
              className="group relative bg-[#151518] border border-[#272522] hover:border-[#C5A059]/70 rounded overflow-hidden cursor-pointer transition-all duration-300 flex flex-col shadow-md hover:shadow-xl hover:shadow-[#C5A059]/10"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCategoryClick(item.id);
                }
              }}
              aria-label={`View ${item.title}`}
            >
              {/* Image Aspect Box */}
              <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-[#1B1A1E]">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out brightness-[0.9]"
                />
                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                
                {/* Arrow Icon on Hover */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 border border-[#C5A059]/40 text-[#C5A059] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>

                {/* Unboxed Metadata in Card Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <p className="text-[11px] text-[#C5A059] tracking-wider uppercase font-medium">
                    {item.subtitle}
                  </p>
                  <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#FDFCF7] group-hover:text-[#E8C97B] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Footer Bar */}
              <div className="px-3.5 py-2.5 bg-[#121214] border-t border-[#222125] flex items-center justify-between text-xs text-[#8E8B83]">
                <span>{item.itemCount} Designs</span>
                <span className="text-[#C5A059] text-[11px] uppercase tracking-wider font-medium group-hover:translate-x-0.5 transition-transform">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
