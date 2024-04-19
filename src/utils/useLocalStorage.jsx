import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(keyName);
      if (item) {
        return JSON.parse(item);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
