const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files
app.use(express.static('.'));

// Simple Blockchain Implementation for Agriculture
class AgriBlock {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
            .digest('hex');
    }

    mineBlock(difficulty) {
        const target = Array(difficulty + 1).join('0');
        
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log(`Block mined: ${this.hash}`);
    }
}

class AgriChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
        this.farmers = new Map();
        this.crops = new Map();
        this.supplyChain = new Map();
    }

    createGenesisBlock() {
        const genesisData = {
            type: 'genesis',
            message: 'KrishiMitra Agriculture Blockchain Genesis Block',
            timestamp: new Date().toISOString()
        };
        return new AgriBlock(0, new Date().toISOString(), genesisData, '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    // Register a farmer on the blockchain
    registerFarmer(farmerData) {
        const farmerId = crypto.randomUUID();
        const timestamp = new Date().toISOString();
        
        const farmer = {
            id: farmerId,
            name: farmerData.name,
            location: farmerData.location,
            mobile: farmerData.mobile,
            farmSize: farmerData.farmSize,
            aadhar: farmerData.aadhar ? crypto.createHash('sha256').update(farmerData.aadhar).digest('hex') : null,
            verified: false,
            registrationDate: timestamp,
            crops: [],
            certifications: []
        };

        this.farmers.set(farmerId, farmer);

        // Add to blockchain
        const blockData = {
            type: 'farmer_registration',
            farmerId,
            farmerName: farmer.name,
            location: farmer.location,
            timestamp
        };

        const newBlock = new AgriBlock(
            this.chain.length,
            timestamp,
            blockData,
            this.getLatestBlock().hash
        );

        this.addBlock(newBlock);

        return farmerId;
    }

    // Record crop cultivation
    recordCropCultivation(farmerId, cropData) {
        if (!this.farmers.has(farmerId)) {
            throw new Error('Farmer not registered');
        }

        const cropId = crypto.randomUUID();
        const timestamp = new Date().toISOString();

        const crop = {
            id: cropId,
            farmerId,
            cropType: cropData.cropType,
            variety: cropData.variety,
            plantingDate: cropData.plantingDate,
            expectedHarvestDate: cropData.expectedHarvestDate,
            area: cropData.area,
            seedSource: cropData.seedSource,
            organic: cropData.organic || false,
            fertilizers: cropData.fertilizers || [],
            pesticides: cropData.pesticides || [],
            irrigationMethod: cropData.irrigationMethod,
            soilType: cropData.soilType,
            status: 'planted',
            timestamp
        };

        this.crops.set(cropId, crop);

        // Update farmer's crops
        const farmer = this.farmers.get(farmerId);
        farmer.crops.push(cropId);
        this.farmers.set(farmerId, farmer);

        // Add to blockchain
        const blockData = {
            type: 'crop_cultivation',
            cropId,
            farmerId,
            cropType: crop.cropType,
            area: crop.area,
            organic: crop.organic,
            timestamp
        };

        const newBlock = new AgriBlock(
            this.chain.length,
            timestamp,
            blockData,
            this.getLatestBlock().hash
        );

        this.addBlock(newBlock);

        return cropId;
    }

    // Record harvest
    recordHarvest(cropId, harvestData) {
        if (!this.crops.has(cropId)) {
            throw new Error('Crop not found');
        }

        const crop = this.crops.get(cropId);
        const timestamp = new Date().toISOString();

        crop.harvestDate = harvestData.harvestDate;
        crop.yield = harvestData.yield;
        crop.quality = harvestData.quality;
        crop.status = 'harvested';
        crop.harvestTimestamp = timestamp;

        this.crops.set(cropId, crop);

        // Add to blockchain
        const blockData = {
            type: 'harvest',
            cropId,
            farmerId: crop.farmerId,
            yield: harvestData.yield,
            quality: harvestData.quality,
            timestamp
        };

        const newBlock = new AgriBlock(
            this.chain.length,
            timestamp,
            blockData,
            this.getLatestBlock().hash
        );

        this.addBlock(newBlock);

        return crop;
    }

    // Record sale transaction
    recordSale(cropId, saleData) {
        if (!this.crops.has(cropId)) {
            throw new Error('Crop not found');
        }

        const crop = this.crops.get(cropId);
        const timestamp = new Date().toISOString();
        const saleId = crypto.randomUUID();

        const sale = {
            id: saleId,
            cropId,
            farmerId: crop.farmerId,
            buyerName: saleData.buyerName,
            buyerContact: saleData.buyerContact,
            quantity: saleData.quantity,
            pricePerUnit: saleData.pricePerUnit,
            totalAmount: saleData.quantity * saleData.pricePerUnit,
            saleDate: saleData.saleDate,
            paymentMethod: saleData.paymentMethod,
            qualityCertificate: saleData.qualityCertificate,
            timestamp
        };

        // Update crop status
        crop.status = 'sold';
        crop.saleInfo = sale;
        this.crops.set(cropId, crop);

        // Add to supply chain tracking
        this.supplyChain.set(saleId, {
            ...sale,
            currentLocation: saleData.buyerLocation || 'Unknown',
            trackingHistory: [
                {
                    location: crop.farmerId,
                    timestamp: crop.timestamp,
                    status: 'planted'
                },
                {
                    location: crop.farmerId,
                    timestamp: crop.harvestTimestamp,
                    status: 'harvested'
                },
                {
                    location: saleData.buyerLocation || 'Market',
                    timestamp,
                    status: 'sold'
                }
            ]
        });

        // Add to blockchain
        const blockData = {
            type: 'sale',
            saleId,
            cropId,
            farmerId: crop.farmerId,
            quantity: sale.quantity,
            totalAmount: sale.totalAmount,
            timestamp
        };

        const newBlock = new AgriBlock(
            this.chain.length,
            timestamp,
            blockData,
            this.getLatestBlock().hash
        );

        this.addBlock(newBlock);

        return sale;
    }

    // Verify organic certification
    issueOrganicCertificate(farmerId, cropId, certificationData) {
        if (!this.farmers.has(farmerId) || !this.crops.has(cropId)) {
            throw new Error('Farmer or crop not found');
        }

        const certificateId = crypto.randomUUID();
        const timestamp = new Date().toISOString();

        const certificate = {
            id: certificateId,
            farmerId,
            cropId,
            certifyingBody: certificationData.certifyingBody,
            certificateNumber: certificationData.certificateNumber,
            issueDate: certificationData.issueDate,
            expiryDate: certificationData.expiryDate,
            standards: certificationData.standards || ['Organic'],
            verified: true,
            timestamp
        };

        // Update farmer certifications
        const farmer = this.farmers.get(farmerId);
        farmer.certifications.push(certificateId);
        this.farmers.set(farmerId, farmer);

        // Update crop as certified organic
        const crop = this.crops.get(cropId);
        crop.organicCertified = true;
        crop.certificate = certificateId;
        this.crops.set(cropId, crop);

        // Add to blockchain
        const blockData = {
            type: 'organic_certification',
            certificateId,
            farmerId,
            cropId,
            certifyingBody: certificate.certifyingBody,
            timestamp
        };

        const newBlock = new AgriBlock(
            this.chain.length,
            timestamp,
            blockData,
            this.getLatestBlock().hash
        );

        this.addBlock(newBlock);

        return certificate;
    }

    // Get farmer information
    getFarmer(farmerId) {
        return this.farmers.get(farmerId);
    }

    // Get crop information
    getCrop(cropId) {
        return this.crops.get(cropId);
    }

    // Get supply chain tracking
    trackSupplyChain(saleId) {
        return this.supplyChain.get(saleId);
    }

    // Verify blockchain integrity
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    // Get blockchain statistics
    getBlockchainStats() {
        return {
            totalBlocks: this.chain.length,
            totalFarmers: this.farmers.size,
            totalCrops: this.crops.size,
            totalSales: this.supplyChain.size,
            isValid: this.isChainValid(),
            latestBlock: this.getLatestBlock()
        };
    }

    // Search transactions by farmer
    getTransactionsByFarmer(farmerId) {
        return this.chain.filter(block => 
            block.data.farmerId === farmerId
        ).map(block => ({
            type: block.data.type,
            timestamp: block.timestamp,
            data: block.data,
            blockHash: block.hash
        }));
    }
}

// Initialize blockchain
const agriChain = new AgriChain();

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'KrishiMitra Backend',
        blockchain: agriChain.getBlockchainStats(),
        timestamp: new Date().toISOString()
    });
});

