import { useState } from 'react';
import { Menu, X, Car, Trophy } from 'lucide-react';
import { allCars } from './data/cars';
import { CarData } from './types';
import CarCard from './components/CarCard';
import CarSelector from './components/CarSelector';
import RaceTrack from './components/RaceTrack';

type AppMode = 'browse' | 'race-select' | 'racing';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mode, setMode] = useState<AppMode>('browse');
  const [selectedCar1, setSelectedCar1] = useState<CarData | null>(null);
  const [selectedCar2, setSelectedCar2] = useState<CarData | null>(null);

  const filteredCars = selectedCategory === 'all'
    ? allCars
    : allCars.filter(car => car.category === selectedCategory);

  const handleStartRace = () => {
    if (selectedCar1 && selectedCar2) {
      setMode('racing');
    }
  };

  const handleRaceReset = () => {
    setMode('race-select');
  };

  const handleBackToBrowse = () => {
    setMode('browse');
    setSelectedCar1(null);
    setSelectedCar2(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900">
      {/* Mobile-first Navigation */}
      <nav className="sticky top-0 z-50 bg-black bg-opacity-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-3xl font-bold text-white flex items-center gap-2">
              <span>🏎️</span>
              <span>Speed Analyzer</span>
            </h1>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2 touch-target"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>

            {/* Desktop menu */}
            <div className="hidden md:flex gap-4">
              {/* Mode switcher */}
              <button
                onClick={() => mode !== 'browse' ? handleBackToBrowse() : null}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                  mode === 'browse'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                <Car size={20} />
                Browse
              </button>
              <button
                onClick={() => mode === 'browse' ? setMode('race-select') : null}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                  mode !== 'browse'
                    ? 'bg-green-500 text-white'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                <Trophy size={20} />
                Race Mode
              </button>

              {/* Category filters (only in browse mode) */}
              {mode === 'browse' && (
                <>
                  <div className="w-px bg-white bg-opacity-30" />
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedCategory('hypercar')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedCategory === 'hypercar'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                    }`}
                  >
                    Hypercars
                  </button>
                  <button
                    onClick={() => setSelectedCategory('sports')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedCategory === 'sports'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                    }`}
                  >
                    Sports
                  </button>
                  <button
                    onClick={() => setSelectedCategory('electric')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedCategory === 'electric'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                    }`}
                  >
                    Electric
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {menuOpen && (
            <div className="md:hidden mt-4 space-y-2">
              {/* Mode switcher */}
              <button
                onClick={() => {
                  handleBackToBrowse();
                  setMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-lg font-semibold text-left touch-target flex items-center gap-2 ${
                  mode === 'browse'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white bg-opacity-20 text-white'
                }`}
              >
                <Car size={20} />
                Browse Cars
              </button>
              <button
                onClick={() => {
                  setMode('race-select');
                  setMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-lg font-semibold text-left touch-target flex items-center gap-2 ${
                  mode !== 'browse'
                    ? 'bg-green-500 text-white'
                    : 'bg-white bg-opacity-20 text-white'
                }`}
              >
                <Trophy size={20} />
                Race Mode
              </button>

              {/* Category filters (only in browse mode) */}
              {mode === 'browse' && (
                <>
                  <div className="h-px bg-white bg-opacity-30 my-2" />
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-lg font-semibold text-left touch-target ${
                      selectedCategory === 'all'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white bg-opacity-20 text-white'
                    }`}
                  >
                    All Cars
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('hypercar');
                      setMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-lg font-semibold text-left touch-target ${
                      selectedCategory === 'hypercar'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white bg-opacity-20 text-white'
                    }`}
                  >
                    Hypercars
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('sports');
                      setMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-lg font-semibold text-left touch-target ${
                      selectedCategory === 'sports'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white bg-opacity-20 text-white'
                    }`}
                  >
                    Sports Cars
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('electric');
                      setMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-lg font-semibold text-left touch-target ${
                      selectedCategory === 'electric'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white bg-opacity-20 text-white'
                    }`}
                  >
                    Electric Cars
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {/* Browse Mode */}
        {mode === 'browse' && (
          <>
            {/* Hero section */}
            <div className="text-center mb-8 text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Discover the World's Fastest Cars
              </h2>
              <p className="text-lg md:text-xl opacity-90">
                Learn about speed, performance, and amazing facts!
              </p>
            </div>

        {/* Stats bar */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-400">
                {allCars.length}
              </div>
              <div className="text-sm md:text-base opacity-75">Total Cars</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-400">
                {Math.max(...allCars.map(c => c.performance.topSpeed))}
              </div>
              <div className="text-sm md:text-base opacity-75">Top Speed (MPH)</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                {Math.min(...allCars.map(c => c.performance.speed0to60)).toFixed(2)}
              </div>
              <div className="text-sm md:text-base opacity-75">Fastest 0-60 (s)</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-red-400">
                {Math.max(...allCars.map(c => c.performance.horsepower))}
              </div>
              <div className="text-sm md:text-base opacity-75">Max HP</div>
            </div>
          </div>
        </div>

        {/* Car grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

            {/* Empty state */}
            {filteredCars.length === 0 && (
              <div className="text-center text-white py-12">
                <p className="text-2xl">No cars found in this category yet!</p>
                <p className="text-lg opacity-75 mt-2">Check back soon for more amazing vehicles.</p>
              </div>
            )}
          </>
        )}

        {/* Race Selection Mode */}
        {mode === 'race-select' && (
          <CarSelector
            cars={allCars}
            selectedCar1={selectedCar1}
            selectedCar2={selectedCar2}
            onSelectCar1={setSelectedCar1}
            onSelectCar2={setSelectedCar2}
            onStartRace={handleStartRace}
          />
        )}

        {/* Racing Mode */}
        {mode === 'racing' && selectedCar1 && selectedCar2 && (
          <div className="space-y-6">
            {/* Back button */}
            <button
              onClick={handleRaceReset}
              className="text-white hover:text-blue-300 transition-colors flex items-center gap-2"
            >
              ← Back to Car Selection
            </button>

            {/* Race Track */}
            <RaceTrack
              car1={selectedCar1}
              car2={selectedCar2}
              onRaceComplete={(result) => {
                console.log('Race complete!', result);
              }}
              onReset={handleRaceReset}
            />

            {/* Car comparison below race */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-blue-500 bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border-2 border-blue-400">
                <h3 className="text-2xl font-bold text-white mb-4">{selectedCar1.make} {selectedCar1.model}</h3>
                <div className="space-y-2 text-white">
                  <div className="flex justify-between">
                    <span className="opacity-75">Top Speed:</span>
                    <span className="font-bold">{selectedCar1.performance.topSpeed} MPH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">0-60:</span>
                    <span className="font-bold">{selectedCar1.performance.speed0to60}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Quarter Mile:</span>
                    <span className="font-bold">{selectedCar1.performance.quarterMile}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Horsepower:</span>
                    <span className="font-bold">{selectedCar1.performance.horsepower} HP</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-500 bg-opacity-20 backdrop-blur-md rounded-2xl p-6 border-2 border-red-400">
                <h3 className="text-2xl font-bold text-white mb-4">{selectedCar2.make} {selectedCar2.model}</h3>
                <div className="space-y-2 text-white">
                  <div className="flex justify-between">
                    <span className="opacity-75">Top Speed:</span>
                    <span className="font-bold">{selectedCar2.performance.topSpeed} MPH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">0-60:</span>
                    <span className="font-bold">{selectedCar2.performance.speed0to60}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Quarter Mile:</span>
                    <span className="font-bold">{selectedCar2.performance.quarterMile}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Horsepower:</span>
                    <span className="font-bold">{selectedCar2.performance.horsepower} HP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 text-white text-center py-6 mt-12">
        <p className="text-sm md:text-base">
          Ultimate Car Speed Analyzer - Educational & Fun 🏎️
        </p>
        <p className="text-xs md:text-sm opacity-75 mt-2">
          Learn about the world's fastest cars safely!
        </p>
      </footer>
    </div>
  );
}

export default App;
