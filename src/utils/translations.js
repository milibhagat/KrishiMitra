const Translations = {
    // Current language
    currentLanguage: localStorage.getItem('app_language') || 'hi',
    
    // Translation data
    data: {
        // Common translations
        hi: {
            // Authentication
            'auth.login': 'लॉग इन करें',
            'auth.logout': 'लॉग आउट',
            'auth.google': 'Google से साइन इन करें',
            'auth.welcome': 'स्वागत है',
            'auth.profile': 'प्रोफाइल',
            'auth.signup': 'नया खाता बनाएं',
            'auth.signin': 'साइन इन करें',
            'auth.or': 'या',
            'auth.please_login': 'कृपया लॉग इन करें',
            'auth.login_required': 'इस सुविधा के लिए लॉग इन आवश्यक है',
            loading: 'लोड हो रहा है...',
            error: 'त्रुटि',
            success: 'सफल',
            cancel: 'रद्द करें',
            save: 'सेव करें',
            edit: 'संपादित करें',
            delete: 'मिटाएं',
            back: 'वापस',
            next: 'आगे',
            previous: 'पिछला',
            close: 'बंद करें',
            open: 'खोलें',
            yes: 'हां',
            no: 'नहीं',
            ok: 'ठीक है',
            
            // App specific
            farmers_friend: 'किसान का मित्र',
            'app.subtitle': 'आपका स्मार्ट कृषि साथी',
            home: 'होम',
            profile: 'प्रोफाइल',
            
            // Navigation
            crops: 'फसल',
            weather: 'मौसम',
            community: 'समुदाय',
            
            // Location
            location_required: 'स्थान की आवश्यकता है',
            set_location: 'स्थान सेट करें',
            change: 'बदलें',
            location_permission_denied: 'स्थान की अनुमति नहीं मिली',
            geolocation_not_supported: 'आपका ब्राउज़र स्थान सेवा का समर्थन नहीं करता',
            getting_location: 'स्थान प्राप्त कर रहे हैं...',
            get_current_location: 'वर्तमान स्थान प्राप्त करें',
            use_current_location: 'वर्तमान स्थान का उपयोग करें',
            location_permission_desc: 'सटीक मौसम और फसल सुझाव के लिए',
            enter_manually: 'मैन्युअल रूप से दर्ज करें',
            location_name: 'स्थान का नाम',
            optional: 'वैकल्पिक',
            enter_location_name: 'स्थान का नाम दर्ज करें',
            latitude: 'अक्षांश',
            longitude: 'देशांतर',
            enter_valid_coordinates: 'वैध निर्देशांक दर्ज करें',
            invalid_coordinates: 'अमान्य निर्देशांक',
            popular_locations: 'लोकप्रिय स्थान',
            set_location_first: 'पहले अपना स्थान सेट करें',
            
            // Crop Recommendation
            crop_recommendation: 'फसल सुझाव',
            crop_recommendation_desc: 'आपके खेत के लिए सर्वोत्तम फसल',
            farm_details: 'खेत विवरण',
            soil_type: 'मिट्टी का प्रकार',
            select_soil_type: 'मिट्टी का प्रकार चुनें',
            clay_soil: 'चिकनी मिट्टी',
            sandy_soil: 'बलुई मिट्टी',
            loamy_soil: 'दोमट मिट्टी',
            black_soil: 'काली मिट्टी',
            red_soil: 'लाल मिट्टी',
            water_availability: 'पानी की उपलब्धता',
            select_water_availability: 'पानी की उपलब्धता चुनें',
            abundant_water: 'भरपूर पानी',
            moderate_water: 'मध्यम पानी',
            limited_water: 'सीमित पानी',
            rainfed_only: 'केवल वर्षा आधारित',
            farm_size: 'खेत का आकार',
            acres: 'एकड़',
            enter_farm_size: 'खेत का आकार दर्ज करें',
            generating_recommendations: 'सुझाव बना रहे हैं...',
            recommended_crops: 'सुझाई गई फसलें',
            no_recommendations: 'कोई सुझाव नहीं मिला',
            suitability: 'उपयुक्तता',
            quintals_per_acre: 'क्विंटल/एकड़',
            quintal: 'क्विंटल',
            growing_season: 'बुआई का मौसम',
            water_requirement: 'पानी की आवश्यकता',
            planting_time: 'बुआई का समय',
            harvest_time: 'कटाई का समय',
            key_tips: 'मुख्य सुझाव',
            
            // Disease Detection
            disease_detection: 'रोग पहचान',
            disease_detection_desc: 'फसल की तस्वीर से रोग की पहचान',
            capture_crop_image: 'फसल की तस्वीर लें',
            image_analysis_desc: 'AI से रोग और कीट की पहचान करें',
            take_photo: 'फोटो खींचें',
            upload_from_gallery: 'गैलरी से अपलोड करें',
            opening_camera: 'कैमरा खोल रहे हैं...',
            photo_tips: 'फोटो के लिए सुझाव',
            tip_clear_image: 'साफ और स्पष्ट तस्वीर लें',
            tip_good_lighting: 'अच्छी रोशनी में फोटो खींचें',
            tip_close_up: 'पास से फोटो लें',
            tip_affected_area: 'प्रभावित हिस्से की फोटो लें',
            analyze_image: 'तस्वीर का विश्लेषण करें',
            analyzing: 'विश्लेषण हो रहा है...',
            retake: 'दोबारा लें',
            ai_analyzing: 'AI विश्लेषण कर रहा है',
            analysis_in_progress: 'कृपया प्रतीक्षा करें...',
            analysis_failed: 'विश्लेषण असफल',
            try_again: 'फिर कोशिश करें',
            confidence: 'विश्वसनीयता',
            treatment_recommendations: 'उपचार सुझाव',
            dosage: 'मात्रा',
            application: 'उपयोग',
            preventive_measures: 'बचाव के उपाय',
            camera_feature_coming_soon: 'कैमरा फीचर जल्द आ रहा है',
            camera_not_available: 'कैमरा उपलब्ध नहीं है',
            
            // Weather Advisory
            weather_advisory: 'मौसम सलाह',
            weather_advisory_desc: 'मौसम आधारित खेती सुझाव',
            loading_weather: 'मौसम जानकारी लोड हो रही है...',
            humidity: 'नमी',
            wind_kmh: 'हवा की गति',
            pressure: 'दाब',
            visibility: 'दृश्यता',
            farming_advisory: 'खेती सलाह',
            high_temperature_alert: 'अधिक तापमान चेतावनी',
            high_temp_advisory: 'अधिक तापमान के कारण फसलों को नुकसान हो सकता है',
            increase_irrigation: 'सिंचाई बढ़ाएं',
            low_temperature_alert: 'कम तापमान चेतावनी',
            low_temp_advisory: 'ठंड से फसलों को बचाने की आवश्यकता है',
            protect_crops: 'फसलों को बचाएं',
            rainfall_expected: 'बारिश की संभावना',
            rain_advisory: 'आने वाले दिनों में बारिश हो सकती है',
            reduce_irrigation: 'सिंचाई कम करें',
            dry_conditions: 'शुष्क मौसम',
            dry_advisory: 'शुष्क मौसम के कारण अधिक सिंचाई की जरूरत',
            maintain_irrigation: 'सिंचाई बनाए रखें',
            high_wind_alert: 'तेज हवा चेतावनी',
            wind_advisory: 'तेज हवा से फसलों को नुकसान हो सकता है',
            secure_crops: 'फसलों को सुरक्षित करें',
            '5_day_forecast': '5 दिन का मौसम',
            today: 'आज',
            weather_load_failed: 'मौसम जानकारी लोड नहीं हो सकी',
            retry: 'फिर कोशिश करें',
            
            // Education
            farming_education: 'कृषि शिक्षा',
            farming_education_desc: 'आधुनिक खेती तकनीक सीखें',
            search_topics: 'विषय खोजें',
            all_topics: 'सभी विषय',
            organic_farming: 'जैविक खेती',
            irrigation: 'सिंचाई',
            pest_control: 'कीट नियंत्रण',
            soil_management: 'मिट्टी प्रबंधन',
            harvesting: 'कटाई',
            no_articles_found: 'कोई लेख नहीं मिला',
            try_different_search: 'अलग शब्द से खोजें',
            organic_farming_basics: 'जैविक खेती की मूल बातें',
            organic_farming_summary: 'रासायनिक मुक्त खेती के तरीके',
            drip_irrigation_guide: 'ड्रिप सिंचाई गाइड',
            drip_irrigation_summary: 'पानी की बचत करने वाली सिंचाई',
            natural_pest_control: 'प्राकृतिक कीट नियंत्रण',
            natural_pest_summary: 'बिना रसायन के कीट नियंत्रण',
            beginner: 'शुरुआती',
            intermediate: 'मध्यम',
            advanced: 'उन्नत',
            quick_tips: 'त्वरित सुझाव',
            daily_tip: 'आज का सुझाव',
            
            // Yield Prediction
            yield_prediction: 'उत्पादन अनुमान',
            yield_prediction_desc: 'फसल उत्पादन और आय का अनुमान',
            crop_details: 'फसल विवरण',
            select_crop: 'फसल चुनें',
            choose_crop: 'फसल का चयन करें',
            land_size: 'भूमि का आकार',
            enter_land_size: 'भूमि का आकार दर्ज करें',
            farming_inputs: 'खेती सामग्री',
            last_year_yield: 'पिछले साल का उत्पादन',
            quintals: 'क्विंटल',
            fertilizer_quantity: 'उर्वरक की मात्रा',
            kg_per_acre: 'किलो/एकड़',
            irrigation_quality: 'सिंचाई की गुणवत्ता',
            select_irrigation: 'सिंचाई चुनें',
            seed_type: 'बीज का प्रकार',
            select_seed_type: 'बीज का प्रकार चुनें',
            fill_required_fields: 'आवश्यक फील्ड भरें',
            calculating: 'गणना हो रही है...',
            predict_yield: 'उत्पादन की भविष्यवाणी करें',
            prediction_complete: 'अनुमान तैयार',
            predicted_yield: 'अनुमानित उत्पादन',
            financial_analysis: 'वित्तीय विश्लेषण',
            estimated_income: 'अनुमानित आय',
            estimated_cost: 'अनुमानित लागत',
            net_profit: 'शुद्ध लाभ',
            profit_margin: 'लाभ प्रतिशत',
            improvement_recommendations: 'सुधार सुझाव',
            new_prediction: 'नया अनुमान',
            increase_fertilizer_recommendation: 'उर्वरक की मात्रा बढ़ाएं',
            improve_irrigation_recommendation: 'सिंचाई व्यवस्था सुधारें',
            use_hybrid_seeds_recommendation: 'हाइब्रिड बीज का उपयोग करें',
            soil_testing_recommendation: 'मिट्टी जांच कराएं',
            
            // Community
            farmer_community: 'किसान समुदाय',
            discussions: 'चर्चा',
            experts: 'विशेषज्ञ',
            share_experience: 'अनुभव साझा करें',
            whats_on_mind: 'आपके मन में क्या है?',
            photo: 'फोटो',
            location: 'स्थान',
            post: 'पोस्ट करें',
            helpful: 'उपयोगी',
            reply: 'जवाब',
            share: 'साझा करें',
            get_expert_advice: 'विशेषज्ञ सलाह लें',
            connect_with_experts: 'कृषि विशेषज्ञों से जुड़ें',
            available: 'उपलब्ध',
            busy: 'व्यस्त',
            chat_now: 'अभी चैट करें',
            schedule_call: 'कॉल शेड्यूल करें',
            need_specific_help: 'विशिष्ट सहायता चाहिए?',
            submit_question: 'अपना प्रश्न भेजें',
            ask_question: 'प्रश्न पूछें',
            
            // Schemes
            govt_schemes: 'सरकारी योजनाएं',
            govt_schemes_desc: 'किसानों के लिए सरकारी योजनाएं',
            search_schemes: 'योजना खोजें',
            all_schemes: 'सभी योजनाएं',
            subsidies: 'सब्सिडी',
            insurance: 'बीमा',
            loans: 'ऋण',
            training: 'प्रशिक्षण',
            equipment: 'उपकरण',
            no_schemes_found: 'कोई योजना नहीं मिली',
            active: 'सक्रिय',
            expired: 'समाप्त',
            upcoming: 'आने वाली',
            unknown: 'अज्ञात',
            deadline: 'अंतिम तिथि',
            amount: 'राशि',
            eligibility: 'पात्रता',
            benefits: 'लाभ',
            required_documents: 'आवश्यक दस्तावेज',
            apply_online: 'ऑनलाइन आवेदन करें',
            set_reminders: 'रिमाइंडर सेट करें',
            download_forms: 'फॉर्म डाउनलोड करें',
            
            // Profile
            farmer_name: 'किसान का नाम',
            location_not_set: 'स्थान सेट नहीं है',
            profile_completion: 'प्रोफाइल पूर्णता',
            personal_details: 'व्यक्तिगत विवरण',
            full_name: 'पूरा नाम',
            enter_name: 'नाम दर्ज करें',
            mobile_number: 'मोबाइल नंबर',
            enter_mobile: 'मोबाइल नंबर दर्ज करें',
            enter_location: 'स्थान दर्ज करें',
            farming_experience: 'खेती का अनुभव',
            select_experience: 'अनुभव चुनें',
            years: 'साल',
            save_profile: 'प्रोफाइल सेव करें',
            not_provided: 'नहीं दिया गया',
            name: 'नाम',
            mobile: 'मोबाइल',
            experience: 'अनुभव',
            language_settings: 'भाषा सेटिंग',
            notification_settings: 'सूचना सेटिंग',
            weather_alerts: 'मौसम अलर्ट',
            weather_alerts_desc: 'मौसम की चेतावनी प्राप्त करें',
            scheme_updates: 'योजना अपडेट',
            scheme_updates_desc: 'नई योजनाओं की जानकारी',
            community_posts: 'समुदायिक पोस्ट',
            community_posts_desc: 'समुदाय की गतिविधियां',
            education_tips: 'शिक्षा सुझाव',
            education_tips_desc: 'खेती के नए तरीके',
            app_settings: 'ऐप सेटिंग',
            offline_data: 'ऑफलाइन डेटा',
            sync_data: 'डेटा सिंक करें',
            clear_cache: 'कैश साफ करें',
            help_support: 'सहायता और समर्थन',
            user_guide: 'उपयोगकर्ता गाइड',
            contact_support: 'सहायता से संपर्क करें',
            made_with: 'बनाया गया',
            for_farmers: 'किसानों के लिए',
            profile_saved: 'प्रोफाइल सेव हो गया',
            
            // Quick Actions
            quick_actions: 'त्वरित कार्य',
            scan_crop: 'फसल स्कैन करें'
        },
        
        en: {
            // Authentication
            'auth.login': 'Login',
            'auth.logout': 'Logout',
            'auth.google': 'Sign in with Google',
            'auth.welcome': 'Welcome',
            'auth.profile': 'Profile',
            'auth.signup': 'Create New Account',
            'auth.signin': 'Sign In',
            'auth.or': 'or',
            'auth.please_login': 'Please log in',
            'auth.login_required': 'Login required for this feature',
            
            loading: 'Loading...',
            error: 'Error',
            success: 'Success',
            cancel: 'Cancel',
            save: 'Save',
            edit: 'Edit',
            delete: 'Delete',
            back: 'Back',
            next: 'Next',
            previous: 'Previous',
            close: 'Close',
            open: 'Open',
            yes: 'Yes',
            no: 'No',
            ok: 'OK',
            
            // App specific
            farmers_friend: 'Farmer\'s Friend',
            'app.subtitle': 'Your Smart Farming Companion',
            home: 'Home',
            profile: 'Profile',
            
            // Navigation
            crops: 'Crops',
            weather: 'Weather',
            community: 'Community',
            
            // Location
            location_required: 'Location Required',
            set_location: 'Set Location',
            change: 'Change',
            location_permission_denied: 'Location permission denied',
            geolocation_not_supported: 'Geolocation not supported',
            getting_location: 'Getting location...',
            get_current_location: 'Get Current Location',
            use_current_location: 'Use Current Location',
            location_permission_desc: 'For accurate weather and crop suggestions',
            enter_manually: 'Enter Manually',
            location_name: 'Location Name',
            optional: 'Optional',
            enter_location_name: 'Enter location name',
            latitude: 'Latitude',
            longitude: 'Longitude',
            enter_valid_coordinates: 'Enter valid coordinates',
            invalid_coordinates: 'Invalid coordinates',
            popular_locations: 'Popular Locations',
            set_location_first: 'Set your location first',
            
            // Crop Recommendation
            crop_recommendation: 'Crop Recommendation',
            crop_recommendation_desc: 'Best crops for your farm',
            farm_details: 'Farm Details',
            soil_type: 'Soil Type',
            select_soil_type: 'Select soil type',
            clay_soil: 'Clay Soil',
            sandy_soil: 'Sandy Soil',
            loamy_soil: 'Loamy Soil',
            black_soil: 'Black Soil',
            red_soil: 'Red Soil',
            water_availability: 'Water Availability',
            select_water_availability: 'Select water availability',
            abundant_water: 'Abundant Water',
            moderate_water: 'Moderate Water',
            limited_water: 'Limited Water',
            rainfed_only: 'Rainfed Only',
            farm_size: 'Farm Size',
            acres: 'Acres',
            enter_farm_size: 'Enter farm size',
            generating_recommendations: 'Generating recommendations...',
            recommended_crops: 'Recommended Crops',
            no_recommendations: 'No recommendations found',
            suitability: 'Suitability',
            quintals_per_acre: 'Quintals/Acre',
            quintal: 'Quintal',
            growing_season: 'Growing Season',
            water_requirement: 'Water Requirement',
            planting_time: 'Planting Time',
            harvest_time: 'Harvest Time',
            key_tips: 'Key Tips',
            
            // Disease Detection
            disease_detection: 'Disease Detection',
            disease_detection_desc: 'Identify crop diseases from photos',
            capture_crop_image: 'Capture Crop Image',
            image_analysis_desc: 'AI-powered disease and pest detection',
            take_photo: 'Take Photo',
            upload_from_gallery: 'Upload from Gallery',
            opening_camera: 'Opening camera...',
            photo_tips: 'Photo Tips',
            tip_clear_image: 'Take clear and sharp image',
            tip_good_lighting: 'Take photo in good lighting',
            tip_close_up: 'Take close-up photo',
            tip_affected_area: 'Focus on affected area',
            analyze_image: 'Analyze Image',
            analyzing: 'Analyzing...',
            retake: 'Retake',
            ai_analyzing: 'AI is analyzing',
            analysis_in_progress: 'Please wait...',
            analysis_failed: 'Analysis failed',
            try_again: 'Try again',
            confidence: 'Confidence',
            treatment_recommendations: 'Treatment Recommendations',
            dosage: 'Dosage',
            application: 'Application',
            preventive_measures: 'Preventive Measures',
            camera_feature_coming_soon: 'Camera feature coming soon',
            camera_not_available: 'Camera not available',
            
            // Weather Advisory
            weather_advisory: 'Weather Advisory',
            weather_advisory_desc: 'Weather-based farming advice',
            loading_weather: 'Loading weather information...',
            humidity: 'Humidity',
            wind_kmh: 'Wind Speed',
            pressure: 'Pressure',
            visibility: 'Visibility',
            farming_advisory: 'Farming Advisory',
            high_temperature_alert: 'High Temperature Alert',
            high_temp_advisory: 'High temperature may damage crops',
            increase_irrigation: 'Increase irrigation',
            low_temperature_alert: 'Low Temperature Alert',
            low_temp_advisory: 'Cold weather protection needed',
            protect_crops: 'Protect crops',
            rainfall_expected: 'Rainfall Expected',
            rain_advisory: 'Rain expected in coming days',
            reduce_irrigation: 'Reduce irrigation',
            dry_conditions: 'Dry Conditions',
            dry_advisory: 'Dry weather requires more irrigation',
            maintain_irrigation: 'Maintain irrigation',
            high_wind_alert: 'High Wind Alert',
            wind_advisory: 'Strong winds may damage crops',
            secure_crops: 'Secure crops',
            '5_day_forecast': '5-Day Forecast',
            today: 'Today',
            weather_load_failed: 'Failed to load weather',
            retry: 'Retry',
            
            // Education
            farming_education: 'Farming Education',
            farming_education_desc: 'Learn modern farming techniques',
            search_topics: 'Search Topics',
            all_topics: 'All Topics',
            organic_farming: 'Organic Farming',
            irrigation: 'Irrigation',
            pest_control: 'Pest Control',
            soil_management: 'Soil Management',
            harvesting: 'Harvesting',
            no_articles_found: 'No articles found',
            try_different_search: 'Try different search terms',
            organic_farming_basics: 'Organic Farming Basics',
            organic_farming_summary: 'Chemical-free farming methods',
            drip_irrigation_guide: 'Drip Irrigation Guide',
            drip_irrigation_summary: 'Water-saving irrigation method',
            natural_pest_control: 'Natural Pest Control',
            natural_pest_summary: 'Chemical-free pest control',
            beginner: 'Beginner',
            intermediate: 'Intermediate',
            advanced: 'Advanced',
            quick_tips: 'Quick Tips',
            daily_tip: 'Today\'s Tip',
            
            // Yield Prediction
            yield_prediction: 'Yield Prediction',
            yield_prediction_desc: 'Predict crop yield and income',
            crop_details: 'Crop Details',
            select_crop: 'Select Crop',
            choose_crop: 'Choose crop',
            land_size: 'Land Size',
            enter_land_size: 'Enter land size',
            farming_inputs: 'Farming Inputs',
            last_year_yield: 'Last Year\'s Yield',
            quintals: 'Quintals',
            fertilizer_quantity: 'Fertilizer Quantity',
            kg_per_acre: 'Kg/Acre',
            irrigation_quality: 'Irrigation Quality',
            select_irrigation: 'Select irrigation',
            seed_type: 'Seed Type',
            select_seed_type: 'Select seed type',
            fill_required_fields: 'Fill required fields',
            calculating: 'Calculating...',
            predict_yield: 'Predict Yield',
            prediction_complete: 'Prediction Complete',
            predicted_yield: 'Predicted Yield',
            financial_analysis: 'Financial Analysis',
            estimated_income: 'Estimated Income',
            estimated_cost: 'Estimated Cost',
            net_profit: 'Net Profit',
            profit_margin: 'Profit Margin',
            improvement_recommendations: 'Improvement Recommendations',
            new_prediction: 'New Prediction',
            increase_fertilizer_recommendation: 'Increase fertilizer usage',
            improve_irrigation_recommendation: 'Improve irrigation system',
            use_hybrid_seeds_recommendation: 'Use hybrid seeds',
            soil_testing_recommendation: 'Conduct soil testing',
            
            // Community
            farmer_community: 'Farmer Community',
            discussions: 'Discussions',
            experts: 'Experts',
            share_experience: 'Share Experience',
            whats_on_mind: 'What\'s on your mind?',
            photo: 'Photo',
            location: 'Location',
            post: 'Post',
            helpful: 'Helpful',
            reply: 'Reply',
            share: 'Share',
            get_expert_advice: 'Get Expert Advice',
            connect_with_experts: 'Connect with agricultural experts',
            available: 'Available',
            busy: 'Busy',
            chat_now: 'Chat Now',
            schedule_call: 'Schedule Call',
            need_specific_help: 'Need specific help?',
            submit_question: 'Submit your question',
            ask_question: 'Ask Question',
            
            // Schemes
            govt_schemes: 'Government Schemes',
            govt_schemes_desc: 'Government schemes for farmers',
            search_schemes: 'Search Schemes',
            all_schemes: 'All Schemes',
            subsidies: 'Subsidies',
            insurance: 'Insurance',
            loans: 'Loans',
            training: 'Training',
            equipment: 'Equipment',
            no_schemes_found: 'No schemes found',
            active: 'Active',
            expired: 'Expired',
            upcoming: 'Upcoming',
            unknown: 'Unknown',
            deadline: 'Deadline',
            amount: 'Amount',
            eligibility: 'Eligibility',
            benefits: 'Benefits',
            required_documents: 'Required Documents',
            apply_online: 'Apply Online',
            set_reminders: 'Set Reminders',
            download_forms: 'Download Forms',
            
            // Profile
            farmer_name: 'Farmer Name',
            location_not_set: 'Location not set',
            profile_completion: 'Profile Completion',
            personal_details: 'Personal Details',
            full_name: 'Full Name',
            enter_name: 'Enter name',
            mobile_number: 'Mobile Number',
            enter_mobile: 'Enter mobile number',
            enter_location: 'Enter location',
            farming_experience: 'Farming Experience',
            select_experience: 'Select experience',
            years: 'Years',
            save_profile: 'Save Profile',
            not_provided: 'Not provided',
            name: 'Name',
            mobile: 'Mobile',
            experience: 'Experience',
            language_settings: 'Language Settings',
            notification_settings: 'Notification Settings',
            weather_alerts: 'Weather Alerts',
            weather_alerts_desc: 'Receive weather warnings',
            scheme_updates: 'Scheme Updates',
            scheme_updates_desc: 'Get notified about new schemes',
            community_posts: 'Community Posts',
            community_posts_desc: 'Community activities',
            education_tips: 'Education Tips',
            education_tips_desc: 'Learn new farming methods',
            app_settings: 'App Settings',
            offline_data: 'Offline Data',
            sync_data: 'Sync Data',
            clear_cache: 'Clear Cache',
            help_support: 'Help & Support',
            user_guide: 'User Guide',
            contact_support: 'Contact Support',
            made_with: 'Made with',
            for_farmers: 'for farmers',
            profile_saved: 'Profile saved',
            
            // Quick Actions
            quick_actions: 'Quick Actions',
            scan_crop: 'Scan Crop'
        },
        
        // Marathi translations
        mr: {
            // Authentication
            'auth.login': 'लॉग इन करा',
            'auth.logout': 'लॉग आउट',
            'auth.google': 'Google ने साइन इन करा',
            'auth.welcome': 'स्वागत आहे',
            'auth.profile': 'प्रोफाइल',
            'auth.signup': 'नवीन खाते तयार करा',
            'auth.signin': 'साइन इन करा',
            'auth.or': 'किंवा',
            'auth.please_login': 'कृपया लॉग इन करा',
            'auth.login_required': 'या सुविधेसाठी लॉग इन आवश्यक आहे',
            
            loading: 'लोड होत आहे...',
            error: 'त्रुटी',
            success: 'यशस्वी',
            cancel: 'रद्द करा',
            save: 'जतन करा',
            edit: 'संपादित करा',
            delete: 'हटवा',
            back: 'परत',
            next: 'पुढे',
            previous: 'मागील',
            close: 'बंद करा',
            open: 'उघडा',
            yes: 'होय',
            no: 'नाही',
            ok: 'ठीक आहे',
            
            // App specific
            farmers_friend: 'शेतकऱ्याचा मित्र',
            'app.subtitle': 'तुमचा स्मार्ट शेती सहकारी',
            home: 'मुख्यपृष्ठ',
            profile: 'प्रोफाइल',
            
            // Navigation
            crops: 'पिके',
            weather: 'हवामान',
            community: 'समुदाय',
            
            // Location
            location_required: 'स्थान आवश्यक',
            set_location: 'स्थान सेट करा',
            change: 'बदला',
            location_permission_denied: 'स्थान परवानगी नाकारली',
            geolocation_not_supported: 'भौगोलिक स्थान समर्थित नाही',
            getting_location: 'स्थान मिळवत आहे...',
            get_current_location: 'सध्याचे स्थान मिळवा',
            use_current_location: 'सध्याचे स्थान वापरा',
            location_permission_desc: 'अचूक हवामान आणि पीक सूचनांसाठी',
            enter_manually: 'स्वतः प्रविष्ट करा',
            location_name: 'स्थानाचे नाव',
            optional: 'पर्यायी',
            enter_location_name: 'स्थानाचे नाव प्रविष्ट करा',
            latitude: 'अक्षांश',
            longitude: 'रेखांश',
            enter_valid_coordinates: 'वैध निर्देशांक प्रविष्ट करा',
            invalid_coordinates: 'अवैध निर्देशांक',
            popular_locations: 'लोकप्रिय स्थाने',
            set_location_first: 'प्रथम तुमचे स्थान सेट करा',
            
            // Crop Recommendation
            crop_recommendation: 'पीक शिफारस',
            crop_recommendation_desc: 'तुमच्या शेतासाठी सर्वोत्तम पिके',
            farm_details: 'शेत तपशील',
            soil_type: 'मातीचा प्रकार',
            select_soil_type: 'मातीचा प्रकार निवडा',
            clay_soil: 'चिकणमाती',
            sandy_soil: 'वालुकामाती',
            loamy_soil: 'दोनमाती',
            black_soil: 'काळी माती',
            red_soil: 'लाल माती',
            water_availability: 'पाण्याची उपलब्धता',
            select_water_availability: 'पाण्याची उपलब्धता निवडा',
            abundant_water: 'भरपूर पाणी',
            moderate_water: 'मध्यम पाणी',
            limited_water: 'मर्यादित पाणी',
            rainfed_only: 'केवळ पर्जन्यावर आधारित',
            farm_size: 'शेताचा आकार',
            acres: 'एकर',
            enter_farm_size: 'शेताचा आकार प्रविष्ट करा',
            
            // Disease Detection
            disease_detection: 'रोग ओळख',
            disease_detection_desc: 'फोटोवरून पीक रोगांची ओळख',
            
            // Weather Advisory
            weather_advisory: 'हवामान सल्ला',
            weather_advisory_desc: 'हवामान आधारित शेती सल्ला',
            
            // Education
            farming_education: 'शेती शिक्षण',
            farming_education_desc: 'आधुनिक शेती तंत्र शिका',
            
            // Yield Prediction
            yield_prediction: 'उत्पादन अंदाज',
            yield_prediction_desc: 'पीक उत्पादन आणि उत्पन्नाचा अंदाज',
            
            // Community
            farmer_community: 'शेतकरी समुदाय',
            community: 'समुदाय',
            community_desc: 'शेतकऱ्यांशी जुळवून घ्या',
            
            // Schemes
            govt_schemes: 'सरकारी योजना',
            govt_schemes_desc: 'शेतकऱ्यांसाठी सरकारी योजना',
            
            // Quick Actions
            quick_actions: 'त्वरित क्रिया',
            scan_crop: 'पीक स्कॅन करा'
        },
        
        // Punjabi translations
        pa: {
            // Authentication
            'auth.login': 'ਲਾਗ ਇਨ ਕਰੋ',
            'auth.logout': 'ਲਾਗ ਆਉਟ',
            'auth.google': 'Google ਨਾਲ ਸਾਈਨ ਇਨ ਕਰੋ',
            'auth.welcome': 'ਸੁਆਗਤ ਹੈ',
            'auth.profile': 'ਪ੍ਰੋਫਾਈਲ',
            'auth.signup': 'ਨਵਾਂ ਖਾਤਾ ਬਣਾਓ',
            'auth.signin': 'ਸਾਈਨ ਇਨ ਕਰੋ',
            'auth.or': 'ਜਾਂ',
            'auth.please_login': 'ਕਿਰਪਾ ਕਰਕੇ ਲਾਗ ਇਨ ਕਰੋ',
            'auth.login_required': 'ਇਸ ਸੁਵਿਧਾ ਲਈ ਲਾਗ ਇਨ ਦੀ ਲੋੜ ਹੈ',
            
            loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
            error: 'ਗਲਤੀ',
            success: 'ਸਫਲ',
            cancel: 'ਰੱਦ ਕਰੋ',
            save: 'ਸੇਵ ਕਰੋ',
            edit: 'ਸੰਪਾਦਿਤ ਕਰੋ',
            delete: 'ਮਿਟਾਓ',
            back: 'ਵਾਪਸ',
            next: 'ਅੱਗੇ',
            previous: 'ਪਿਛਲਾ',
            close: 'ਬੰਦ ਕਰੋ',
            open: 'ਖੋਲੋ',
            yes: 'ਹਾਂ',
            no: 'ਨਹੀਂ',
            ok: 'ਠੀਕ ਹੈ',
            
            // App specific
            farmers_friend: 'ਕਿਸਾਨ ਦਾ ਮਿੱਤਰ',
            'app.subtitle': 'ਤੁਹਾਡਾ ਸਮਾਰਟ ਫਾਰਮਿੰਗ ਸਾਥੀ',
            home: 'ਘਰ',
            profile: 'ਪ੍ਰੋਫਾਈਲ',
            
            // Navigation
            crops: 'ਫਸਲਾਂ',
            weather: 'ਮੌਸਮ',
            community: 'ਕਮਿਊਨਿਟੀ',
            
            // Location
            location_required: 'ਸਥਾਨ ਦੀ ਲੋੜ ਹੈ',
            set_location: 'ਸਥਾਨ ਸੈੱਟ ਕਰੋ',
            change: 'ਬਦਲੋ',
            location_permission_denied: 'ਸਥਾਨ ਦੀ ਇਜਾਜ਼ਤ ਨਾਂਹ',
            geolocation_not_supported: 'ਭੂਗੋਲਿਕ ਸਥਾਨ ਸਮਰਥਿਤ ਨਹੀਂ',
            getting_location: 'ਸਥਾਨ ਪ੍ਰਾਪਤ ਕਰ ਰਹੇ ਹਾਂ...',
            get_current_location: 'ਮੌਜੂਦਾ ਸਥਾਨ ਪ੍ਰਾਪਤ ਕਰੋ',
            use_current_location: 'ਮੌਜੂਦਾ ਸਥਾਨ ਵਰਤੋ',
            location_permission_desc: 'ਸਹੀ ਮੌਸਮ ਅਤੇ ਫਸਲ ਸੁਝਾਵਾਂ ਲਈ',
            enter_manually: 'ਖੁਦ ਦਾਖਲ ਕਰੋ',
            location_name: 'ਸਥਾਨ ਦਾ ਨਾਮ',
            optional: 'ਵਿਕਲਪਿਕ',
            enter_location_name: 'ਸਥਾਨ ਦਾ ਨਾਮ ਦਾਖਲ ਕਰੋ',
            latitude: 'ਅਕਸ਼ਾਂਸ਼',
            longitude: 'ਰੇਖਾਂਸ਼',
            enter_valid_coordinates: 'ਵੈਧ ਨਿਰਦੇਸ਼ਾਂਕ ਦਾਖਲ ਕਰੋ',
            invalid_coordinates: 'ਅਵੈਧ ਨਿਰਦੇਸ਼ਾਂਕ',
            popular_locations: 'ਪ੍ਰਸਿੱਧ ਸਥਾਨ',
            set_location_first: 'ਪਹਿਲਾਂ ਆਪਣਾ ਸਥਾਨ ਸੈੱਟ ਕਰੋ',
            
            // Crop Recommendation
            crop_recommendation: 'ਫਸਲ ਸਿਫਾਰਸ਼',
            crop_recommendation_desc: 'ਤੁਹਾਡੇ ਖੇਤ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਫਸਲਾਂ',
            farm_details: 'ਖੇਤ ਵੇਰਵੇ',
            soil_type: 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ',
            select_soil_type: 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਚੁਣੋ',
            clay_soil: 'ਚਿਕਨੀ ਮਿੱਟੀ',
            sandy_soil: 'ਰੇਤਲੀ ਮਿੱਟੀ',
            loamy_soil: 'ਦੋਮਟ ਮਿੱਟੀ',
            black_soil: 'ਕਾਲੀ ਮਿੱਟੀ',
            red_soil: 'ਲਾਲ ਮਿੱਟੀ',
            water_availability: 'ਪਾਣੀ ਦੀ ਉਪਲਬਧਤਾ',
            select_water_availability: 'ਪਾਣੀ ਦੀ ਉਪਲਬਧਤਾ ਚੁਣੋ',
            abundant_water: 'ਭਰਪੂਰ ਪਾਣੀ',
            moderate_water: 'ਮੱਧਮ ਪਾਣੀ',
            limited_water: 'ਸੀਮਤ ਪਾਣੀ',
            rainfed_only: 'ਸਿਰਫ਼ ਬਰਸਾਤ ਆਧਾਰਿਤ',
            farm_size: 'ਖੇਤ ਦਾ ਆਕਾਰ',
            acres: 'ਏਕੜ',
            enter_farm_size: 'ਖੇਤ ਦਾ ਆਕਾਰ ਦਾਖਲ ਕਰੋ',
            
            // Disease Detection
            disease_detection: 'ਰੋਗ ਪਹਿਚਾਣ',
            disease_detection_desc: 'ਫੋਟੋ ਤੋਂ ਫਸਲ ਰੋਗਾਂ ਦੀ ਪਹਿਚਾਣ',
            
            // Weather Advisory
            weather_advisory: 'ਮੌਸਮ ਸਲਾਹ',
            weather_advisory_desc: 'ਮੌਸਮ ਅਧਾਰਿਤ ਖੇਤੀ ਸਲਾਹ',
            
            // Education
            farming_education: 'ਖੇਤੀ ਸਿੱਖਿਆ',
            farming_education_desc: 'ਆਧੁਨਿਕ ਖੇਤੀ ਤਕਨੀਕ ਸਿੱਖੋ',
            
            // Yield Prediction
            yield_prediction: 'ਪੈਦਾਵਾਰ ਦਾ ਅਨੁਮਾਨ',
            yield_prediction_desc: 'ਫਸਲ ਪੈਦਾਵਾਰ ਅਤੇ ਆਮਦਨ ਦਾ ਅਨੁਮਾਨ',
            
            // Community
            farmer_community: 'ਕਿਸਾਨ ਭਾਈਚਾਰਾ',
            community: 'ਭਾਈਚਾਰਾ',
            community_desc: 'ਕਿਸਾਨਾਂ ਨਾਲ ਜੁੜੋ',
            
            // Schemes
            govt_schemes: 'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ',
            govt_schemes_desc: 'ਕਿਸਾਨਾਂ ਲਈ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ',
            
            // Quick Actions
            quick_actions: 'ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ',
            scan_crop: 'ਫਸਲ ਸਕੈਨ ਕਰੋ'
        }
    },

    // Set current language and persist it
    setLanguage(languageCode) {
        this.currentLanguage = languageCode;
        localStorage.setItem('app_language', languageCode);
        
        // Trigger language change event for components to update
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: languageCode } 
        }));
    },

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    },

    // Get translation
    get(key, language = null) {
        const lang = language || this.currentLanguage;
        
        if (this.data[lang] && this.data[lang][key]) {
            return this.data[lang][key];
        }
        
        // Fallback to Hindi if key not found in selected language
        if (lang !== 'hi' && this.data['hi'] && this.data['hi'][key]) {
            return this.data['hi'][key];
        }
        
        // If key not found anywhere, return the key itself
        return key;
    },

    // Shorthand method for getting translations
    t(key, language = null) {
        return this.get(key, language);
    },

    // Set translation
    set(key, value, language = 'hi') {
        if (!this.data[language]) {
            this.data[language] = {};
        }
        this.data[language][key] = value;
    },

    // Add new language
    addLanguage(languageCode, translations) {
        this.data[languageCode] = translations;
    },

    // Get all available languages
    getAvailableLanguages() {
        return Object.keys(this.data);
    },

    // Check if language is supported
    isLanguageSupported(languageCode) {
        return this.data.hasOwnProperty(languageCode);
    },

    // Get language name
    getLanguageName(languageCode) {
        const languageNames = {
            'hi': 'हिंदी',
            'en': 'English',
            'mr': 'मराठी',
            'pa': 'ਪੰਜਾਬੀ',
            'gu': 'ગુજરાતી',
            'ta': 'தமிழ்',
            'te': 'తెలుగు',
            'bn': 'বাংলা',
            'ml': 'മലയാളം',
            'kn': 'ಕನ್ನಡ',
            'or': 'ଓଡ଼ିଆ',
            'as': 'অসমীয়া'
        };
        
        return languageNames[languageCode] || languageCode;
    },

    // Format text with variables
    format(key, variables = {}, language = 'hi') {
        let text = this.get(key, language);
        
        // Replace variables in the format {variableName}
        Object.keys(variables).forEach(variable => {
            const regex = new RegExp(`{${variable}}`, 'g');
            text = text.replace(regex, variables[variable]);
        });
        
        return text;
    },

    // Pluralization helper (basic implementation)
    plural(key, count, language = 'hi') {
        const pluralKey = count === 1 ? key : `${key}_plural`;
        return this.get(pluralKey, language);
    },

    // Load translations from external source
    async loadTranslations(languageCode, url) {
        try {
            const response = await fetch(url);
            const translations = await response.json();
            this.addLanguage(languageCode, translations);
            return true;
        } catch (error) {
            console.error('Error loading translations:', error);
            return false;
        }
    },

    // Export translations
    exportTranslations(languageCode) {
        if (this.data[languageCode]) {
            return JSON.stringify(this.data[languageCode], null, 2);
        }
        return null;
    },

    // Import translations
    importTranslations(languageCode, translationsJson) {
        try {
            const translations = JSON.parse(translationsJson);
            this.addLanguage(languageCode, translations);
            return true;
        } catch (error) {
            console.error('Error importing translations:', error);
            return false;
        }
    }
};

window.Translations = Translations;
