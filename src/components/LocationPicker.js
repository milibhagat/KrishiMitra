function LocationPicker({ t, onLocationSet, onBack }) {
    const [loading, setLoading] = useState(false);
    const [manualLocation, setManualLocation] = useState({ lat: '', lng: '', name: '' });
    const [error, setError] = useState(null);

    const getCurrentLocation = () => {
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError(t('geolocation_not_supported'));
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    
                    // Try to get location name from reverse geocoding
                    const locationName = await APIService.reverseGeocode(latitude, longitude);
                    
                    const location = {
                        lat: latitude,
                        lng: longitude,
                        name: locationName || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
                    };

                    onLocationSet(location);
                    onBack();
                } catch (error) {
                    console.error('Error getting location details:', error);
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        name: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
                    };
                    onLocationSet(location);
                    onBack();
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                setError(t('location_permission_denied'));
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    };

    const handleManualSubmit = () => {
        if (!manualLocation.lat || !manualLocation.lng) {
            setError(t('enter_valid_coordinates'));
            return;
        }

        const lat = parseFloat(manualLocation.lat);
        const lng = parseFloat(manualLocation.lng);

        if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            setError(t('invalid_coordinates'));
            return;
        }

        const location = {
            lat,
            lng,
            name: manualLocation.name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`
        };

        onLocationSet(location);
        onBack();
    };

    const popularLocations = [
        { name: 'दिल्ली', lat: 28.6139, lng: 77.2090 },
        { name: 'मुंबई', lat: 19.0760, lng: 72.8777 },
        { name: 'बैंगलोर', lat: 12.9716, lng: 77.5946 },
        { name: 'पुणे', lat: 18.5204, lng: 73.8567 },
        { name: 'हैदराबाद', lat: 17.3850, lng: 78.4867 },
        { name: 'चेन्नई', lat: 13.0827, lng: 80.2707 }
    ];

    return (
        <div className="location-picker">
            {/* Header */}
            <div className="header">
                <div className="d-flex align-items-center p-3">
                    <button className="btn btn-light btn-sm me-3" onClick={onBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h5 className="mb-0 text-white">{t('set_location')}</h5>
                </div>
            </div>

            <div className="p-3">
                {error && (
                    <div className="alert alert-danger">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {error}
                    </div>
                )}

                {/* GPS Location */}
                <div className="card mb-4">
                    <div className="card-body text-center">
                        <i className="fas fa-location-arrow text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                        <h6 className="mb-3">{t('use_current_location')}</h6>
                        <p className="text-muted small mb-3">
                            {t('location_permission_desc')}
                        </p>
                        <button 
                            className="btn btn-primary btn-lg w-100"
                            onClick={getCurrentLocation}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                                    {t('getting_location')}
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-crosshairs me-2"></i>
                                    {t('get_current_location')}
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Manual Location Entry */}
                <div className="card mb-4">
                    <div className="card-body">
                        <h6 className="mb-3">
                            <i className="fas fa-edit me-2"></i>
                            {t('enter_manually')}
                        </h6>
                        
                        <div className="mb-3">
                            <label className="form-label">{t('location_name')} ({t('optional')})</label>
                            <input 
                                type="text"
                                className="form-control form-control-lg"
                                placeholder={t('enter_location_name')}
                                value={manualLocation.name}
                                onChange={(e) => setManualLocation({...manualLocation, name: e.target.value})}
                            />
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <label className="form-label">{t('latitude')} *</label>
                                <input 
                                    type="number"
                                    step="any"
                                    className="form-control form-control-lg"
                                    placeholder="28.6139"
                                    value={manualLocation.lat}
                                    onChange={(e) => setManualLocation({...manualLocation, lat: e.target.value})}
                                />
                            </div>
                            <div className="col-6">
                                <label className="form-label">{t('longitude')} *</label>
                                <input 
                                    type="number"
                                    step="any"
                                    className="form-control form-control-lg"
                                    placeholder="77.2090"
                                    value={manualLocation.lng}
                                    onChange={(e) => setManualLocation({...manualLocation, lng: e.target.value})}
                                />
                            </div>
                        </div>

                        <button 
                            className="btn btn-success btn-lg w-100 mt-3"
                            onClick={handleManualSubmit}
                        >
                            <i className="fas fa-check me-2"></i>
                            {t('set_location')}
                        </button>
                    </div>
                </div>

                {/* Popular Locations */}
                <div className="card">
                    <div className="card-body">
                        <h6 className="mb-3">
                            <i className="fas fa-star me-2"></i>
                            {t('popular_locations')}
                        </h6>
                        <div className="d-flex flex-wrap gap-2">
                            {popularLocations.map((loc, index) => (
                                <button
                                    key={index}
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => {
                                        onLocationSet(loc);
                                        onBack();
                                    }}
                                >
                                    <i className="fas fa-map-marker-alt me-1"></i>
                                    {loc.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.LocationPicker = LocationPicker;
