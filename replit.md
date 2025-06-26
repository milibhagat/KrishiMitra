# KrishiMitra - Farmer's Friend

## Overview

KrishiMitra is a mobile-first progressive web application designed to assist farmers in India with smart agricultural decisions. The application provides AI-powered crop recommendations, disease detection, weather advisories, and educational resources in multiple Indian languages. Built with a focus on accessibility and offline functionality, it serves as a comprehensive farming companion.

## System Architecture

The application follows a client-server architecture with a simple backend and a React-based frontend:

### Frontend Architecture
- **Technology Stack**: React 18 (via CDN), HTML5, CSS3, Bootstrap 5
- **Architecture Pattern**: Component-based single-page application
- **Mobile-First Design**: Responsive design optimized for mobile devices (max-width: 480px)
- **Progressive Web App**: Designed to work offline with local storage capabilities
- **Multilingual Support**: Built-in translation system supporting Hindi, English, Marathi, Punjabi, Gujarati, and Tamil

### Backend Architecture
- **Technology Stack**: Node.js with Express.js
- **Port Configuration**: Server runs on port 8000 (configurable via environment)
- **Blockchain Integration**: Custom agricultural blockchain implementation for data integrity
- **API Structure**: RESTful endpoints for weather data, crop recommendations, and farm records

## Key Components

### Core Modules
1. **Crop Recommendation Engine** (`CropRecommendation.js`)
   - Location-based crop suggestions
   - Soil type and water availability analysis
   - Market price integration
   - Seasonal timing recommendations

2. **Disease Detection System** (`DiseaseDetection.js`)
   - Image-based plant disease identification
   - AI-powered analysis simulation
   - Treatment recommendations
   - Prevention strategies

3. **Weather Advisory** (`WeatherAdvisory.js`)
   - Real-time weather data integration
   - Farming-specific weather alerts
   - Irrigation scheduling
   - Harvest timing recommendations

4. **Community Platform** (`Community.js`)
   - Farmer-to-farmer knowledge sharing
   - Expert consultations
   - Success story sharing
   - Q&A forums

5. **Educational Resources** (`Education.js`)
   - Farming technique tutorials
   - Best practices guides
   - Video content integration
   - Categorized learning materials

### Supporting Systems
- **Location Services** (`LocationPicker.js`): GPS-based location detection with manual fallback
- **Storage Management** (`storage.js`): Local storage abstraction for offline functionality
- **Translation System** (`translations.js`): Comprehensive multilingual support
- **API Integration** (`api.js`): Weather data and external service integration

## Data Flow

1. **User Location**: GPS coordinates or manual input → stored locally
2. **Weather Data**: Location → OpenWeather API → local caching → farming advisories
3. **Crop Recommendations**: Location + soil + weather → algorithm → ranked suggestions
4. **Disease Detection**: Image upload → AI simulation → diagnosis + treatment
5. **Community Data**: User posts → local storage → community feed
6. **Educational Content**: Static data → categorized display → progress tracking

## External Dependencies

### APIs and Services
- **OpenWeather API**: Weather data and forecasts
- **Geolocation API**: Browser-based location services
- **Camera API**: Disease detection image capture

### CDN Resources
- **React 18**: Core framework
- **Bootstrap 5**: UI components and responsive design
- **Font Awesome 6**: Icon library

### Node.js Packages
- **Express.js**: Web server framework
- **CORS**: Cross-origin resource sharing
- **Crypto**: Blockchain hash generation

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 module
- **Workflow**: Automated startup with npm install and server execution
- **Port Mapping**: Internal port 8000 mapped to external port 80

### Production Considerations
- **Static File Serving**: Express serves frontend files directly
- **Database**: Currently file-based, designed for easy PostgreSQL integration
- **Scalability**: Prepared for cloud deployment with environment-based configuration

### Mobile Optimization
- **PWA Features**: Service worker ready for offline functionality
- **Touch Interface**: Mobile-optimized UI components
- **Performance**: Minimized bundle size with CDN resources

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 26, 2025. Initial setup