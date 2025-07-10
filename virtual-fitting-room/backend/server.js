const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// In-memory storage for demo (in production, use a database)
let users = new Map();
let clothingItems = new Map();

// Initialize some sample clothing items
const initializeClothingItems = () => {
  const sampleItems = [
    {
      id: '1',
      name: 'Classic White T-Shirt',
      category: 'tops',
      brand: 'BasicWear',
      price: 29.99,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['white', 'black', 'gray'],
      image: 'https://via.placeholder.com/300x400/ffffff/000000?text=White+T-Shirt',
      description: 'Comfortable cotton t-shirt perfect for everyday wear'
    },
    {
      id: '2',
      name: 'Slim Fit Jeans',
      category: 'bottoms',
      brand: 'DenimCo',
      price: 89.99,
      sizes: ['28', '30', '32', '34', '36', '38'],
      colors: ['blue', 'black', 'gray'],
      image: 'https://via.placeholder.com/300x400/4169e1/ffffff?text=Slim+Jeans',
      description: 'Modern slim-fit jeans with stretch comfort'
    },
    {
      id: '3',
      name: 'Blazer Jacket',
      category: 'outerwear',
      brand: 'FormalWear',
      price: 159.99,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['navy', 'black', 'charcoal'],
      image: 'https://via.placeholder.com/300x400/2f4f4f/ffffff?text=Blazer',
      description: 'Professional blazer perfect for business occasions'
    },
    {
      id: '4',
      name: 'Summer Dress',
      category: 'dresses',
      brand: 'FashionForward',
      price: 79.99,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['red', 'blue', 'green', 'yellow'],
      image: 'https://via.placeholder.com/300x400/ff6347/ffffff?text=Summer+Dress',
      description: 'Flowy summer dress perfect for warm weather'
    }
  ];

  sampleItems.forEach(item => {
    clothingItems.set(item.id, item);
  });
};

initializeClothingItems();

// Validation schemas
const userMeasurementsSchema = Joi.object({
  height: Joi.number().min(100).max(250).required(),
  weight: Joi.number().min(30).max(300).required(),
  chest: Joi.number().min(60).max(150).required(),
  waist: Joi.number().min(50).max(150).required(),
  hips: Joi.number().min(60).max(150).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  age: Joi.number().min(13).max(100).optional()
});

