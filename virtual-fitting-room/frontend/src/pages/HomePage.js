import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Camera,
  Ruler,
  Sparkles,
  ShoppingBag,
  Star,
  ArrowRight,
  Zap,
  Shield,
  Smartphone,
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const HomePage = () => {
  const { hasCompletedOnboarding } = useUser();

  const features = [
    {
      icon: Camera,
      title: '3D Avatar Creation',
      description: 'Upload your photo and get a realistic 3D avatar based on your measurements',
    },
    {
      icon: Ruler,
      title: 'Precise Measurements',
      description: 'AI-powered size recommendations based on your body measurements',
    },
    {
      icon: Sparkles,
      title: 'Style Suggestions',
      description: 'Get personalized outfit recommendations based on your body shape',
    },
    {
      icon: ShoppingBag,
      title: 'Virtual Try-On',
      description: 'See how clothes look on your avatar before making a purchase',
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Save Time',
      description: 'No more trips to the store for size checking',
    },
    {
      icon: Shield,
      title: 'Reduce Returns',
      description: 'Get the right size the first time',
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Works perfectly on all your devices',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Fashion Enthusiast',
      content: 'Amazing! I finally found clothes that fit perfectly. The avatar is so accurate.',
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      role: 'Online Shopper',
      content: 'No more guessing sizes. This app has revolutionized how I shop online.',
      rating: 5,
    },
    {
      name: 'Emma Thompson',
      role: 'Style Blogger',
      content: 'The outfit suggestions are spot-on. It\'s like having a personal stylist.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-max section-padding py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                Try Before You{' '}
                <span className="gradient-text">Buy</span>
              </h1>
              <p className="text-xl text-neutral-600 mt-6 leading-relaxed">
                Create your virtual avatar and see how clothes fit you perfectly. 
                Shop with confidence using AI-powered size recommendations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link 
                  to={hasCompletedOnboarding ? "/catalog" : "/onboarding"}
                  className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
                >
                  {hasCompletedOnboarding ? 'Browse Catalog' : 'Get Started'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link 
                  to="/try-on"
                  className="btn-outline text-lg px-8 py-4 inline-flex items-center justify-center"
                >
                  Try Demo
                  <Sparkles className="w-5 h-5 ml-2" />
                </Link>
              </div>

              <div className="flex items-center mt-8 space-x-6">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="ml-3 text-neutral-600">10K+ happy users</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-neutral-600">4.9/5 rating</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-large">
                <img
                  src="https://via.placeholder.com/600x700/667eea/ffffff?text=Virtual+Avatar+Demo"
                  alt="Virtual Fitting Room Demo"
                  className="w-full h-auto"
                />
                
                {/* Floating UI Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-4 right-4 bg-white rounded-lg shadow-medium p-3"
                >
                  <div className="text-sm font-medium text-primary-600">Perfect Fit!</div>
                  <div className="text-xs text-neutral-500">95% accuracy</div>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="absolute bottom-4 left-4 bg-white rounded-lg shadow-medium p-3"
                >
                  <div className="text-sm font-medium text-secondary-600">Size M</div>
                  <div className="text-xs text-neutral-500">Recommended</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Get started in just a few simple steps and revolutionize your online shopping experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
                Why Choose Virtual Fitting Room?
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-neutral-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://via.placeholder.com/500x600/f472b6/ffffff?text=Shopping+Made+Easy"
                alt="Benefits illustration"
                className="w-full h-auto rounded-2xl shadow-large"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-neutral-600">
              Join thousands of satisfied customers who've transformed their shopping experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-neutral-700 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-neutral-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-neutral-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Shopping?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Create your virtual avatar today and never buy the wrong size again
            </p>
            <Link 
              to={hasCompletedOnboarding ? "/catalog" : "/onboarding"}
              className="inline-flex items-center bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-neutral-50 transition-colors text-lg"
            >
              {hasCompletedOnboarding ? 'Start Shopping' : 'Get Started Free'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;