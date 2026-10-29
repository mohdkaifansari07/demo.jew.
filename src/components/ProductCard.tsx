import React from 'react';
import { Product } from '../types/jewellery';
import { Heart, MessageCircle, Eye } from 'lucide-react';
import { formatINR, generateProductWhatsAppUrl } from '../data/showroomConfig';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onViewDetails
}) => {
  const whatsappUrl = generateProductWhatsAppUrl(product);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div 
      onClick={() => onViewDetails(product)}
      className="group relative bg-[#141416] border border-[#262422] hover:border-[#C5A059]/60 rounded transition-all duration-300 flex flex-col cursor-pointer overflow-hidden shadow-sm hover:shadow-lg hover:shadow-black/60"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] bg-[#1A1A1D] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out brightness-[0.92]"
          onError={(e) => {
            // Elegant CSS/SVG fallback container if image fails to load
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />

        {/* Subtle Vignette Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Top Floating Controls */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          {product.isNewArrival ? (
            <span className="text-[10px] uppercase tracking-widest text-[#E8C97B] font-semibold bg-black/75 px-2.5 py-1 rounded-sm border border-[#C5A059]/30">
              New Arrival
            </span>
          ) : (
            <span />
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
              isWishlisted 
                ? 'bg-[#C5A059] text-[#121214]' 
                : 'bg-black/60 text-[#D8D4CA] hover:text-[#C5A059] hover:bg-black/80'
            }`}
            aria-label={isWishlisted ? "Remove from saved designs" : "Save to wishlist"}
            title={isWishlisted ? "Saved" : "Save item"}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-x-4 bottom-3 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="w-full py-2 bg-[#121214]/90 hover:bg-[#1E1D21] text-[#F7F5F0] border border-[#C5A059]/60 text-xs uppercase tracking-wider font-medium rounded flex items-center justify-center gap-1.5 backdrop-blur-md transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>View Details</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Line */}
          <div className="flex items-center gap-1.5 text-xs text-[#9B978F] mb-1.5 uppercase tracking-widest">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.collection}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif-luxury text-lg font-bold text-[#F7F5F0] group-hover:text-[#E8C97B] transition-colors line-clamp-1 mb-1.5">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#8E8B83] line-clamp-2 leading-relaxed mb-4">
            {product.shortDescription}
          </p>
        </div>

        <div>
          {/* Price & Reference Tag */}
          <div className="pt-3 border-t border-[#232126] flex items-baseline justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7A7770] block">
                Sample Demo Price
              </span>
              <span className="font-mono text-base sm:text-lg font-bold text-[#F5F3EF] tabular-nums tracking-tight">
                {formatINR(product.price)}
              </span>
            </div>
            <span className="text-[10px] text-[#C5A059] font-medium bg-[#C5A059]/10 px-2 py-0.5 rounded border border-[#C5A059]/20">
              Showroom Preview
            </span>
          </div>

          {/* Card Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(product);
              }}
              className="py-2.5 px-2 border border-[#3A3732] hover:border-[#C5A059] text-[#D8D4CA] hover:text-[#F7F5F0] text-[11px] font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Details</span>
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="py-2.5 px-2 bg-[#1E2E20] hover:bg-[#253A28] border border-[#25D366]/40 text-[#55E685] hover:text-[#76F7A0] text-[11px] font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
              title="Enquire on WhatsApp with prefilled product message"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
