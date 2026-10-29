import React from 'react';
import { Product } from '../types/jewellery';
import { 
  X, 
  Heart, 
  MessageCircle, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  Share2
} from 'lucide-react';
import { formatINR, generateProductWhatsAppUrl } from '../data/showroomConfig';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onBookAppointment: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onBookAppointment
}) => {
  if (!isOpen || !product) return null;

  const whatsappUrl = generateProductWhatsAppUrl(product);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} | Royal Gold Jewellers`,
        text: `Take a look at this exquisite ${product.name} from Royal Gold Jewellers:`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div 
          className="relative w-full max-w-4xl bg-[#141417] border border-[#2B2925] rounded-xl shadow-2xl overflow-hidden z-10 my-8 text-[#F7F5F0]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#242327] bg-[#111113]">
            <button
              onClick={onClose}
              className="text-xs uppercase tracking-wider text-[#A8A49C] hover:text-[#C5A059] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Collection</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 text-[#A8A49C] hover:text-[#F7F5F0] hover:bg-[#1E1D21] rounded-full transition-colors cursor-pointer"
                title="Share Design"
                aria-label="Share Design"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isWishlisted 
                    ? 'text-[#C5A059] bg-[#C5A059]/15' 
                    : 'text-[#A8A49C] hover:text-[#C5A059] hover:bg-[#1E1D21]'
                }`}
                title={isWishlisted ? "Saved in wishlist" : "Add to wishlist"}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="p-2 text-[#A8A49C] hover:text-[#F7F5F0] hover:bg-[#1E1D21] rounded-full transition-colors cursor-pointer ml-1"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Large Product Image Stage */}
            <div className="relative aspect-square md:aspect-auto md:h-full bg-[#1A1A1E] overflow-hidden flex items-center justify-center p-4 sm:p-8">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-[11px] text-[#C5A059] bg-black/75 px-3 py-1 rounded-full border border-[#C5A059]/30 backdrop-blur-sm">
                  Showroom Trial Available Upon Request
                </span>
              </div>
            </div>

            {/* Right: Detailed Information & Enquiry Form */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Category & Collection */}
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9B978F] mb-2 font-medium">
                  <span>{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.collection}</span>
                </div>

                {/* Product Name */}
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#FDFCF7] mb-3 leading-snug">
                  {product.name}
                </h2>

                {/* Price Display */}
                <div className="p-3.5 bg-[#18181C] border border-[#28272C] rounded-lg mb-6">
                  <span className="text-[10px] uppercase tracking-wider text-[#7E7A73] block mb-0.5">
                    Sample Illustrative Price
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-[#FDFCF7] tabular-nums">
                      {formatINR(product.price)}
                    </span>
                    <span className="text-xs text-[#A8A49C]">
                      (Demo Estimate)
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A8A49C] mt-1.5 leading-relaxed">
                    * Illustrative demo price. Metal weight, stone selection, and custom gold karat options will be certified upon final selection at the showroom.
                  </p>
                </div>

                {/* Full Description */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-widest text-[#C5A059] font-medium mb-1.5">
                    Artisanal Description
                  </h4>
                  <p className="text-xs sm:text-sm text-[#D8D4CA] leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Specifications & Notes */}
                <div className="space-y-2.5 mb-6 text-xs border-y border-[#252428] py-4">
                  {product.motif && (
                    <div className="flex items-baseline justify-between">
                      <span className="text-[#8E8B83] uppercase tracking-wider text-[11px]">Design Motif:</span>
                      <span className="text-[#F7F5F0] font-medium text-right">{product.motif}</span>
                    </div>
                  )}
                  {product.idealFor && (
                    <div className="flex items-baseline justify-between">
                      <span className="text-[#8E8B83] uppercase tracking-wider text-[11px]">Ideal Occasion:</span>
                      <span className="text-[#F7F5F0] font-medium text-right">{product.idealFor}</span>
                    </div>
                  )}
                  {product.customization && (
                    <div className="flex items-baseline justify-between">
                      <span className="text-[#8E8B83] uppercase tracking-wider text-[11px]">Custom Options:</span>
                      <span className="text-[#C5A059] font-medium text-right">{product.customization}</span>
                    </div>
                  )}
                </div>

                {/* Demo Accuracy Notice */}
                <div className="flex items-start gap-2.5 p-3 bg-[#17161A] border border-[#2D2A24] rounded text-[11px] text-[#9E9B92] mb-6">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <p>
                    <strong>Demo Safety Guarantee:</strong> As a showroom prototype, prices and details are for demonstration only. No real payment or commitment is charged online.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-[#0E2012] text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/15"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    onBookAppointment();
                  }}
                  className="py-3.5 px-4 bg-[#201F23] hover:bg-[#28272C] border border-[#C5A059]/60 text-[#C5A059] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Visit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
