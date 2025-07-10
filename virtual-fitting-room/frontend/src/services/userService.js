import api, { createFormData } from './api';

export const userService = {
  // Create a new user with measurements
  createUser: (userData) => {
    return api.post('/api/users', userData);
  },

  // Get user by ID
  getUser: (userId) => {
    return api.get(`/api/users/${userId}`);
  },

  // Update user measurements
  updateUser: (userId, userData) => {
    return api.put(`/api/users/${userId}`, userData);
  },

  // Upload user photo
  uploadPhoto: (userId, file) => {
    const formData = createFormData({ photo: file });
    return api.post(`/api/users/${userId}/photos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Generate 3D avatar
  generateAvatar: (userId) => {
    return api.post(`/api/users/${userId}/avatar`);
  },

  // Get size recommendations for a specific item
  getSizeRecommendations: (userId, itemId) => {
    return api.get(`/api/users/${userId}/size-recommendations/${itemId}`);
  },

  // Get outfit suggestions
  getOutfitSuggestions: (userId, preferences = {}) => {
    const params = new URLSearchParams(preferences).toString();
    return api.get(`/api/users/${userId}/outfit-suggestions?${params}`);
  },
};