const { useState, useEffect } = React;

function App() {
    const [currentView, setCurrentView] = useState('home');
    const [language, setLanguage] = useState('hi');
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize app
        const initApp = async () => {
            try {
                // Load saved language preference
                const savedLang = StorageUtils.getItem('language') || 'hi';
                setLanguage(savedLang);
                
                // Load saved location
                const savedLocation = StorageUtils.getItem('location');
                if (savedLocation) {
                    setLocation(JSON.parse(savedLocation));
                }
                
                setLoading(false);
            } catch (error) {
                console.error('App initialization error:', error);
                setLoading(false);
            }
        };

        initApp();
    }, []);

    const t = (key) => Translations.get(key, language);

    const handleLocationSet = (newLocation) => {
        setLocation(newLocation);
        StorageUtils.setItem('location', JSON.stringify(newLocation));
    };

    const handleLanguageChange = (newLang) => {
        setLanguage(newLang);
        StorageUtils.setItem('language', newLang);
    };

    if (loading) {
        return (
            <div className="app-container">
                <div className="loading">
                    <div className="spinner-border me-3" role="status"></div>
                    {t('loading')}
                </div>
            </div>
        );
    }

    const renderCurrentView = () => {
        switch (currentView) {
            case 'home':
                return <HomeView 
                    t={t} 
                    location={location} 
                    onNavigate={setCurrentView}
                    onLocationSet={handleLocationSet}
                />;
            case 'location':
                return <LocationPicker 
                    t={t} 
                    onLocationSet={handleLocationSet}
                    onBack={() => setCurrentView('home')}
                />;
            case 'crops':
                return <CropRecommendation 
                    t={t} 
                    location={location}
                    onBack={() => setCurrentView('home')}
                />;
            case 'disease':
                return <DiseaseDetection 
                    t={t}
                    onBack={() => setCurrentView('home')}
                />;
            case 'weather':
                return <WeatherAdvisory 
                    t={t} 
                    location={location}
                    onBack={() => setCurrentView('home')}
                />;
            case 'education':
                return <Education 
                    t={t}
                    onBack={() => setCurrentView('home')}
                />;
            case 'yield':
                return <YieldPredictor 
                    t={t} 
                    location={location}
                    onBack={() => setCurrentView('home')}
                />;
            case 'community':
                return <Community 
                    t={t}
                    onBack={() => setCurrentView('home')}
                />;
            case 'schemes':
                return <Schemes 
                    t={t}
                    onBack={() => setCurrentView('home')}
                />;
            case 'profile':
                return <Profile 
                    t={t}
                    language={language}
                    onLanguageChange={handleLanguageChange}
                    onBack={() => setCurrentView('home')}
                />;
            default:
                return <HomeView 
                    t={t} 
                    location={location} 
                    onNavigate={setCurrentView}
                    onLocationSet={handleLocationSet}
                />;
        }
    };

    return (
        <div className="app-container">
            <link rel="stylesheet" href="src/styles/App.css" />
            {renderCurrentView()}
            {currentView === 'home' && (
                <Navigation 
                    t={t} 
                    currentView={currentView} 
                    onNavigate={setCurrentView} 
                />
            )}
        </div>
    );
}

// Home View Component
function HomeView({ t, location, onNavigate, onLocationSet }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    const features = [
        {
            id: 'crops',
            icon: 'fas fa-seedling',
            title: t('crop_recommendation'),
            description: t('crop_recommendation_desc'),
            color: '#4CAF50'
        },
        {
            id: 'disease',
            icon: 'fas fa-microscope',
            title: t('disease_detection'),
            description: t('disease_detection_desc'),
            color: '#FF9800'
        },
        {
            id: 'weather',
            icon: 'fas fa-cloud-sun',
            title: t('weather_advisory'),
            description: t('weather_advisory_desc'),
            color: '#2196F3'
        },
        {
            id: 'education',
            icon: 'fas fa-graduation-cap',
            title: t('farming_education'),
            description: t('farming_education_desc'),
            color: '#9C27B0'
        },
        {
            id: 'yield',
            icon: 'fas fa-chart-line',
            title: t('yield_prediction'),
            description: t('yield_prediction_desc'),
            color: '#FF5722'
        },
        {
            id: 'community',
            icon: 'fas fa-users',
            title: t('community'),
            description: t('community_desc'),
            color: '#795548'
        },
        {
            id: 'schemes',
            icon: 'fas fa-file-contract',
            title: t('govt_schemes'),
            description: t('govt_schemes_desc'),
            color: '#607D8B'
        }
    ];

    return (
        <div className="home-view">
            {/* Header */}
            <div className="header">
                <div className="d-flex justify-content-between align-items-center p-3">
                    <div>
                        <h4 className="mb-0 text-white fw-bold">
                            <i className="fas fa-leaf me-2"></i>
                            KrishiMitra
                        </h4>
                        <small className="text-light opacity-75">
                            {t('farmers_friend')}
                        </small>
                    </div>
                    <button 
                        className="btn btn-light btn-sm rounded-pill"
                        onClick={() => onNavigate('profile')}
                    >
                        <i className="fas fa-user me-1"></i>
                        {t('profile')}
                    </button>
                </div>
            </div>

            {/* Location Status */}
            <div className="location-status p-3">
                {location ? (
                    <div className="d-flex align-items-center text-success">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        <span>{location.name || `${location.lat.toFixed(2)}, ${location.lng.toFixed(2)}`}</span>
                        <button 
                            className="btn btn-outline-success btn-sm ms-auto"
                            onClick={() => onNavigate('location')}
                        >
                            {t('change')}
                        </button>
                    </div>
                ) : (
                    <div className="alert alert-warning d-flex align-items-center">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        <span className="flex-grow-1">{t('location_required')}</span>
                        <button 
                            className="btn btn-warning btn-sm"
                            onClick={() => onNavigate('location')}
                        >
                            {t('set_location')}
                        </button>
                    </div>
                )}
            </div>

            {/* Time Display */}
            <div className="time-display p-3">
                <div className="text-center">
                    <h5 className="mb-1">{currentTime.toLocaleTimeString('hi-IN')}</h5>
                    <small className="text-muted">
                        {currentTime.toLocaleDateString('hi-IN', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </small>
                </div>
            </div>

            {/* Features Grid */}
            <div className="features-grid p-3">
                <div className="row g-3">
                    {features.map((feature) => (
                        <div key={feature.id} className="col-6">
                            <div 
                                className="feature-card h-100 p-3 text-center border-0 shadow-sm"
                                onClick={() => onNavigate(feature.id)}
                                style={{ backgroundColor: feature.color + '10', cursor: 'pointer' }}
                            >
                                <div 
                                    className="feature-icon mb-2"
                                    style={{ color: feature.color }}
                                >
                                    <i className={feature.icon} style={{ fontSize: '2rem' }}></i>
                                </div>
                                <h6 className="mb-1" style={{ color: feature.color }}>
                                    {feature.title}
                                </h6>
                                <small className="text-muted">
                                    {feature.description}
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions p-3">
                <h6 className="mb-3">{t('quick_actions')}</h6>
                <div className="d-flex gap-2">
                    <button 
                        className="btn btn-success flex-fill"
                        onClick={() => onNavigate('disease')}
                    >
                        <i className="fas fa-camera me-2"></i>
                        {t('scan_crop')}
                    </button>
                    <button 
                        className="btn btn-info flex-fill"
                        onClick={() => onNavigate('weather')}
                    >
                        <i className="fas fa-cloud me-2"></i>
                        {t('weather')}
                    </button>
                </div>
            </div>
        </div>
    );
}

window.App = App;
