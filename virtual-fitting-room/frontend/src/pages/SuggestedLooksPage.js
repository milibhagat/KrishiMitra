import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Sparkles,
  Heart,
  ShoppingBag,
  Share2,
  Filter,
  RefreshCw,
  User,
  Star,
  ChevronDown,
  Loader,
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useClothing } from '../context/ClothingContext';

const SuggestedLooksPage = () => {
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [outfitSuggestions, setOutfitSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { currentUser, avatar } = useUser();
  const { getOutfitSuggestions } = useClothing();

  const occasions = [
    { value: '', label: 'All Occasions' },
    { value: 'casual', label: 'Casual' },
    { value: 'work', label: 'Work/Business' },
    { value: 'formal', label: 'Formal Events' },
    { value: 'party', label: 'Party/Night Out' },
    { value: 'date', label: 'Date Night' },
    { value: 'workout', label: 'Workout/Gym' },
  ];

  const styles = [
    { value: '', label: 'All Styles' },
    { value: 'classic', label: 'Classic' },
    { value: 'trendy', label: 'Trendy' },
    { value: 'bohemian', label: 'Bohemian' },
    { value: 'minimalist', label: 'Minimalist' },
    { value: 'edgy', label: 'Edgy' },
    { value: 'romantic', label: 'Romantic' },
  ];

  const budgetRanges = [
    { value: '', label: 'Any Budget' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: '$200+' },
  ];

  useEffect(() => {
    if (currentUser) {
      loadSuggestions();
    }
  }, [currentUser, selectedOccasion, selectedStyle, selectedBudget]);

  const loadSuggestions = async () => {
    if (!currentUser) return;

    setIsLoading(true);
    try {
      const preferences = {
        occasion: selectedOccasion,
        style: selectedStyle,
        budget: selectedBudget,
      };
      
      const result = await getOutfitSuggestions(currentUser.id, preferences);
      setOutfitSuggestions(result.suggestions);
    } catch (error) {
      toast.error('Failed to load outfit suggestions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadSuggestions();
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Complete Your Profile First
          </h2>
          <p className="text-neutral-600 mb-6">
            We need your measurements to provide personalized style suggestions.
          </p>
          <Link to="/onboarding" className="btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    );
  }

  const OutfitCard = ({ outfit }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card group hover:shadow-medium transition-all duration-200"
    >
      <div className="relative">
        {/* Outfit Preview Grid */}
        <div className="grid grid-cols-2 gap-1 h-64 rounded-t-xl overflow-hidden">
          {outfit.items.slice(0, 4).map((item, index) => (
            <div key={item.id} className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {index === 0 && outfit.items.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <span className="text-white font-medium">
                    +{outfit.items.length - 4} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Body Shape Match Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-white bg-opacity-90 px-3 py-1 rounded-full flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium">
              {Math.round(outfit.bodyShapeMatch * 100)}% match
            </span>
          </div>
        </div>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center rounded-t-xl">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-x-3">
            <button className="btn-primary text-sm py-2 px-4">
              Try All On
            </button>
            <button className="btn-secondary text-sm py-2 px-4">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
              {outfit.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-neutral-600">
              <span className="capitalize">{outfit.style}</span>
              <span>•</span>
              <span className="capitalize">{outfit.occasion}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary-600">
              ${outfit.totalPrice}
            </div>
            <div className="text-xs text-neutral-500">
              {outfit.items.length} items
            </div>
          </div>
        </div>

        {/* Items Preview */}
        <div className="space-y-2 mb-4">
          {outfit.items.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center space-x-2 text-sm">
              <div className="w-8 h-8 rounded bg-neutral-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-neutral-700 flex-1 truncate">
                {item.name}
              </span>
              <span className="text-neutral-600">${item.price}</span>
            </div>
          ))}
          {outfit.items.length > 3 && (
            <div className="text-xs text-neutral-500 text-center">
              +{outfit.items.length - 3} more items
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link
            to={`/try-on?item=${outfit.items[0].id}`}
            className="flex-1 btn-primary text-sm py-2 text-center"
          >
            Try On
          </Link>
          <button className="btn-outline text-sm py-2 px-3">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="btn-outline text-sm py-2 px-3">
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4 flex items-center justify-center">
              <Sparkles className="w-8 h-8 mr-3 text-primary-600" />
              Suggested Looks
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Personalized outfit recommendations based on your body shape and style preferences
            </p>
          </motion.div>
        </div>

        {/* User Info Banner */}
        {avatar && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-primary-100">
                <img
                  src={avatar.modelUrl}
                  alt="Your avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  Personalized for Your {avatar.bodyShape} Body Shape
                </h3>
                <p className="text-neutral-600">
                  These outfits are specially curated to complement your measurements and style
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-outline lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="btn-outline"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {/* Desktop Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:flex lg:items-center lg:space-x-4 space-y-4 lg:space-y-0`}>
              <div className="relative">
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="input-field text-sm pr-8 appearance-none bg-white min-w-0 lg:min-w-32"
                >
                  {occasions.map((occasion) => (
                    <option key={occasion.value} value={occasion.value}>
                      {occasion.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="input-field text-sm pr-8 appearance-none bg-white min-w-0 lg:min-w-32"
                >
                  {styles.map((style) => (
                    <option key={style.value} value={style.value}>
                      {style.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="input-field text-sm pr-8 appearance-none bg-white min-w-0 lg:min-w-32"
                >
                  {budgetRanges.map((budget) => (
                    <option key={budget.value} value={budget.value}>
                      {budget.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-neutral-600">
            {isLoading ? (
              <span className="flex items-center">
                <Loader className="w-4 h-4 animate-spin mr-2" />
                Loading suggestions...
              </span>
            ) : (
              `${outfitSuggestions.length} outfit suggestions found`
            )}
          </p>
        </div>

        {/* Outfit Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-64 bg-neutral-200 rounded-t-xl"></div>
                <div className="card-body space-y-3">
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-neutral-200 rounded"></div>
                    <div className="h-3 bg-neutral-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : outfitSuggestions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              No suggestions found
            </h3>
            <p className="text-neutral-600 mb-4">
              Try adjusting your preferences or refresh for new suggestions
            </p>
            <button
              onClick={handleRefresh}
              className="btn-primary"
            >
              Get New Suggestions
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outfitSuggestions.map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        )}

        {/* Call to Action */}
        {outfitSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 p-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-200"
          >
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Love these suggestions?
            </h3>
            <p className="text-neutral-600 mb-6">
              Start building your virtual wardrobe and never buy the wrong size again
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog" className="btn-primary">
                Browse Full Catalog
              </Link>
              <Link to="/try-on" className="btn-outline">
                Try Virtual Fitting
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SuggestedLooksPage;