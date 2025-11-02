import axios from 'axios';
import { CarData } from '../types';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const CACHE_KEY = 'car-images-cache';
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

interface ImageCache {
  [carId: string]: {
    url: string;
    timestamp: number;
  };
}

// Load cache from localStorage
const loadCache = (): ImageCache => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch (error) {
    console.error('Failed to load image cache:', error);
    return {};
  }
};

// Save cache to localStorage
const saveCache = (cache: ImageCache): void => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Failed to save image cache:', error);
  }
};

// Check if cached image is still valid
const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_DURATION;
};

// Get brand logo as fallback
export const getBrandLogo = (make: string): string => {
  // Return a placeholder or brand logo URL
  // In production, you'd have actual brand logos
  return `https://via.placeholder.com/800x600/3B82F6/ffffff?text=${encodeURIComponent(make)}`;
};

// Fetch car image from Unsplash OR use local image
export const fetchCarImage = async (
  make: string,
  model: string,
  year: number,
  localImageUrl?: string
): Promise<string> => {
  // PRIORITY 1: Use local image if available (AI-generated images)
  if (localImageUrl) {
    console.log(`Using local AI-generated image for ${make} ${model}`);
    return localImageUrl;
  }

  const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  // Check if API key is available
  if (!apiKey || apiKey.trim() === '') {
    console.warn('Unsplash API key not configured, using fallback');
    return getBrandLogo(make);
  }

  // Check cache first
  const cache = loadCache();
  const cacheId = `${make}-${model}-${year}`.toLowerCase();

  if (cache[cacheId] && isCacheValid(cache[cacheId].timestamp)) {
    console.log(`Using cached image for ${make} ${model}`);
    return cache[cacheId].url;
  }

  try {
    // Try primary search query
    const primaryQuery = `${year} ${make} ${model} car side view`;
    let response = await axios.get(UNSPLASH_API_URL, {
      params: {
        query: primaryQuery,
        per_page: 1,
        orientation: 'landscape'
      },
      headers: {
        Authorization: `Client-ID ${apiKey}`
      }
    });

    // If no results, try fallback searches
    if (response.data.results.length === 0) {
      console.log(`No results for "${primaryQuery}", trying fallback`);
      response = await fetchFallbackImage(make, model, apiKey);
    }

    if (response.data.results.length > 0) {
      const imageUrl = response.data.results[0].urls.regular;

      // Cache the result
      cache[cacheId] = {
        url: imageUrl,
        timestamp: Date.now()
      };
      saveCache(cache);

      return imageUrl;
    }

    // If still no results, return brand logo
    return getBrandLogo(make);

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Unsplash API error:', error.response?.status, error.response?.data);
      if (error.response?.status === 401) {
        console.error('Invalid Unsplash API key');
      } else if (error.response?.status === 403) {
        console.error('Unsplash API rate limit exceeded');
      }
    } else {
      console.error('Image fetch error:', error);
    }
    return getBrandLogo(make);
  }
};

// Fallback search with broader queries
const fetchFallbackImage = async (
  make: string,
  model: string,
  apiKey: string
): Promise<any> => {
  const fallbackQueries = [
    `${make} ${model} car`,
    `${make} car`,
    `${make} automobile`
  ];

  for (const query of fallbackQueries) {
    try {
      console.log(`Trying fallback query: "${query}"`);
      const response = await axios.get(UNSPLASH_API_URL, {
        params: {
          query: query,
          per_page: 1,
          orientation: 'landscape'
        },
        headers: {
          Authorization: `Client-ID ${apiKey}`
        }
      });

      if (response.data.results.length > 0) {
        return response.data;
      }
    } catch (error) {
      console.error(`Fallback query "${query}" failed:`, error);
    }
  }

  // Return empty results if all fallbacks fail
  return { data: { results: [] } };
};

// Fetch images for all cars (for pre-fetching)
export const prefetchAllCarImages = async (
  cars: CarData[],
  onProgress?: (current: number, total: number) => void
): Promise<void> => {
  const total = cars.length;
  let current = 0;

  for (const car of cars) {
    try {
      await fetchCarImage(car.make, car.model, car.year);
      current++;
      if (onProgress) {
        onProgress(current, total);
      }

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to prefetch image for ${car.make} ${car.model}:`, error);
      current++;
      if (onProgress) {
        onProgress(current, total);
      }
    }
  }
};

// Clear image cache
export const clearImageCache = (): void => {
  try {
    localStorage.removeItem(CACHE_KEY);
    console.log('Image cache cleared');
  } catch (error) {
    console.error('Failed to clear image cache:', error);
  }
};

// Get cache stats
export const getCacheStats = (): { total: number; valid: number; expired: number } => {
  const cache = loadCache();
  const entries = Object.values(cache);

  return {
    total: entries.length,
    valid: entries.filter(entry => isCacheValid(entry.timestamp)).length,
    expired: entries.filter(entry => !isCacheValid(entry.timestamp)).length
  };
};
