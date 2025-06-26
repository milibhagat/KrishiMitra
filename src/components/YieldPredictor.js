function YieldPredictor({ t, location, onBack }) {
    const [formData, setFormData] = useState({
        crop: '',
        landSize: '',
        soilType: '',
        lastYearYield: '',
        fertilizer: '',
        irrigation: '',
        seeds: ''
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const calculateYield = async () => {
        if (!formData.crop || !formData.landSize || !formData.soilType) {
            alert(t('fill_required_fields'));
            return;
        }

        setLoading(true);
        try {
            // Simulate calculation delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock yield calculation based on inputs
            const baseYield = getBaseYield(formData.crop);
            const landSizeMultiplier = parseFloat(formData.landSize) || 1;
            const soilMultiplier = getSoilMultiplier(formData.soilType);
            const fertilizer = parseFloat(formData.fertilizer) || 0;
            const irrigation = formData.irrigation === 'good' ? 1.2 : formData.irrigation === 'average' ? 1.0 : 0.8;
            
            const predictedYield = Math.round(baseYield * landSizeMultiplier * soilMultiplier * irrigation);
            const estimatedIncome = predictedYield * getCropPrice(formData.crop);
            const estimatedCost = calculateEstimatedCost(formData);
            const netProfit = estimatedIncome - estimatedCost;

            setPrediction({
                predictedYield,
                estimatedIncome,
                estimatedCost,
                netProfit,
                profitMargin: ((netProfit / estimatedIncome) * 100).toFixed(1),
                recommendations: generateRecommendations(formData)
            });
        } catch (error) {
            console.error('Error calculating yield:', error);
        } finally {
            setLoading(false);
        }
    };

    const getBaseYield = (crop) => {
        const yieldMap = {
            'wheat': 40,
            'rice': 50,
            'cotton': 15,
            'sugarcane': 400,
            'maize': 60,
            'soybean': 25,
            'mustard': 20,
            'gram': 18
        };
        return yieldMap[crop] || 30;
    };

    const getSoilMultiplier = (soilType) => {
        const multipliers = {
            'black': 1.2,
            'red': 1.0,
            'alluvial': 1.3,
            'sandy': 0.8,
            'clay': 0.9
        };
        return multipliers[soilType] || 1.0;
    };

    const getCropPrice = (crop) => {
        const prices = {
            'wheat': 2000,
            'rice': 1800,
            'cotton': 6000,
            'sugarcane': 350,
            'maize': 1500,
            'soybean': 4000,
            'mustard': 5000,
            'gram': 5500
        };
        return prices[crop] || 2000;
    };

    const calculateEstimatedCost = (data) => {
        const landSize = parseFloat(data.landSize) || 1;
        const baseCost = 15000; // Base cost per acre
        const fertilizerCost = (parseFloat(data.fertilizer) || 0) * 50;
        const seedCost = data.seeds === 'hybrid' ? 3000 : 1500;
        const irrigationCost = data.irrigation === 'good' ? 5000 : 3000;
        
        return Math.round((baseCost + fertilizerCost + seedCost + irrigationCost) * landSize);
    };

    const generateRecommendations = (data) => {
        const recommendations = [];
        
        if (parseFloat(data.fertilizer) < 100) {
            recommendations.push({
                type: 'fertilizer',
                message: t('increase_fertilizer_recommendation'),
                impact: '+15% यील्ड'
            });
        }
        
        if (data.irrigation !== 'good') {
            recommendations.push({
                type: 'irrigation',
                message: t('improve_irrigation_recommendation'),
                impact: '+20% यील्ड'
            });
        }
        
        if (data.seeds !== 'hybrid') {
            recommendations.push({
                type: 'seeds',
                message: t('use_hybrid_seeds_recommendation'),
                impact: '+25% यील्ड'
            });
        }

        recommendations.push({
            type: 'soil',
            message: t('soil_testing_recommendation'),
            impact: '+10% यील्ड'
        });

        return recommendations;
    };

    const resetForm = () => {
        setFormData({
            crop: '',
            landSize: '',
            soilType: '',
            lastYearYield: '',
            fertilizer: '',
            irrigation: '',
            seeds: ''
        });
        setPrediction(null);
    };

    return (
        <div className="yield-predictor">
            {/* Header */}
            <div className="header">
                <div className="d-flex align-items-center p-3">
                    <button className="btn btn-light btn-sm me-3" onClick={onBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h5 className="mb-0 text-white">{t('yield_prediction')}</h5>
                </div>
            </div>

            <div className="p-3">
                {!prediction ? (
                    /* Input Form */
                    <div className="prediction-form">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h6 className="mb-3">
                                    <i className="fas fa-seedling me-2"></i>
                                    {t('crop_details')}
                                </h6>

                                <div className="mb-3">
                                    <label className="form-label">{t('select_crop')} *</label>
                                    <select 
                                        className="form-select form-select-lg"
                                        value={formData.crop}
                                        onChange={(e) => handleInputChange('crop', e.target.value)}
                                    >
                                        <option value="">{t('choose_crop')}</option>
                                        <option value="wheat">गेहूं (Wheat)</option>
                                        <option value="rice">धान (Rice)</option>
                                        <option value="cotton">कपास (Cotton)</option>
                                        <option value="sugarcane">गन्ना (Sugarcane)</option>
                                        <option value="maize">मक्का (Maize)</option>
                                        <option value="soybean">सोयाबीन (Soybean)</option>
                                        <option value="mustard">सरसों (Mustard)</option>
                                        <option value="gram">चना (Gram)</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">{t('land_size')} ({t('acres')}) *</label>
                                    <input 
                                        type="number"
                                        className="form-control form-control-lg"
                                        placeholder={t('enter_land_size')}
                                        value={formData.landSize}
                                        onChange={(e) => handleInputChange('landSize', e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">{t('soil_type')} *</label>
                                    <select 
                                        className="form-select form-select-lg"
                                        value={formData.soilType}
                                        onChange={(e) => handleInputChange('soilType', e.target.value)}
                                    >
                                        <option value="">{t('select_soil_type')}</option>
                                        <option value="black">काली मिट्टी (Black Soil)</option>
                                        <option value="red">लाल मिट्टी (Red Soil)</option>
                                        <option value="alluvial">जलोढ़ मिट्टी (Alluvial)</option>
                                        <option value="sandy">बलुई मिट्टी (Sandy)</option>
                                        <option value="clay">चिकनी मिट्टी (Clay)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-4">
                            <div className="card-body">
                                <h6 className="mb-3">
                                    <i className="fas fa-chart-line me-2"></i>
                                    {t('farming_inputs')}
                                </h6>

                                <div className="mb-3">
                                    <label className="form-label">{t('last_year_yield')} ({t('quintals')})</label>
                                    <input 
                                        type="number"
                                        className="form-control form-control-lg"
                                        placeholder={t('optional')}
                                        value={formData.lastYearYield}
                                        onChange={(e) => handleInputChange('lastYearYield', e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">{t('fertilizer_quantity')} ({t('kg_per_acre')})</label>
                                    <input 
                                        type="number"
                                        className="form-control form-control-lg"
                                        placeholder="0-200"
                                        value={formData.fertilizer}
                                        onChange={(e) => handleInputChange('fertilizer', e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">{t('irrigation_quality')}</label>
                                    <select 
                                        className="form-select form-select-lg"
                                        value={formData.irrigation}
                                        onChange={(e) => handleInputChange('irrigation', e.target.value)}
                                    >
                                        <option value="">{t('select_irrigation')}</option>
                                        <option value="good">अच्छी (Good)</option>
                                        <option value="average">साधारण (Average)</option>
                                        <option value="poor">खराब (Poor)</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">{t('seed_type')}</label>
                                    <select 
                                        className="form-select form-select-lg"
                                        value={formData.seeds}
                                        onChange={(e) => handleInputChange('seeds', e.target.value)}
                                    >
                                        <option value="">{t('select_seed_type')}</option>
                                        <option value="hybrid">हाइब्रिड (Hybrid)</option>
                                        <option value="traditional">पारंपरिक (Traditional)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="d-grid gap-2">
                            <button 
                                className="btn btn-success btn-lg"
                                onClick={calculateYield}
                                disabled={loading || !formData.crop || !formData.landSize || !formData.soilType}
                            >
                                {loading ? (
                                    <>
                                        <div className="spinner-border spinner-border-sm me-2"></div>
                                        {t('calculating')}
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-calculator me-2"></i>
                                        {t('predict_yield')}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Prediction Results */
                    <div className="prediction-results">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <i className="fas fa-chart-line text-success mb-3" style={{ fontSize: '3rem' }}></i>
                                <h5 className="text-success mb-2">{t('prediction_complete')}</h5>
                                <p className="text-muted">{formData.crop} - {formData.landSize} {t('acres')}</p>
                            </div>
                        </div>

                        {/* Yield Prediction */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <h6 className="mb-3">
                                    <i className="fas fa-seedling me-2 text-success"></i>
                                    {t('predicted_yield')}
                                </h6>
                                
                                <div className="row text-center">
                                    <div className="col-6">
                                        <div className="yield-stat">
                                            <div className="stat-value text-success">
                                                {prediction.predictedYield}
                                            </div>
                                            <div className="stat-label text-muted">
                                                {t('quintals')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="yield-stat">
                                            <div className="stat-value text-info">
                                                {Math.round(prediction.predictedYield / parseFloat(formData.landSize))}
                                            </div>
                                            <div className="stat-label text-muted">
                                                {t('quintals_per_acre')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Financial Analysis */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <h6 className="mb-3">
                                    <i className="fas fa-rupee-sign me-2 text-warning"></i>
                                    {t('financial_analysis')}
                                </h6>
                                
                                <div className="row g-3 text-center">
                                    <div className="col-6">
                                        <div className="financial-stat">
                                            <div className="stat-value text-success">
                                                ₹{prediction.estimatedIncome.toLocaleString()}
                                            </div>
                                            <div className="stat-label text-muted">
                                                {t('estimated_income')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="financial-stat">
                                            <div className="stat-value text-danger">
                                                ₹{prediction.estimatedCost.toLocaleString()}
                                            </div>
                                            <div className="stat-label text-muted">
                                                {t('estimated_cost')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="financial-stat">
                                            <div className={`stat-value ${prediction.netProfit > 0 ? 'text-success' : 'text-danger'}`}>
                                                ₹{prediction.netProfit.toLocaleString()}
                                            </div>
                                            <div className="stat-label text-muted">
                                                {t('net_profit')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="financial-stat">
                                            <div className={`stat-value ${prediction.profitMargin > 0 ? 'text-success' : 'text-danger'}`}>
                                                {prediction.profitMargin}%
                                            </div>
                                            <div className="stat-label text-muted">
                                                {t('profit_margin')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations */}
                        {prediction.recommendations && prediction.recommendations.length > 0 && (
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h6 className="mb-3">
                                        <i className="fas fa-lightbulb me-2 text-warning"></i>
                                        {t('improvement_recommendations')}
                                    </h6>
                                    
                                    {prediction.recommendations.map((rec, index) => (
                                        <div key={index} className="recommendation-item d-flex align-items-start p-3 border rounded mb-2">
                                            <i className={`fas ${
                                                rec.type === 'fertilizer' ? 'fa-flask' :
                                                rec.type === 'irrigation' ? 'fa-tint' :
                                                rec.type === 'seeds' ? 'fa-seedling' : 'fa-microscope'
                                            } me-3 mt-1 text-primary`}></i>
                                            <div className="flex-grow-1">
                                                <p className="mb-1">{rec.message}</p>
                                                <small className="text-success fw-bold">
                                                    <i className="fas fa-arrow-up me-1"></i>
                                                    {rec.impact}
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="d-grid gap-2">
                            <button 
                                className="btn btn-primary btn-lg"
                                onClick={resetForm}
                            >
                                <i className="fas fa-plus me-2"></i>
                                {t('new_prediction')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

window.YieldPredictor = YieldPredictor;
