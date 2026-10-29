import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types/jewellery';
import { formatINR } from '../data/showroomConfig';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.collection.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
        <div 
          className="relative w-full max-w-2xl bg-[#141417] border border-[#2B2925] rounded-xl shadow-2xl overflow-hidden z-10 text-[#F7F5F0]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="p-4 sm:p-6 border-b border-[#252428] flex items-center gap-3">
            <Search className="w-5 h-5 text-[#C5A059] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search jewellery by name, gold, diamond, bridal, jhumkas, rings..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none text-sm sm:text-base text-[#FDFCF7] placeholder-[#6E6A63] focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1.5 text-[#A8A49C] hover:text-[#F7F5F0] hover:bg-[#1E1D21] rounded-full transition-colors cursor-pointer"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Categories Bar */}
          <div className="px-6 py-2.5 bg-[#101012] border-b border-[#201F23] flex items-center gap-2 overflow-x-auto text-[11px] text-[#A8A49C]">
            <span className="text-[#65615A] uppercase tracking-wider shrink-0">Popular:</span>
            {['Bridal Haar', 'Gold Bangles', 'Diamond Solitaire', 'Jhumkas', 'Mangalsutra'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="hover:text-[#C5A059] whitespace-nowrap cursor-pointer transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Results */}
          <div className="p-4 sm:p-6 max-h-96 overflow-y-auto space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-[#73706A] font-medium mb-1">
              {query.trim() ? `Search Results (${results.length})` : 'Popular Recommendations'}
            </p>

            {results.length === 0 ? (
              <p className="text-xs text-[#8E8B83] py-8 text-center">
                No jewellery found for &ldquo;{query}&rdquo;. Try another term.
              </p>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#1C1B1F] border border-transparent hover:border-[#2C2923] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded object-cover bg-[#222125] shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#A8A49C] block">
                        {product.category}
                      </span>
                      <h4 className="font-serif-luxury text-sm font-bold text-[#F7F5F0] group-hover:text-[#E8C97B] truncate">
                        {product.name}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="font-mono text-xs font-semibold text-[#D8D4CA]">
                      {formatINR(product.price)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
