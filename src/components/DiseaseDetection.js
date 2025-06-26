function DiseaseDetection({ t, onBack }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cameraActive, setCameraActive] = useState(false);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
                setAnalysisResult(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async () => {
        if (!selectedImage) return;

        setLoading(true);
        setAnalysisResult(null);

        try {
            // Simulate AI analysis with realistic delay
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Mock analysis result based on disease database
            const mockResult = DiseasesData.getMockAnalysis();
            setAnalysisResult(mockResult);
        } catch (error) {
            console.error('Error analyzing image:', error);
            setAnalysisResult({
                error: true,
                message: t('analysis_failed')
            });
        } finally {
            setLoading(false);
        }
    };

    const takePhoto = async () => {
        try {
            setCameraActive(true);
            // In a real app, this would access the camera
            // For now, we'll show a placeholder
            setTimeout(() => {
                setCameraActive(false);
                alert(t('camera_feature_coming_soon'));
            }, 2000);
        } catch (error) {
            console.error('Camera access error:', error);
            setCameraActive(false);
            alert(t('camera_not_available'));
        }
    };

    const resetAnalysis = () => {
        setSelectedImage(null);
        setAnalysisResult(null);
        setLoading(false);
    };

    return (
        <div className="disease-detection">
            {/* Header */}
            <div className="header">
                <div className="d-flex align-items-center p-3">
                    <button className="btn btn-light btn-sm me-3" onClick={onBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h5 className="mb-0 text-white">{t('disease_detection')}</h5>
                </div>
            </div>

            <div className="p-3">
                {!selectedImage ? (
                    /* Image Upload Section */
                    <div className="upload-section">
                        <div className="card mb-4 text-center">
                            <div className="card-body py-5">
                                <i className="fas fa-camera text-primary mb-3" style={{ fontSize: '4rem' }}></i>
                                <h6 className="mb-3">{t('capture_crop_image')}</h6>
                                <p className="text-muted mb-4">
                                    {t('image_analysis_desc')}
                                </p>

                                <div className="d-grid gap-3">
                                    <button 
                                        className="btn btn-primary btn-lg"
                                        onClick={takePhoto}
                                        disabled={cameraActive}
                                    >
                                        {cameraActive ? (
                                            <>
                                                <div className="spinner-border spinner-border-sm me-2"></div>
                                                {t('opening_camera')}
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-camera me-2"></i>
                                                {t('take_photo')}
                                            </>
                                        )}
                                    </button>

                                    <div className="position-relative">
                                        <button className="btn btn-outline-primary btn-lg w-100">
                                            <i className="fas fa-upload me-2"></i>
                                            {t('upload_from_gallery')}
                                        </button>
                                        <input 
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tips Section */}
                        <div className="card">
                            <div className="card-body">
                                <h6 className="mb-3">
                                    <i className="fas fa-lightbulb me-2 text-warning"></i>
                                    {t('photo_tips')}
                                </h6>
                                <ul className="list-unstyled mb-0">
                                    <li className="mb-2">
                                        <i className="fas fa-check text-success me-2"></i>
                                        {t('tip_clear_image')}
                                    </li>
                                    <li className="mb-2">
                                        <i className="fas fa-check text-success me-2"></i>
                                        {t('tip_good_lighting')}
                                    </li>
                                    <li className="mb-2">
                                        <i className="fas fa-check text-success me-2"></i>
                                        {t('tip_close_up')}
                                    </li>
                                    <li className="mb-0">
                                        <i className="fas fa-check text-success me-2"></i>
                                        {t('tip_affected_area')}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Analysis Section */
                    <div className="analysis-section">
                        {/* Image Preview */}
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <img 
                                    src={selectedImage}
                                    alt="Crop analysis"
                                    className="img-fluid rounded mb-3"
                                    style={{ maxHeight: '300px' }}
                                />
                                
                                <div className="d-flex gap-2 justify-content-center">
                                    <button 
                                        className="btn btn-success btn-lg"
                                        onClick={analyzeImage}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="spinner-border spinner-border-sm me-2"></div>
                                                {t('analyzing')}
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-microscope me-2"></i>
                                                {t('analyze_image')}
                                            </>
                                        )}
                                    </button>
                                    
                                    <button 
                                        className="btn btn-outline-secondary"
                                        onClick={resetAnalysis}
                                        disabled={loading}
                                    >
                                        <i className="fas fa-redo me-2"></i>
                                        {t('retake')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Analysis Results */}
                        {loading && (
                            <div className="card mb-4">
                                <div className="card-body text-center py-5">
                                    <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }}></div>
                                    <h6>{t('ai_analyzing')}</h6>
                                    <p className="text-muted mb-0">{t('analysis_in_progress')}</p>
                                </div>
                            </div>
                        )}

                        {analysisResult && !analysisResult.error && (
                            <div className="results-section">
                                {/* Health Status */}
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-3">
                                            <div 
                                                className={`health-indicator me-3 p-3 rounded-circle ${
                                                    analysisResult.healthStatus === 'healthy' ? 'bg-success' : 
                                                    analysisResult.healthStatus === 'warning' ? 'bg-warning' : 'bg-danger'
                                                }`}
                                            >
                                                <i className={`fas ${
                                                    analysisResult.healthStatus === 'healthy' ? 'fa-check' : 
                                                    analysisResult.healthStatus === 'warning' ? 'fa-exclamation' : 'fa-times'
                                                } text-white`} style={{ fontSize: '1.5rem' }}></i>
                                            </div>
                                            
                                            <div>
                                                <h6 className="mb-1">{analysisResult.status}</h6>
                                                <p className="text-muted mb-0">{analysisResult.confidence}% {t('confidence')}</p>
                                            </div>
                                        </div>

                                        {analysisResult.disease && (
                                            <div className="disease-info">
                                                <h6 className="text-danger">
                                                    <i className="fas fa-bug me-2"></i>
                                                    {analysisResult.disease.name}
                                                </h6>
                                                <p className="text-muted">{analysisResult.disease.description}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Treatment Recommendations */}
                                {analysisResult.treatments && analysisResult.treatments.length > 0 && (
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <h6 className="mb-3">
                                                <i className="fas fa-prescription-bottle-alt me-2 text-success"></i>
                                                {t('treatment_recommendations')}
                                            </h6>
                                            
                                            {analysisResult.treatments.map((treatment, index) => (
                                                <div key={index} className="treatment-item border rounded p-3 mb-3">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <h6 className="mb-0">{treatment.name}</h6>
                                                        <span className={`badge ${
                                                            treatment.type === 'organic' ? 'bg-success' : 
                                                            treatment.type === 'chemical' ? 'bg-warning' : 'bg-info'
                                                        }`}>
                                                            {treatment.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-muted mb-2">{treatment.description}</p>
                                                    <div className="dosage">
                                                        <strong>{t('dosage')}:</strong> {treatment.dosage}
                                                    </div>
                                                    <div className="application">
                                                        <strong>{t('application')}:</strong> {treatment.application}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Preventive Measures */}
                                {analysisResult.prevention && analysisResult.prevention.length > 0 && (
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="mb-3">
                                                <i className="fas fa-shield-alt me-2 text-primary"></i>
                                                {t('preventive_measures')}
                                            </h6>
                                            
                                            <ul className="list-unstyled mb-0">
                                                {analysisResult.prevention.map((measure, index) => (
                                                    <li key={index} className="mb-2">
                                                        <i className="fas fa-check-circle text-success me-2"></i>
                                                        {measure}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {analysisResult && analysisResult.error && (
                            <div className="card">
                                <div className="card-body text-center">
                                    <i className="fas fa-exclamation-triangle text-warning mb-3" style={{ fontSize: '3rem' }}></i>
                                    <h6 className="mb-2">{t('analysis_failed')}</h6>
                                    <p className="text-muted mb-3">{analysisResult.message}</p>
                                    <button 
                                        className="btn btn-primary"
                                        onClick={analyzeImage}
                                    >
                                        <i className="fas fa-redo me-2"></i>
                                        {t('try_again')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

window.DiseaseDetection = DiseaseDetection;
