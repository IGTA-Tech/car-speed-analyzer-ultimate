import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { allCars } from './data/cars';
import CarCard from './components/CarCard';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCars = selectedCategory === 'all'
    ? allCars
    : allCars.filter(car => car.category === selectedCategory);

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
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                All Cars
              </button>
              <button
                onClick={() => setSelectedCategory('hypercar')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === 'hypercar'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                Hypercars
              </button>
              <button
                onClick={() => setSelectedCategory('sports')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === 'sports'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                Sports
              </button>
              <button
                onClick={() => setSelectedCategory('electric')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === 'electric'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                Electric
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {menuOpen && (
            <div className="md:hidden mt-4 space-y-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-lg font-semibold text-left touch-target ${
                  selectedCategory === 'all'
                    ? 'bg-blue-500 text-white'
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
                    ? 'bg-blue-500 text-white'
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
                    ? 'bg-blue-500 text-white'
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
                    ? 'bg-blue-500 text-white'
                    : 'bg-white bg-opacity-20 text-white'
                }`}
              >
                Electric Cars
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
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
