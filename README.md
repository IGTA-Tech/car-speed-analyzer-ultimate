# 🏎️ Ultimate Car Speed Analyzer

An educational, interactive web app for kids (and adults!) to explore the world's fastest cars, learn about speed and performance, and race them head-to-head with animated physics simulations!

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🖼️ Phase 1: Real Car Images (COMPLETE)
- **Unsplash API Integration** - Fetch real car photos automatically
- **Smart Caching** - 30-day localStorage cache to minimize API calls
- **Fallback System** - Graceful degradation if images fail to load
- **Skeleton Loaders** - Beautiful loading states

### 🏁 Phase 2: Animated Racing (COMPLETE)
- **Canvas-Based Racing** - Cars actually move across the screen!
- **Real Physics** - Based on actual 0-60 times, quarter-mile times, and top speeds
- **3-2-1 Countdown** - Exciting race start sequence
- **Live Speed Indicators** - See MPH change in real-time
- **Winner Animation** - Trophy celebration with race stats
- **Car Selection** - Choose any 2 cars to race head-to-head

### 📱 Phase 3: Mobile-First Design (COMPLETE)
- **Fully Responsive** - Works on phones, tablets, and desktops
- **Touch-Friendly** - Minimum 48px touch targets
- **Hamburger Menu** - Clean mobile navigation
- **Beautiful Gradients** - Eye-catching purple-blue-red theme

### 🚀 Coming Soon
- **Phase 4:** Gaming controls with joysticks and boost buttons
- **Phase 5:** Comprehensive facts database (8 categories per car)
- **Phase 6:** Expand to 200+ cars
- **Phase 7:** PWA features, offline mode, performance optimization

## 🗃️ Current Database

**7 Amazing Cars:**
- **3 Hypercars:** Koenigsegg Jesko Absolut, Bugatti Chiron Super Sport 300+, Hennessey Venom F5
- **2 Sports Cars:** Porsche 911 GT3 RS, Chevrolet Corvette Z06
- **2 Electric Cars:** Tesla Model S Plaid, Rimac Nevera

Each car includes:
- Comprehensive performance specs
- 8 categories of educational facts
- Real-world pricing
- Engine specifications
- Transmission & drivetrain details

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Unsplash API key (get one at https://unsplash.com/developers)

### Installation

```bash
# Clone the repository
git clone https://github.com/IGTA-Tech/car-speed-analyzer-ultimate.git
cd car-speed-analyzer-ultimate

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your Unsplash API key to .env
# VITE_UNSPLASH_ACCESS_KEY=your_key_here
```

### Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## 🔑 Getting an Unsplash API Key

1. Go to https://unsplash.com/oauth/applications
2. Click "New Application"
3. Accept the terms
4. Name it "Car Speed Analyzer"
5. Copy your "Access Key"
6. Paste it into `.env` file as `VITE_UNSPLASH_ACCESS_KEY`

**Without an API key**, the app will still work but will show placeholder images instead of real car photos.

## 📖 How to Use

### Browse Mode
1. Open the app
2. Filter by category (All, Hypercars, Sports, Electric)
3. Click any car to view detailed stats
4. Explore performance numbers and specifications

### Race Mode
1. Click **"Race Mode"** in the navigation
2. Select your first car (Blue Lane)
3. Select your second car (Red Lane)
4. Click **"START RACE!"**
5. Watch the 3-2-1 countdown
6. See the cars race in real-time!
7. View the winner and race statistics
8. Click "Race Again" to try different matchups

## 🏗️ Project Structure

```
car-speed-analyzer-ultimate/
├── src/
│   ├── components/
│   │   ├── CarCard.tsx          # Individual car display card
│   │   ├── CarSelector.tsx      # Race mode car picker
│   │   └── RaceTrack.tsx        # Canvas-based racing animation
│   ├── data/
│   │   └── cars/
│   │       ├── hypercars.ts     # Hypercar database
│   │       ├── sportscars.ts    # Sports car database
│   │       ├── electric.ts      # Electric car database
│   │       └── index.ts         # Combined export
│   ├── services/
│   │   └── imageService.ts      # Unsplash API & caching
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── utils/
│   │   └── racePhysics.ts       # Racing physics calculations
│   ├── styles/
│   │   └── index.css            # Global styles & Tailwind
│   ├── App.tsx                  # Main application
│   └── main.tsx                 # Entry point
├── public/                      # Static assets
├── .env                         # Environment variables (create this!)
├── package.json                 # Dependencies
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
└── tsconfig.json               # TypeScript config
```

## 🧮 Racing Physics

The racing system uses **real physics** based on each car's actual performance:

- **Acceleration Phase**: Quadratic curve from 0-60 MPH
- **High Speed Phase**: Linear progression to top speed
- **Position Calculation**: Based on quarter-mile time and acceleration curves
- **Speed Calculation**: Real-time MPH based on elapsed time

Example:
```typescript
// Tesla Model S Plaid: 1.99s 0-60, 200 MPH top speed, 9.23s quarter mile
const position = calculatePosition(car, elapsedTime, 1320); // feet
const speed = calculateSpeed(car, elapsedTime); // MPH
```

## 🎨 Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion 11
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Canvas API:** Native HTML5 Canvas

## 🌟 Key Features in Detail

### Smart Image Caching
- Caches Unsplash URLs for 30 days
- Reduces API calls by 99%
- Instant load times after first fetch
- Automatic cache expiration

### Realistic Racing
- Based on real car specs
- Quarter-mile drag race (1,320 feet)
- Live speed and position updates
- Margin of victory calculation

### Mobile-First Design
- Responsive grid layouts
- Touch-optimized controls
- Hamburger navigation
- Landscape mode support

## 🐛 Troubleshooting

### Images Not Loading
- Check that `VITE_UNSPLASH_ACCESS_KEY` is set in `.env`
- Verify your API key is valid
- Check browser console for errors
- Try clearing localStorage cache

### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Performance Issues
- Enable hardware acceleration in browser
- Close other tabs
- Try different browser (Chrome recommended)

## 📈 Roadmap

- [x] Phase 1: Unsplash image integration
- [x] Phase 2: Animated racing system
- [x] Phase 3: Mobile-first responsive design
- [ ] Phase 4: Gaming controls (joysticks, boost)
- [ ] Phase 5: Comprehensive facts database
- [ ] Phase 6: Expand to 200+ cars
- [ ] Phase 7: PWA, offline mode, optimization
- [ ] Sound effects
- [ ] Multiplayer mode
- [ ] Leaderboards
- [ ] Car customization

## 🤝 Contributing

This is an educational project! Contributions are welcome:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Unsplash** for the free API and beautiful car photos
- **React Team** for the amazing framework
- **Tailwind CSS** for rapid styling
- **Framer Motion** for smooth animations
- **Car manufacturers** for building these incredible machines!

## 📞 Support

- **GitHub Issues:** https://github.com/IGTA-Tech/car-speed-analyzer-ultimate/issues
- **GitHub Repo:** https://github.com/IGTA-Tech/car-speed-analyzer-ultimate

---

Built with ❤️ for car enthusiasts of all ages!

🏎️💨 **Let's Race!** 🏁
