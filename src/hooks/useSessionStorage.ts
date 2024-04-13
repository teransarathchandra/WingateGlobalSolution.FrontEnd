import { useState } from "react";

const useSessionStorage = (key, defaultValue?) => {
    const [sessionStorageValue, setSessionStorageValue] = useState(() => {
        try {
            const value = sessionStorage.getItem(key)
            if (value) {
                return JSON.parse(value)
            } else {
                sessionStorage.setItem(key, JSON.stringify(defaultValue));
                return defaultValue
            }
        } catch (error) {
            sessionStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue
        }
    })

    const setSessionStorageStateValue = (valueOrFn) => {
        let newValue;
        if (typeof valueOrFn === 'function') {
            const fn = valueOrFn;
            newValue = fn(sessionStorageValue)
        }
        else {
            newValue = valueOrFn;
        }
        sessionStorage.setItem(key, JSON.stringify(newValue));
        setSessionStorageValue(newValue)
    }
    return [sessionStorageValue, setSessionStorageStateValue]
}

export default useSessionStorage;