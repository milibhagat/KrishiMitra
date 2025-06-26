const APIService = {
    // Weather API configuration
    WEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || 'demo_key',
    WEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',

    // Get current weather
    async getWeather(lat, lng) {
        try {
            const response = await fetch(
                `${this.WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lng}&appid=${this.WEATHER_API_KEY}&units=metric&lang=hi`
            );
            
            if (!response.ok) {
                throw new Error('Weather API error');
            }
            
            const data = await response.json();
            
            return {
                temp: data.main.temp,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                windSpeed: data.wind.speed * 3.6, // Convert m/s to km/h
                visibility: data.visibility / 1000, // Convert m to km
                condition: data.weather[0].main.toLowerCase(),
                description: data.weather[0].description,
                icon: data.weather[0].icon
            };
        } catch (error) {
            console.error('Weather API error:', error);
            // Return mock data for development
            return this.getMockWeather();
        }
    },

    // Get weather forecast
    async getForecast(lat, lng) {
        try {
            const response = await fetch(
                `${this.WEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lng}&appid=${this.WEATHER_API_KEY}&units=metric&lang=hi`
            );
            
            if (!response.ok) {
                throw new Error('Forecast API error');
            }
            
            const data = await response.json();
            
            // Process forecast data to get daily forecasts
            const dailyForecasts = [];
            const processedDates = new Set();
            
            data.list.forEach(item => {
                const date = new Date(item.dt * 1000).toDateString();
                
                if (!processedDates.has(date) && dailyForecasts.length < 5) {
                    processedDates.add(date);
                    dailyForecasts.push({
                        date: new Date(item.dt * 1000),
                        condition: item.weather[0].main.toLowerCase(),
                        maxTemp: item.main.temp_max,
                        minTemp: item.main.temp_min,
                        rain: item.rain ? item.rain['3h'] || 0 : 0
                    });
                }
            });
            
            return dailyForecasts;
        } catch (error) {
            console.error('Forecast API error:', error);
            return this.getMockForecast();
        }
    },

    // Reverse geocoding
    async reverseGeocode(lat, lng) {
        try {
            const response = await fetch(
                `${this.WEATHER_BASE_URL.replace('/data/2.5', '')}/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${this.WEATHER_API_KEY}`
            );
            
            if (!response.ok) {
                throw new Error('Geocoding API error');
            }
            
            const data = await response.json();
            
            if (data.length > 0) {
                const location = data[0];
                return `${location.name}, ${location.state}, ${location.country}`;
            }
            
            return null;
        } catch (error) {
            console.error('Geocoding API error:', error);
            return null;
        }
    },

    // Mock weather data for development/offline mode
    getMockWeather() {
        const conditions = ['clear', 'clouds', 'rain', 'mist'];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        
        return {
            temp: Math.round(15 + Math.random() * 20), // 15-35°C
            humidity: Math.round(40 + Math.random() * 40), // 40-80%
            pressure: Math.round(1000 + Math.random() * 50), // 1000-1050 hPa
            windSpeed: Math.round(Math.random() * 20), // 0-20 km/h
            visibility: Math.round(5 + Math.random() * 10), // 5-15 km
            condition,
            description: this.getConditionDescription(condition),
            icon: '01d'
        };
    },

    // Mock forecast data for development/offline mode
    getMockForecast() {
        const forecast = [];
        const conditions = ['clear', 'clouds', 'rain', 'mist'];
        
        for (let i = 0; i < 5; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            
            const condition = conditions[Math.floor(Math.random() * conditions.length)];
            const baseTemp = 20 + Math.random() * 15;
            
            forecast.push({
                date,
                condition,
                maxTemp: Math.round(baseTemp + 5),
                minTemp: Math.round(baseTemp - 5),
                rain: condition === 'rain' ? Math.round(Math.random() * 20) : 0
            });
        }
        
        return forecast;
    },

    getConditionDescription(condition) {
        const descriptions = {
            'clear': 'साफ मौसम',
            'clouds': 'बादल छाए हुए',
            'rain': 'बारिश',
            'thunderstorm': 'आंधी-तूफान',
            'snow': 'बर्फबारी',
            'mist': 'धुंध',
            'fog': 'कोहरा'
        };
        
        return descriptions[condition] || 'सामान्य मौसम';
    },

    // Market price API (mock implementation)
    async getMarketPrices(crop) {
        try {
            // In a real implementation, this would call mandi APIs
            return this.getMockMarketPrices(crop);
        } catch (error) {
            console.error('Market price API error:', error);
            return this.getMockMarketPrices(crop);
        }
    },

    getMockMarketPrices(crop) {
        const basePrices = {
            'wheat': 2000,
            'rice': 1800,
            'cotton': 6000,
            'sugarcane': 350,
            'maize': 1500,
            'soybean': 4000,
            'mustard': 5000,
            'gram': 5500
        };
        
        const basePrice = basePrices[crop] || 2000;
        const variation = 0.8 + Math.random() * 0.4; // ±20% variation
        
        return Math.round(basePrice * variation);
    },

    // Disease detection API (mock implementation)
    async detectDisease(imageData) {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // In a real implementation, this would call AI/ML service
            return DiseasesData.getMockAnalysis();
        } catch (error) {
            console.error('Disease detection API error:', error);
            throw new Error('Disease detection failed');
        }
    },

    // Government schemes API (mock implementation)
    async getGovernmentSchemes() {
        try {
            // In a real implementation, this would call government APIs
            return this.getMockSchemes();
        } catch (error) {
            console.error('Government schemes API error:', error);
            return [];
        }
    },

    getMockSchemes() {
        return [
            {
                id: 'pmkisan',
                name: 'PM-KISAN योजना',
                description: 'किसानों को आर्थिक सहायता',
                amount: '₹6,000/वर्ष',
                status: 'active'
            },
            {
                id: 'pmfby',
                name: 'प्रधानमंत्री फसल बीमा योजना',
                description: 'फसल बीमा कवरेज',
                amount: '₹50,000 तक',
                status: 'active'
            }
        ];
    },

    // Utility function to check API availability
    async checkConnectivity() {
        try {
            const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=demo', {
                method: 'HEAD',
                timeout: 5000
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    },

    // Cache management
    getCachedData(key) {
        try {
            const cached = localStorage.getItem(`cache_${key}`);
            if (cached) {
                const data = JSON.parse(cached);
                if (data.expiry > Date.now()) {
                    return data.value;
                }
            }
        } catch (error) {
            console.error('Cache read error:', error);
        }
        return null;
    },

    setCachedData(key, value, ttlMinutes = 30) {
        try {
            const data = {
                value,
                expiry: Date.now() + (ttlMinutes * 60 * 1000)
            };
            localStorage.setItem(`cache_${key}`, JSON.stringify(data));
        } catch (error) {
            console.error('Cache write error:', error);
        }
    }
};

window.APIService = APIService;
