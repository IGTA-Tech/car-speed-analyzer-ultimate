import { CarData } from '../../types';

export const sportscars: CarData[] = [
  {
    id: 'porsche-911-gt3-rs-2023',
    make: 'Porsche',
    model: '911 GT3 RS',
    year: 2023,
    category: 'sports',
    imageUrl: '/images/cars/porsche-911-gt3-rs-2023.webp',
    performance: {
      topSpeed: 184,
      speed0to60: 3.0,
      quarterMile: 10.9,
      horsepower: 518,
      torque: 343,
      weight: 3268
    },
    engine: {
      type: 'Naturally Aspirated Flat-6',
      displacement: '4.0L',
      cylinders: 6
    },
    transmission: '7-speed PDK Dual-Clutch',
    drivetrain: 'RWD',
    price: 223800,
    facts: {
      speed: ['Track-focused beast with 184 MPH top speed', 'Screams to 9,000 RPM - no turbo needed!'],
      engineering: ['Naturally aspirated 4.0L flat-six produces 518 hp', 'Massive rear wing creates 860 lbs of downforce'],
      celebrity: ['Favorite of professional race car drivers', 'Featured in countless racing games'],
      manufacturing: ['Hand-built at Porsche factory in Stuttgart, Germany', 'Takes team of specialists to assemble'],
      cost: ['Base price: $223,800', 'Carbon bucket seats: $5,960'],
      innovation: ['Active aerodynamics adjust for speed', 'Drag Reduction System (DRS) like Formula 1'],
      racing: ['Set Nürburgring lap record for production cars', 'Used as track day special by enthusiasts'],
      trivia: ['"RS" stands for RennSport - German for racing sport', 'Engine is mounted behind the rear axle']
    }
  },
  {
    id: 'chevrolet-corvette-z06-2023',
    make: 'Chevrolet',
    model: 'Corvette Z06',
    year: 2023,
    category: 'sports',
    imageUrl: '/images/cars/chevrolet-corvette-z06-2023.webp',
    performance: {
      topSpeed: 195,
      speed0to60: 2.6,
      quarterMile: 10.5,
      horsepower: 670,
      torque: 460,
      weight: 3434
    },
    engine: {
      type: 'Naturally Aspirated Flat-Plane V8',
      displacement: '5.5L',
      cylinders: 8
    },
    transmission: '8-speed Dual-Clutch',
    drivetrain: 'RWD',
    price: 110000,
    facts: {
      speed: ['Fastest accelerating Corvette ever at 2.6 seconds 0-60!', '195 MPH top speed - supercar territory'],
      engineering: ['Flat-plane V8 revs to 8,600 RPM', 'Most powerful naturally aspirated V8 in production'],
      celebrity: ['Featured in Hollywood movies', 'American supercar legend'],
      manufacturing: ['Built in Bowling Green, Kentucky', 'Over 60 years of Corvette heritage'],
      cost: ['Starting at $110,000', 'Incredible value for performance'],
      innovation: ['First mid-engine Z06 in Corvette history', 'Carbon fiber wheels available'],
      racing: ['Based on C8.R race car', 'Competes against cars 3x the price'],
      trivia: ['Sounds like a Ferrari!', 'Named "Best Performance Car" by multiple magazines']
    }
  }
];
