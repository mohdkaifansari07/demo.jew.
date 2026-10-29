import React, { useState } from 'react';
import { X, Check, Copy, Sliders, ExternalLink, Code2, Globe, PhoneCall, Film } from 'lucide-react';
import { SHOWROOM_CONFIG } from '../data/showroomConfig';

interface CustomizationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizationGuideModal: React.FC<CustomizationGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
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
          className="relative w-full max-w-3xl bg-[#141417] border border-[#2B2925] rounded-xl shadow-2xl p-6 sm:p-8 z-10 my-8 text-[#F7F5F0]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-[#A8A49C] hover:text-[#F7F5F0] hover:bg-[#1E1D21] rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-1">
              Developer & Showroom Owner Guide
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#FDFCF7]">
              How to Customize & Deploy This Website
            </h3>
            <p className="text-xs text-[#A8A49C] mt-1">
              Instructions for customizing brand identity, WhatsApp numbers, product pricing, and exporting for independent production hosting.
            </p>
          </div>

          <div className="space-y-6 text-xs text-[#D8D4CA]">
            
            {/* 1. Showroom Configuration */}
            <div className="p-4 bg-[#18181C] border border-[#28272C] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-[#E8C97B] text-sm flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#C5A059]" />
                  1. Updating Showroom Details & WhatsApp Number
                </h4>
                <button
                  onClick={() => copyToClipboard('src/data/showroomConfig.ts', 'path-config')}
                  className="text-[10px] text-[#A8A49C] hover:text-[#C5A059] flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'path-config' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>src/data/showroomConfig.ts</span>
                </button>
              </div>
              <p className="mb-2 leading-relaxed text-[#9E9B92]">
                Open <code className="text-[#E8C97B] bg-black/40 px-1 py-0.5 rounded">src/data/showroomConfig.ts</code>. You can change:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[#C5A059]/90">
                <li><strong>brandName:</strong> Set to your real jewellery store name (e.g. &ldquo;ROYAL GOLD JEWELLERS&rdquo;)</li>
                <li><strong>whatsappNumber:</strong> Enter your 10-digit phone with country code (e.g. <code className="text-white">917084183605</code> without spaces or +)</li>
                <li><strong>address & landmark:</strong> Your physical showroom address in India</li>
                <li><strong>googleMapsUrl:</strong> Direct Google Maps location link for the driving directions button</li>
                <li><strong>openingHours & displayPhone:</strong> Showroom hours and telephone number</li>
              </ul>
            </div>

            {/* 2. Adding Products & Pricing */}
            <div className="p-4 bg-[#18181C] border border-[#28272C] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-[#E8C97B] text-sm flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#C5A059]" />
                  2. Adding, Editing Products & Prices
                </h4>
                <button
                  onClick={() => copyToClipboard('src/data/products.ts', 'path-products')}
                  className="text-[10px] text-[#A8A49C] hover:text-[#C5A059] flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'path-products' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>src/data/products.ts</span>
                </button>
              </div>
              <p className="mb-2 leading-relaxed text-[#9E9B92]">
                Open <code className="text-[#E8C97B] bg-black/40 px-1 py-0.5 rounded">src/data/products.ts</code> to update the product catalog:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[#C5A059]/90">
                <li>Each item contains <code className="text-white">id, name, category, price, image, description, motif, idealFor</code></li>
                <li>To add high-resolution photos of real inventory, place files into <code className="text-white">src/assets/images/</code> or reference your CDN image URLs</li>
                <li>Categories supported: Gold, Diamond, Bridal, Rings, Earrings, Bangles, Necklaces, Mangalsutras</li>
              </ul>
            </div>

            {/* 3. Hero Background Video & Poster */}
            <div className="p-4 bg-[#18181C] border border-[#28272C] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-[#E8C97B] text-sm flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#C5A059]" />
                  3. Replacing the Hero Background Video & Poster
                </h4>
                <button
                  onClick={() => copyToClipboard('public/videos/hero_bridal_jewellery.mp4', 'path-video')}
                  className="text-[10px] text-[#A8A49C] hover:text-[#C5A059] flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'path-video' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>public/videos/hero_bridal_jewellery.mp4</span>
                </button>
              </div>
              <p className="mb-2 leading-relaxed text-[#9E9B92]">
                The website plays a seamless looping background video behind the hero headlines:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[#C5A059]/90">
                <li><strong>Video File Path:</strong> <code className="text-white">public/videos/hero_bridal_jewellery.mp4</code> (served at <code className="text-[#E8C97B]">/videos/hero_bridal_jewellery.mp4</code>)</li>
                <li><strong>Static Poster Fallback:</strong> <code className="text-white">public/images/hero_model_poster.jpg</code> (served at <code className="text-[#E8C97B]">/images/hero_model_poster.jpg</code>)</li>
                <li><strong>Recommended Specs:</strong> Short 5–12s clip, H.264 MP4, 1280x720 or 1920x1080, muted, compressed under 2–3MB for lightning-fast mobile loading</li>
                <li><strong>Replacing:</strong> Simply replace the MP4 file in <code className="text-white">public/videos/</code> with your brand&apos;s campaign film. No code changes required!</li>
              </ul>
            </div>

            {/* 4. Export & Free Deployment */}
            <div className="p-4 bg-[#18181C] border border-[#28272C] rounded-lg">
              <h4 className="font-semibold text-[#E8C97B] text-sm mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#C5A059]" />
                4. Exporting & Deploying to Free Production Hosting
              </h4>
              <p className="mb-3 leading-relaxed text-[#9E9B92]">
                This website is a standard, lightweight React + Vite + Tailwind CSS application that requires zero database setup and zero paid API keys:
              </p>
              <div className="space-y-2 bg-[#0F0F12] p-3 rounded border border-[#232226] font-mono text-[11px] text-[#E5E1D8]">
                <p className="text-[#8E8B83]"># 1. Build optimized static bundle:</p>
                <p className="text-emerald-400">npm run build</p>
                <p className="text-[#8E8B83] mt-2"># 2. Deploy the resulting &apos;dist&apos; folder to free static hosting:</p>
                <p className="text-[#A8A49C]">Option A: Vercel (Run <code className="text-[#E8C97B]">npx vercel</code>)</p>
                <p className="text-[#A8A49C]">Option B: Netlify (Drag and drop <code className="text-[#E8C97B]">dist/</code> or connect GitHub)</p>
                <p className="text-[#A8A49C]">Option C: Cloudflare Pages / GitHub Pages</p>
              </div>
            </div>

            {/* 4. Client Demo Talking Points */}
            <div className="p-4 bg-[#121E14] border border-[#244227] rounded-lg text-[#A2E2AD]">
              <h4 className="font-semibold text-[#55E685] text-sm mb-1 flex items-center gap-2">
                <PhoneCall className="w-4 h-4" />
                Value Proposition for Jewellery Showroom Owners
              </h4>
              <p className="text-[11px] text-[#A2E2AD] leading-relaxed">
                Showroom owners love this architecture because it drives footfall and immediate high-value customer inquiries straight to their WhatsApp sales team without complex inventory syncing or expensive credit card gateway commissions.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#232226] flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#C5A059] text-[#121214] text-xs font-bold uppercase tracking-wider rounded hover:bg-[#D4AF37] transition-colors cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
