/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, JewelleryCategory } from './types/jewellery';
import { DEMO_PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ShopByCollection } from './components/ShopByCollection';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AppointmentModal } from './components/AppointmentModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { StoryAndCraftsmanship } from './components/StoryAndCraftsmanship';
import { FaqSection } from './components/FaqSection';
import { ContactAndFooter } from './components/ContactAndFooter';
import { SearchModal } from './components/SearchModal';
import { CustomizationGuideModal } from './components/CustomizationGuideModal';

export default function App() {
  const [products] = useState<Product[]>(DEMO_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [appointmentDefaultCategory, setAppointmentDefaultCategory] = useState<string>('All Collections');

  // Wishlist state (persisted to localStorage)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('royal_gold_wishlist');
      return saved ? JSON.parse(saved) : ['rgj-01', 'rgj-04']; // pre-load 2 favorites for immediate rich demo feel
    } catch {
      return ['rgj-01', 'rgj-04'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('royal_gold_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlistIds]);

  const toggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const clearWishlist = () => {
    setWishlistIds([]);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    const catalogElem = document.querySelector('#products');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreHero = () => {
    const collectionsElem = document.querySelector('#collections');
    if (collectionsElem) {
      collectionsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAppointment = (category: string = 'All Collections') => {
    setAppointmentDefaultCategory(category);
    setIsAppointmentOpen(true);
  };

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#0F0F10] text-[#F7F5F0] flex flex-col font-sans selection:bg-[#C5A059]/30 selection:text-white">
      
      {/* Top Header */}
      <Header
        activeCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAppointment={() => handleOpenAppointment('All Collections')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={handleExploreHero}
          onBookAppointment={() => handleOpenAppointment('Bridal')}
        />

        {/* Shop by Collection Grid */}
        <ShopByCollection
          onSelectCategory={(cat: JewelleryCategory) => handleSelectCategory(cat)}
        />

        {/* Featured Masterpieces Product Catalog */}
        <ProductCatalog
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          wishlistIds={wishlistIds}
          onToggleWishlist={toggleWishlist}
          onViewDetails={(product) => setSelectedProduct(product)}
        />

        {/* Our Story & Karigar Craftsmanship */}
        <StoryAndCraftsmanship
          onBookAppointment={() => handleOpenAppointment('Bridal')}
        />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer & Showroom Information */}
      <ContactAndFooter
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenAppointment={() => handleOpenAppointment('All Collections')}
      />

      {/* Floating Instant WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={toggleWishlist}
        onBookAppointment={() => {
          if (selectedProduct) {
            handleOpenAppointment(selectedProduct.category);
          } else {
            handleOpenAppointment();
          }
        }}
      />

      {/* Showroom Visit Booking Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        defaultCategory={appointmentDefaultCategory}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistedProducts}
        onRemoveItem={toggleWishlist}
        onClearAll={clearWishlist}
        onViewDetails={(product) => setSelectedProduct(product)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* Developer & Showroom Owner Customization Guide Modal */}
      <CustomizationGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
