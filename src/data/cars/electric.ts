import { CarData } from '../../types';

export const electricCars: CarData[] = [
  {
    id: 'tesla-model-s-plaid-2023',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2023,
    category: 'electric',
    imageUrl: '/images/cars/tesla-model-s-plaid-2023.webp',
    performance: {
      topSpeed: 200,
      speed0to60: 1.99,
      quarterMile: 9.23,
      horsepower: 1020,
      torque: 1050,
      weight: 4766
    },
    engine: {
      type: 'Tri-Motor Electric',
      displacement: 'N/A',
      cylinders: 0
    },
    transmission: 'Single-Speed Direct Drive',
    drivetrain: 'AWD',
    price: 108490,
    facts: {
      speed: ['Quickest production car ever: 0-60 in 1.99 seconds!', 'Faster than most supercars off the line', '200 MPH top speed'],
      engineering: ['Three electric motors produce 1,020 horsepower', 'Instant torque delivery - all power available immediately', 'Battery pack holds 100 kWh of energy'],
      celebrity: ['Elon Musk\'s fastest production Tesla', 'Used by YouTubers for drag racing videos', 'Featured in Tesla events worldwide'],
      manufacturing: ['Built in Fremont, California', 'Over-the-air software updates improve performance', 'Assembly line uses robots and humans together'],
      cost: ['Starting price: $108,490', 'No gas costs - charges at home', 'Minimal maintenance - no oil changes needed'],
      innovation: ['First production car under 2 seconds 0-60', 'Yoke steering wheel (optional)', 'Gaming computer built into dashboard', 'Tri-motor architecture for maximum grip'],
      racing: ['Dominates street legal drag racing', 'Track Mode optimizes cooling and power', 'Competed against Porsche Taycan'],
      trivia: ['"Plaid" name from Spaceballs movie joke', 'Goes from 0-60 faster than you can blink!', 'Silent but deadly fast', 'Seats 5 adults comfortably']
    }
  },
  {
    id: 'rimac-nevera-2023',
    make: 'Rimac',
    model: 'Nevera',
    year: 2023,
    category: 'electric',
    imageUrl: '/images/cars/rimac-nevera-2023.webp',
    performance: {
      topSpeed: 258,
      speed0to60: 1.85,
      quarterMile: 8.58,
      horsepower: 1914,
      torque: 1740,
      weight: 4740
    },
    engine: {
      type: 'Quad-Motor Electric',
      displacement: 'N/A',
      cylinders: 0
    },
    transmission: 'Single-Speed Direct Drive',
    drivetrain: 'AWD',
    price: 2400000,
    facts: {
      speed: ['Fastest accelerating production car ever: 1.85 seconds 0-60!', '258 MPH top speed - fastest electric car', 'Quarter mile in 8.58 seconds - world record!'],
      engineering: ['1,914 horsepower from four electric motors', 'Each wheel has its own motor', '120 kWh battery - largest in production car', 'Torque vectoring system adjusts power 100 times per second'],
      celebrity: ['Built by Mate Rimac, Croatian engineering genius', 'Featured on Grand Tour with Richard Hammond', 'Set 23 world records in one day!'],
      manufacturing: ['Only 150 units will ever be built', 'Hand-assembled in Croatia', 'Each car takes 5 weeks to build', 'Named after powerful Mediterranean storm'],
      cost: ['Price: $2.4 million', 'Most expensive electric car', 'Full charge costs about $15', 'Tires last 5,000 miles at $5,000 per set'],
      innovation: ['First electric hypercar with torque vectoring on all 4 wheels', 'Advanced AI controls power distribution', 'Regenerative braking recovers energy', 'Carbon fiber monocoque weighs only 440 lbs'],
      racing: ['Set production EV lap record at Nürburgring', 'Broke 23 performance records including 0-60, quarter mile, and top speed', 'Tested at Nardò ring in Italy'],
      trivia: ['Can drive 340 miles on one charge', 'Charges 80% in 19 minutes with fast charger', 'Named "Nevera" after sudden Croatian storm', 'Has 7 different driving modes']
    }
  }
];
