import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import {
  Upload,
  Camera,
  X,
  CheckCircle,
  AlertCircle,
  Loader,
  Image as ImageIcon,
} from 'lucide-react';

const PhotoUpload = ({ onPhotoUpload, isLoading, uploadedPhoto }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors.some(error => error.code === 'file-too-large')) {
          setError('File size must be less than 10MB');
        } else if (rejection.errors.some(error => error.code === 'file-invalid-type')) {
          setError('Please upload a valid image file (JPG, PNG, GIF, or WebP)');
        } else {
          setError('Invalid file. Please try again.');
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        
        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload file
        onPhotoUpload(file);
      }
    },
    [onPhotoUpload]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const clearPreview = () => {
    setPreview(null);
    setError(null);
  };

  const getDropzoneClassName = () => {
    let className = 'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ';
    
    if (isDragAccept) {
      className += 'border-green-400 bg-green-50';
    } else if (isDragReject) {
      className += 'border-red-400 bg-red-50';
    } else if (isDragActive) {
      className += 'border-primary-400 bg-primary-50';
    } else {
      className += 'border-neutral-300 hover:border-primary-400 hover:bg-primary-50';
    }

    return className;
  };

  if (uploadedPhoto || preview) {
    return (
      <div className="space-y-4">
        <div className="relative">
          <img
            src={preview || `http://localhost:5000/uploads/${uploadedPhoto?.filename}`}
            alt="Uploaded photo"
            className="w-full h-64 object-cover rounded-xl"
          />
          
          {!uploadedPhoto && !isLoading && (
            <button
              onClick={clearPreview}
              className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors"
            >
              <X className="w-4 h-4 text-neutral-600" />
            </button>
          )}

          {uploadedPhoto && (
            <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              Uploaded
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
              <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
                <Loader className="w-5 h-5 animate-spin text-primary-600" />
                <span className="text-sm font-medium text-neutral-900">
                  Uploading...
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <p className="text-sm text-primary-700">
            <strong>Great!</strong> Your photo looks good. Make sure it shows your full body 
            clearly for the best avatar generation results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div {...getRootProps()} className={getDropzoneClassName()}>
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            {isDragActive ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center"
              >
                <Upload className="w-8 h-8 text-primary-600" />
              </motion.div>
            ) : (
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-neutral-500" />
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              {isDragActive ? 'Drop your photo here' : 'Upload your full-body photo'}
            </h3>
            <p className="text-neutral-600 mb-4">
              Drag and drop your photo here, or click to browse
            </p>
            
            <div className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors">
              <Camera className="w-5 h-5 mr-2" />
              Choose Photo
            </div>
          </div>

          <div className="text-xs text-neutral-500 space-y-1">
            <p>• Supported formats: JPG, PNG, GIF, WebP</p>
            <p>• Maximum file size: 10MB</p>
            <p>• Best results with full-body photos in good lighting</p>
          </div>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-red-900">Upload Error</h4>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </motion.div>
      )}

      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-neutral-900 mb-2">
          Tips for the best results:
        </h4>
        <ul className="text-sm text-neutral-600 space-y-1">
          <li>• Stand straight with arms slightly away from your body</li>
          <li>• Wear form-fitting clothes or swimwear</li>
          <li>• Ensure good lighting and a plain background</li>
          <li>• Make sure your full body is visible in the frame</li>
        </ul>
      </div>
    </div>
  );
};

export default PhotoUpload;