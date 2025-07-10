# Virtual Fitting Room

A full-stack web application that allows users to create virtual avatars and try on clothes virtually using AI-powered size recommendations.

## 🌟 Features

### Core Features
- **3D Avatar Generation**: Create realistic avatars based on user measurements and photos
- **Virtual Try-On**: See how clothes look on your avatar before purchasing
- **AI Size Recommendations**: Get accurate size suggestions based on body measurements
- **Outfit Suggestions**: Personalized outfit recommendations based on body shape
- **Responsive Design**: Mobile-first design that works on all devices

### User Journey
1. **Onboarding**: Input measurements and upload full-body photo
2. **Avatar Creation**: Generate 3D avatar from measurements and photo
3. **Catalog Browsing**: Browse clothing items with filtering and search
4. **Virtual Try-On**: Try clothes on avatar with size recommendations
5. **Style Suggestions**: Get personalized outfit recommendations

### Technical Features
- Real-time avatar generation (placeholder)
- Body shape analysis (hourglass, pear, apple, rectangle)
- Integration with shopping APIs (Shopify, Amazon - placeholder)
- File upload with drag-and-drop
- Advanced filtering and search
- Responsive mobile-first design

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form validation and handling
- **React Hot Toast** - Beautiful toast notifications
- **React Dropzone** - File upload with drag-and-drop
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Multer** - File upload handling
- **Sharp** - Image processing
- **Joi** - Data validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection

### Development Tools
- **Nodemon** - Development server with auto-restart
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd virtual-fitting-room
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Backend (.env file in `/backend`):
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   
   # Add your API keys for external integrations
   SHOPIFY_API_KEY=your_shopify_key
   AMAZON_ACCESS_KEY=your_amazon_key
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on http://localhost:5000

2. **Start the frontend application**
   ```bash
   cd frontend
   npm start
   ```
   Application will run on http://localhost:3000

3. **Open your browser**
   Navigate to http://localhost:3000 to use the application

## 📱 Usage Guide

### Getting Started
1. **Visit the homepage** and click "Get Started"
2. **Complete onboarding** by entering your measurements
3. **Upload a full-body photo** for avatar generation
4. **Generate your avatar** and view your profile

### Using Virtual Try-On
1. **Browse the catalog** to find clothes you like
2. **Click "Try On"** on any item
3. **Select size and color** options
4. **View the virtual try-on** on your avatar
5. **Get size recommendations** based on your measurements

### Style Suggestions
1. **Visit the "Suggested Looks" page**
2. **Filter by occasion, style, and budget**
3. **View personalized outfit recommendations**
4. **Try on complete outfits** or individual items

## 🏗 Project Structure

```
virtual-fitting-room/
├── backend/                 # Node.js/Express backend
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Environment variables template
│   └── uploads/            # User uploaded photos
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context for state management
│   │   ├── services/       # API service functions
│   │   ├── App.js          # Main App component
│   │   └── index.js        # Entry point
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind CSS configuration
└── README.md               # Project documentation
```

## 🎨 Design System

### Colors
- **Primary**: Blue tones (#0ea5e9 family)
- **Secondary**: Pink tones (#ec4899 family)
- **Neutral**: Gray tones for text and backgrounds

### Components
- Consistent button styles (primary, secondary, outline)
- Card-based layouts with soft shadows
- Mobile-first responsive design
- Smooth animations and transitions

## 🔌 API Endpoints

### User Management
- `POST /api/users` - Create user with measurements
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId` - Update user measurements
- `POST /api/users/:userId/photos` - Upload user photo
- `POST /api/users/:userId/avatar` - Generate 3D avatar

### Clothing & Try-On
- `GET /api/clothing` - Get clothing items with filters
- `GET /api/clothing/:itemId` - Get specific clothing item
- `POST /api/try-on` - Generate virtual try-on
- `GET /api/users/:userId/size-recommendations/:itemId` - Get size recommendations
- `GET /api/users/:userId/outfit-suggestions` - Get outfit suggestions

### External Integrations (Placeholder)
- `GET /api/external/shopify/products` - Shopify products
- `GET /api/external/amazon/products` - Amazon products

## 🔮 Future Enhancements

### ML/AI Integration
- Real 3D avatar generation using computer vision
- Advanced body measurement extraction from photos
- Improved size recommendation algorithms
- Style preference learning

### Features
- User accounts and authentication
- Social sharing and reviews
- Shopping cart and checkout integration
- Wishlist and favorites
- Real-time collaboration
- AR try-on using device camera

### Technical Improvements
- Database integration (MongoDB/PostgreSQL)
- Real-time updates with WebSockets
- CDN for image optimization
- Advanced caching strategies
- Mobile app development

## 🛡 Security

- CORS protection
- Rate limiting on API endpoints
- File upload validation and size limits
- Input validation with Joi
- Helmet.js for security headers

## 📦 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist folder to your hosting provider
```

### Backend (Heroku/Railway/DigitalOcean)
```bash
cd backend
# Set environment variables
# Deploy to your preferred platform
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
DATABASE_URL=your_database_connection_string
CLOUDINARY_URL=your_cloudinary_url
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Placeholder images from placeholder.com
- Icons from Lucide React
- Design inspiration from modern e-commerce platforms
- Community feedback and contributions

## 📞 Support

For support, email support@virtualfittingroom.com or join our Discord server.

---

**Built with ❤️ for the future of online shopping**