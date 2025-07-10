import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { clothingService } from '../services/clothingService';

const ClothingContext = createContext();

const initialState = {
  items: [],
  filteredItems: [],
  currentItem: null,
  categories: ['tops', 'bottoms', 'dresses', 'outerwear'],
  tryOnHistory: [],
  outfitSuggestions: [],
  isLoading: false,
  error: null,
  filters: {
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    size: '',
  },
};

function clothingReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
        filteredItems: action.payload,
        isLoading: false,
        error: null,
      };
    
    case 'SET_FILTERED_ITEMS':
      return { ...state, filteredItems: action.payload };
    
    case 'SET_CURRENT_ITEM':
      return { ...state, currentItem: action.payload };
    
    case 'ADD_TRY_ON':
      return {
        ...state,
        tryOnHistory: [action.payload, ...state.tryOnHistory.slice(0, 19)], // Keep last 20
      };
    
    case 'SET_OUTFIT_SUGGESTIONS':
      return { ...state, outfitSuggestions: action.payload };
    
    case 'UPDATE_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    case 'CLEAR_FILTERS':
      return { ...state, filters: initialState.filters };
    
    default:
      return state;
  }
}

export function ClothingProvider({ children }) {
  const [state, dispatch] = useReducer(clothingReducer, initialState);

  // Load clothing items on mount
  useEffect(() => {
    loadClothingItems();
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    applyFilters();
  }, [state.filters, state.items]);

  const loadClothingItems = async (filters = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await clothingService.getClothingItems(filters);
      dispatch({ type: 'SET_ITEMS', payload: response.data.items });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const loadClothingItem = async (itemId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await clothingService.getClothingItem(itemId);
      dispatch({ type: 'SET_CURRENT_ITEM', payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const tryOnItem = async (userId, itemId, size, color) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await clothingService.tryOnItem(userId, itemId, size, color);
      const tryOnResult = response.data.result;
      
      // Add to try-on history
      dispatch({ type: 'ADD_TRY_ON', payload: tryOnResult });
      
      return tryOnResult;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const getSizeRecommendations = async (userId, itemId) => {
    try {
      const response = await clothingService.getSizeRecommendations(userId, itemId);
      return response.data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const getOutfitSuggestions = async (userId, preferences = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await clothingService.getOutfitSuggestions(userId, preferences);
      dispatch({ type: 'SET_OUTFIT_SUGGESTIONS', payload: response.data.suggestions });
      return response.data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const updateFilters = (newFilters) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: newFilters });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const applyFilters = () => {
    let filtered = [...state.items];
    const { category, brand, minPrice, maxPrice, size } = state.filters;

    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }

    if (brand) {
      filtered = filtered.filter(item =>
        item.brand.toLowerCase().includes(brand.toLowerCase())
      );
    }

    if (minPrice) {
      filtered = filtered.filter(item => item.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(item => item.price <= parseFloat(maxPrice));
    }

    if (size) {
      filtered = filtered.filter(item => item.sizes.includes(size));
    }

    dispatch({ type: 'SET_FILTERED_ITEMS', payload: filtered });
  };

  const searchItems = (searchTerm) => {
    if (!searchTerm.trim()) {
      dispatch({ type: 'SET_FILTERED_ITEMS', payload: state.items });
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = state.items.filter(item =>
      item.name.toLowerCase().includes(searchLower) ||
      item.brand.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower)
    );

    dispatch({ type: 'SET_FILTERED_ITEMS', payload: filtered });
  };

  const value = {
    ...state,
    loadClothingItems,
    loadClothingItem,
    tryOnItem,
    getSizeRecommendations,
    getOutfitSuggestions,
    updateFilters,
    clearFilters,
    searchItems,
    clearError: () => dispatch({ type: 'SET_ERROR', payload: null }),
  };

  return (
    <ClothingContext.Provider value={value}>
      {children}
    </ClothingContext.Provider>
  );
}

export function useClothing() {
  const context = useContext(ClothingContext);
  if (!context) {
    throw new Error('useClothing must be used within a ClothingProvider');
  }
  return context;
}