import api from './api';

export const clothingService = {
  // Get all clothing items with optional filters
  getClothingItems: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return api.get(`/api/clothing?${params}`);
  },

  // Get specific clothing item
  getClothingItem: (itemId) => {
    return api.get(`/api/clothing/${itemId}`);
  },

  // Virtual try-on
  tryOnItem: (userId, itemId, size, color) => {
    return api.post('/api/try-on', {
      userId,
      itemId,
      size,
      color,
    });
  },

  // Get size recommendations
  getSizeRecommendations: (userId, itemId) => {
    return api.get(`/api/users/${userId}/size-recommendations/${itemId}`);
  },

  // Get outfit suggestions
  getOutfitSuggestions: (userId, preferences = {}) => {
    const params = new URLSearchParams(preferences).toString();
    return api.get(`/api/users/${userId}/outfit-suggestions?${params}`);
  },

  // External API integrations
  getShopifyProducts: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return api.get(`/api/external/shopify/products?${queryParams}`);
  },

  getAmazonProducts: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return api.get(`/api/external/amazon/products?${queryParams}`);
  },
};