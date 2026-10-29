import React, { useMemo } from 'react';
import { Product, JewelleryCategory } from '../types/jewellery';
import { ProductCard } from './ProductCard';
import { Search, RotateCcw, ArrowUpDown, Filter } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc';
  onSortChange: (sort: 'featured' | 'price-asc' | 'price-desc') => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const CATEGORY_TABS: { label: string; value: string }[] = [
  { label: "All Collections", value: "all" },
  { label: "Gold", value: "Gold" },
  { label: "Diamond", value: "Diamond" },
  { label: "Bridal", value: "Bridal" },
  { label: "Rings", value: "Rings" },
  { label: "Earrings", value: "Earrings" },
  { label: "Bangles", value: "Bangles" },
  { label: "Necklaces", value: "Necklaces" },
  { label: "Mangalsutras", value: "Mangalsutras" }
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  wishlistIds,
  onToggleWishlist,
  onViewDetails
}) => {
  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.collection.toLowerCase().includes(q)
      );
    }

    // Sort order
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // featured
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery.trim().length > 0;

  const handleClearFilters = () => {
    onSelectCategory('all');
    onSearchChange('');
    onSortChange('featured');
  };

  return (
    <section id="products" className="py-20 bg-[#121214] text-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium mb-2">
            The Showroom Gallery
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FDFCF7]">
            Featured Masterpieces
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C5A059] mx-auto mt-4 mb-3"></div>
          <p className="text-sm text-[#A8A49C] leading-relaxed">
            Every creation is an ode to timeless Indian jewellery heritage. Explore our live catalog, filter by jewellery family, and enquire directly on WhatsApp.
          </p>
        </div>

        {/* Filter Toolbar Controls */}
        <div className="bg-[#17171A] border border-[#272522] rounded-lg p-4 sm:p-5 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8B83]" />
              <input
                type="text"
                placeholder="Search jewellery by name, motif, or style..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#101012] border border-[#302D28] focus:border-[#C5A059] focus:outline-none text-xs sm:text-sm text-[#F7F5F0] placeholder-[#6E6A63] pl-10 pr-4 py-2.5 rounded transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8E8B83] hover:text-[#F7F5F0] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort & Filter Reset Toolbar */}
            <div className="flex items-center gap-3 justify-between md:justify-end">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#C5A059] shrink-0" />
                <label htmlFor="price-sort" className="sr-only">Sort by price</label>
                <select
                  id="price-sort"
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value as any)}
                  className="bg-[#101012] border border-[#302D28] text-xs text-[#E5E1D8] py-2 px-3 rounded focus:outline-none focus:border-[#C5A059] cursor-pointer"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-[#C5A059] hover:text-[#E8C97B] flex items-center gap-1.5 py-2 px-3 border border-[#C5A059]/30 rounded hover:bg-[#C5A059]/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Category Tabs / Segmented Buttons */}
          <div className="mt-4 pt-4 border-t border-[#252428] flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-[11px] uppercase tracking-wider text-[#73706A] font-medium shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3 text-[#C5A059]" /> Category:
            </span>
            {CATEGORY_TABS.map((tab) => {
              const isActive = selectedCategory.toLowerCase() === tab.value.toLowerCase();
              return (
                <button
                  key={tab.value}
                  onClick={() => onSelectCategory(tab.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#C5A059] text-[#121214] font-semibold shadow-sm'
                      : 'text-[#A8A49C] hover:text-[#F7F5F0] hover:bg-[#201F23]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Information */}
        <div className="flex items-center justify-between text-xs text-[#8E8B83] mb-6 px-1">
          <span>
            Showing <strong className="text-[#F7F5F0] font-mono">{filteredProducts.length}</strong> of {products.length} showroom pieces
          </span>
          {hasActiveFilters && (
            <span className="text-[#C5A059]">
              Filtered by: {selectedCategory === 'all' ? 'All' : selectedCategory} {searchQuery ? `· "${searchQuery}"` : ''}
            </span>
          )}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-[#161619] border border-[#272522] rounded-lg p-8 max-w-md mx-auto">
            <p className="font-serif-luxury text-2xl font-bold text-[#F7F5F0] mb-2">
              No matching jewellery found
            </p>
            <p className="text-xs text-[#8E8B83] mb-6">
              We couldn&apos;t find any designs matching your current search or category filter. Try clearing filters or searching another keyword.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-2.5 bg-[#C5A059] text-[#121214] text-xs font-bold uppercase tracking-wider rounded hover:bg-[#D4AF37] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Product Grid (Responsive: 1 col on mobile, 2 on tablet, 3 on desktop) */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
