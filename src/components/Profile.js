function Profile({ t, language, onLanguageChange, onBack }) {
    const [userData, setUserData] = useState({
        name: '',
        mobile: '',
        location: '',
        farmSize: '',
        crops: [],
        experience: ''
    });
    const [editing, setEditing] = useState(false);
    const [notifications, setNotifications] = useState({
        weather: true,
        schemes: true,
        community: false,
        education: true
    });

    const languages = [
        { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
        { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
        { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
        { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
    ];

    useEffect(() => {
        // Load user data from storage
        const savedUserData = StorageUtils.getItem('userData');
        if (savedUserData) {
            setUserData(JSON.parse(savedUserData));
        }

        const savedNotifications = StorageUtils.getItem('notifications');
        if (savedNotifications) {
            setNotifications(JSON.parse(savedNotifications));
        }
    }, []);

    const handleSaveProfile = () => {
        StorageUtils.setItem('userData', JSON.stringify(userData));
        setEditing(false);
        alert(t('profile_saved'));
    };

    const handleNotificationChange = (key, value) => {
        const newNotifications = { ...notifications, [key]: value };
        setNotifications(newNotifications);
        StorageUtils.setItem('notifications', JSON.stringify(newNotifications));
    };

    const handleInputChange = (field, value) => {
        setUserData(prev => ({ ...prev, [field]: value }));
    };

    const getProfileCompletion = () => {
        const fields = ['name', 'mobile', 'location', 'farmSize'];
        const completed = fields.filter(field => userData[field]).length;
        return Math.round((completed / fields.length) * 100);
    };

    return (
        <div className="profile">
            {/* Header */}
            <div className="header">
                <div className="d-flex align-items-center p-3">
                    <button className="btn btn-light btn-sm me-3" onClick={onBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h5 className="mb-0 text-white">{t('profile')}</h5>
                    <button 
                        className="btn btn-light btn-sm ms-auto"
                        onClick={() => setEditing(!editing)}
                    >
                        <i className={`fas ${editing ? 'fa-times' : 'fa-edit'}`}></i>
                    </button>
                </div>
            </div>

            <div className="p-3">
                {/* Profile Header */}
                <div className="card mb-4">
                    <div className="card-body text-center">
                        <div className="profile-avatar mb-3">
                            <div className="bg-success text-white rounded-circle mx-auto d-flex align-items-center justify-content-center" 
                                 style={{ width: '80px', height: '80px' }}>
                                <i className="fas fa-user" style={{ fontSize: '2rem' }}></i>
                            </div>
                        </div>
                        
                        <h5 className="mb-1">{userData.name || t('farmer_name')}</h5>
                        <p className="text-muted mb-3">{userData.location || t('location_not_set')}</p>
                        
                        {/* Profile Completion */}
                        <div className="profile-completion">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <small className="text-muted">{t('profile_completion')}</small>
                                <small className="text-success fw-bold">{getProfileCompletion()}%</small>
                            </div>
                            <div className="progress" style={{ height: '6px' }}>
                                <div 
                                    className="progress-bar bg-success" 
                                    style={{ width: `${getProfileCompletion()}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="mb-0">
                                <i className="fas fa-user me-2"></i>
                                {t('personal_details')}
                            </h6>
                            {!editing && (
                                <button 
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => setEditing(true)}
                                >
                                    <i className="fas fa-edit me-1"></i>
                                    {t('edit')}
                                </button>
                            )}
                        </div>

                        {editing ? (
                            <div className="edit-form">
                                <div className="mb-3">
                                    <label className="form-label">{t('full_name')}</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder={t('enter_name')}
                                        value={userData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">{t('mobile_number')}</label>
                                    <input 
                                        type="tel"
                                        className="form-control"
                                        placeholder={t('enter_mobile')}
                                        value={userData.mobile}
                                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">{t('location')}</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder={t('enter_location')}
                                        value={userData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">{t('farm_size')} ({t('acres')})</label>
                                    <input 
                                        type="number"
                                        className="form-control"
                                        placeholder={t('enter_farm_size')}
                                        value={userData.farmSize}
                                        onChange={(e) => handleInputChange('farmSize', e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">{t('farming_experience')}</label>
                                    <select 
                                        className="form-select"
                                        value={userData.experience}
                                        onChange={(e) => handleInputChange('experience', e.target.value)}
                                    >
                                        <option value="">{t('select_experience')}</option>
                                        <option value="0-2">0-2 {t('years')}</option>
                                        <option value="3-5">3-5 {t('years')}</option>
                                        <option value="6-10">6-10 {t('years')}</option>
                                        <option value="10+">10+ {t('years')}</option>
                                    </select>
                                </div>

                                <div className="d-grid gap-2">
                                    <button 
                                        className="btn btn-success"
                                        onClick={handleSaveProfile}
                                    >
                                        <i className="fas fa-save me-2"></i>
                                        {t('save_profile')}
                                    </button>
                                    <button 
                                        className="btn btn-outline-secondary"
                                        onClick={() => setEditing(false)}
                                    >
                                        {t('cancel')}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="profile-info">
                                <div className="info-item d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted">{t('name')}</span>
                                    <span>{userData.name || t('not_provided')}</span>
                                </div>
                                <div className="info-item d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted">{t('mobile')}</span>
                                    <span>{userData.mobile || t('not_provided')}</span>
                                </div>
                                <div className="info-item d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted">{t('location')}</span>
                                    <span>{userData.location || t('not_provided')}</span>
                                </div>
                                <div className="info-item d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted">{t('farm_size')}</span>
                                    <span>{userData.farmSize ? `${userData.farmSize} ${t('acres')}` : t('not_provided')}</span>
                                </div>
                                <div className="info-item d-flex justify-content-between py-2">
                                    <span className="text-muted">{t('experience')}</span>
                                    <span>{userData.experience || t('not_provided')}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Language Settings */}
                <div className="card mb-4">
                    <div className="card-body">
                        <h6 className="mb-3">
                            <i className="fas fa-language me-2"></i>
                            {t('language_settings')}
                        </h6>
                        
                        <div className="language-options">
                            {languages.map(lang => (
                                <div key={lang.code} className="form-check mb-2">
                                    <input 
                                        className="form-check-input"
                                        type="radio"
                                        name="language"
                                        id={`lang-${lang.code}`}
                                        checked={language === lang.code}
                                        onChange={() => onLanguageChange(lang.code)}
                                    />
                                    <label className="form-check-label" htmlFor={`lang-${lang.code}`}>
                                        <span className="me-2">{lang.flag}</span>
                                        {lang.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="card mb-4">
                    <div className="card-body">
                        <h6 className="mb-3">
                            <i className="fas fa-bell me-2"></i>
                            {t('notification_settings')}
                        </h6>
                        
                        <div className="notification-options">
                            <div className="d-flex justify-content-between align-items-center py-2">
                                <div>
                                    <div className="fw-bold">{t('weather_alerts')}</div>
                                    <small className="text-muted">{t('weather_alerts_desc')}</small>
                                </div>
                                <div className="form-check form-switch">
                                    <input 
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={notifications.weather}
                                        onChange={(e) => handleNotificationChange('weather', e.target.checked)}
                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center py-2">
                                <div>
                                    <div className="fw-bold">{t('scheme_updates')}</div>
                                    <small className="text-muted">{t('scheme_updates_desc')}</small>
                                </div>
                                <div className="form-check form-switch">
                                    <input 
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={notifications.schemes}
                                        onChange={(e) => handleNotificationChange('schemes', e.target.checked)}
                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center py-2">
                                <div>
                                    <div className="fw-bold">{t('community_posts')}</div>
                                    <small className="text-muted">{t('community_posts_desc')}</small>
                                </div>
                                <div className="form-check form-switch">
                                    <input 
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={notifications.community}
                                        onChange={(e) => handleNotificationChange('community', e.target.checked)}
                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center py-2">
                                <div>
                                    <div className="fw-bold">{t('education_tips')}</div>
                                    <small className="text-muted">{t('education_tips_desc')}</small>
                                </div>
                                <div className="form-check form-switch">
                                    <input 
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={notifications.education}
                                        onChange={(e) => handleNotificationChange('education', e.target.checked)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* App Settings */}
                <div className="card mb-4">
                    <div className="card-body">
                        <h6 className="mb-3">
                            <i className="fas fa-cog me-2"></i>
                            {t('app_settings')}
                        </h6>
                        
                        <div className="setting-options">
                            <button className="btn btn-outline-primary w-100 mb-2">
                                <i className="fas fa-download me-2"></i>
                                {t('offline_data')}
                            </button>
                            
                            <button className="btn btn-outline-info w-100 mb-2">
                                <i className="fas fa-sync me-2"></i>
                                {t('sync_data')}
                            </button>
                            
                            <button className="btn btn-outline-warning w-100 mb-2">
                                <i className="fas fa-trash me-2"></i>
                                {t('clear_cache')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Support */}
                <div className="card">
                    <div className="card-body">
                        <h6 className="mb-3">
                            <i className="fas fa-question-circle me-2"></i>
                            {t('help_support')}
                        </h6>
                        
                        <div className="support-options">
                            <button className="btn btn-outline-secondary w-100 mb-2">
                                <i className="fas fa-book me-2"></i>
                                {t('user_guide')}
                            </button>
                            
                            <button className="btn btn-outline-secondary w-100 mb-2">
                                <i className="fas fa-envelope me-2"></i>
                                {t('contact_support')}
                            </button>
                            
                            <div className="text-center mt-3">
                                <small className="text-muted">
                                    KrishiMitra v1.0.0
                                    <br />
                                    {t('made_with')} ❤️ {t('for_farmers')}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.Profile = Profile;
