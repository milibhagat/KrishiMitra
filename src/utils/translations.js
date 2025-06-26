const Translations = {
    // Translation data
    data: {
        // Common translations
        hi: {
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
            
            // Add more English translations as needed...
            // For brevity, I'm showing the pattern. In a real app, all keys would be translated.
        }
    },

    // Get translation
    get(key, language = 'hi') {
        if (this.data[language] && this.data[language][key]) {
            return this.data[language][key];
        }
        
        // Fallback to Hindi if key not found in selected language
        if (language !== 'hi' && this.data['hi'] && this.data['hi'][key]) {
            return this.data['hi'][key];
        }
        
        // If key not found anywhere, return the key itself
        return key;
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