const tryOnSchema = Joi.object({
  userId: Joi.string().required(),
  itemId: Joi.string().required(),
  size: Joi.string().required(),
  color: Joi.string().required()
});

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// User Management
app.post('/api/users', (req, res) => {
  try {
    const { error, value } = userMeasurementsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const userId = uuidv4();
    const user = {
      id: userId,
      ...value,
      createdAt: new Date().toISOString(),
      photos: [],
      avatar: null
    };

    users.set(userId, user);
    res.status(201).json({ userId, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  const user = users.get(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

app.put('/api/users/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { error, value } = userMeasurementsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedUser = { ...user, ...value, updatedAt: new Date().toISOString() };
    users.set(userId, updatedUser);

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Photo Upload
app.post('/api/users/:userId/photos', upload.single('photo'), (req, res) => {
  try {
    const { userId } = req.params;
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No photo uploaded' });
    }

    const photoData = {
      id: uuidv4(),
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      uploadedAt: new Date().toISOString()
    };

    user.photos.push(photoData);
    users.set(userId, user);

    res.json({
      message: 'Photo uploaded successfully',
      photo: photoData
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Avatar Generation (Placeholder)
app.post('/api/users/:userId/avatar', (req, res) => {
  try {
    const { userId } = req.params;
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Placeholder avatar generation
    const avatar = {
      id: uuidv4(),
      modelUrl: `https://via.placeholder.com/400x600/87ceeb/000000?text=3D+Avatar+${user.gender}`,
      generatedAt: new Date().toISOString(),
      bodyShape: calculateBodyShape(user),
      measurements: {
        height: user.height,
        chest: user.chest,
        waist: user.waist,
        hips: user.hips
      }
    };

    user.avatar = avatar;
    users.set(userId, user);

    res.json({
      message: 'Avatar generated successfully',
      avatar
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clothing Items
app.get('/api/clothing', (req, res) => {
  const { category, brand, minPrice, maxPrice, size } = req.query;
  let items = Array.from(clothingItems.values());

  // Apply filters
  if (category) {
    items = items.filter(item => item.category === category);
  }
  if (brand) {
    items = items.filter(item => item.brand.toLowerCase().includes(brand.toLowerCase()));
  }
  if (minPrice) {
    items = items.filter(item => item.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    items = items.filter(item => item.price <= parseFloat(maxPrice));
  }
  if (size) {
    items = items.filter(item => item.sizes.includes(size));
  }

  res.json({ items, total: items.length });
});

app.get('/api/clothing/:itemId', (req, res) => {
  const { itemId } = req.params;
  const item = clothingItems.get(itemId);

  if (!item) {
    return res.status(404).json({ error: 'Clothing item not found' });
  }

  res.json(item);
});

// Virtual Try-On
app.post('/api/try-on', (req, res) => {
  try {
    const { error, value } = tryOnSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { userId, itemId, size, color } = value;
    const user = users.get(userId);
    const item = clothingItems.get(itemId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!item) {
      return res.status(404).json({ error: 'Clothing item not found' });
    }

    if (!user.avatar) {
      return res.status(400).json({ error: 'User avatar not generated yet' });
    }

    // Placeholder try-on result
    const tryOnResult = {
      id: uuidv4(),
      userId,
      itemId,
      size,
      color,
      previewUrl: `https://via.placeholder.com/400x600/ff69b4/ffffff?text=Try-On+Preview`,
      fit: calculateFit(user, item, size),
      generatedAt: new Date().toISOString()
    };

    res.json({
      message: 'Try-on preview generated successfully',
      result: tryOnResult
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Size Recommendations
app.get('/api/users/:userId/size-recommendations/:itemId', (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const user = users.get(userId);
    const item = clothingItems.get(itemId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!item) {
      return res.status(404).json({ error: 'Clothing item not found' });
    }

    const recommendations = generateSizeRecommendations(user, item);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Outfit Suggestions
app.get('/api/users/:userId/outfit-suggestions', (req, res) => {
  try {
    const { userId } = req.params;
    const { occasion, style, budget } = req.query;
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const suggestions = generateOutfitSuggestions(user, { occasion, style, budget });
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Shopping API Integration (Placeholder)
app.get('/api/external/shopify/products', async (req, res) => {
  try {
    // Placeholder for Shopify API integration
    const products = [
      {
        id: 'shopify_1',
        title: 'Premium Cotton Shirt',
        vendor: 'Shopify Store',
        price: '49.99',
        images: ['https://via.placeholder.com/300x400/20b2aa/ffffff?text=Shopify+Shirt']
      }
    ];

    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Shopify products' });
  }
});

app.get('/api/external/amazon/products', async (req, res) => {
  try {
    // Placeholder for Amazon API integration
    const products = [
      {
        asin: 'amazon_1',
        title: 'Amazon Basics T-Shirt',
        price: '19.99',
        images: ['https://via.placeholder.com/300x400/ff8c00/ffffff?text=Amazon+Shirt']
      }
    ];

    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Amazon products' });
  }
});

// Serve uploaded images
app.use('/uploads', express.static(uploadsDir));

// Utility functions
function calculateBodyShape(user) {
  const waistToHip = user.waist / user.hips;
  const chestToWaist = user.chest / user.waist;

  if (waistToHip <= 0.75 && chestToWaist >= 1.3) {
    return 'hourglass';
  } else if (waistToHip <= 0.75) {
    return 'pear';
  } else if (chestToWaist >= 1.3) {
    return 'apple';
  } else {
    return 'rectangle';
  }
}

function calculateFit(user, item, size) {
  // Placeholder fit calculation
  const sizeIndex = item.sizes.indexOf(size);
  const userBodyShape = calculateBodyShape(user);
  
  let fitScore = 0.8; // Base fit score
  
  // Adjust based on body shape and item category
  if (userBodyShape === 'hourglass' && item.category === 'dresses') {
    fitScore += 0.1;
  } else if (userBodyShape === 'pear' && item.category === 'tops') {
    fitScore += 0.05;
  }

  return {
    score: Math.min(fitScore, 1.0),
    recommendation: fitScore > 0.8 ? 'excellent' : fitScore > 0.6 ? 'good' : 'fair',
    notes: ['Fits well around chest', 'Good length for your height']
  };
}

function generateSizeRecommendations(user, item) {
  const bodyShape = calculateBodyShape(user);
  const recommendedSize = item.sizes[Math.floor(item.sizes.length / 2)]; // Default to middle size

  return {
    recommendedSize,
    confidence: 0.85,
    alternativeSizes: item.sizes.filter(size => size !== recommendedSize).slice(0, 2),
    reasoning: `Based on your ${bodyShape} body shape and measurements, we recommend ${recommendedSize}`,
    sizeChart: {
      [recommendedSize]: {
        chest: user.chest + 5,
        waist: user.waist + 3,
        hips: user.hips + 5
      }
    }
  };
}

function generateOutfitSuggestions(user, preferences = {}) {
  const bodyShape = calculateBodyShape(user);
  const allItems = Array.from(clothingItems.values());
  
  const outfits = [
    {
      id: uuidv4(),
      name: 'Casual Day Out',
      items: allItems.slice(0, 2),
      style: 'casual',
      occasion: 'everyday',
      totalPrice: allItems.slice(0, 2).reduce((sum, item) => sum + item.price, 0),
      bodyShapeMatch: bodyShape === 'hourglass' ? 0.9 : 0.7
    },
    {
      id: uuidv4(),
      name: 'Business Professional',
      items: allItems.slice(2, 4),
      style: 'professional',
      occasion: 'work',
      totalPrice: allItems.slice(2, 4).reduce((sum, item) => sum + item.price, 0),
      bodyShapeMatch: 0.8
    }
  ];

  return {
    suggestions: outfits,
    bodyShape,
    totalSuggestions: outfits.length
  };
}

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Virtual Fitting Room API server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
});