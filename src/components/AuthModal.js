function AuthModal({ t, isOpen, onClose, onLoginSuccess }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('/api/auth/user');
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setUser(data.user);
                    if (onLoginSuccess) onLoginSuccess(data.user);
                }
            }
        } catch (error) {
            console.log('Not authenticated');
        }
    };

    const handleGoogleLogin = () => {
        setIsLoading(true);
        window.location.href = '/api/auth/google';
    };

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/auth/logout', {
                method: 'POST'
            });
            
            if (response.ok) {
                setUser(null);
                if (onLoginSuccess) onLoginSuccess(null);
                window.location.reload();
            }
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h5 className="modal-title text-success">
                            <i className="fas fa-user-circle me-2"></i>
                            {user ? t('auth.welcome') : t('auth.login')}
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={onClose}
                            disabled={isLoading}
                        ></button>
                    </div>
                    
                    <div className="modal-body text-center">
                        {user ? (
                            // User is logged in
                            <div>
                                <div className="mb-4">
                                    <img 
                                        src={user.profileImageUrl || '/placeholder-avatar.png'} 
                                        alt="Profile"
                                        className="rounded-circle mb-3"
                                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                    />
                                    <h6 className="mb-1">{user.firstName} {user.lastName}</h6>
                                    <small className="text-muted">{user.email}</small>
                                </div>
                                
                                <div className="d-grid gap-2">
                                    <button 
                                        className="btn btn-outline-primary"
                                        onClick={onClose}
                                    >
                                        <i className="fas fa-user-edit me-2"></i>
                                        {t('auth.profile')}
                                    </button>
                                    
                                    <button 
                                        className="btn btn-outline-danger"
                                        onClick={handleLogout}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                        ) : (
                                            <i className="fas fa-sign-out-alt me-2"></i>
                                        )}
                                        {t('auth.logout')}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // User is not logged in
                            <div>
                                <div className="mb-4">
                                    <i className="fas fa-seedling text-success" style={{ fontSize: '3rem' }}></i>
                                    <h6 className="mt-3 mb-2">{t('farmers_friend')}</h6>
                                    <p className="text-muted small">{t('auth.please_login')}</p>
                                </div>
                                
                                <div className="d-grid gap-2">
                                    <button 
                                        className="btn btn-danger btn-lg"
                                        onClick={handleGoogleLogin}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                        ) : (
                                            <i className="fab fa-google me-2"></i>
                                        )}
                                        {t('auth.google')}
                                    </button>
                                    
                                    <small className="text-muted mt-2">
                                        {t('auth.login_required')}
                                    </small>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

window.AuthModal = AuthModal;