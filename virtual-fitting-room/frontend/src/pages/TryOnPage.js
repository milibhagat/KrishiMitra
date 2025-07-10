import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Camera,
  Shirt,
  Palette,
  Ruler,
  Star,
  ShoppingBag,
  Heart,
  Share2,
  ArrowLeft,
  Check,
  AlertCircle,
  Loader,
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useClothing } from '../context/ClothingContext';

const TryOnPage = () => {
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get('item');
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentItem, setCurrentItem] = useState(null);
  const [sizeRecommendations, setSizeRecommendations] = useState(null);
  const [tryOnResult, setTryOnResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { currentUser, avatar } = useUser();
  const {
    loadClothingItem,
    tryOnItem,
    getSizeRecommendations,
    filteredItems,
  } = useClothing();

  useEffect(() => {
    if (itemId) {
      loadItem(itemId);
    } else if (filteredItems.length > 0) {
      // Use first available item if no specific item selected
      setCurrentItem(filteredItems[0]);
      setSelectedColor(filteredItems[0].colors[0]);
    }
  }, [itemId, filteredItems]);

  useEffect(() => {
    if (currentUser && currentItem && !sizeRecommendations) {
      loadSizeRecommendations();
    }
  }, [currentUser, currentItem]);

  const loadItem = async (id) => {
    try {
      const item = await loadClothingItem(id);
      setCurrentItem(item);
      setSelectedColor(item.colors[0]);
    } catch (error) {
      toast.error('Failed to load item');
    }
  };

  const loadSizeRecommendations = async () => {
    if (!currentUser || !currentItem) return;
    
    try {
      const recommendations = await getSizeRecommendations(currentUser.id, currentItem.id);
      setSizeRecommendations(recommendations);
      setSelectedSize(recommendations.recommendedSize);
    } catch (error) {
      console.error('Failed to load size recommendations:', error);
    }
  };

  const handleTryOn = async () => {
    if (!currentUser) {
      toast.error('Please complete onboarding first');
      return;
    }

    if (!currentItem || !selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }

    setIsLoading(true);
    try {
      const result = await tryOnItem(currentUser.id, currentItem.id, selectedSize, selectedColor);
      setTryOnResult(result);
      toast.success('Try-on generated successfully!');
    } catch (error) {
      toast.error('Failed to generate try-on');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Complete Your Profile First
          </h2>
          <p className="text-neutral-600 mb-6">
            You need to create your avatar to use virtual try-on.
          </p>
          <Link to="/onboarding" className="btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shirt className="w-8 h-8 text-neutral-500" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            No Item Selected
          </h2>
          <p className="text-neutral-600 mb-6">
            Please select an item from the catalog to try on.
          </p>
          <Link to="/catalog" className="btn-primary">
            Browse Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link
            to="/catalog"
            className="flex items-center text-neutral-600 hover:text-neutral-900 mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to Catalog
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900">
            Virtual Try-On
          </h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Product Info */}
          <div className="xl:col-span-1 space-y-6">
            <div className="card">
              <img
                src={currentItem.image}
                alt={currentItem.name}
                className="w-full h-80 object-cover rounded-t-xl"
              />
              
              <div className="card-body">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900">
                      {currentItem.name}
                    </h2>
                    <p className="text-neutral-600">{currentItem.brand}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">
                      ${currentItem.price}
                    </div>
                    <div className="flex items-center text-sm text-neutral-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      4.5
                    </div>
                  </div>
                </div>

                <p className="text-neutral-700 mb-4">{currentItem.description}</p>

                {/* Color Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Color
                  </label>
                  <div className="flex space-x-2">
                    {currentItem.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'border-primary-600 ring-2 ring-primary-200'
                            : 'border-neutral-300'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600 mt-1 capitalize">
                    Selected: {selectedColor}
                  </p>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-neutral-700">
                      Size
                    </label>
                    {sizeRecommendations && (
                      <span className="text-xs text-primary-600 font-medium">
                        Recommended: {sizeRecommendations.recommendedSize}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {currentItem.sizes.map((size) => {
                      const isRecommended = sizeRecommendations?.recommendedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`p-3 text-sm font-medium rounded-lg border-2 transition-all relative ${
                            selectedSize === size
                              ? 'border-primary-600 bg-primary-50 text-primary-700'
                              : 'border-neutral-300 text-neutral-700 hover:border-neutral-400'
                          }`}
                        >
                          {isRecommended && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="w-2 h-2 text-white" />
                            </div>
                          )}
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size Recommendations */}
                {sizeRecommendations && (
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <Ruler className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-primary-900 mb-1">
                          Size Recommendation
                        </h4>
                        <p className="text-sm text-primary-700 mb-2">
                          {sizeRecommendations.reasoning}
                        </p>
                        <div className="text-xs text-primary-600">
                          Confidence: {Math.round(sizeRecommendations.confidence * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Try On Button */}
                <button
                  onClick={handleTryOn}
                  disabled={!selectedSize || !selectedColor || isLoading}
                  className="w-full btn-primary py-4 text-lg flex items-center justify-center mb-4"
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Camera className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? 'Generating Try-On...' : 'Try It On'}
                </button>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 btn-outline text-sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </button>
                  <button className="flex-1 btn-outline text-sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </button>
                  <button className="flex-1 btn-secondary text-sm">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column - Avatar/Try-On */}
          <div className="xl:col-span-1">
            <div className="card">
              <div className="card-body">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4 text-center">
                  Virtual Try-On Preview
                </h3>
                
                <div className="relative">
                  <div className="aspect-w-3 aspect-h-4 rounded-xl overflow-hidden bg-neutral-100">
                    {tryOnResult ? (
                      <img
                        src={tryOnResult.previewUrl}
                        alt="Try-on preview"
                        className="w-full h-full object-cover"
                      />
                    ) : avatar ? (
                      <img
                        src={avatar.modelUrl}
                        alt="Your avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <Camera className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                          <p className="text-neutral-500">Select options and try on</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {tryOnResult && (
                    <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Try-On Active</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Fit Analysis */}
                {tryOnResult?.fit && (
                  <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                    <h4 className="font-medium text-neutral-900 mb-3 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-primary-600" />
                      Fit Analysis
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600">Overall Fit</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-neutral-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${tryOnResult.fit.score * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium capitalize">
                            {tryOnResult.fit.recommendation}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-neutral-600">
                        <ul className="space-y-1">
                          {tryOnResult.fit.notes.map((note, index) => (
                            <li key={index}>• {note}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Suggestions */}
          <div className="xl:col-span-1 space-y-6">
            <div className="card">
              <div className="card-body">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Complete the Look
                </h3>
                
                <div className="space-y-4">
                  {filteredItems
                    .filter(item => item.id !== currentItem.id)
                    .slice(0, 3)
                    .map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-neutral-900 text-sm">
                          {item.name}
                        </h4>
                        <p className="text-xs text-neutral-600">{item.brand}</p>
                        <p className="text-sm font-semibold text-primary-600">
                          ${item.price}
                        </p>
                      </div>
                      <Link
                        to={`/try-on?item=${item.id}`}
                        className="btn-outline text-xs px-3 py-2"
                      >
                        Try On
                      </Link>
                    </div>
                  ))}
                </div>

                <Link
                  to="/suggested-looks"
                  className="block w-full btn-secondary text-center mt-4"
                >
                  View All Suggestions
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <div className="card-body">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Quick Actions
                </h3>
                
                <div className="space-y-3">
                  <Link to="/catalog" className="block btn-outline text-center w-full">
                    Browse More Items
                  </Link>
                  <Link to="/avatar" className="block btn-outline text-center w-full">
                    View My Avatar
                  </Link>
                  <Link to="/suggested-looks" className="block btn-outline text-center w-full">
                    Style Suggestions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOnPage;