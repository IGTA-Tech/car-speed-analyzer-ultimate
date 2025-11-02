export interface CarPerformance {
  topSpeed: number; // MPH
  speed0to60: number; // seconds
  quarterMile: number; // seconds
  horsepower: number;
  torque: number; // lb-ft
  weight: number; // lbs
}

export interface CarFacts {
  speed: string[];
  engineering: string[];
  celebrity: string[];
  manufacturing: string[];
  cost: string[];
  innovation: string[];
  racing: string[];
  trivia: string[];
}

export interface CarData {
  id: string;
  make: string;
  model: string;
  year: number;
  category: 'hypercar' | 'sports' | 'electric' | 'muscle' | 'classic' | 'luxury';
  performance: CarPerformance;
  engine: {
    type: string;
    displacement: string;
    cylinders: number;
  };
  transmission: string;
  drivetrain: string;
  price: number; // USD
  imageUrl?: string;
  unsplashCached?: boolean;
  facts: CarFacts;
  factRotationIndex?: number;
}

export interface RaceResult {
  winner: CarData;
  loser: CarData;
  car1Time: number;
  car2Time: number;
  distance: number;
}

export interface RaceState {
  status: 'countdown' | 'racing' | 'finished';
  countdown: number;
  positions: { car1: number; car2: number };
  speeds: { car1: number; car2: number };
  winner: CarData | null;
}
