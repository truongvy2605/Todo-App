import { useState, useEffect } from 'react';

// Tạo một custom hook `useLocalStorage` để lưu trữ và đồng bộ hóa trạng thái với LocalStorage
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  // Sử dụng `useEffect` để cập nhật LocalStorage bất cứ khi nào `storedValue` hoặc `key` thay đổi
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
