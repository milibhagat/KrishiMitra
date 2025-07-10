import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  User,
  Camera,
  Ruler,
  ArrowRight,
  ArrowLeft,
  Upload,
  Check,
  Loader,
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import PhotoUpload from '../components/PhotoUpload/PhotoUpload';

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { createUser, uploadPhoto, generateAvatar, isLoading: userLoading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      gender: 'female',
      height: '',
      weight: '',
      chest: '',
      waist: '',
      hips: '',
      age: '',
    },
  });

  const steps = [
    {
      id: 1,
      title: 'Personal Info',
      description: 'Tell us about yourself',
      icon: User,
    },
    {
      id: 2,
      title: 'Upload Photo',
      description: 'Add your full-body photo',
      icon: Camera,
    },
    {
      id: 3,
      title: 'Generate Avatar',
      description: 'Create your 3D avatar',
      icon: Ruler,
    },
  ];

  const [userData, setUserData] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  const handleMeasurementsSubmit = async (data) => {
    try {
      setIsLoading(true);
      const userId = await createUser(data);
      setUserData({ ...data, userId });
      toast.success('Profile created successfully!');
      setCurrentStep(2);
    } catch (error) {
      toast.error('Failed to create profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = async (file) => {
    if (!userData) {
      toast.error('Please complete step 1 first');
      return;
    }

    try {
      setIsLoading(true);
      const photo = await uploadPhoto(file);
      setUploadedPhoto(photo);
      toast.success('Photo uploaded successfully!');
      setCurrentStep(3);
    } catch (error) {
      toast.error('Failed to upload photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAvatar = async () => {
    if (!userData) {
      toast.error('Please complete previous steps first');
      return;
    }

    try {
      setIsLoading(true);
      await generateAvatar();
      toast.success('Avatar generated successfully!');
      navigate('/avatar');
    } catch (error) {
      toast.error('Failed to generate avatar. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Let's get started
              </h2>
              <p className="text-neutral-600">
                Enter your measurements for accurate size recommendations
              </p>
            </div>

            <form onSubmit={handleSubmit(handleMeasurementsSubmit)} className="space-y-6">
              {/* Gender Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['female', 'male', 'other'].map((gender) => (
                    <label
                      key={gender}
                      className={`relative flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        watch('gender') === gender
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      <input
                        type="radio"
                        value={gender}
                        {...register('gender', { required: 'Please select your gender' })}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium capitalize">
                        {gender}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Age (optional)
                </label>
                <input
                  type="number"
                  min="13"
                  max="100"
                  {...register('age')}
                  className="input-field"
                  placeholder="Enter your age"
                />
              </div>

              {/* Measurements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Height (cm) *
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="250"
                    {...register('height', {
                      required: 'Height is required',
                      min: { value: 100, message: 'Height must be at least 100cm' },
                      max: { value: 250, message: 'Height must be less than 250cm' },
                    })}
                    className="input-field"
                    placeholder="e.g., 165"
                  />
                  {errors.height && (
                    <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="300"
                    {...register('weight', {
                      required: 'Weight is required',
                      min: { value: 30, message: 'Weight must be at least 30kg' },
                      max: { value: 300, message: 'Weight must be less than 300kg' },
                    })}
                    className="input-field"
                    placeholder="e.g., 60"
                  />
                  {errors.weight && (
                    <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Chest (cm) *
                  </label>
                  <input
                    type="number"
                    min="60"
                    max="150"
                    {...register('chest', {
                      required: 'Chest measurement is required',
                      min: { value: 60, message: 'Chest must be at least 60cm' },
                      max: { value: 150, message: 'Chest must be less than 150cm' },
                    })}
                    className="input-field"
                    placeholder="e.g., 85"
                  />
                  {errors.chest && (
                    <p className="mt-1 text-sm text-red-600">{errors.chest.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Waist (cm) *
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="150"
                    {...register('waist', {
                      required: 'Waist measurement is required',
                      min: { value: 50, message: 'Waist must be at least 50cm' },
                      max: { value: 150, message: 'Waist must be less than 150cm' },
                    })}
                    className="input-field"
                    placeholder="e.g., 70"
                  />
                  {errors.waist && (
                    <p className="mt-1 text-sm text-red-600">{errors.waist.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Hips (cm) *
                  </label>
                  <input
                    type="number"
                    min="60"
                    max="150"
                    {...register('hips', {
                      required: 'Hip measurement is required',
                      min: { value: 60, message: 'Hips must be at least 60cm' },
                      max: { value: 150, message: 'Hips must be less than 150cm' },
                    })}
                    className="input-field"
                    placeholder="e.g., 95"
                  />
                  {errors.hips && (
                    <p className="mt-1 text-sm text-red-600">{errors.hips.message}</p>
                  )}
                </div>
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-sm text-primary-700">
                  <strong>Tip:</strong> For best results, measure yourself while wearing 
                  form-fitting clothes or undergarments. Stand straight and measure at the 
                  widest parts of your chest, waist, and hips.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || userLoading}
                className="w-full btn-primary py-4 text-lg flex items-center justify-center"
              >
                {isLoading || userLoading ? (
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <ArrowRight className="w-5 h-5 mr-2" />
                )}
                Continue to Photo Upload
              </button>
            </form>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Upload Your Photo
              </h2>
              <p className="text-neutral-600">
                Add a full-body photo for accurate avatar generation
              </p>
            </div>

            <PhotoUpload
              onPhotoUpload={handlePhotoUpload}
              isLoading={isLoading}
              uploadedPhoto={uploadedPhoto}
            />

            {uploadedPhoto && (
              <div className="text-center">
                <button
                  onClick={nextStep}
                  className="btn-primary py-4 px-8 text-lg flex items-center justify-center mx-auto"
                >
                  Continue to Avatar Generation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            )}
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Generate Your Avatar
              </h2>
              <p className="text-neutral-600">
                Create a 3D avatar based on your measurements and photo
              </p>
            </div>

            <div className="text-center space-y-6">
              <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                <Ruler className="w-16 h-16 text-primary-600" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-neutral-900">
                  Ready to create your avatar?
                </h3>
                <p className="text-neutral-600">
                  This will take just a few seconds using your measurements and photo.
                </p>
              </div>

              <button
                onClick={handleGenerateAvatar}
                disabled={isLoading}
                className="btn-primary py-4 px-8 text-lg flex items-center justify-center mx-auto"
              >
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Check className="w-5 h-5 mr-2" />
                )}
                {isLoading ? 'Generating Avatar...' : 'Generate My Avatar'}
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container-max section-padding">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      currentStep >= step.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-neutral-900">
                      {step.title}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-20 h-1 mx-4 rounded transition-colors ${
                      currentStep > step.id
                        ? 'bg-primary-600'
                        : 'bg-neutral-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <div className="card-body">
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          {currentStep > 1 && !isLoading && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={prevStep}
                className="btn-secondary flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;