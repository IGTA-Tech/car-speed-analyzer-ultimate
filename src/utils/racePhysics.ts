import { CarData } from '../types';

/**
 * Calculate the position of a car during a race based on elapsed time
 * Uses realistic physics modeling with acceleration and top speed curves
 */
export const calculatePosition = (car: CarData, time: number, raceDistance: number = 1320): number => {
  const accelTime = car.performance.speed0to60; // seconds to reach 60 mph
  const topSpeed = car.performance.topSpeed; // mph
  const quarterMileTime = car.performance.quarterMile; // seconds

  if (time <= 0) return 0;

  // Phase 1: Initial acceleration (0 to 60 mph)
  // Uses quadratic curve for realistic acceleration feel
  if (time <= accelTime) {
    const percentComplete = time / accelTime;
    // During 0-60, car covers about 25-30% of quarter mile
    return raceDistance * 0.28 * Math.pow(percentComplete, 2);
  }

  // Phase 2: Continued acceleration to top speed
  // Linear progression from 60 mph zone to finish line
  const timeAfterAccel = time - accelTime;
  const remainingTime = quarterMileTime - accelTime;

  if (time <= quarterMileTime) {
    const percentComplete = Math.min(timeAfterAccel / remainingTime, 1);
    const initialPos = raceDistance * 0.28;
    const remainingDistance = raceDistance * 0.72;
    return initialPos + (remainingDistance * percentComplete);
  }

  // Phase 3: Past quarter mile - continue at top speed
  const extraTime = time - quarterMileTime;
  const extraDistance = (topSpeed * 5280 / 3600) * extraTime; // Convert MPH to feet/sec
  return Math.min(raceDistance + extraDistance, raceDistance * 1.5);
};

/**
 * Calculate the current speed of a car at a given time
 */
export const calculateSpeed = (car: CarData, time: number): number => {
  const accelTime = car.performance.speed0to60;
  const topSpeed = car.performance.topSpeed;
  const quarterMileTime = car.performance.quarterMile;

  if (time <= 0) return 0;

  // During 0-60 acceleration
  if (time <= accelTime) {
    return (60 / accelTime) * time;
  }

  // After 0-60, approaching top speed
  if (time <= quarterMileTime) {
    const timeAfterAccel = time - accelTime;
    const remainingTime = quarterMileTime - accelTime;
    const percentToTop = timeAfterAccel / remainingTime;

    // Smooth curve from 60 to top speed
    return 60 + (topSpeed - 60) * Math.pow(percentToTop, 0.7);
  }

  // At or near top speed
  return topSpeed;
};

/**
 * Predict race winner and margin of victory
 */
export const predictRaceOutcome = (
  car1: CarData,
  car2: CarData,
  raceDistance: number = 1320
): {
  winner: CarData;
  loser: CarData;
  winnerTime: number;
  loserTime: number;
  marginFeet: number;
  marginSeconds: number;
} => {
  const car1Time = car1.performance.quarterMile;
  const car2Time = car2.performance.quarterMile;

  const winner = car1Time < car2Time ? car1 : car2;
  const loser = car1Time < car2Time ? car2 : car1;
  const winnerTime = Math.min(car1Time, car2Time);
  const loserTime = Math.max(car1Time, car2Time);

  // Calculate where loser is when winner crosses finish line
  const loserPosition = calculatePosition(loser, winnerTime, raceDistance);
  const marginFeet = raceDistance - loserPosition;
  const marginSeconds = loserTime - winnerTime;

  return {
    winner,
    loser,
    winnerTime,
    loserTime,
    marginFeet,
    marginSeconds
  };
};

/**
 * Generate color for car based on its index
 */
export const getCarColor = (index: number): string => {
  const colors = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Amber
    '#8B5CF6', // Purple
    '#EC4899', // Pink
  ];
  return colors[index % colors.length];
};

/**
 * Format time for display (e.g., "9.23s")
 */
export const formatTime = (seconds: number): string => {
  return `${seconds.toFixed(2)}s`;
};

/**
 * Format speed for display (e.g., "156 MPH")
 */
export const formatSpeed = (mph: number): string => {
  return `${Math.round(mph)} MPH`;
};

/**
 * Format distance for display (e.g., "1,320 ft")
 */
export const formatDistance = (feet: number): string => {
  return `${feet.toLocaleString()} ft`;
};
