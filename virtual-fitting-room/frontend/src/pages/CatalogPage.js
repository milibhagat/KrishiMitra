import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  X,
  ShoppingBag,
  Star,
  Heart,
  Grid3X3,
  List,
  ChevronDown,
} from 'lucide-react';
import { useClothing } from '../context/ClothingContext';
import { useUser } from '../context/UserContext';

const CatalogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  
  const {
    filteredItems,
    isLoading,
    categories,
    filters,
    updateFilters,
    clearFilters,
    searchItems,
  } = useClothing();
  
  const { currentUser } = useUser();

  useEffect(() => {
    searchItems(searchTerm);
  }, [searchTerm, searchItems]);

  const handleFilterChange = (key, value) => {
    updateFilters({ [key]: value });
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchTerm('');
  };

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'brand':
        return a.brand.localeCompare(b.brand);
      default:
        return 0;
    }
  });

  const ClothingCard = ({ item }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card group hover:shadow-medium transition-shadow duration-200"
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-x-3">
            <Link
              to={`/try-on?item=${item.id}`}
              className="btn-primary text-sm py-2 px-4"
            >
              Try On
            </Link>
            <button className="btn-secondary text-sm py-2 px-4">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Category badge */}
        <div className="absolute top-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-medium capitalize">
          {item.category}
        </div>
      </div>
      
      <div className="card-body">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-primary-600">
            ${item.price}
          </span>
        </div>
        
        <p className="text-sm text-neutral-600 mb-3">
          {item.brand}
        </p>
        
        <p className="text-sm text-neutral-700 mb-4 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-neutral-600">4.5</span>
          </div>
          
          <div className="text-sm text-neutral-600">
            {item.sizes.length} sizes
          </div>
        </div>
        
        {/* Size options preview */}
        <div className="mt-3 flex flex-wrap gap-1">
          {item.sizes.slice(0, 5).map((size) => (
            <span
              key={size}
              className="px-2 py-1 bg-neutral-100 text-xs rounded text-neutral-700"
            >
              {size}
            </span>
          ))}
          {item.sizes.length > 5 && (
            <span className="px-2 py-1 bg-neutral-100 text-xs rounded text-neutral-700">
              +{item.sizes.length - 5}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  const FilterPanel = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="input-field text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category} className="capitalize">
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            className="input-field text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            className="input-field text-sm"
          />
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Size
        </label>
        <select
          value={filters.size}
          onChange={(e) => handleFilterChange('size', e.target.value)}
          className="input-field text-sm"
        >
          <option value="">All Sizes</option>
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Brand
        </label>
        <input
          type="text"
          placeholder="Search brands..."
          value={filters.brand}
          onChange={(e) => handleFilterChange('brand', e.target.value)}
          className="input-field text-sm"
        />
      </div>

      <button
        onClick={handleClearFilters}
        className="w-full btn-outline text-sm"
      >
        Clear All Filters
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
              Clothing Catalog
            </h1>
            <p className="text-neutral-600">
              Discover clothes that fit your style and body
            </p>
          </div>

          {!currentUser && (
            <div className="mt-4 lg:mt-0">
              <Link to="/onboarding" className="btn-primary">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Get Size Recommendations
              </Link>
            </div>
          )}
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search for clothes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 pr-4"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field text-sm pr-8 appearance-none bg-white"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="brand">Brand</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>

            {/* View Mode */}
            <div className="flex bg-white border border-neutral-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline text-sm lg:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 space-y-6`}>
            <div className="card lg:sticky lg:top-24">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Filters
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterPanel />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-neutral-600">
                {isLoading ? 'Loading...' : `${sortedItems.length} items found`}
              </p>
            </div>

            {/* Products */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card animate-pulse">
                    <div className="h-64 bg-neutral-200"></div>
                    <div className="card-body space-y-3">
                      <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                      <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                      <div className="h-3 bg-neutral-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  No items found
                </h3>
                <p className="text-neutral-600 mb-4">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={handleClearFilters}
                  className="btn-outline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {sortedItems.map((item) => (
                  <ClothingCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;