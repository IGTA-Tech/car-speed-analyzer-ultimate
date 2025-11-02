import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { CarData } from '../types';

interface CarSelectorProps {
  cars: CarData[];
  selectedCar1: CarData | null;
  selectedCar2: CarData | null;
  onSelectCar1: (car: CarData) => void;
  onSelectCar2: (car: CarData) => void;
  onStartRace: () => void;
}

const CarSelector: React.FC<CarSelectorProps> = ({
  cars,
  selectedCar1,
  selectedCar2,
  onSelectCar1,
  onSelectCar2,
  onStartRace
}) => {
  const canStartRace = selectedCar1 && selectedCar2 && selectedCar1.id !== selectedCar2.id;

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Choose Your Racers!</h2>
        <p className="text-lg md:text-xl opacity-90">
          Pick two cars to race head-to-head
        </p>
      </div>

      {/* Selection status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Car 1 Selection */}
        <div className={`bg-blue-500 bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border-2 ${
          selectedCar1 ? 'border-blue-400' : 'border-transparent'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            <h3 className="text-xl font-bold text-white">Blue Lane</h3>
          </div>
          {selectedCar1 ? (
            <div className="text-white">
              <div className="text-2xl font-bold">{selectedCar1.make}</div>
              <div className="text-lg opacity-90">{selectedCar1.model}</div>
              <div className="text-sm opacity-75 mt-2">
                {selectedCar1.performance.speed0to60}s 0-60 • {selectedCar1.performance.topSpeed} MPH
              </div>
            </div>
          ) : (
            <div className="text-white opacity-50">
              Select a car from below...
            </div>
          )}
        </div>

        {/* Car 2 Selection */}
        <div className={`bg-red-500 bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border-2 ${
          selectedCar2 ? 'border-red-400' : 'border-transparent'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <h3 className="text-xl font-bold text-white">Red Lane</h3>
          </div>
          {selectedCar2 ? (
            <div className="text-white">
              <div className="text-2xl font-bold">{selectedCar2.make}</div>
              <div className="text-lg opacity-90">{selectedCar2.model}</div>
              <div className="text-sm opacity-75 mt-2">
                {selectedCar2.performance.speed0to60}s 0-60 • {selectedCar2.performance.topSpeed} MPH
              </div>
            </div>
          ) : (
            <div className="text-white opacity-50">
              Select a car from below...
            </div>
          )}
        </div>
      </div>

      {/* Start Race Button */}
      {canStartRace && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <button
            onClick={onStartRace}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-6 rounded-2xl font-bold text-2xl shadow-2xl hover:from-green-600 hover:to-emerald-700 transition-all touch-target transform hover:scale-105"
          >
            🏁 START RACE! 🏁
          </button>
        </motion.div>
      )}

      {/* Car Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {cars.map((car) => {
          const isSelected1 = selectedCar1?.id === car.id;
          const isSelected2 = selectedCar2?.id === car.id;
          const isSelected = isSelected1 || isSelected2;

          return (
            <motion.div
              key={car.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <button
                onClick={() => {
                  if (isSelected1) {
                    onSelectCar1(null as any);
                  } else if (isSelected2) {
                    onSelectCar2(null as any);
                  } else if (!selectedCar1) {
                    onSelectCar1(car);
                  } else if (!selectedCar2) {
                    onSelectCar2(car);
                  } else {
                    // Replace car 2 by default
                    onSelectCar2(car);
                  }
                }}
                className={`w-full bg-white rounded-xl p-3 text-left transition-all touch-target ${
                  isSelected
                    ? isSelected1
                      ? 'ring-4 ring-blue-400 shadow-xl'
                      : 'ring-4 ring-red-400 shadow-xl'
                    : 'hover:shadow-lg'
                }`}
              >
                {/* Selection Badge */}
                {isSelected && (
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${
                    isSelected1 ? 'bg-blue-500' : 'bg-red-500'
                  }`}>
                    <Check size={18} className="text-white" />
                  </div>
                )}

                {/* Car Info */}
                <div className="text-sm font-bold text-gray-800 truncate">
                  {car.make}
                </div>
                <div className="text-xs text-gray-600 truncate mb-2">
                  {car.model}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded font-semibold">
                    {car.performance.topSpeed}
                  </div>
                  <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">
                    {car.performance.speed0to60}s
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CarSelector;
