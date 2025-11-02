import { CarData } from '../../types';

export const hypercars: CarData[] = [
  {
    id: 'koenigsegg-jesko-absolut-2023',
    make: 'Koenigsegg',
    model: 'Jesko Absolut',
    year: 2023,
    category: 'hypercar',
    imageUrl: '/images/cars/koenigsegg-jesko-absolut-2023.webp',
    performance: {
      topSpeed: 330,
      speed0to60: 2.5,
      quarterMile: 9.1,
      horsepower: 1600,
      torque: 1106,
      weight: 3131
    },
    engine: {
      type: 'Twin-Turbo V8',
      displacement: '5.0L',
      cylinders: 8
    },
    transmission: '9-speed Light Speed Transmission',
    drivetrain: 'RWD',
    price: 3000000,
    facts: {
      speed: [
        'Designed to theoretically reach 330+ MPH, making it one of the fastest cars ever conceived!',
        'Can accelerate from 0-60 MPH in just 2.5 seconds',
        'Reaches 186 MPH (300 km/h) in under 10 seconds'
      ],
      engineering: [
        'Has 1,600 horsepower when running on E85 biofuel',
        '9-speed Light Speed Transmission can skip multiple gears in milliseconds',
        'Active rear wing generates 3,000 pounds of downforce at top speed',
        'Carbon fiber monocoque weighs only 187 pounds'
      ],
      celebrity: [
        "Named after founder Christian von Koenigsegg's father, Jesko von Koenigsegg",
        'Featured in multiple racing video games including Forza and Gran Turismo',
        'Jay Leno called it "the most impressive hypercar I\'ve ever seen"'
      ],
      manufacturing: [
        'Only 125 will ever be built worldwide',
        'Each car takes approximately 6-8 months to hand-build',
        'Built in Ängelholm, Sweden by a team of master craftsmen',
        'Every Jesko gets a personalized build ceremony'
      ],
      cost: [
        'Base price starts at approximately $3 million',
        'Most expensive option package adds $400,000',
        'Oil change costs around $5,000',
        'Tires last about 2,500 miles and cost $4,000 per tire'
      ],
      innovation: [
        'First production car with transmission that can change to any gear instantly',
        "Uses world's lightest V8 engine relative to horsepower",
        'Pioneered new aerodynamic design with no rear wing in "Absolut" version',
        'Active suspension adjusts 500 times per second'
      ],
      racing: [
        'Designed specifically for top speed records on closed tracks',
        'Track version called "Attack" has massive rear wing for downforce',
        'Holds theoretical top speed record (not yet verified)',
        'Nürburgring lap time estimated under 6:30'
      ],
      trivia: [
        'The name "Absolut" means it\'s the absolute top speed version',
        'Has no rear wing to reduce drag - relies on underbody aerodynamics',
        'Fuel tank can be filled with regular gasoline OR E85 ethanol',
        'Dashboard is a 5-inch digital screen with customizable displays'
      ]
    }
  },
  {
    id: 'bugatti-chiron-super-sport-2021',
    make: 'Bugatti',
    model: 'Chiron Super Sport 300+',
    year: 2021,
    category: 'hypercar',
    imageUrl: '/images/cars/bugatti-chiron-super-sport-2021.webp',
    performance: {
      topSpeed: 304,
      speed0to60: 2.4,
      quarterMile: 9.4,
      horsepower: 1577,
      torque: 1180,
      weight: 4400
    },
    engine: {
      type: 'Quad-Turbo W16',
      displacement: '8.0L',
      cylinders: 16
    },
    transmission: '7-speed Dual-Clutch',
    drivetrain: 'AWD',
    price: 3900000,
    facts: {
      speed: [
        'First production car to officially exceed 300 MPH!',
        'Achieved 304.773 MPH at Volkswagen test track in Germany',
        'Needs special Michelin tires rated for speeds over 300 MPH'
      ],
      engineering: [
        'Has FOUR turbochargers on a W16 engine',
        'Produces 1,577 horsepower - more than an IndyCar',
        'Uses 10 radiators to keep the engine cool',
        'Air brake provides 900 pounds of stopping force'
      ],
      celebrity: [
        'Owned by Cristiano Ronaldo, Floyd Mayweather, and other celebrities',
        'Featured in Fast & Furious movies',
        'Former Top Gear host Andy Wallace set the 304 MPH record'
      ],
      manufacturing: [
        'Only 30 units will ever be produced',
        'Each car takes 6 months to build by hand in Molsheim, France',
        'Factory team tests each car at 250+ MPH before delivery',
        'Over 1,800 handcrafted parts in each Chiron'
      ],
      cost: [
        'Base price: $3.9 million',
        'Set of replacement tires: $42,000',
        'Annual maintenance: $21,000',
        'Wheel and tire change takes 4 hours at dealer'
      ],
      innovation: [
        'Longtail body reduces drag by 25% compared to regular Chiron',
        'Active aerodynamics adjust automatically at different speeds',
        'Special Speed Key unlocks top speed mode',
        'Carbon fiber body is 5 times stronger than steel'
      ],
      racing: [
        'Modified version broke 300 MPH barrier in 2019',
        'Tested at Ehra-Lessien high-speed track in Germany',
        'Based on Le Mans-winning Bugatti racing heritage',
        'Track has 5.5-mile straight for top speed testing'
      ],
      trivia: [
        'Name "Chiron" honors Bugatti racing driver Louis Chiron',
        'Burns a gallon of gas every 8 minutes at top speed',
        'Tires last only 15 minutes at maximum velocity',
        'Engine air intake flows 60,000 liters of air per minute'
      ]
    }
  },
  {
    id: 'hennessey-venom-f5-2021',
    make: 'Hennessey',
    model: 'Venom F5',
    year: 2021,
    category: 'hypercar',
    imageUrl: '/images/cars/hennessey-venom-f5-2021.webp',
    performance: {
      topSpeed: 311,
      speed0to60: 2.6,
      quarterMile: 9.5,
      horsepower: 1817,
      torque: 1193,
      weight: 2998
    },
    engine: {
      type: 'Twin-Turbo V8 "Fury"',
      displacement: '6.6L',
      cylinders: 8
    },
    transmission: '7-speed Single-Clutch',
    drivetrain: 'RWD',
    price: 2100000,
    facts: {
      speed: [
        'Targeting 311 MPH - aiming to be the fastest car in the world!',
        'Named after the fastest F5 category tornado winds',
        'Theoretical top speed could exceed 320 MPH with longer gearing'
      ],
      engineering: [
        '1,817 horsepower from a twin-turbo "Fury" V8 engine',
        'Power-to-weight ratio of 1,298 hp per ton',
        'Custom-built engine by Hennessey in Texas',
        'Only 126 pounds heavier than a Honda Civic!'
      ],
      celebrity: [
        'Built by John Hennessey, famous for building the Venom GT',
        'Featured on Jay Leno\'s Garage',
        'Test driver Brian Smith is a professional race car driver'
      ],
      manufacturing: [
        'Only 24 units will be produced',
        'Built in Sealy, Texas at Hennessey Performance',
        'Each customer gets private tour of factory during build',
        'Hand-assembled by specialized team of engineers'
      ],
      cost: [
        'Base price: $2.1 million',
        'Optional carbon fiber wheels: $20,000',
        'Full interior customization package: $100,000',
        'Special paint finishes: $50,000+'
      ],
      innovation: [
        'Custom carbon fiber chassis designed for extreme speeds',
        'Drag coefficient of only 0.33 - extremely aerodynamic',
        'Active aero system with adjustable rear wing',
        'Lightweight design uses aerospace-grade materials'
      ],
      racing: [
        'Successor to Venom GT which held world record in 2014',
        'Tested at NASA runway for high-speed validation',
        'Designed to beat Bugatti and Koenigsegg records',
        'Track testing done at Circuit of the Americas'
      ],
      trivia: [
        '"F5" refers to most violent tornado category',
        'Top speed mode called "F5 Mode" - requires special key',
        'Engine redlines at 8,000 RPM',
        'Hennessey claims it\'s the most powerful production car ever'
      ]
    }
  }
];
