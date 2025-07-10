import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  User,
  Ruler,
  Camera,
  ShoppingBag,
  Edit3,
  Download,
  Share2,
  ArrowRight,
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const AvatarPage = () => {
  const { currentUser, avatar, generateAvatar, isLoading } = useUser();

  useEffect(() => {
    // If user exists but no avatar, try to generate one
    if (currentUser && !avatar && !isLoading) {
      generateAvatar();
    }
  }, [currentUser, avatar, isLoading, generateAvatar]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Complete Your Profile First
          </h2>
          <p className="text-neutral-600 mb-6">
            You need to complete the onboarding process to view your avatar.
          </p>
          <Link to="/onboarding" className="btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Ruler className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Generating Your Avatar
          </h2>
          <p className="text-neutral-600">
            Please wait while we create your 3D avatar...
          </p>
        </div>
      </div>
    );
  }

  if (!avatar) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-neutral-500" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Avatar Not Found
          </h2>
          <p className="text-neutral-600 mb-6">
            We couldn't find your avatar. Let's create one now.
          </p>
          <button
            onClick={generateAvatar}
            disabled={isLoading}
            className="btn-primary"
          >
            Generate Avatar
          </button>
        </div>
      </div>
    );
  }

  const bodyShapeDescriptions = {
    hourglass: 'You have an hourglass body shape with balanced proportions and a defined waist.',
    pear: 'You have a pear body shape with fuller hips and a smaller upper body.',
    apple: 'You have an apple body shape with a fuller midsection and narrower hips.',
    rectangle: 'You have a rectangle body shape with balanced proportions throughout.',
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container-max section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Your Virtual Avatar
          </h1>
          <p className="text-xl text-neutral-600">
            Generated based on your measurements and photo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Avatar Display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="card">
              <div className="aspect-w-3 aspect-h-4 rounded-xl overflow-hidden">
                <img
                  src={avatar.modelUrl}
                  alt="Your 3D Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    3D Avatar Model
                  </h3>
                  <span className="text-sm text-neutral-500">
                    Generated {new Date(avatar.generatedAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <button className="btn-outline flex-1 text-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                  <button className="btn-outline flex-1 text-sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </button>
                  <button className="btn-outline flex-1 text-sm">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Avatar Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Body Shape Analysis */}
            <div className="card">
              <div className="card-body">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <Ruler className="w-5 h-5 mr-2 text-primary-600" />
                  Body Shape Analysis
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-primary-900 capitalize mb-1">
                      {avatar.bodyShape} Body Shape
                    </div>
                    <p className="text-sm text-primary-700">
                      {bodyShapeDescriptions[avatar.bodyShape]}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-neutral-700">Height</div>
                      <div className="text-lg font-semibold text-neutral-900">
                        {avatar.measurements.height} cm
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-700">Chest</div>
                      <div className="text-lg font-semibold text-neutral-900">
                        {avatar.measurements.chest} cm
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-700">Waist</div>
                      <div className="text-lg font-semibold text-neutral-900">
                        {avatar.measurements.waist} cm
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-700">Hips</div>
                      <div className="text-lg font-semibold text-neutral-900">
                        {avatar.measurements.hips} cm
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="card">
              <div className="card-body">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary-600" />
                  Profile Information
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Gender</span>
                    <span className="font-medium text-neutral-900 capitalize">
                      {currentUser.gender}
                    </span>
                  </div>
                  {currentUser.age && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Age</span>
                      <span className="font-medium text-neutral-900">
                        {currentUser.age} years
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Weight</span>
                    <span className="font-medium text-neutral-900">
                      {currentUser.weight} kg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Created</span>
                    <span className="font-medium text-neutral-900">
                      {new Date(currentUser.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <div className="card-body">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  What's Next?
                </h3>
                
                <div className="space-y-3">
                  <Link
                    to="/catalog"
                    className="block p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ShoppingBag className="w-5 h-5 text-primary-600 mr-3" />
                        <div>
                          <div className="font-medium text-neutral-900">
                            Browse Catalog
                          </div>
                          <div className="text-sm text-neutral-600">
                            Find clothes that fit your body
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                    </div>
                  </Link>
                  
                  <Link
                    to="/try-on"
                    className="block p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Camera className="w-5 h-5 text-primary-600 mr-3" />
                        <div>
                          <div className="font-medium text-neutral-900">
                            Virtual Try-On
                          </div>
                          <div className="text-sm text-neutral-600">
                            See how clothes look on you
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                    </div>
                  </Link>
                  
                  <Link
                    to="/suggested-looks"
                    className="block p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-primary-600 mr-3" />
                        <div>
                          <div className="font-medium text-neutral-900">
                            Style Suggestions
                          </div>
                          <div className="text-sm text-neutral-600">
                            Get personalized outfit ideas
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AvatarPage;