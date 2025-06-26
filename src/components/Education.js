function Education({ t, onBack }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        { id: 'all', name: t('all_topics'), icon: 'fas fa-th-large' },
        { id: 'organic', name: t('organic_farming'), icon: 'fas fa-leaf' },
        { id: 'irrigation', name: t('irrigation'), icon: 'fas fa-tint' },
        { id: 'pest', name: t('pest_control'), icon: 'fas fa-bug' },
        { id: 'soil', name: t('soil_management'), icon: 'fas fa-seedling' },
        { id: 'harvest', name: t('harvesting'), icon: 'fas fa-wheat' }
    ];

    const educationContent = [
        {
            id: 1,
            category: 'organic',
            title: t('organic_farming_basics'),
            summary: t('organic_farming_summary'),
            readTime: '5 मिनट',
            difficulty: t('beginner'),
            content: `
                <h5>जैविक खेती के मूल सिद्धांत</h5>
                <p>जैविक खेती एक टिकाऊ कृषि पद्धति है जो रासायनिक उर्वरकों और कीटनाशकों के बिना फसल उगाने पर केंद्रित है।</p>
                <h6>मुख्य सिद्धांत:</h6>
                <ul>
                    <li>मिट्टी की स्वास्थ्य में सुधार</li>
                    <li>प्राकृतिक उर्वरकों का उपयोग</li>
                    <li>जैविक कीट नियंत्रण</li>
                    <li>फसल चक्रण</li>
                </ul>
            `,
            tips: [
                'कंपोस्ट खाद का उपयोग करें',
                'नीम का तेल प्राकृतिक कीटनाशक के रूप में',
                'मिश्रित खेती करें'
            ]
        },
        {
            id: 2,
            category: 'irrigation',
            title: t('drip_irrigation_guide'),
            summary: t('drip_irrigation_summary'),
            readTime: '7 मिनट',
            difficulty: t('intermediate'),
            content: `
                <h5>ड्रिप इरिगेशन सिस्टम</h5>
                <p>ड्रिप इरिगेशन एक जल-कुशल सिंचाई विधि है जो पौधों की जड़ों तक सीधे पानी पहुंचाती है।</p>
                <h6>फायदे:</h6>
                <ul>
                    <li>90% तक पानी की बचत</li>
                    <li>समान जल वितरण</li>
                    <li>खरपतवार में कमी</li>
                    <li>बेहतर फसल उत्पादन</li>
                </ul>
            `,
            tips: [
                'नियमित फिल्टर की सफाई',
                'पाइप में रिसाव की जांच',
                'टाइमर का उपयोग करें'
            ]
        },
        {
            id: 3,
            category: 'pest',
            title: t('natural_pest_control'),
            summary: t('natural_pest_summary'),
            readTime: '6 मिनट',
            difficulty: t('beginner'),
            content: `
                <h5>प्राकृतिक कीट नियंत्रण</h5>
                <p>रासायनिक कीटनाशकों के बिना कीटों से फसल की सुरक्षा के प्राकृतिक तरीके।</p>
                <h6>प्राकृतिक उपाय:</h6>
                <ul>
                    <li>नीम का तेल</li>
                    <li>लहसुन-मिर्च का घोल</li>
                    <li>माल्च का उपयोग</li>
                    <li>फायदेमंद कीड़ों को बढ़ावा</li>
                </ul>
            `,
            tips: [
                'नियमित निरीक्षण करें',
                'मिश्रित फसल उगाएं',
                'स्वच्छता बनाए रखें'
            ]
        }
    ];

    const filteredContent = educationContent.filter(article => {
        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             article.summary.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (selectedArticle) {
        return (
            <div className="education-article">
                <div className="header">
                    <div className="d-flex align-items-center p-3">
                        <button 
                            className="btn btn-light btn-sm me-3" 
                            onClick={() => setSelectedArticle(null)}
                        >
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <h5 className="mb-0 text-white">{selectedArticle.title}</h5>
                    </div>
                </div>

                <div className="p-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="article-meta mb-3 d-flex align-items-center text-muted">
                                <span className="me-3">
                                    <i className="fas fa-clock me-1"></i>
                                    {selectedArticle.readTime}
                                </span>
                                <span className="me-3">
                                    <i className="fas fa-signal me-1"></i>
                                    {selectedArticle.difficulty}
                                </span>
                            </div>

                            <div 
                                className="article-content"
                                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                            />

                            {selectedArticle.tips && (
                                <div className="tips-section mt-4 p-3 bg-light rounded">
                                    <h6 className="text-success mb-3">
                                        <i className="fas fa-lightbulb me-2"></i>
                                        {t('quick_tips')}
                                    </h6>
                                    <ul className="list-unstyled mb-0">
                                        {selectedArticle.tips.map((tip, index) => (
                                            <li key={index} className="mb-2">
                                                <i className="fas fa-check-circle text-success me-2"></i>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="education">
            {/* Header */}
            <div className="header">
                <div className="d-flex align-items-center p-3">
                    <button className="btn btn-light btn-sm me-3" onClick={onBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h5 className="mb-0 text-white">{t('farming_education')}</h5>
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
                                placeholder={t('search_topics')}
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
                                    selectedCategory === category.id ? 'btn-success' : 'btn-outline-success'
                                }`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                <i className={`${category.icon} me-2`}></i>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles List */}
                <div className="articles-list">
                    {filteredContent.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="fas fa-search text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                            <h6 className="text-muted">{t('no_articles_found')}</h6>
                            <p className="text-muted">{t('try_different_search')}</p>
                        </div>
                    ) : (
                        <div className="row g-3">
                            {filteredContent.map(article => (
                                <div key={article.id} className="col-12">
                                    <div 
                                        className="card article-card h-100"
                                        onClick={() => setSelectedArticle(article)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="card-body">
                                            <div className="d-flex align-items-start">
                                                <div className="article-icon me-3">
                                                    <i className={categories.find(c => c.id === article.category)?.icon} 
                                                       style={{ fontSize: '2rem', color: '#4CAF50' }}></i>
                                                </div>
                                                
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-2">{article.title}</h6>
                                                    <p className="text-muted mb-3">{article.summary}</p>
                                                    
                                                    <div className="article-meta d-flex align-items-center text-muted small">
                                                        <span className="me-3">
                                                            <i className="fas fa-clock me-1"></i>
                                                            {article.readTime}
                                                        </span>
                                                        <span className="me-3">
                                                            <i className="fas fa-signal me-1"></i>
                                                            {article.difficulty}
                                                        </span>
                                                        <span className="ms-auto">
                                                            <i className="fas fa-arrow-right"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Tips */}
                <div className="card mt-4">
                    <div className="card-body">
                        <h6 className="mb-3">
                            <i className="fas fa-lightbulb me-2 text-warning"></i>
                            {t('daily_tip')}
                        </h6>
                        <div className="alert alert-info">
                            <i className="fas fa-info-circle me-2"></i>
                            फसल की नियमित जांच करें और किसी भी असामान्यता की पहचान करते ही उपचार शुरू करें।
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.Education = Education;
