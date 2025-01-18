import { useState } from "react";

// utils.js
export const sortProducts = (products, criteria) => {
  switch (criteria) {
    case "created_desc":
      return [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
    case "created_asc":
      return [...products].sort((a, b) => new Date(a.date) - new Date(b.date));
    case "price_desc":
      return [...products].sort((a, b) => b.price - a.price);
    case "price_asc":
      return [...products].sort((a, b) => a.price - b.price);
    case "name_asc":
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
    case "name_desc":
      return [...products].sort((a, b) => b.title.localeCompare(a.title));
    default:
      return products;
  }
};

export const filterProducts = (products, searchTerm) => {
  return products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const useDebounce = (callback, delay) => {
  const [isDebouncing, setIsDebouncing] = useState(false);

  return (...args) => {
    if (!isDebouncing) {
      setIsDebouncing(true);
      callback(...args);
      setTimeout(() => {
        setIsDebouncing(false);
      }, delay);
    }
  };
};

export function capitalizeWords(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

