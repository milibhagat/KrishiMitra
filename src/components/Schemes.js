function Schemes({ t, onBack }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedScheme, setSelectedScheme] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        { id: 'all', name: t('all_schemes'), icon: 'fas fa-th-large' },
        { id: 'subsidy', name: t('subsidies'), icon: 'fas fa-money-bill-wave' },
        { id: 'insurance', name: t('insurance'), icon: 'fas fa-shield-alt' },
        { id: 'loan', name: t('loans'), icon: 'fas fa-university' },
        { id: 'training', name: t('training'), icon: 'fas fa-graduation-cap' },
        { id: 'equipment', name: t('equipment'), icon: 'fas fa-tractor' }
    ];

    const schemes = [
        {
            id: 1,
            category: 'subsidy',
            name: 'PM-KISAN योजना',
            description: 'सभी भूमिधारक किसानों को आर्थिक सहायता',
            amount: '₹6,000/वर्ष',
            eligibility: '2 हेक्टेयर तक भूमि वाले किसान',
            benefits: ['तीन किस्तों में ₹2,000', 'डायरेक्ट बैंक ट्रांसफर', 'ऑनलाइन आवेदन'],
            documents: ['आधार कार्ड', 'भूमि दस्तावेज', 'बैंक पासबुक'],
            applicationLink: 'https://pmkisan.gov.in',
            deadline: '31 मार्च 2024',
            status: 'active',
            department: 'कृषि मंत्रालय'
        },
        {
            id: 2,
            category: 'insurance',
            name: 'प्रधानमंत्री फसल बीमा योजना',
            description: 'फसल नुकसान की स्थिति में बीमा कवर',
            amount: '₹50,000 तक',
            eligibility: 'सभी किसान (अपनी या किराए की भूमि)',
            benefits: ['प्राकृतिक आपदा कवर', 'न्यूनतम प्रीमियम', 'तुरंत क्लेम सेटलमेंट'],
            documents: ['आधार कार्ड', 'भूमि दस्तावेज', 'बुआई प्रमाण पत्र'],
            applicationLink: 'https://pmfby.gov.in',
            deadline: 'बुआई के 10 दिन बाद तक',
            status: 'active',
            department: 'कृषि मंत्रालय'
        },
        {
            id: 3,
            category: 'equipment',
            name: 'कृषि यंत्र सब्सिडी योजना',
            description: 'कृषि उपकरण खरीदने पर सब्सिडी',
            amount: '50% तक सब्सिडी',
            eligibility: 'सभी श्रेणी के किसान',
            benefits: ['ट्रैक्टर पर सब्सिडी', 'हार्वेस्टर पर छूट', 'डायरेक्ट बेनिफिट ट्रांसफर'],
            documents: ['आधार कार्ड', 'भूमि दस्तावेज', 'बैंक पासबुक', 'जाति प्रमाण पत्र'],
            applicationLink: 'https://agrimachinery.nic.in',
            deadline: '31 दिसंबर 2024',
            status: 'active',
            department: 'कृषि मंत्रालय'
        },
        {
            id: 4,
            category: 'loan',
            name: 'किसान क्रेडिट कार्ड',
            description: 'कृषि ऋण के लिए क्रेडिट कार्ड',
            amount: '₹3 लाख तक',
            eligibility: 'सभी किसान (व्यक्तिगत/संयुक्त)',
            benefits: ['4% ब्याज दर', 'फसल बीमा कवर', 'ATM सुविधा'],
            documents: ['आधार कार्ड', 'भूमि दस्तावेज', 'बैंक स्टेटमेंट'],
            applicationLink: 'https://kcc.gov.in',
            deadline: 'साल भर उपलब्ध',
            status: 'active',
            department: 'वित्त मंत्रालय'
        },
        {
            id: 5,
            category: 'training',
            name: 'राष्ट्रीय कृषि विकास योजना',
            description: 'कृषि उत्पादकता बढ़ाने के लिए प्रशिक्षण',
            amount: 'निःशुल्क प्रशिक्षण',
            eligibility: 'सभी किसान और कृषि मजदूर',
            benefits: ['आधुनिक तकनीक', 'व्यावहारिक प्रशिक्षण', 'प्रमाण पत्र'],
            documents: ['आधार कार्ड', 'निवास प्रमाण पत्र'],
            applicationLink: 'https://rkvy.nic.in',
            deadline: 'बैच के अनुसार',
            status: 'active',
            department: 'कृषि मंत्रालय'
        }
    ];

    const filteredSchemes = schemes.filter(scheme => {
        const matchesCategory = activeCategory === 'all' || scheme.category === activeCategory;
        const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'success';
            case 'expired': return 'danger';
            case 'upcoming': return 'warning';
            default: return 'secondary';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'active': return t('active');
            case 'expired': return t('expired');
            case 'upcoming': return t('upcoming');
            default: return t('unknown');
        }
    };

    if (selectedScheme) {
        return (
            <div className="scheme-details">
                <div className="header">
                    <div className="d-flex align-items-center p-3">
                        <button 
                            className="btn btn-light btn-sm me-3" 
                            onClick={() => setSelectedScheme(null)}
                        >
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <h5 className="mb-0 text-white">{selectedScheme.name}</h5>
                    </div>
                </div>

                <div className="p-3">
                    {/* Scheme Header */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h5 className="mb-2">{selectedScheme.name}</h5>
                                    <p className="text-muted mb-2">{selectedScheme.description}</p>
                                    <small className="text-muted">
                                        <i className="fas fa-building me-1"></i>
                                        {selectedScheme.department}
                                    </small>
                                </div>
                                <span className={`badge bg-${getStatusColor(selectedScheme.status)} fs-6`}>
                                    {getStatusText(selectedScheme.status)}
                                </span>
                            </div>

                            <div className="row g-3">
                                <div className="col-6">
                                    <div className="info-item">
                                        <i className="fas fa-rupee-sign text-success me-2"></i>
                                        <strong>{t('amount')}: </strong>
                                        <span className="text-success">{selectedScheme.amount}</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="info-item">
                                        <i className="fas fa-calendar text-warning me-2"></i>
                                        <strong>{t('deadline')}: </strong>
                                        <span className="text-warning">{selectedScheme.deadline}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Eligibility */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h6 className="mb-3">
                                <i className="fas fa-check-circle me-2 text-primary"></i>
                                {t('eligibility')}
                            </h6>
                            <p className="mb-0">{selectedScheme.eligibility}</p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h6 className="mb-3">
                                <i className="fas fa-gift me-2 text-success"></i>
                                {t('benefits')}
                            </h6>
                            <ul className="list-unstyled mb-0">
                                {selectedScheme.benefits.map((benefit, index) => (
                                    <li key={index} className="mb-2">
                                        <i className="fas fa-check text-success me-2"></i>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Required Documents */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h6 className="mb-3">
                                <i className="fas fa-file-alt me-2 text-info"></i>
                                {t('required_documents')}
                            </h6>
                            <div className="row g-2">
                                {selectedScheme.documents.map((document, index) => (
                                    <div key={index} className="col-6">
                                        <div className="document-item p-2 border rounded text-center">
                                            <i className="fas fa-file-alt text-info mb-1"></i>
                                            <div className="small">{document}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="d-grid">
                        <button 
                            className="btn btn-success btn-lg"
                            onClick={() => window.open(selectedScheme.applicationLink, '_blank')}
                        >
                            <i className="fas fa-external-link-alt me-2"></i>
                            {t('apply_online')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="schemes">
            {/* Header */}
            <div className="header">
                <div className="d-flex align-items-center p-3">
                    <button className="btn btn-light btn-sm me-3" onClick={onBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h5 className="mb-0 text-white">{t('govt_schemes')}</h5>
                </div>
            </div>

            <div className="p-3">
                {/* Search Bar */}
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="position-relative">
                            <input 
                                type="text"
                                className="form-control form-control-lg ps-5"
                                placeholder={t('search_schemes')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                        </div>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="category-filters mb-4">
                    <div className="d-flex overflow-auto pb-2" style={{ gap: '0.5rem' }}>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`btn btn-sm flex-shrink-0 ${
                                    activeCategory === category.id ? 'btn-primary' : 'btn-outline-primary'
                                }`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                <i className={`${category.icon} me-2`}></i>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Schemes List */}
                <div className="schemes-list">
                    {filteredSchemes.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="fas fa-search text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                            <h6 className="text-muted">{t('no_schemes_found')}</h6>
                            <p className="text-muted">{t('try_different_search')}</p>
                        </div>
                    ) : (
                        <div className="row g-3">
                            {filteredSchemes.map(scheme => (
                                <div key={scheme.id} className="col-12">
                                    <div 
                                        className="card scheme-card h-100"
                                        onClick={() => setSelectedScheme(scheme)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1">{scheme.name}</h6>
                                                    <p className="text-muted mb-2 small">{scheme.description}</p>
                                                    <div className="scheme-meta d-flex align-items-center">
                                                        <span className="badge bg-light text-dark me-2">
                                                            {scheme.department}
                                                        </span>
                                                        <span className={`badge bg-${getStatusColor(scheme.status)}`}>
                                                            {getStatusText(scheme.status)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <div className="amount text-success fw-bold mb-1">
                                                        {scheme.amount}
                                                    </div>
                                                    <i className="fas fa-chevron-right text-muted"></i>
                                                </div>
                                            </div>

                                            <div className="scheme-info">
                                                <div className="d-flex justify-content-between align-items-center text-muted small">
                                                    <span>
                                                        <i className="fas fa-calendar me-1"></i>
                                                        {t('deadline')}: {scheme.deadline}
                                                    </span>
                                                    <span>
                                                        <i className="fas fa-users me-1"></i>
                                                        {scheme.eligibility.split(' ').slice(0, 3).join(' ')}...
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="card mt-4">
                    <div className="card-body">
                        <h6 className="mb-3">
                            <i className="fas fa-rocket me-2 text-warning"></i>
                            {t('quick_actions')}
                        </h6>
                        <div className="row g-2">
                            <div className="col-6">
                                <button className="btn btn-outline-primary w-100 btn-sm">
                                    <i className="fas fa-bell me-2"></i>
                                    {t('set_reminders')}
                                </button>
                            </div>
                            <div className="col-6">
                                <button className="btn btn-outline-success w-100 btn-sm">
                                    <i className="fas fa-download me-2"></i>
                                    {t('download_forms')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.Schemes = Schemes;
