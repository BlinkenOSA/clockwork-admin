export const clearLocalStorageByPrefix = (prefix) => {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
            keys.push(key);
        }
    }
    keys.forEach(key => localStorage.removeItem(key));
};