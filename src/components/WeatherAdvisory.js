function WeatherAdvisory({ t, location, onBack }) {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [advisory, setAdvisory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (location) {
            loadWeatherData();
        } else {
            setLoading(false);
        }
    }, [location]);

    const loadWeatherData = async () => {
        setLoading(true);
        try {
            const [currentWeather, weatherForecast] = await Promise.all([
                APIService.getWeather(location.lat, location.lng),
                APIService.getForecast(location.lat, location.lng)
            ]);

            setWeather(currentWeather);
            setForecast(weatherForecast);
            
            // Generate farming advisory based on weather
            const farmingAdvisory = generateFarmingAdvisory(currentWeather, weatherForecast);
            setAdvisory(farmingAdvisory);
        } catch (error) {
            console.error('Error loading weather data:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateFarmingAdvisory = (current, forecast) => {
        const advisories = [];

        // Temperature based advisory
        if (current.temp > 35) {
            advisories.push({
                type: 'warning',
                icon: 'fas fa-thermometer-full',
                title: t('high_temperature_alert'),
                message: t('high_temp_advisory'),
                action: t('increase_irrigation')
            });
        } else if (current.temp < 10) {
            advisories.push({
                type: 'info',
                icon: 'fas fa-thermometer-empty',
                title: t('low_temperature_alert'),
                message: t('low_temp_advisory'),
                action: t('protect_crops')
            });
        }

        // Rainfall based advisory
        const rainExpected = forecast.some(day => day.rain > 5);
        if (rainExpected) {
            advisories.push({
                type: 'success',
                icon: 'fas fa-cloud-rain',
                title: t('rainfall_expected'),
                message: t('rain_advisory'),
                action: t('reduce_irrigation')
            });
        } else if (!rainExpected && current.humidity < 40) {
            advisories.push({
                type: 'warning',
                icon: 'fas fa-tint',
                title: t('dry_conditions'),
                message: t('dry_advisory'),
                action: t('maintain_irrigation')
            });
        }

        // Wind based advisory
        if (current.windSpeed > 20) {
            advisories.push({
                type: 'danger',
                icon: 'fas fa-wind',
                title: t('high_wind_alert'),
                message: t('wind_advisory'),
                action: t('secure_crops')
            });
        }

        return advisories;
    };

    const getWeatherIcon = (condition) => {
        const iconMap = {
            'clear': 'fas fa-sun',
            'clouds': 'fas fa-cloud',
            'rain': 'fas fa-cloud-rain',
            'thunderstorm': 'fas fa-bolt',
            'snow': 'fas fa-snowflake',
            'mist': 'fas fa-smog'
        };
        return iconMap[condition.toLowerCase()] || 'fas fa-cloud';
    };

    if (!location) {
        return (
            <div className="weather-advisory">
                <div className="header">
                    <div className="d-flex align-items-center p-3">
                        <button className="btn btn-light btn-sm me-3" onClick={onBack}>
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <h5 className="mb-0 text-white">{t('weather_advisory')}</h5>
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
        <div className="weather-advisory">
            {/* Header */}
            <div className="header">
                <div className="d-flex align-items-center p-3">
                    <button className="btn btn-light btn-sm me-3" onClick={onBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h5 className="mb-0 text-white">{t('weather_advisory')}</h5>
                    <button 
                        className="btn btn-light btn-sm ms-auto"
                        onClick={loadWeatherData}
                        disabled={loading}
                    >
                        <i className="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <div className="p-3">
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary mb-3" role="status"></div>
                        <p>{t('loading_weather')}</p>
                    </div>
                ) : weather ? (
                    <div className="weather-content">
                        {/* Current Weather */}
                        <div className="card mb-4 current-weather">
                            <div className="card-body text-center">
                                <div className="location-name mb-2">
                                    <i className="fas fa-map-marker-alt me-2"></i>
                                    {location.name}
                                </div>
                                
                                <div className="weather-main mb-3">
                                    <i 
                                        className={`${getWeatherIcon(weather.condition)} weather-icon`}
                                        style={{ fontSize: '4rem', color: '#FF9800' }}
                                    ></i>
                                    <div className="temperature">
                                        {Math.round(weather.temp)}°C
                                    </div>
                                    <div className="condition text-muted">
                                        {weather.description}
                                    </div>
                                </div>

                                <div className="weather-details row text-center">
                                    <div className="col-3">
                                        <div className="detail-item">
                                            <i className="fas fa-eye text-primary"></i>
                                            <div className="detail-value">{weather.humidity}%</div>
                                            <div className="detail-label">{t('humidity')}</div>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="detail-item">
                                            <i className="fas fa-wind text-info"></i>
                                            <div className="detail-value">{weather.windSpeed}</div>
                                            <div className="detail-label">{t('wind_kmh')}</div>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="detail-item">
                                            <i className="fas fa-tachometer-alt text-warning"></i>
                                            <div className="detail-value">{weather.pressure}</div>
                                            <div className="detail-label">{t('pressure')}</div>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="detail-item">
                                            <i className="fas fa-eye text-secondary"></i>
                                            <div className="detail-value">{weather.visibility}</div>
                                            <div className="detail-label">{t('visibility')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Farming Advisory */}
                        {advisory && advisory.length > 0 && (
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h6 className="mb-3">
                                        <i className="fas fa-lightbulb me-2 text-warning"></i>
                                        {t('farming_advisory')}
                                    </h6>
                                    
                                    {advisory.map((item, index) => (
                                        <div key={index} className={`alert alert-${
                                            item.type === 'warning' ? 'warning' :
                                            item.type === 'danger' ? 'danger' :
                                            item.type === 'success' ? 'success' : 'info'
                                        } mb-3`}>
                                            <div className="d-flex align-items-start">
                                                <i className={`${item.icon} me-3 mt-1`}></i>
                                                <div className="flex-grow-1">
                                                    <h6 className="alert-heading mb-2">{item.title}</h6>
                                                    <p className="mb-2">{item.message}</p>
                                                    <div className="fw-bold">
                                                        <i className="fas fa-arrow-right me-2"></i>
                                                        {item.action}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 5-Day Forecast */}
                        {forecast.length > 0 && (
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="mb-3">
                                        <i className="fas fa-calendar-alt me-2"></i>
                                        {t('5_day_forecast')}
                                    </h6>
                                    
                                    <div className="forecast-list">
                                        {forecast.map((day, index) => (
                                            <div key={index} className="forecast-item d-flex align-items-center py-2 border-bottom">
                                                <div className="day-name flex-grow-1">
                                                    <div className="fw-bold">
                                                        {index === 0 ? t('today') : 
                                                         new Date(day.date).toLocaleDateString('hi-IN', { weekday: 'short' })}
                                                    </div>
                                                    <small className="text-muted">
                                                        {new Date(day.date).toLocaleDateString('hi-IN', { month: 'short', day: 'numeric' })}
                                                    </small>
                                                </div>
                                                
                                                <div className="weather-icon-small me-3">
                                                    <i className={getWeatherIcon(day.condition)} style={{ color: '#FF9800' }}></i>
                                                </div>
                                                
                                                <div className="temperature-range text-end">
                                                    <div className="fw-bold">{Math.round(day.maxTemp)}°</div>
                                                    <small className="text-muted">{Math.round(day.minTemp)}°</small>
                                                </div>
                                                
                                                {day.rain > 0 && (
                                                    <div className="rain-chance ms-3 text-primary">
                                                        <i className="fas fa-tint me-1"></i>
                                                        {day.rain}mm
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="alert alert-danger text-center">
                        <i className="fas fa-exclamation-triangle mb-3" style={{ fontSize: '3rem' }}></i>
                        <h6>{t('weather_load_failed')}</h6>
                        <button 
                            className="btn btn-danger mt-2"
                            onClick={loadWeatherData}
                        >
                            <i className="fas fa-redo me-2"></i>
                            {t('retry')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

window.WeatherAdvisory = WeatherAdvisory;
