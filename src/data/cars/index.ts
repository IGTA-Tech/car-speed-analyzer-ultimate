import { CarData } from '../../types';
import { hypercars } from './hypercars';
import { sportscars } from './sportscars';
import { electricCars } from './electric';

// Combine all car databases
export const allCars: CarData[] = [
  ...hypercars,
  ...sportscars,
  ...electricCars
];

// Helper functions
export const getCarById = (id: string): CarData | undefined => {
  return allCars.find(car => car.id === id);
};

export const getCarsByCategory = (category: CarData['category']): CarData[] => {
  return allCars.filter(car => car.category === category);
};

export const getRandomCar = (): CarData => {
  return allCars[Math.floor(Math.random() * allCars.length)];
};

export const getTopSpeedLeaders = (limit: number = 10): CarData[] => {
  return [...allCars]
    .sort((a, b) => b.performance.topSpeed - a.performance.topSpeed)
    .slice(0, limit);
};

export const getQuickestAcceleration = (limit: number = 10): CarData[] => {
  return [...allCars]
    .sort((a, b) => a.performance.speed0to60 - b.performance.speed0to60)
    .slice(0, limit);
};

export const searchCars = (query: string): CarData[] => {
  const lowerQuery = query.toLowerCase();
  return allCars.filter(car =>
    car.make.toLowerCase().includes(lowerQuery) ||
    car.model.toLowerCase().includes(lowerQuery) ||
    `${car.year}`.includes(lowerQuery)
  );
};

// Export individual databases for expansion
export { hypercars, sportscars, electricCars };
