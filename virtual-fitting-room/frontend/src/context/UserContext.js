import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { userService } from '../services/userService';

const UserContext = createContext();

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
  hasCompletedOnboarding: false,
  avatar: null,
  photos: [],
  measurements: null,
};

function userReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'SET_USER':
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
        error: null,
        hasCompletedOnboarding: !!action.payload,
      };
    
    case 'UPDATE_MEASUREMENTS':
      return {
        ...state,
        measurements: action.payload,
        currentUser: state.currentUser ? {
          ...state.currentUser,
          ...action.payload
        } : null,
      };
    
    case 'SET_AVATAR':
      return {
        ...state,
        avatar: action.payload,
        currentUser: state.currentUser ? {
          ...state.currentUser,
          avatar: action.payload
        } : null,
      };
    
    case 'ADD_PHOTO':
      const updatedPhotos = [...state.photos, action.payload];
      return {
        ...state,
        photos: updatedPhotos,
        currentUser: state.currentUser ? {
          ...state.currentUser,
          photos: updatedPhotos
        } : null,
      };
    
    case 'CLEAR_USER':
      return initialState;
    
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Check for existing user session on app load
  useEffect(() => {
    const storedUserId = localStorage.getItem('vfr_user_id');
    if (storedUserId) {
      loadUser(storedUserId);
    }
  }, []);

  const createUser = async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await userService.createUser(userData);
      const userId = response.data.userId;
      
      // Store user ID in localStorage
      localStorage.setItem('vfr_user_id', userId);
      
      // Load the complete user data
      await loadUser(userId);
      
      return userId;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const loadUser = async (userId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await userService.getUser(userId);
      dispatch({ type: 'SET_USER', payload: response.data });
      
      // Set individual state properties
      if (response.data.avatar) {
        dispatch({ type: 'SET_AVATAR', payload: response.data.avatar });
      }
      if (response.data.photos) {
        response.data.photos.forEach(photo => {
          dispatch({ type: 'ADD_PHOTO', payload: photo });
        });
      }
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      // Clear invalid user ID from localStorage
      localStorage.removeItem('vfr_user_id');
    }
  };

  const updateMeasurements = async (measurements) => {
    if (!state.currentUser) {
      throw new Error('No user logged in');
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await userService.updateUser(state.currentUser.id, measurements);
      dispatch({ type: 'UPDATE_MEASUREMENTS', payload: measurements });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const uploadPhoto = async (file) => {
    if (!state.currentUser) {
      throw new Error('No user logged in');
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await userService.uploadPhoto(state.currentUser.id, file);
      dispatch({ type: 'ADD_PHOTO', payload: response.data.photo });
      return response.data.photo;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const generateAvatar = async () => {
    if (!state.currentUser) {
      throw new Error('No user logged in');
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await userService.generateAvatar(state.currentUser.id);
      dispatch({ type: 'SET_AVATAR', payload: response.data.avatar });
      return response.data.avatar;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const clearUser = () => {
    localStorage.removeItem('vfr_user_id');
    dispatch({ type: 'CLEAR_USER' });
  };

  const value = {
    ...state,
    createUser,
    loadUser,
    updateMeasurements,
    uploadPhoto,
    generateAvatar,
    clearUser,
    clearError: () => dispatch({ type: 'SET_ERROR', payload: null }),
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}