// Blockchain routes
app.get('/api/blockchain/stats', (req, res) => {
    res.json(agriChain.getBlockchainStats());
});

app.get('/api/blockchain/verify', (req, res) => {
    res.json({
        valid: agriChain.isChainValid(),
        timestamp: new Date().toISOString()
    });
});

// Farmer registration
app.post('/api/farmers/register', (req, res) => {
    try {
        const farmerId = agriChain.registerFarmer(req.body);
        res.json({
            success: true,
            farmerId,
            message: 'Farmer registered successfully on blockchain'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/api/farmers/:farmerId', (req, res) => {
    const farmer = agriChain.getFarmer(req.params.farmerId);
    if (!farmer) {
        return res.status(404).json({
            success: false,
            error: 'Farmer not found'
        });
    }
    res.json({
        success: true,
        farmer
    });
});

// Crop cultivation
app.post('/api/crops/cultivate', (req, res) => {
    try {
        const { farmerId, ...cropData } = req.body;
        const cropId = agriChain.recordCropCultivation(farmerId, cropData);
        res.json({
            success: true,
            cropId,
            message: 'Crop cultivation recorded on blockchain'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/api/crops/:cropId', (req, res) => {
    const crop = agriChain.getCrop(req.params.cropId);
    if (!crop) {
        return res.status(404).json({
            success: false,
            error: 'Crop not found'
        });
    }
    res.json({
        success: true,
        crop
    });
});

// Harvest recording
app.post('/api/crops/:cropId/harvest', (req, res) => {
    try {
        const crop = agriChain.recordHarvest(req.params.cropId, req.body);
        res.json({
            success: true,
            crop,
            message: 'Harvest recorded on blockchain'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Sale recording
app.post('/api/crops/:cropId/sale', (req, res) => {
    try {
        const sale = agriChain.recordSale(req.params.cropId, req.body);
        res.json({
            success: true,
            sale,
            message: 'Sale recorded on blockchain'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Organic certification
app.post('/api/certificates/organic', (req, res) => {
    try {
        const { farmerId, cropId, ...certificationData } = req.body;
        const certificate = agriChain.issueOrganicCertificate(farmerId, cropId, certificationData);
        res.json({
            success: true,
            certificate,
            message: 'Organic certificate issued and recorded on blockchain'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Supply chain tracking
app.get('/api/track/:saleId', (req, res) => {
    const tracking = agriChain.trackSupplyChain(req.params.saleId);
    if (!tracking) {
        return res.status(404).json({
            success: false,
            error: 'Sale/tracking record not found'
        });
    }
    res.json({
        success: true,
        tracking
    });
});

// Farmer transaction history
app.get('/api/farmers/:farmerId/transactions', (req, res) => {
    try {
        const transactions = agriChain.getTransactionsByFarmer(req.params.farmerId);
        res.json({
            success: true,
            transactions
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Weather API integration
app.get('/api/weather/:lat/:lng', async (req, res) => {
    try {
        const { lat, lng } = req.params;
        const apiKey = process.env.OPENWEATHER_API_KEY || 'demo_key';
        
        if (apiKey === 'demo_key') {
            // Return mock data if no API key
            res.json({
                success: true,
                data: {
                    temp: Math.round(15 + Math.random() * 20),
                    humidity: Math.round(40 + Math.random() * 40),
                    pressure: Math.round(1000 + Math.random() * 50),
                    windSpeed: Math.round(Math.random() * 20),
                    visibility: Math.round(5 + Math.random() * 10),
                    condition: 'clear',
                    description: 'साफ मौसम',
                    icon: '01d'
                }
            });
            return;
        }

        const fetch = require('node-fetch');
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric&lang=hi`
        );
        
        if (!response.ok) {
            throw new Error('Weather API error');
        }
        
        const data = await response.json();
        
        res.json({
            success: true,
            data: {
                temp: data.main.temp,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                windSpeed: data.wind.speed * 3.6,
                visibility: data.visibility / 1000,
                condition: data.weather[0].main.toLowerCase(),
                description: data.weather[0].description,
                icon: data.weather[0].icon
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Market prices API
app.get('/api/market/prices/:crop', (req, res) => {
    const { crop } = req.params;
    
    // Mock market prices
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
    
    const basePrice = basePrices[crop.toLowerCase()] || 2000;
    const variation = 0.8 + Math.random() * 0.4; // ±20% variation
    const currentPrice = Math.round(basePrice * variation);
    
    // Generate price trend (last 30 days)
    const trend = [];
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dailyVariation = 0.9 + Math.random() * 0.2;
        const price = Math.round(basePrice * dailyVariation);
        
        trend.push({
            date: date.toISOString().split('T')[0],
            price,
            change: i === 30 ? 0 : price - (trend[trend.length - 1]?.price || price)
        });
    }
    
    res.json({
        success: true,
        data: {
            crop: crop.toLowerCase(),
            currentPrice,
            basePrice,
            trend,
            lastUpdated: new Date().toISOString()
        }
    });
});

// Image upload and disease detection mock
app.post('/api/disease/detect', async (req, res) => {
    try {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock disease detection scenarios
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
                    }
                ],
                prevention: [
                    'नियमित निरीक्षण करें',
                    'पानी पत्तियों पर न गिरने दें',
                    'हवा के संचार की व्यवस्था करें'
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
                    'उचित सिंचाई करें'
                ]
            }
        ];
        
        const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        
        res.json({
            success: true,
            analysis: randomScenario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// File upload handling
app.post('/api/upload', async (req, res) => {
    try {
        // In a real implementation, you would save the file and process it
        // For now, we'll just return a success response
        res.json({
            success: true,
            message: 'File uploaded successfully',
            fileId: crypto.randomUUID()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Smart contract simulation for crop insurance
app.post('/api/insurance/claim', (req, res) => {
    try {
        const { farmerId, cropId, claimData } = req.body;
        
        // Simulate smart contract execution
        const claimId = crypto.randomUUID();
        const timestamp = new Date().toISOString();
        
        // Mock claim assessment
        const assessment = {
            id: claimId,
            farmerId,
            cropId,
            claimAmount: claimData.claimAmount,
            damageType: claimData.damageType,
            damagePercentage: claimData.damagePercentage,
            weatherData: claimData.weatherData,
            approved: claimData.damagePercentage >= 30, // Auto-approve if damage > 30%
            payoutAmount: claimData.damagePercentage >= 30 ? 
                Math.round(claimData.claimAmount * (claimData.damagePercentage / 100)) : 0,
            processedAt: timestamp
        };
        
        // Record on blockchain
        const blockData = {
            type: 'insurance_claim',
            claimId,
            farmerId,
            cropId,
            approved: assessment.approved,
            payoutAmount: assessment.payoutAmount,
            timestamp
        };
        
        const newBlock = new AgriBlock(
            agriChain.chain.length,
            timestamp,
            blockData,
            agriChain.getLatestBlock().hash
        );
        
        agriChain.addBlock(newBlock);
        
        res.json({
            success: true,
            assessment,
            message: assessment.approved ? 
                'Claim approved and recorded on blockchain' : 
                'Claim rejected - damage threshold not met'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Government scheme verification
app.post('/api/schemes/verify', (req, res) => {
    try {
        const { farmerId, schemeId, applicationData } = req.body;
        
        if (!agriChain.getFarmer(farmerId)) {
            return res.status(404).json({
                success: false,
                error: 'Farmer not registered on blockchain'
            });
        }
        
        const verificationId = crypto.randomUUID();
        const timestamp = new Date().toISOString();
        
        // Mock verification process
        const verification = {
            id: verificationId,
            farmerId,
            schemeId,
            applicationData,
            verified: true,
            eligibilityScore: Math.round(70 + Math.random() * 30), // 70-100%
            documentsVerified: true,
            blockchainVerified: true,
            approvedAmount: applicationData.requestedAmount || 0,
            verifiedAt: timestamp
        };
        
        // Record on blockchain
        const blockData = {
            type: 'scheme_verification',
            verificationId,
            farmerId,
            schemeId,
            verified: verification.verified,
            approvedAmount: verification.approvedAmount,
            timestamp
        };
        
        const newBlock = new AgriBlock(
            agriChain.chain.length,
            timestamp,
            blockData,
            agriChain.getLatestBlock().hash
        );
        
        agriChain.addBlock(newBlock);
        
        res.json({
            success: true,
            verification,
            message: 'Scheme application verified and recorded on blockchain'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Serve the main app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌱 KrishiMitra Server running on http://0.0.0.0:${PORT}`);
    console.log(`📊 Blockchain initialized with ${agriChain.chain.length} blocks`);
    console.log(`🔗 Blockchain integrity: ${agriChain.isChainValid() ? 'Valid' : 'Invalid'}`);
    console.log(`🚀 Ready to serve farmers!`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});

module.exports = app;
