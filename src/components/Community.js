function Community({ t, onBack }) {
    const [activeTab, setActiveTab] = useState('posts');
    const [newPost, setNewPost] = useState('');
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: 'राम सिंह',
            location: 'हरियाणा',
            time: '2 घंटे पहले',
            content: 'इस साल गेहूं की फसल बहुत अच्छी हुई है। ड्रिप इरिगेशन का बहुत फायदा मिला।',
            likes: 15,
            comments: 3,
            image: null,
            tags: ['गेहूं', 'सिंचाई']
        },
        {
            id: 2,
            author: 'सुनीता देवी',
            location: 'पंजाब',
            time: '4 घंटे पहले',
            content: 'मेरे टमाटरों में कीड़े लग गए हैं। कोई प्राकृतिक उपाय बताइए।',
            likes: 8,
            comments: 12,
            image: null,
            tags: ['टमाटर', 'कीट-नियंत्रण']
        },
        {
            id: 3,
            author: 'अजय पटेल',
            location: 'गुजरात',
            time: '1 दिन पहले',
            content: 'कपास की नई किस्म से 25% ज्यादा उत्पादन मिला। बीज की गुणवत्ता अच्छी थी।',
            likes: 23,
            comments: 7,
            image: null,
            tags: ['कपास', 'बीज']
        }
    ]);

    const experts = [
        {
            id: 1,
            name: 'डॉ. वीरेंद्र शर्मा',
            specialization: 'मृदा विशेषज्ञ',
            experience: '15 साल',
            rating: 4.8,
            available: true
        },
        {
            id: 2,
            name: 'प्रो. सुमित्रा पांडे',
            specialization: 'कीट नियंत्रण',
            experience: '12 साल',
            rating: 4.9,
            available: false
        },
        {
            id: 3,
            name: 'राजेश कुमार',
            specialization: 'जैविक खेती',
            experience: '8 साल',
            rating: 4.7,
            available: true
        }
    ];

    const handlePostSubmit = () => {
        if (!newPost.trim()) return;

        const post = {
            id: posts.length + 1,
            author: 'आप',
            location: 'आपका स्थान',
            time: 'अभी',
            content: newPost,
            likes: 0,
            comments: 0,
            image: null,
            tags: []
        };

        setPosts([post, ...posts]);
        setNewPost('');
    };

    const handleLike = (postId) => {
        setPosts(posts.map(post => 
            post.id === postId 
                ? { ...post, likes: post.likes + 1 }
                : post
        ));
    };

    return (
        <div className="community">
            {/* Header */}
            <div className="header">
                <div className="d-flex align-items-center p-3">
                    <button className="btn btn-light btn-sm me-3" onClick={onBack}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h5 className="mb-0 text-white">{t('farmer_community')}</h5>
                </div>
            </div>

            {/* Tabs */}
            <div className="community-tabs">
                <div className="nav nav-pills nav-fill p-3" role="tablist">
                    <button 
                        className={`nav-link ${activeTab === 'posts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('posts')}
                    >
                        <i className="fas fa-comments me-2"></i>
                        {t('discussions')}
                    </button>
                    <button 
                        className={`nav-link ${activeTab === 'experts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('experts')}
                    >
                        <i className="fas fa-user-tie me-2"></i>
                        {t('experts')}
                    </button>
                </div>
            </div>

            <div className="p-3">
                {activeTab === 'posts' ? (
                    /* Posts Tab */
                    <div className="posts-section">
                        {/* New Post */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <h6 className="mb-3">
                                    <i className="fas fa-edit me-2"></i>
                                    {t('share_experience')}
                                </h6>
                                
                                <div className="mb-3">
                                    <textarea 
                                        className="form-control"
                                        rows="3"
                                        placeholder={t('whats_on_mind')}
                                        value={newPost}
                                        onChange={(e) => setNewPost(e.target.value)}
                                    ></textarea>
                                </div>
                                
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="post-options">
                                        <button className="btn btn-outline-primary btn-sm me-2">
                                            <i className="fas fa-camera me-1"></i>
                                            {t('photo')}
                                        </button>
                                        <button className="btn btn-outline-success btn-sm">
                                            <i className="fas fa-map-marker-alt me-1"></i>
                                            {t('location')}
                                        </button>
                                    </div>
                                    
                                    <button 
                                        className="btn btn-success"
                                        onClick={handlePostSubmit}
                                        disabled={!newPost.trim()}
                                    >
                                        <i className="fas fa-paper-plane me-2"></i>
                                        {t('post')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Posts List */}
                        <div className="posts-list">
                            {posts.map(post => (
                                <div key={post.id} className="card mb-3">
                                    <div className="card-body">
                                        {/* Post Header */}
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="avatar me-3">
                                                <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" 
                                                     style={{ width: '40px', height: '40px' }}>
                                                    <i className="fas fa-user"></i>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-0">{post.author}</h6>
                                                <div className="d-flex align-items-center text-muted small">
                                                    <i className="fas fa-map-marker-alt me-1"></i>
                                                    <span className="me-3">{post.location}</span>
                                                    <i className="fas fa-clock me-1"></i>
                                                    <span>{post.time}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Post Content */}
                                        <div className="post-content mb-3">
                                            <p className="mb-2">{post.content}</p>
                                            
                                            {post.tags && post.tags.length > 0 && (
                                                <div className="post-tags">
                                                    {post.tags.map((tag, index) => (
                                                        <span key={index} className="badge bg-light text-dark me-2">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Post Actions */}
                                        <div className="post-actions d-flex align-items-center">
                                            <button 
                                                className="btn btn-outline-success btn-sm me-3"
                                                onClick={() => handleLike(post.id)}
                                            >
                                                <i className="fas fa-thumbs-up me-1"></i>
                                                {t('helpful')} ({post.likes})
                                            </button>
                                            
                                            <button className="btn btn-outline-primary btn-sm me-3">
                                                <i className="fas fa-comment me-1"></i>
                                                {t('reply')} ({post.comments})
                                            </button>
                                            
                                            <button className="btn btn-outline-secondary btn-sm">
                                                <i className="fas fa-share me-1"></i>
                                                {t('share')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Experts Tab */
                    <div className="experts-section">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <i className="fas fa-user-graduate text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                                <h6 className="mb-2">{t('get_expert_advice')}</h6>
                                <p className="text-muted">{t('connect_with_experts')}</p>
                            </div>
                        </div>

                        <div className="experts-list">
                            {experts.map(expert => (
                                <div key={expert.id} className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex align-items-start">
                                            <div className="expert-avatar me-3">
                                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                                                     style={{ width: '50px', height: '50px' }}>
                                                    <i className="fas fa-user-tie"></i>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <div>
                                                        <h6 className="mb-1">{expert.name}</h6>
                                                        <p className="text-muted mb-1">{expert.specialization}</p>
                                                        <small className="text-muted">
                                                            <i className="fas fa-clock me-1"></i>
                                                            {expert.experience} अनुभव
                                                        </small>
                                                    </div>
                                                    
                                                    <div className="text-end">
                                                        <div className="rating mb-1">
                                                            <i className="fas fa-star text-warning"></i>
                                                            <span className="ms-1">{expert.rating}</span>
                                                        </div>
                                                        <div className={`availability ${expert.available ? 'text-success' : 'text-danger'}`}>
                                                            <i className={`fas ${expert.available ? 'fa-circle' : 'fa-circle'} me-1`} 
                                                               style={{ fontSize: '0.8rem' }}></i>
                                                            {expert.available ? t('available') : t('busy')}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="expert-actions">
                                                    <button 
                                                        className={`btn btn-sm me-2 ${expert.available ? 'btn-success' : 'btn-outline-secondary'}`}
                                                        disabled={!expert.available}
                                                    >
                                                        <i className="fas fa-comments me-1"></i>
                                                        {t('chat_now')}
                                                    </button>
                                                    
                                                    <button className="btn btn-outline-primary btn-sm">
                                                        <i className="fas fa-phone me-1"></i>
                                                        {t('schedule_call')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Expert Request */}
                        <div className="card">
                            <div className="card-body text-center">
                                <i className="fas fa-question-circle text-info mb-3" style={{ fontSize: '2rem' }}></i>
                                <h6 className="mb-2">{t('need_specific_help')}</h6>
                                <p className="text-muted mb-3">{t('submit_question')}</p>
                                <button className="btn btn-info">
                                    <i className="fas fa-plus me-2"></i>
                                    {t('ask_question')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

window.Community = Community;
