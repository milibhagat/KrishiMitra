const CropsData = {
    // Crop database with detailed information
    crops: [
        {
            id: 'wheat',
            name: 'गेहूं (Wheat)',
            scientificName: 'Triticum aestivum',
            category: 'cereal',
            icon: 'fas fa-wheat-alt',
            color: '#DAA520',
            season: 'रबी (Rabi)',
            plantingTime: 'नवंबर-दिसंबर',
            harvestTime: 'अप्रैल-मई',
            duration: '120-150 दिन',
            baseYield: 40, // quintals per acre
            marketPrice: 2000, // per quintal
            soilSuitability: {
                black: 0.9,
                red: 0.7,
                alluvial: 1.0,
                sandy: 0.6,
                clay: 0.8,
                loamy: 1.0
            },
            waterRequirement: {
                high: 1.0,
                medium: 0.8,
                low: 0.5,
                rainfed: 0.4
            },
            climateZones: ['temperate', 'semi-arid'],
            description: 'भारत की मुख्य खाद्यान्न फसल',
            tips: [
                'बुआई से पहले बीज को उपचारित करें',
                'नियमित सिंचाई करें',
                'खरपतवार नियंत्रण आवश्यक',
                'दाना भरते समय पानी की कमी न होने दें'
            ]
        },
        {
            id: 'rice',
            name: 'धान (Rice)',
            scientificName: 'Oryza sativa',
            category: 'cereal',
            icon: 'fas fa-seedling',
            color: '#8FBC8F',
            season: 'खरीफ (Kharif)',
            plantingTime: 'जून-जुलाई',
            harvestTime: 'नवंबर-दिसंबर',
            duration: '120-140 दिन',
            baseYield: 50,
            marketPrice: 1800,
            soilSuitability: {
                black: 1.0,
                red: 0.6,
                alluvial: 1.0,
                sandy: 0.4,
                clay: 1.0,
                loamy: 0.9
            },
            waterRequirement: {
                high: 1.0,
                medium: 0.7,
                low: 0.3,
                rainfed: 0.8
            },
            climateZones: ['tropical', 'subtropical'],
            description: 'भारत की प्रमुख खाद्यान्न फसल',
            tips: [
                'रोपाई से पहले नर्सरी तैयार करें',
                'खेत में 2-3 इंच पानी बनाए रखें',
                'नियमित निराई-गुड़ाई करें',
                'फसल पकने पर पानी निकाल दें'
            ]
        },
        {
            id: 'cotton',
            name: 'कपास (Cotton)',
            scientificName: 'Gossypium',
            category: 'fiber',
            icon: 'fas fa-cloud',
            color: '#F5F5DC',
            season: 'खरीफ (Kharif)',
            plantingTime: 'मई-जून',
            harvestTime: 'सितंबर-जनवरी',
            duration: '180-200 दिन',
            baseYield: 15,
            marketPrice: 6000,
            soilSuitability: {
                black: 1.0,
                red: 0.8,
                alluvial: 0.7,
                sandy: 0.5,
                clay: 0.6,
                loamy: 0.8
            },
            waterRequirement: {
                high: 1.0,
                medium: 0.8,
                low: 0.4,
                rainfed: 0.6
            },
            climateZones: ['semi-arid', 'subtropical'],
            description: 'महत्वपूर्ण नकदी फसल',
            tips: [
                'गहरी जुताई करें',
                'कीट नियंत्रण पर विशेष ध्यान दें',
                'नियमित छिड़काव करें',
                'मिट्टी में नमी बनाए रखें'
            ]
        },
        {
            id: 'sugarcane',
            name: 'गन्ना (Sugarcane)',
            scientificName: 'Saccharum officinarum',
            category: 'cash',
            icon: 'fas fa-bamboo',
            color: '#32CD32',
            season: 'खरीफ/जायद',
            plantingTime: 'फरवरी-अप्रैल, अक्टूबर-नवंबर',
            harvestTime: '12-18 महीने बाद',
            duration: '365-450 दिन',
            baseYield: 400,
            marketPrice: 350,
            soilSuitability: {
                black: 0.9,
                red: 0.7,
                alluvial: 1.0,
                sandy: 0.6,
                clay: 0.8,
                loamy: 1.0
            },
            waterRequirement: {
                high: 1.0,
                medium: 0.8,
                low: 0.4,
                rainfed: 0.3
            },
            climateZones: ['tropical', 'subtropical'],
            description: 'चीनी उत्पादन की मुख्य फसल',
            tips: [
                'स्वस्थ बीज गन्ने का चयन करें',
                'नियमित सिंचाई आवश्यक',
                'खरपतवार नियंत्रण जरूरी',
                'मिट्टी चढ़ाना आवश्यक'
            ]
        },
        {
            id: 'maize',
            name: 'मक्का (Maize)',
            scientificName: 'Zea mays',
            category: 'cereal',
            icon: 'fas fa-corn',
            color: '#FFD700',
            season: 'खरीफ/रबी',
            plantingTime: 'जून-जुलाई, फरवरी-मार्च',
            harvestTime: '90-110 दिन',
            duration: '90-110 दिन',
            baseYield: 60,
            marketPrice: 1500,
            soilSuitability: {
                black: 0.8,
                red: 0.9,
                alluvial: 1.0,
                sandy: 0.7,
                clay: 0.6,
                loamy: 1.0
            },
            waterRequirement: {
                high: 1.0,
                medium: 0.9,
                low: 0.6,
                rainfed: 0.7
            },
            climateZones: ['tropical', 'temperate'],
            description: 'बहुउपयोगी फसल',
            tips: [
                'उचित अंतराल पर बुआई करें',
                'नियमित निराई-गुड़ाई करें',
                'कीड़ों से बचाव करें',
                'फूल आने के समय पानी की कमी न हो'
            ]
        },
        {
            id: 'soybean',
            name: 'सोयाबीन (Soybean)',
            scientificName: 'Glycine max',
            category: 'oilseed',
            icon: 'fas fa-leaf',
            color: '#90EE90',
            season: 'खरीफ (Kharif)',
            plantingTime: 'जून-जुलाई',
            harvestTime: 'सितंबर-अक्टूबर',
            duration: '95-110 दिन',
            baseYield: 25,
            marketPrice: 4000,
            soilSuitability: {
                black: 1.0,
                red: 0.8,
                alluvial: 0.9,
                sandy: 0.6,
                clay: 0.7,
                loamy: 1.0
            },
            waterRequirement: {
                high: 0.9,
                medium: 1.0,
                low: 0.6,
                rainfed: 0.8
            },
            climateZones: ['tropical', 'subtropical'],
            description: 'प्रोटीन युक्त तिलहनी फसल',
            tips: [
                'राइजोबियम से बीज उपचार करें',
                'जल निकासी की व्यवस्था करें',
                'फली भरते समय पानी दें',
                'कीट-रोग नियंत्रण करें'
            ]
        }
    ],

    // Get crop recommendations based on parameters
    getRecommendations(params) {
        const { location, weather, soilType, waterAvailability, farmSize } = params;
        
        return this.crops.map(crop => {
            let suitabilityScore = 0;
            
            // Soil suitability (40% weight)
            if (soilType && crop.soilSuitability[soilType]) {
                suitabilityScore += crop.soilSuitability[soilType] * 0.4;
            } else {
                suitabilityScore += 0.5 * 0.4; // Default neutral score
            }
            
            // Water availability (30% weight)
            if (waterAvailability && crop.waterRequirement[waterAvailability]) {
                suitabilityScore += crop.waterRequirement[waterAvailability] * 0.3;
            } else {
                suitabilityScore += 0.5 * 0.3;
            }
            
            // Weather conditions (20% weight)
            if (weather) {
                let weatherScore = 0.5;
                
                // Temperature suitability
                if (weather.temp >= 20 && weather.temp <= 35) {
                    weatherScore += 0.3;
                } else if (weather.temp >= 15 && weather.temp <= 40) {
                    weatherScore += 0.1;
                }
                
                // Humidity suitability
                if (weather.humidity >= 50 && weather.humidity <= 80) {
                    weatherScore += 0.2;
                }
                
                suitabilityScore += Math.min(weatherScore, 1.0) * 0.2;
            } else {
                suitabilityScore += 0.5 * 0.2;
            }
            
            // Market price factor (10% weight)
            const avgPrice = 3000;
            const priceScore = Math.min(crop.marketPrice / avgPrice, 1.5) * 0.1;
            suitabilityScore += priceScore;
            
            // Calculate expected yield
            const farmSizeNum = parseFloat(farmSize) || 1;
            const baseYield = crop.baseYield * farmSizeNum;
            const yieldMultiplier = suitabilityScore;
            const expectedYield = Math.round(baseYield * yieldMultiplier);
            
            return {
                ...crop,
                suitability: Math.round(suitabilityScore * 100),
                expectedYield,
                waterReq: this.getWaterRequirementText(crop, waterAvailability)
            };
        })
        .filter(crop => crop.suitability >= 30) // Filter out very low suitability crops
        .sort((a, b) => b.suitability - a.suitability) // Sort by suitability
        .slice(0, 6); // Return top 6 recommendations
    },

    // Get water requirement text
    getWaterRequirementText(crop, availability) {
        const requirements = {
            high: 'अधिक पानी',
            medium: 'मध्यम पानी',
            low: 'कम पानी',
            rainfed: 'वर्षा आधारित'
        };
        
        if (availability && crop.waterRequirement[availability] >= 0.8) {
            return requirements[availability] || 'मध्यम पानी';
        }
        
        // Find the best water requirement for this crop
        const bestReq = Object.keys(crop.waterRequirement)
            .reduce((a, b) => crop.waterRequirement[a] > crop.waterRequirement[b] ? a : b);
        
        return requirements[bestReq] || 'मध्यम पानी';
    },

    // Get crop by ID
    getCropById(id) {
        return this.crops.find(crop => crop.id === id);
    },

    // Get crops by category
    getCropsByCategory(category) {
        return this.crops.filter(crop => crop.category === category);
    },

    // Get crops by season
    getCropsBySeason(season) {
        return this.crops.filter(crop => 
            crop.season.toLowerCase().includes(season.toLowerCase())
        );
    },

    // Search crops
    searchCrops(query) {
        const lowerQuery = query.toLowerCase();
        return this.crops.filter(crop => 
            crop.name.toLowerCase().includes(lowerQuery) ||
            crop.scientificName.toLowerCase().includes(lowerQuery) ||
            crop.description.toLowerCase().includes(lowerQuery)
        );
    },

    // Get crop calendar
    getCropCalendar() {
        const calendar = {};
        
        this.crops.forEach(crop => {
            // Parse planting and harvest times
            const plantingMonths = this.parseMonths(crop.plantingTime);
            const harvestMonths = this.parseMonths(crop.harvestTime);
            
            plantingMonths.forEach(month => {
                if (!calendar[month]) calendar[month] = { planting: [], harvesting: [] };
                calendar[month].planting.push(crop);
            });
            
            harvestMonths.forEach(month => {
                if (!calendar[month]) calendar[month] = { planting: [], harvesting: [] };
                calendar[month].harvesting.push(crop);
            });
        });
        
        return calendar;
    },

    // Parse month names from time strings
    parseMonths(timeString) {
        const months = {
            'जनवरी': 1, 'फरवरी': 2, 'मार्च': 3, 'अप्रैल': 4,
            'मई': 5, 'जून': 6, 'जुलाई': 7, 'अगस्त': 8,
            'सितंबर': 9, 'अक्टूबर': 10, 'नवंबर': 11, 'दिसंबर': 12
        };
        
        const monthNumbers = [];
        Object.keys(months).forEach(month => {
            if (timeString.includes(month)) {
                monthNumbers.push(months[month]);
            }
        });
        
        return monthNumbers;
    },

    // Get seasonal recommendations
    getSeasonalRecommendations(month) {
        const currentMonth = month || new Date().getMonth() + 1;
        const calendar = this.getCropCalendar();
        
        return {
            planting: calendar[currentMonth]?.planting || [],
            harvesting: calendar[currentMonth]?.harvesting || []
        };
    },

    // Calculate crop rotation suggestions
    getCropRotationSuggestions(lastCrop) {
        const rotationPairs = {
            'wheat': ['maize', 'soybean', 'cotton'],
            'rice': ['wheat', 'mustard', 'gram'],
            'cotton': ['wheat', 'gram', 'mustard'],
            'soybean': ['wheat', 'mustard', 'gram'],
            'maize': ['wheat', 'mustard', 'gram'],
            'sugarcane': ['wheat', 'soybean'] // Sugarcane is typically grown for multiple years
        };
        
        const suggestions = rotationPairs[lastCrop] || [];
        return suggestions.map(id => this.getCropById(id)).filter(Boolean);
    },

    // Get market price trends (mock data)
    getMarketTrends(cropId, days = 30) {
        const crop = this.getCropById(cropId);
        if (!crop) return [];
        
        const trends = [];
        const basePrice = crop.marketPrice;
        
        for (let i = days; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            
            // Generate random price variation ±15%
            const variation = 0.85 + Math.random() * 0.3;
            const price = Math.round(basePrice * variation);
            
            trends.push({
                date: date.toISOString().split('T')[0],
                price,
                change: i === days ? 0 : price - trends[trends.length - 1]?.price || 0
            });
        }
        
        return trends;
    }
};

window.CropsData = CropsData;
