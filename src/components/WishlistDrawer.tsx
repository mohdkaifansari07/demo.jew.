import React from 'react';
import { Product } from '../types/jewellery';
import { X, Trash2, MessageCircle, Heart, ArrowRight } from 'lucide-react';
import { formatINR, generateProductWhatsAppUrl, SHOWROOM_CONFIG } from '../data/showroomConfig';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveItem: (product: Product) => void;
  onClearAll: () => void;
  onViewDetails: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveItem,
  onClearAll,
  onViewDetails
}) => {
  if (!isOpen) return null;

  const totalEstimate = wishlistProducts.reduce((acc, item) => acc + item.price, 0);

  // Generate single WhatsApp message containing all wishlisted items
  const handleEnquireAllWhatsApp = () => {
    if (wishlistProducts.length === 0) return;

    const itemsSummary = wishlistProducts
      .map((item, idx) => `${idx + 1}. *${item.name}* (${item.category}) — ${formatINR(item.price)}`)
      .join('\n');

    const message = encodeURIComponent(
      `Namaste Royal Gold Jewellers,\n\nI have saved these ${wishlistProducts.length} jewellery design(s) on your website and would like to enquire about their showroom availability and customization:\n\n${itemsSummary}\n\n*Total Illustrative Estimate:* ${formatINR(totalEstimate)}\n\nCould you please arrange a showroom preview or share detailed video clips of these designs?`
    );

    window.open(`https://wa.me/${SHOWROOM_CONFIG.whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#141416] border-l border-[#292723] shadow-2xl z-50 flex flex-col justify-between text-[#F7F5F0]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#252428] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C5A059] fill-current" />
            <h3 className="font-serif-luxury text-xl font-bold tracking-wide">
              Saved Designs ({wishlistProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A8A49C] hover:text-[#F7F5F0] hover:bg-[#1E1D21] rounded-full transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 text-[#8E8B83]">
              <Heart className="w-12 h-12 text-[#2B2925] mx-auto mb-3" />
              <p className="font-serif-luxury text-lg font-bold text-[#D8D4CA] mb-1">
                Your wishlist is empty
              </p>
              <p className="text-xs max-w-xs mx-auto">
                Click the heart icon on any jewellery piece to save it here for quick reference and WhatsApp consultation.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#18181C] border border-[#262428] rounded-lg p-3 flex gap-3.5 items-center justify-between group"
              >
                {/* Thumbnail */}
                <div 
                  onClick={() => {
                    onClose();
                    onViewDetails(product);
                  }}
                  className="w-16 h-16 rounded overflow-hidden bg-[#201F23] shrink-0 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#A8A49C] block">
                    {product.category}
                  </span>
                  <h4 
                    onClick={() => {
                      onClose();
                      onViewDetails(product);
                    }}
                    className="font-serif-luxury text-sm font-bold text-[#F7F5F0] truncate cursor-pointer hover:text-[#C5A059] transition-colors"
                  >
                    {product.name}
                  </h4>
                  <span className="font-mono text-xs font-semibold text-[#E8C97B] block mt-0.5">
                    {formatINR(product.price)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href={generateProductWhatsAppUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[#55E685] hover:bg-[#1E2E20] rounded transition-colors"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>

                  <button
                    onClick={() => onRemoveItem(product)}
                    className="p-2 text-[#8E8B83] hover:text-rose-400 hover:bg-rose-950/20 rounded transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & WhatsApp Action */}
        {wishlistProducts.length > 0 && (
          <div className="p-6 border-t border-[#252428] bg-[#111113] space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8E8B83]">Illustrative Total (Demo):</span>
              <span className="font-mono text-base font-bold text-[#FDFCF7]">
                {formatINR(totalEstimate)}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleEnquireAllWhatsApp}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-[#0E2012] text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/15 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Enquire All on WhatsApp</span>
              </button>

              <button
                onClick={onClearAll}
                className="w-full py-2 text-xs text-[#8E8B83] hover:text-[#A8A49C] transition-colors cursor-pointer"
              >
                Clear Wishlist
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
