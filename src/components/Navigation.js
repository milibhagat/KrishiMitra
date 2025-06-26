function Navigation({ t, currentView, onNavigate }) {
    const navItems = [
        { id: 'home', icon: 'fas fa-home', label: t('home') },
        { id: 'crops', icon: 'fas fa-seedling', label: t('crops') },
        { id: 'weather', icon: 'fas fa-cloud-sun', label: t('weather') },
        { id: 'community', icon: 'fas fa-users', label: t('community') },
        { id: 'profile', icon: 'fas fa-user', label: t('profile') }
    ];

    return (
        <div className="bottom-nav">
            <div className="nav-container d-flex">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item flex-fill text-center py-2 ${
                            currentView === item.id ? 'active' : ''
                        }`}
                        onClick={() => onNavigate(item.id)}
                    >
                        <div>
                            <i className={item.icon}></i>
                            <div className="nav-label">{item.label}</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

window.Navigation = Navigation;
