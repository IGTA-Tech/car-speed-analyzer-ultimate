import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Gauge, Clock } from 'lucide-react';
import { CarData } from '../types';
import { fetchCarImage, getBrandLogo } from '../services/imageService';

interface CarCardProps {
  car: CarData;
  onClick?: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setImageLoading(true);
        setImageError(false);
        const url = await fetchCarImage(car.make, car.model, car.year, car.imageUrl);
        setImageUrl(url);
      } catch (error) {
        console.error('Failed to load car image:', error);
        setImageError(true);
        setImageUrl(getBrandLogo(car.make));
      } finally {
        setImageLoading(false);
      }
    };

    loadImage();
  }, [car.make, car.model, car.year, car.imageUrl]);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer min-h-[400px] flex flex-col"
    >
      {/* Image section */}
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden bg-gray-200">
        {imageLoading ? (
          // Skeleton loader
          <div className="w-full h-full skeleton" />
        ) : (
          <>
            <img
              src={imageUrl}
              alt={`${car.year} ${car.make} ${car.model}`}
              className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
              loading="lazy"
              onError={() => {
                setImageError(true);
                setImageUrl(getBrandLogo(car.make));
              }}
            />
            {imageError && (
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                Placeholder
              </div>
            )}
          </>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
          {car.category}
        </div>
      </div>

      {/* Content section */}
      <div className="p-4 md:p-6 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          {car.year} {car.make}
        </h3>
        <h4 className="text-lg md:text-xl text-gray-600 mb-4">
          {car.model}
        </h4>

        {/* Performance stats */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          {/* Top Speed */}
          <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg p-3 min-h-[80px] flex flex-col justify-center border border-orange-200">
            <div className="flex items-center gap-1 text-orange-600 font-semibold mb-1">
              <Zap size={14} />
              <span className="text-xs">Top Speed</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-orange-700">
              {car.performance.topSpeed}
            </div>
            <div className="text-xs text-orange-600">MPH</div>
          </div>

          {/* 0-60 Time */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-3 min-h-[80px] flex flex-col justify-center border border-blue-200">
            <div className="flex items-center gap-1 text-blue-600 font-semibold mb-1">
              <Clock size={14} />
              <span className="text-xs">0-60</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-blue-700">
              {car.performance.speed0to60}
            </div>
            <div className="text-xs text-blue-600">seconds</div>
          </div>

          {/* Horsepower */}
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-3 min-h-[80px] flex flex-col justify-center border border-purple-200">
            <div className="flex items-center gap-1 text-purple-600 font-semibold mb-1">
              <Gauge size={14} />
              <span className="text-xs">Power</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-purple-700">
              {car.performance.horsepower}
            </div>
            <div className="text-xs text-purple-600">HP</div>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg p-3 min-h-[80px] flex flex-col justify-center border border-green-200">
            <div className="text-xs text-green-600 font-semibold mb-1">
              Price
            </div>
            <div className="text-xl md:text-2xl font-bold text-green-700">
              ${(car.price / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-green-600">USD</div>
          </div>
        </div>

        {/* Action button */}
        <button
          className="mt-4 w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500
                     text-white rounded-xl font-bold text-base md:text-lg
                     touch-target
                     active:scale-95 transition-transform
                     hover:from-blue-600 hover:to-purple-600"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default CarCard;
