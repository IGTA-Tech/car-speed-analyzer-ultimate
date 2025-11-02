import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarData, RaceResult } from '../types';
import { calculatePosition, calculateSpeed, formatSpeed, formatTime } from '../utils/racePhysics';

interface RaceTrackProps {
  car1: CarData;
  car2: CarData;
  raceDistance?: number; // feet (default: 1320 for quarter mile)
  onRaceComplete?: (result: RaceResult) => void;
  onReset?: () => void;
}

const RaceTrack: React.FC<RaceTrackProps> = ({
  car1,
  car2,
  raceDistance = 1320,
  onRaceComplete,
  onReset
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const [raceState, setRaceState] = useState<'countdown' | 'racing' | 'finished'>('countdown');
  const [countdown, setCountdown] = useState(3);
  const [positions, setPositions] = useState({ car1: 0, car2: 0 });
  const [speeds, setSpeeds] = useState({ car1: 0, car2: 0 });
  const [winner, setWinner] = useState<CarData | null>(null);
  const [raceTime, setRaceTime] = useState(0);

  // Countdown sequence
  useEffect(() => {
    if (countdown === 0) {
      setRaceState('racing');
      startTimeRef.current = Date.now();
      return;
    }

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Race animation loop
  useEffect(() => {
    if (raceState !== 'racing') return;

    const animate = () => {
      if (!startTimeRef.current) return;

      const elapsed = (Date.now() - startTimeRef.current) / 1000; // seconds
      setRaceTime(elapsed);

      // Calculate positions
      const car1Pos = calculatePosition(car1, elapsed, raceDistance);
      const car2Pos = calculatePosition(car2, elapsed, raceDistance);

      // Calculate speeds
      const car1Speed = calculateSpeed(car1, elapsed);
      const car2Speed = calculateSpeed(car2, elapsed);

      setPositions({ car1: car1Pos, car2: car2Pos });
      setSpeeds({ car1: car1Speed, car2: car2Speed });

      // Draw on canvas
      drawRace(canvasRef.current, car1, car2, car1Pos, car2Pos, raceDistance);

      // Check for finish
      const car1Finished = car1Pos >= raceDistance;
      const car2Finished = car2Pos >= raceDistance;

      if (car1Finished || car2Finished) {
        const winningCar = car1Pos > car2Pos ? car1 : car2;
        const losingCar = car1Pos > car2Pos ? car2 : car1;

        setWinner(winningCar);
        setRaceState('finished');

        if (onRaceComplete) {
          onRaceComplete({
            winner: winningCar,
            loser: losingCar,
            car1Time: elapsed,
            car2Time: elapsed,
            distance: raceDistance
          });
        }
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [raceState, car1, car2, raceDistance, onRaceComplete]);

  // Handle reset
  const handleReset = () => {
    setRaceState('countdown');
    setCountdown(3);
    setPositions({ car1: 0, car2: 0 });
    setSpeeds({ car1: 0, car2: 0 });
    setWinner(null);
    setRaceTime(0);
    if (onReset) onReset();
  };

  return (
    <div className="relative w-full">
      {/* Countdown overlay */}
      <AnimatePresence>
        {raceState === 'countdown' && countdown > 0 && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          >
            <div className="text-9xl font-bold text-white drop-shadow-2xl">
              {countdown}
            </div>
          </motion.div>
        )}
        {raceState === 'countdown' && countdown === 0 && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          >
            <div className="text-9xl font-bold text-green-400 drop-shadow-2xl">
              GO!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Race track canvas */}
      <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1200}
          height={400}
          className="w-full h-full"
        />

        {/* Speed indicators */}
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <div className="bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            <div className="text-xs opacity-75 font-semibold">{car1.make} {car1.model}</div>
            <div className="text-2xl font-bold text-blue-400">{formatSpeed(speeds.car1)}</div>
          </div>
          <div className="bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            <div className="text-xs opacity-75 font-semibold">{car2.make} {car2.model}</div>
            <div className="text-2xl font-bold text-red-400">{formatSpeed(speeds.car2)}</div>
          </div>
        </div>

        {/* Distance markers */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 text-white text-xs z-10">
          <span className="bg-black bg-opacity-50 px-2 py-1 rounded">START</span>
          <span className="bg-black bg-opacity-50 px-2 py-1 rounded">330 ft</span>
          <span className="bg-black bg-opacity-50 px-2 py-1 rounded">660 ft</span>
          <span className="bg-black bg-opacity-50 px-2 py-1 rounded">1000 ft</span>
          <span className="bg-black bg-opacity-50 px-2 py-1 rounded">FINISH</span>
        </div>
      </div>

      {/* Winner announcement */}
      <AnimatePresence>
        {raceState === 'finished' && winner && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 z-30 rounded-2xl"
          >
            <div className="text-center p-8">
              <motion.div
                initial={{ rotate: -180 }}
                animate={{ rotate: 0 }}
                transition={{ type: 'spring', duration: 1 }}
                className="text-6xl mb-4"
              >
                🏆
              </motion.div>
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
                {winner.make} {winner.model}
              </div>
              <div className="text-2xl md:text-3xl text-white mb-2">
                WINS!
              </div>
              <div className="text-xl text-gray-300 mb-6">
                Time: {formatTime(raceTime)}
              </div>
              <div className="text-lg text-gray-400 mb-8">
                Margin: {(positions.car1 > positions.car2
                  ? positions.car1 - positions.car2
                  : positions.car2 - positions.car1
                ).toFixed(1)} feet
              </div>
              <button
                onClick={handleReset}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all touch-target"
              >
                Race Again! 🏁
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Canvas drawing function
const drawRace = (
  canvas: HTMLCanvasElement | null,
  car1: CarData,
  car2: CarData,
  car1Pos: number,
  car2Pos: number,
  raceDistance: number
) => {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  // Clear canvas
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(0, 0, width, height);

  // Draw track lanes
  ctx.strokeStyle = '#4b5563';
  ctx.lineWidth = 3;

  // Top lane divider
  ctx.beginPath();
  ctx.moveTo(0, height / 3);
  ctx.lineTo(width, height / 3);
  ctx.stroke();

  // Bottom lane divider
  ctx.beginPath();
  ctx.moveTo(0, 2 * height / 3);
  ctx.lineTo(width, 2 * height / 3);
  ctx.stroke();

  // Draw center dashed line for each lane
  ctx.setLineDash([20, 10]);
  ctx.strokeStyle = '#6b7280';
  ctx.lineWidth = 2;

  // Top lane center line
  ctx.beginPath();
  ctx.moveTo(0, height / 6);
  ctx.lineTo(width, height / 6);
  ctx.stroke();

  // Bottom lane center line
  ctx.beginPath();
  ctx.moveTo(0, 5 * height / 6);
  ctx.lineTo(width, 5 * height / 6);
  ctx.stroke();

  ctx.setLineDash([]);

  // Draw start line
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(30, 0);
  ctx.lineTo(30, height);
  ctx.stroke();

  // Draw finish line (checkered pattern)
  const finishX = width - 50;
  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#000000' : '#ffffff';
    ctx.fillRect(finishX, i * (height / 20), 50, height / 20);
  }

  // Calculate car X positions
  const trackLength = width - 130; // Account for start and finish line spacing
  const car1X = 50 + (car1Pos / raceDistance) * trackLength;
  const car2X = 50 + (car2Pos / raceDistance) * trackLength;

  // Draw Car 1 (top lane) - Blue
  const car1Y = height / 6;
  drawCar(ctx, car1X, car1Y, 80, 50, '#3B82F6', car1.make);

  // Draw speed blur if moving
  if (car1Pos > 0) {
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.fillRect(car1X - 30, car1Y - 25, 30, 50);
  }

  // Draw Car 2 (bottom lane) - Red
  const car2Y = 5 * height / 6;
  drawCar(ctx, car2X, car2Y, 80, 50, '#EF4444', car2.make);

  // Draw speed blur if moving
  if (car2Pos > 0) {
    ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
    ctx.fillRect(car2X - 30, car2Y - 25, 30, 50);
  }
};

// Helper function to draw a car
const drawCar = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  label: string
) => {
  // Car body
  ctx.fillStyle = color;
  ctx.fillRect(x, y - height / 2, width, height);

  // Car highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(x + 5, y - height / 2 + 5, width - 10, height / 3);

  // Wheels
  ctx.fillStyle = '#000000';
  const wheelSize = height / 4;
  ctx.fillRect(x + 10, y - height / 2 - wheelSize / 2, wheelSize, wheelSize);
  ctx.fillRect(x + 10, y + height / 2 - wheelSize / 2, wheelSize, wheelSize);
  ctx.fillRect(x + width - 10 - wheelSize, y - height / 2 - wheelSize / 2, wheelSize, wheelSize);
  ctx.fillRect(x + width - 10 - wheelSize, y + height / 2 - wheelSize / 2, wheelSize, wheelSize);

  // Label
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(label, x + width / 2, y + 5);
};

export default RaceTrack;
