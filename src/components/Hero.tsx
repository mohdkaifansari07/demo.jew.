import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Calendar, Sparkles, ShieldCheck, Play, Pause, VolumeX } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onBookAppointment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onBookAppointment }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check user preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Attempt autoplay with silent fallbacks
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsPlaying(false);
      return;
    }

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay with video might be restricted by browser policy; stay on poster
            setIsPlaying(false);
          });
      }
    }
  }, [prefersReducedMotion]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#0A0A0C]"
      aria-label="Hero Showcase"
    >
      {/* Background Video / Fallback Media Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        
        {/* Poster Image (shown while video loads or as fallback) */}
        <img
          src="/images/hero_model_poster.jpg"
          alt="Royal Indian Bridal Gold Jewellery Campaign"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover object-[center_25%] sm:object-center transition-opacity duration-1000 ${
            isVideoLoaded && !hasVideoError && !prefersReducedMotion ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Cinematic Background Video */}
        {!prefersReducedMotion && !hasVideoError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/hero_model_poster.jpg"
            onCanPlay={() => setIsVideoLoaded(true)}
            onError={() => {
              setHasVideoError(true);
              setIsVideoLoaded(false);
            }}
            className={`absolute inset-0 w-full h-full object-cover object-[center_25%] sm:object-center transition-opacity duration-1000 filter brightness-[0.82] contrast-[1.08] ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src="/videos/hero_bridal_jewellery.mp4" type="video/mp4" />
          </video>
        )}

        {/* Luxury Multi-layer Gradient Scrim Overlay for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-[#0F0F10]/60 to-black/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0F0F10]/20 to-[#0F0F10]/80" />
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center flex flex-col items-center">
        
        {/* Discreet Demo Safety Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 border border-[#C5A059]/40 text-[11px] uppercase tracking-widest text-[#E6C687] backdrop-blur-md mb-6 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
          <span>DEMO WEBSITE — Fictional Brand & Illustrative Product Prices</span>
        </div>

        {/* Brand Kicker */}
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#C5A059] font-medium mb-3 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-[#C5A059]/60"></span>
          <span>HAUTE INDIAN BRIDAL & FINE JEWELLERY</span>
          <span className="w-8 h-[1px] bg-[#C5A059]/60"></span>
        </p>

        {/* Main Headline */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FDFCF7] leading-[1.1] mb-5 text-balance max-w-4xl drop-shadow-md">
          Jewellery That Tells <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#E8C97B]">Your Story</span>
        </h1>

        {/* Required Subtitle */}
        <p className="text-base sm:text-2xl text-[#E8E4DC] max-w-2xl font-light tracking-wide leading-relaxed mb-10 text-balance font-serif-luxury">
          Timeless Designs. Unforgettable Elegance.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 bg-[#C5A059] hover:bg-[#D4AF37] text-[#121214] text-xs font-bold uppercase tracking-[0.2em] rounded transition-all duration-200 shadow-xl shadow-[#C5A059]/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore Collection</span>
          </button>

          <button
            onClick={onBookAppointment}
            className="w-full sm:w-auto px-8 py-4 bg-[#18181A]/85 hover:bg-[#252427] border border-[#C5A059]/60 text-[#F5F3EF] hover:border-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em] rounded backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4 text-[#C5A059]" />
            <span>Book a Showroom Visit</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={onExploreClick}
          aria-label="Scroll down to jewellery collection"
          className="mt-14 text-[#A8A49C] hover:text-[#C5A059] transition-colors p-2 cursor-pointer animate-bounce"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>

      {/* Video Control & Ambient Badge (Bottom Right) */}
      {!hasVideoError && (
        <div className="absolute bottom-16 sm:bottom-14 right-4 sm:right-8 z-20 flex items-center gap-2">
          <button
            onClick={togglePlayPause}
            className="px-2.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-[#C5A059]/30 text-[#D8D4CA] hover:text-[#C5A059] text-[10px] uppercase tracking-wider backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer"
            aria-label={isPlaying ? "Pause cinematic background video" : "Play cinematic background video"}
            title={isPlaying ? "Pause background video" : "Play background video"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-[#C5A059]" />
                <span className="hidden sm:inline">Pause Video</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#C5A059]" />
                <span className="hidden sm:inline">Play Video</span>
              </>
            )}
          </button>

          <div 
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/60 border border-[#272522] text-[#8E8B83] text-[10px] tracking-wider backdrop-blur-md"
            title="Video is muted for seamless ambient browsing"
          >
            <VolumeX className="w-3 h-3 text-[#C5A059]" />
            <span>Muted Ambient Film</span>
          </div>
        </div>
      )}

      {/* Hallmark Attributes Strip */}
      <div className="absolute bottom-0 inset-x-0 bg-[#121214]/90 border-t border-[#242220] py-3.5 hidden md:block z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 divide-x divide-[#272522] text-center text-xs text-[#A8A49C]">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#C5A059]">✦</span>
            <span>Handcrafted Heirloom Artistry</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#C5A059]">✦</span>
            <span>Private Bridal Lounges & Trial Salons</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#C5A059]">✦</span>
            <span>Direct Master Goldsmith WhatsApp Concierge</span>
          </div>
        </div>
      </div>
    </section>
  );
};
