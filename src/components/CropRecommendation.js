function CropRecommendation({ t, location, onBack }) {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [soilType, setSoilType] = useState('');
    const [waterAvailability, setWaterAvailability] = useState('');
    const [farmSize, setFarmSize] = useState('');
    const [selectedCrop, setSelectedCrop] = useState(null);

    useEffect(() => {
        if (location) {
            generateRecommendations();
        } else {
            setLoading(false);
        }
    }, [location, soilType, waterAvailability, farmSize]);

    const generateRecommendations = async () => {
        setLoading(true);
        try {
            const weather = await APIService.getWeather(location.lat, location.lng);
            const crops = CropsData.getRecommendations({
                location,
                weather,
                soilType,
                waterAvailability,
                farmSize
            });
            
            setRecommendations(crops);
        } catch (error) {
            console.error('Error generating recommendations:', error);
            setRecommendations([]);
        } finally {
            setLoading(false);
        }
    };

    if (!location) {
        return (
            <div className="crop-recommendation">
                <div className="header">
                    <div className="d-flex align-items-center p-3">
                        <button className="btn btn-light btn-sm me-3" onClick={onBack}>
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <h5 className="mb-0 text-white">{t('crop_recommendation')}</h5>
                    </div>
                </div>
                
                <div className="p-3">
                    <div className="alert alert-warning text-center">
                        <i className="fas fa-map-marker-alt mb-3" style={{ fontSize: '3rem' }}></i>
                        <h6>{t('location_required')}</h6>
                        <p className="mb-0">{t('set_location_first')}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="crop-recommendation">
            {/* Header */}
            <div className="header">
                <div className="d-flex align-items-center p-3">
                    <button className="btn btn-light btn-sm me-3" onClick={onBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h5 className="mb-0 text-white">{t('crop_recommendation')}</h5>
                </div>
            </div>

            <div className="p-3">
                {/* Input Form */}
                <div className="card mb-4">
                    <div className="card-body">
                        <h6 className="mb-3">
                            <i className="fas fa-clipboard-list me-2"></i>
                            {t('farm_details')}
                        </h6>

                        <div className="mb-3">
                            <label className="form-label">{t('soil_type')}</label>
                            <select 
                                className="form-select form-select-lg"
                                value={soilType}
                                onChange={(e) => setSoilType(e.target.value)}
                            >
                                <option value="">{t('select_soil_type')}</option>
                                <option value="clay">{t('clay_soil')}</option>
                                <option value="sandy">{t('sandy_soil')}</option>
                                <option value="loamy">{t('loamy_soil')}</option>
                                <option value="black">{t('black_soil')}</option>
                                <option value="red">{t('red_soil')}</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">{t('water_availability')}</label>
                            <select 
                                className="form-select form-select-lg"
                                value={waterAvailability}
                                onChange={(e) => setWaterAvailability(e.target.value)}
                            >
                                <option value="">{t('select_water_availability')}</option>
                                <option value="high">{t('abundant_water')}</option>
                                <option value="medium">{t('moderate_water')}</option>
                                <option value="low">{t('limited_water')}</option>
                                <option value="rainfed">{t('rainfed_only')}</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">{t('farm_size')} ({t('acres')})</label>
                            <input 
                                type="number"
                                className="form-control form-control-lg"
                                placeholder={t('enter_farm_size')}
                                value={farmSize}
                                onChange={(e) => setFarmSize(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-success mb-3" role="status"></div>
                        <p>{t('generating_recommendations')}</p>
                    </div>
                ) : (
                    <div className="recommendations">
                        <h6 className="mb-3">
                            <i className="fas fa-seedling me-2"></i>
                            {t('recommended_crops')}
                        </h6>

                        {recommendations.length === 0 ? (
                            <div className="alert alert-info text-center">
                                <i className="fas fa-info-circle mb-2" style={{ fontSize: '2rem' }}></i>
                                <p className="mb-0">{t('no_recommendations')}</p>
                            </div>
                        ) : (
                            <div className="row g-3">
                                {recommendations.map((crop, index) => (
                                    <div key={index} className="col-12">
                                        <div 
                                            className={`card crop-card ${selectedCrop === index ? 'selected' : ''}`}
                                            onClick={() => setSelectedCrop(selectedCrop === index ? null : index)}
                                        >
                                            <div className="card-body">
                                                <div className="d-flex align-items-start">
                                                    <div className="crop-icon me-3">
                                                        <i className={crop.icon} style={{ 
                                                            fontSize: '2rem', 
                                                            color: crop.color 
                                                        }}></i>
                                                    </div>
                                                    
                                                    <div className="flex-grow-1">
                                                        <div className="d-flex justify-content-between align-items-start">
                                                            <div>
                                                                <h6 className="mb-1">{crop.name}</h6>
                                                                <p className="text-muted small mb-2">{crop.description}</p>
                                                                <div className="suitability-score">
                                                                    <small className="text-success fw-bold">
                                                                        {t('suitability')}: {crop.suitability}%
                                                                    </small>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="text-end">
                                                                <div className="expected-yield text-success">
                                                                    <small className="fw-bold">
                                                                        {crop.expectedYield} {t('quintals_per_acre')}
                                                                    </small>
                                                                </div>
                                                                <div className="market-price text-primary">
                                                                    <small>
                                                                        ₹{crop.marketPrice}/{t('quintal')}
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {selectedCrop === index && (
                                                            <div className="crop-details mt-3 pt-3 border-top">
                                                                <div className="row g-3">
                                                                    <div className="col-6">
                                                                        <strong>{t('growing_season')}:</strong>
                                                                        <br />
                                                                        <span className="text-muted">{crop.season}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <strong>{t('water_requirement')}:</strong>
                                                                        <br />
                                                                        <span className="text-muted">{crop.waterReq}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <strong>{t('planting_time')}:</strong>
                                                                        <br />
                                                                        <span className="text-muted">{crop.plantingTime}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <strong>{t('harvest_time')}:</strong>
                                                                        <br />
                                                                        <span className="text-muted">{crop.harvestTime}</span>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="mt-3">
                                                                    <strong>{t('key_tips')}:</strong>
                                                                    <ul className="mt-2 mb-0">
                                                                        {crop.tips.map((tip, tipIndex) => (
                                                                            <li key={tipIndex} className="small text-muted">
                                                                                {tip}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

window.CropRecommendation = CropRecommendation;
