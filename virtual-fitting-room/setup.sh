#!/bin/bash

# Virtual Fitting Room Setup Script
echo "🚀 Setting up Virtual Fitting Room..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Setup backend
echo "🔧 Setting up backend..."
cd backend

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📄 Creating backend .env file..."
    cp .env.example .env
    echo "✅ Environment file created. Please update backend/.env with your configuration."
else
    echo "✅ Backend .env file already exists"
fi

# Create uploads directory
mkdir -p uploads
echo "✅ Uploads directory created"

cd ..

# Setup frontend
echo "🎨 Setting up frontend..."
cd frontend

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your configuration"
echo "2. Start the development servers:"
echo "   Backend:  cd backend && npm run dev"
echo "   Frontend: cd frontend && npm start"
echo "   Or both:  npm run dev"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo "   API Docs: http://localhost:5000/health"
echo ""
echo "📚 For more information, see README.md"
echo ""
echo "Happy coding! 🚀"