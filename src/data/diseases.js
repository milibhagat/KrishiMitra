const DiseasesData = {
    // Disease database with detailed information
    diseases: [
        {
            id: 'blast',
            name: 'धान का ब्लास्ट रोग',
            scientificName: 'Pyricularia oryzae',
            crops: ['rice'],
            severity: 'high',
            type: 'fungal',
            symptoms: [
                'पत्तियों पर भूरे धब्बे',
                'पत्तियों का पीला होना',
                'दानों का सूखना',
                'स्टेम पर काले धब्बे'
            ],
            causes: [
                'अत्यधिक नमी',
                'नाइट्रोजन की अधिकता',
                'खराब जल निकासी',
                'संक्रमित बीज'
            ],
            favorableConditions: {
                temperature: '25-28°C',
                humidity: '80-90%',
                weather: 'बारिश के बाद'
            }
        },
        {
            id: 'rust',
            name: 'गेहूं का रतुआ रोग',
            scientificName: 'Puccinia triticina',
            crops: ['wheat'],
            severity: 'medium',
            type: 'fungal',
            symptoms: [
                'पत्तियों पर लाल-भूरे धब्बे',
                'पत्तियों का पीला होना',
                'फसल की वृद्धि में कमी',
                'दानों का आकार छोटा होना'
            ],
            causes: [
                'नम मौसम',
                'ओस की अधिकता',
                'हवा द्वारा संक्रमण',
                'संवेदनशील किस्म'
            ],
            favorableConditions: {
                temperature: '15-22°C',
                humidity: '70-80%',
                weather: 'ओस और हल्की बारिश'
            }
        },
        {
            id: 'bollworm',
            name: 'कपास का बॉलवर्म',
            scientificName: 'Helicoverpa armigera',
            crops: ['cotton'],
            severity: 'high',
            type: 'insect',
            symptoms: [
                'फलियों में छेद',
                'कलियों का गिरना',
                'पत्तियों पर कीड़े',
                'फल का सड़ना'
            ],
            causes: [
                'अत्यधिक तापमान',
                'अनुवांशिक संवेदनशीलता',
                'प्राकृतिक शत्रुओं की कमी',
                'गलत कीटनाशक उपयोग'
            ],
            favorableConditions: {
                temperature: '25-35°C',
                humidity: '60-70%',
                weather: 'गर्म और शुष्क'
            }
        }
    ],

    // Treatment database
    treatments: [
        {
            id: 'neem_oil',
            name: 'नीम का तेल',
            type: 'organic',
            targetDiseases: ['bollworm', 'aphids', 'whitefly'],
            dosage: '2-3 मिली/लीटर पानी',
            application: 'छिड़काव - शाम के समय',
            effectiveness: 75,
            cost: 'कम',
            precautions: [
                'धूप में न छिड़कें',
                'फूल आने के समय न करें',
                '7-10 दिन के अंतराल से दोहराएं'
            ]
        },
        {
            id: 'bordeaux_mixture',
            name: 'बोर्डो मिश्रण',
            type: 'chemical',
            targetDiseases: ['blast', 'rust', 'blight'],
            dosage: '1% घोल',
            application: 'छिड़काव - सुबह या शाम',
            effectiveness: 85,
            cost: 'मध्यम',
            precautions: [
                'धातु के बर्तन में न मिलाएं',
                'ताजा घोल का उपयोग करें',
                'सुरक्षा उपकरण पहनें'
            ]
        },
        {
            id: 'trichoderma',
            name: 'ट्राइकोडर्मा',
            type: 'biological',
            targetDiseases: ['damping_off', 'root_rot', 'wilt'],
            dosage: '5-10 ग्राम/किलो बीज',
            application: 'बीज उपचार या मिट्टी में मिलाना',
            effectiveness: 70,
            cost: 'मध्यम',
            precautions: [
                'ठंडी जगह रखें',
                'एक्सपायरी डेट देखें',
                'रसायनों के साथ न मिलाएं'
            ]
        }
    ],

    // Prevention methods
    preventionMethods: [
        {
            id: 'crop_rotation',
            name: 'फसल चक्र',
            description: 'अलग-अलग फसलों का क्रमबद्ध उत्पादन',
            benefits: [
                'मिट्टी की उर्वरता बढ़ती है',
                'कीट-रोग का चक्र टूटता है',
                'खरपतवार नियंत्रण',
                'मिट्टी की संरचना सुधरती है'
            ],
            implementation: [
                'दलहनी-अनाज फसल का चक्र',
                '3-4 साल का चक्र बनाएं',
                'मिट्टी जांच के आधार पर योजना',
                'स्थानीय परिस्थितियों के अनुसार'
            ]
        },
        {
            id: 'resistant_varieties',
            name: 'प्रतिरोधी किस्में',
            description: 'रोग प्रतिरोधी बीजों का उपयोग',
            benefits: [
                'रसायनों की कम आवश्यकता',
                'अधिक उत्पादन',
                'लागत में कमी',
                'पर्यावरण सुरक्षा'
            ],
            implementation: [
                'स्थानीय कृषि विभाग से सलाह',
                'प्रमाणित बीज का उपयोग',
                'क्षेत्रीय परीक्षण करें',
                'किसान अनुभव जानें'
            ]
        }
    ],

    // Get mock analysis result
    getMockAnalysis() {
        const scenarios = [
            {
                healthStatus: 'disease',
                status: 'रोग की पहचान हुई',
                confidence: 85,
                disease: {
                    name: 'पत्ती का धब्बा रोग',
                    description: 'फंगल इंफेक्शन के कारण पत्तियों पर भूरे धब्बे दिखाई दे रहे हैं।'
                },
                treatments: [
                    {
                        name: 'नीम का तेल स्प्रे',
                        type: 'organic',
                        description: 'प्राकृतिक कीटनाशक जो फंगल इंफेक्शन को नियंत्रित करता है',
                        dosage: '2-3 मिली प्रति लीटर पानी',
                        application: 'शाम के समय छिड़काव करें, सप्ताह में 2 बार'
                    },
                    {
                        name: 'बोर्डो मिश्रण',
                        type: 'chemical',
                        description: 'तांबा आधारित फंगीसाइड',
                        dosage: '1% घोल',
                        application: 'सुबह या शाम छिड़काव, 10 दिन के अंतराल से'
                    }
                ],
                prevention: [
                    'नियमित निरीक्षण करें',
                    'पानी पत्तियों पर न गिरने दें',
                    'हवा के संचार की व्यवस्था करें',
                    'संक्रमित पत्तियों को हटा दें',
                    'स्वच्छता बनाए रखें'
                ]
            },
            {
                healthStatus: 'warning',
                status: 'कीट संक्रमण की शुरुआत',
                confidence: 78,
                disease: {
                    name: 'एफिड (माहू) संक्रमण',
                    description: 'पत्तियों पर छोटे हरे कीड़े दिखाई दे रहे हैं जो पौधे का रस चूसते हैं।'
                },
                treatments: [
                    {
                        name: 'साबुन का पानी',
                        type: 'organic',
                        description: 'प्राकृतिक कीट नियंत्रण',
                        dosage: '1 चम्मच साबुन प्रति लीटर पानी',
                        application: 'प्रभावित भागों पर सीधा छिड़काव'
                    },
                    {
                        name: 'लहसुन-मिर्च का घोल',
                        type: 'organic',
                        description: 'प्राकृतिक कीट प्रतिरोधी',
                        dosage: '50 ग्राम लहसुन + 10 ग्राम मिर्च प्रति लीटर',
                        application: 'पत्तियों के नीचे की तरफ छिड़काव'
                    }
                ],
                prevention: [
                    'नियमित पानी की धार से सफाई',
                    'लाभकारी कीड़ों को बढ़ावा दें',
                    'पीली चिपचिपी पट्टी लगाएं',
                    'खरपतवार नियंत्रण करें'
                ]
            },
            {
                healthStatus: 'healthy',
                status: 'फसल स्वस्थ है',
                confidence: 92,
                disease: null,
                treatments: [],
                prevention: [
                    'नियमित निरीक्षण जारी रखें',
                    'संतुलित खाद का उपयोग करें',
                    'उचित सिंचाई करें',
                    'स्वच्छता बनाए रखें',
                    'मौसम के अनुसार देखभाल करें'
                ]
            }
        ];

        // Randomly select a scenario
        const randomIndex = Math.floor(Math.random() * scenarios.length);
        return scenarios[randomIndex];
    },

    // Get disease by ID
    getDiseaseById(id) {
        return this.diseases.find(disease => disease.id === id);
    },

    // Get diseases by crop
    getDiseasesByCrop(crop) {
        return this.diseases.filter(disease => 
            disease.crops.includes(crop.toLowerCase())
        );
    },

    // Get treatment by ID
    getTreatmentById(id) {
        return this.treatments.find(treatment => treatment.id === id);
    },

    // Get treatments for disease
    getTreatmentsForDisease(diseaseId) {
        return this.treatments.filter(treatment => 
            treatment.targetDiseases.includes(diseaseId)
        );
    },

    // Search diseases
    searchDiseases(query) {
        const lowerQuery = query.toLowerCase();
        return this.diseases.filter(disease => 
            disease.name.toLowerCase().includes(lowerQuery) ||
            disease.symptoms.some(symptom => 
                symptom.toLowerCase().includes(lowerQuery)
            )
        );
    },

    // Get seasonal disease alerts
    getSeasonalAlerts(month, crop) {
        const alerts = [];
        
        // Mock seasonal alerts based on month and crop
        if (crop === 'rice' && [6, 7, 8].includes(month)) {
            alerts.push({
                type: 'warning',
                disease: 'blast',
                message: 'धान के ब्लास्ट रोग का खतरा बढ़ा है',
                recommendation: 'नियमित निरीक्षण करें और नम जगहों पर विशेष ध्यान दें'
            });
        }
        
        if (crop === 'wheat' && [12, 1, 2].includes(month)) {
            alerts.push({
                type: 'info',
                disease: 'rust',
                message: 'गेहूं में रतुआ रोग की संभावना',
                recommendation: 'ओस और नमी के समय छिड़काव से बचें'
            });
        }
        
        if (crop === 'cotton' && [8, 9, 10].includes(month)) {
            alerts.push({
                type: 'danger',
                disease: 'bollworm',
                message: 'कपास में बॉलवर्म का प्रकोप संभावित',
                recommendation: 'नियमित फसल निरीक्षण और जैविक नियंत्रण का उपयोग करें'
            });
        }
        
        return alerts;
    },

    // Disease severity calculator
    calculateSeverity(symptoms, environmental) {
        let severity = 0;
        
        // Symptom-based severity
        symptoms.forEach(symptom => {
            switch(symptom.toLowerCase()) {
                case 'wilting':
                case 'मुरझाना':
                    severity += 30;
                    break;
                case 'yellowing':
                case 'पीला होना':
                    severity += 20;
                    break;
                case 'spots':
                case 'धब्बे':
                    severity += 15;
                    break;
                case 'holes':
                case 'छेद':
                    severity += 25;
                    break;
                default:
                    severity += 10;
            }
        });
        
        // Environmental factors
        if (environmental) {
            if (environmental.humidity > 80) severity += 10;
            if (environmental.temperature > 35) severity += 10;
            if (environmental.rainfall > 100) severity += 15;
        }
        
        return Math.min(severity, 100);
    },

    // Treatment effectiveness predictor
    predictTreatmentEffectiveness(diseaseId, treatmentId, conditions) {
        const disease = this.getDiseaseById(diseaseId);
        const treatment = this.getTreatmentById(treatmentId);
        
        if (!disease || !treatment) return 0;
        
        let effectiveness = treatment.effectiveness;
        
        // Adjust based on conditions
        if (conditions) {
            if (conditions.stage === 'early') effectiveness += 10;
            if (conditions.stage === 'late') effectiveness -= 20;
            if (conditions.weather === 'favorable') effectiveness += 5;
            if (conditions.weather === 'unfavorable') effectiveness -= 10;
        }
        
        return Math.max(Math.min(effectiveness, 100), 0);
    },

    // Generate disease report
    generateDiseaseReport(cropType, location, season) {
        const cropDiseases = this.getDiseasesByCrop(cropType);
        const currentMonth = new Date().getMonth() + 1;
        const seasonalAlerts = this.getSeasonalAlerts(currentMonth, cropType);
        
        return {
            crop: cropType,
            location,
            season,
            totalDiseases: cropDiseases.length,
            highRiskDiseases: cropDiseases.filter(d => d.severity === 'high'),
            seasonalAlerts,
            recommendations: [
                'नियमित फसल निरीक्षण करें',
                'प्रतिरोधी किस्मों का उपयोग करें',
                'एकीकृत कीट प्रबंधन अपनाएं',
                'स्वच्छता बनाए रखें'
            ],
            generatedAt: new Date().toISOString()
        };
    }
};

window.DiseasesData = DiseasesData;
