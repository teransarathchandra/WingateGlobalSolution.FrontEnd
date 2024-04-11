import { useState } from "react";

const useSessionStorage = (key, defaultValue = '') => {
    // Create state variable to store 
    // sessionStorage value in state
    const [sessionStorageValue, setSessionStorageValue] = useState(() => {
        try {
            const value = sessionStorage.getItem(key)
            // If value is already present in 
            // sessionStorage then return it

            // Else set default value in 
            // sessionStorage and then return it
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

    // this method update our sessionStorage and our state
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