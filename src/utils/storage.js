const StorageUtils = {
    // Check if localStorage is available
    isAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    },

    // Get item from localStorage
    getItem(key) {
        if (!this.isAvailable()) {
            console.warn('localStorage not available');
            return null;
        }

        try {
            const item = localStorage.getItem(key);
            return item;
        } catch (error) {
            console.error('Error getting item from storage:', error);
            return null;
        }
    },

    // Set item in localStorage
    setItem(key, value) {
        if (!this.isAvailable()) {
            console.warn('localStorage not available');
            return false;
        }

        try {
            localStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.error('Error setting item in storage:', error);
            return false;
        }
    },

    // Remove item from localStorage
    removeItem(key) {
        if (!this.isAvailable()) {
            console.warn('localStorage not available');
            return false;
        }

        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing item from storage:', error);
            return false;
        }
    },

    // Get JSON object from localStorage
    getObject(key) {
        const item = this.getItem(key);
        if (!item) return null;

        try {
            return JSON.parse(item);
        } catch (error) {
            console.error('Error parsing JSON from storage:', error);
            return null;
        }
    },

    // Set JSON object in localStorage
    setObject(key, value) {
        try {
            const jsonString = JSON.stringify(value);
            return this.setItem(key, jsonString);
        } catch (error) {
            console.error('Error stringifying JSON for storage:', error);
            return false;
        }
    },

    // Clear all localStorage
    clear() {
        if (!this.isAvailable()) {
            console.warn('localStorage not available');
            return false;
        }

        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            return false;
        }
    },

    // Get all keys
    getAllKeys() {
        if (!this.isAvailable()) {
            return [];
        }

        try {
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
                keys.push(localStorage.key(i));
            }
            return keys;
        } catch (error) {
            console.error('Error getting all keys:', error);
            return [];
        }
    },

    // Get storage size in KB
    getStorageSize() {
        if (!this.isAvailable()) {
            return 0;
        }

        try {
            let totalSize = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    totalSize += localStorage[key].length + key.length;
                }
            }
            return Math.round(totalSize / 1024 * 100) / 100; // KB with 2 decimal places
        } catch (error) {
            console.error('Error calculating storage size:', error);
            return 0;
        }
    },

    // Offline data management
    saveOfflineData(key, data) {
        const offlineData = {
            data,
            timestamp: Date.now(),
            version: '1.0'
        };
        return this.setObject(`offline_${key}`, offlineData);
    },

    getOfflineData(key, maxAge = 24 * 60 * 60 * 1000) { // 24 hours default
        const offlineData = this.getObject(`offline_${key}`);
        
        if (!offlineData) return null;
        
        // Check if data is too old
        if (Date.now() - offlineData.timestamp > maxAge) {
            this.removeItem(`offline_${key}`);
            return null;
        }
        
        return offlineData.data;
    },

    // User preferences
    saveUserPreferences(preferences) {
        return this.setObject('user_preferences', {
            ...preferences,
            lastUpdated: Date.now()
        });
    },

    getUserPreferences() {
        const prefs = this.getObject('user_preferences');
        return prefs || {
            language: 'hi',
            notifications: {
                weather: true,
                schemes: true,
                community: false,
                education: true
            },
            theme: 'light'
        };
    },

    // App data management
    saveAppData(key, data) {
        const appData = this.getObject('app_data') || {};
        appData[key] = {
            data,
            timestamp: Date.now()
        };
        return this.setObject('app_data', appData);
    },

    getAppData(key) {
        const appData = this.getObject('app_data') || {};
        return appData[key] ? appData[key].data : null;
    },

    // Cache management
    setCache(key, data, ttl = 30 * 60 * 1000) { // 30 minutes default
        const cacheData = {
            data,
            expiry: Date.now() + ttl
        };
        return this.setObject(`cache_${key}`, cacheData);
    },

    getCache(key) {
        const cacheData = this.getObject(`cache_${key}`);
        
        if (!cacheData) return null;
        
        // Check if cache has expired
        if (Date.now() > cacheData.expiry) {
            this.removeItem(`cache_${key}`);
            return null;
        }
        
        return cacheData.data;
    },

    // Clear expired cache
    clearExpiredCache() {
        const keys = this.getAllKeys();
        const cacheKeys = keys.filter(key => key.startsWith('cache_'));
        
        cacheKeys.forEach(key => {
            const cacheData = this.getObject(key);
            if (cacheData && Date.now() > cacheData.expiry) {
                this.removeItem(key);
            }
        });
    },

    // Backup and restore
    createBackup() {
        if (!this.isAvailable()) return null;
        
        try {
            const backup = {};
            const keys = this.getAllKeys();
            
            keys.forEach(key => {
                if (!key.startsWith('cache_')) { // Don't backup cache
                    backup[key] = this.getItem(key);
                }
            });
            
            return {
                version: '1.0',
                timestamp: Date.now(),
                data: backup
            };
        } catch (error) {
            console.error('Error creating backup:', error);
            return null;
        }
    },

    restoreBackup(backup) {
        if (!backup || !backup.data) return false;
        
        try {
            // Clear existing data (except cache)
            const keys = this.getAllKeys();
            keys.forEach(key => {
                if (!key.startsWith('cache_')) {
                    this.removeItem(key);
                }
            });
            
            // Restore backup data
            Object.keys(backup.data).forEach(key => {
                this.setItem(key, backup.data[key]);
            });
            
            return true;
        } catch (error) {
            console.error('Error restoring backup:', error);
            return false;
        }
    },

    // Storage health check
    healthCheck() {
        const info = {
            available: this.isAvailable(),
            size: this.getStorageSize(),
            keyCount: this.getAllKeys().length,
            lastUpdated: Date.now()
        };
        
        // Check for errors
        const testKey = '__health_check__';
        const testValue = 'test';
        
        const writeTest = this.setItem(testKey, testValue);
        const readTest = this.getItem(testKey) === testValue;
        const deleteTest = this.removeItem(testKey);
        
        info.healthy = writeTest && readTest && deleteTest;
        
        return info;
    }
};

window.StorageUtils = StorageUtils;
