/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Project, FAQ } from './types';

export const BUSINESS_INFO = {
  name: 'EG Evans Auto Services LLC',
  tagline: 'Precision Automotive Diagnostics & Expert Repair',
  recommendedDomain: 'egevansautoservice.com',
  address: {
    street: '321 Waterloo Dr',
    city: 'Dahlonega',
    state: 'GA',
    zip: '30533',
    full: '321 Waterloo Dr, Dahlonega, GA 30533'
  },
  contact: {
    phone: '(706) 864-1980',
    email: 'service@egevansautoservice.com',
    placeholderPhone: '(706) 864-1980 [Replace with real number]',
    placeholderEmail: 'service@egevansautoservice.com [Replace with real email]'
  },
  hours: [
    { days: 'Monday - Friday', times: '8:00 AM - 5:30 PM' },
    { days: 'Saturday', times: '9:00 AM - 1:00 PM (By Appointment Only)' },
    { days: 'Sunday', times: 'Closed' }
  ],
  serviceArea: {
    scope: 'Regional (North Georgia)',
    cities: [
      'Dahlonega',
      'Dawsonville',
      'Cleveland',
      'Gainesville',
      'Lumpkin County',
      'White County',
      'Hall County'
    ],
    description: 'We proudly serve Lumpkin County and the surrounding North Georgia mountain region with premium, reliable automotive care.'
  },
  brandColors: {
    primary: 'Apex Orange (#FF5500)',
    secondary: 'Slate Carbon (#121214)',
    accent: '#FA5A00'
  },
  credentials: [
    'ASE Certified Technicians',
    'State-of-the-Art Computer Diagnostics',
    'Family-Owned & Locally Operated',
    'Nationwide Parts & Labor Warranty'
  ]
};

export const SERVICES: Service[] = [
  {
    id: 'diagnostics',
    title: 'Advanced Computer Diagnostics',
    shortDescription: 'State-of-the-art computer scanning and diagnostic troubleshooting for check engine lights and electrical faults.',
    longDescription: 'When your check engine light illuminates, or your vehicle behaves unpredictably, our advanced computer systems link directly with your vehicle’s On-Board Diagnostics (OBD) network. We analyze error codes, sensor feeds, and wiring systems in real-time to pinpoint the absolute root cause of the issue, avoiding costly trial-and-error replacements.',
    category: 'diagnostics',
    priceEstimate: 'Starting at $95',
    duration: '45 - 90 mins',
    iconName: 'Cpu',
    benefits: [
      'Pinpoint engine, transmission, and ABS issues with absolute accuracy',
      'Live data stream analysis and sensor health checks',
      'Comprehensive digital vehicle inspection report sent to your email',
      'Factory diagnostic equipment matching dealership capabilities'
    ]
  },
  {
    id: 'brakes',
    title: 'Premium Brake Service & Repair',
    shortDescription: 'Comprehensive brake pad, rotor, caliper, and fluid flush services using high-performance components.',
    longDescription: 'Your safety is our top priority. Our premium brake services replace worn pads and rotors with OEM-quality or heavy-duty components designed specifically for North Georgia’s mountainous terrain. We also perform caliper service, line bleeding, and hydraulic fluid flushes to ensure optimal stopping power and zero fade on steep descents.',
    category: 'brakes',
    priceEstimate: '$180 - $450 (per axle)',
    duration: '1 - 2 hours',
    iconName: 'Disc',
    benefits: [
      'Installation of ultra-low dust, premium ceramic or semi-metallic brake pads',
      'Precision rotor resurfacing or new high-performance rotor replacements',
      'Full brake hydraulic system flush and fresh DOT-approved fluid',
      'Brake booster, caliper, and line structural integrity checks'
    ]
  },
  {
    id: 'maintenance',
    title: 'Signature Preventive Maintenance',
    shortDescription: 'High-grade synthetic oil changes, multi-point inspections, fluid top-offs, and filter updates.',
    longDescription: 'Regular maintenance is the key to vehicle longevity. Our signature service includes premium full synthetic oil of the correct viscosity, professional spin-on filter replacement, multi-point inspection (hoses, belts, tire pressure, chassis lubrication), and fluid level adjustments. Keep your manufacturer’s warranty fully active and prevent premature wear.',
    category: 'maintenance',
    priceEstimate: '$75 - $130',
    duration: '30 - 45 mins',
    iconName: 'Wrench',
    benefits: [
      'High-grade full synthetic motor oil matching OEM specifications',
      'Premium oil filter with anti-drainback valve',
      'Free 32-point safety and preventive maintenance inspection',
      'Chassis lube, tire pressure correction, and fluid top-offs'
    ]
  },
  {
    id: 'cooling',
    title: 'AC & Cooling System Care',
    shortDescription: 'Radiator flushes, AC recharging with R134a/1234yf, and leak tests to keep you comfortable and cool.',
    longDescription: 'Ensure your engine stays cool and your cabin remains comfortable. We perform detailed pressure tests to identify leaks in radiators, water pumps, and hoses, and execute clean cooling system flushes. Our AC service recovers, evacuates, and recharges your refrigerant (R134a and new R-1234yf) with dye tracing to guarantee a leak-free environment.',
    category: 'cooling',
    priceEstimate: '$120 - $280 (Recharging/Service)',
    duration: '1 - 1.5 hours',
    iconName: 'ThermometerSnowflake',
    benefits: [
      'Refrigerant recovery, vacuum evacuation, and recharging to exact spec',
      'Fluorescent UV dye leak detection included in every AC service',
      'Thermostat, heater core, and cooling fan operation audits',
      'Complete coolant flush with eco-friendly disposal and OEM-spec fluids'
    ]
  },
  {
    id: 'engine',
    title: 'Engine & Drivetrain Repair',
    shortDescription: 'Expert timing belt replacements, cylinder heads, gasket repairs, and major engine rebuilds.',
    longDescription: 'From minor oil leaks to complete engine replacements, our ASE-certified mechanics tackle complex mechanical challenges with professional precision. We handle timing belt and chain replacements, valve cover gaskets, cylinder head machining, transmission servicing, and differential repairs to keep your drivetrain running with original power.',
    category: 'engine',
    priceEstimate: 'Diagnostics required (Free estimate with repair)',
    duration: 'Varies by job',
    iconName: 'Activity',
    benefits: [
      'Timing belt and timing chain services according to strict factory schedules',
      'Head gasket and oil leak seals using multi-layer steel gaskets',
      'Engine block mechanical overhauls and transmission swap specialists',
      'Fully warrantied OEM replacement parts and skilled mechanical craftsmanship'
    ]
  },
  {
    id: 'electrical',
    title: 'Electrical Systems & Battery Service',
    shortDescription: 'Alternator testing, starter replacements, battery diagnosis, and complex wiring troubleshooting.',
    longDescription: 'Modern vehicles are rolling computers. A weak battery, failing alternator, or bad ground connection can trigger countless ghost codes and systemic failures. We perform complete charging system testing under high load, replace faulty starters and alternators, and trace short-circuits or broken connections with professional digital multimeters.',
    category: 'electrical',
    priceEstimate: '$90 - $320 (Parts & Labor dependent)',
    duration: '45 mins - 2 hours',
    iconName: 'Zap',
    benefits: [
      'Full state-of-health diagnostics for batteries, alternators, and starters',
      'Professional installation of premium AGM and lead-acid interstate batteries',
      'Complex wiring harness tracing, socket repairs, and relay swaps',
      'Electronic Control Module (ECM) and fuse panel structural inspection'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Brake System Overhaul on Mountain Commuter',
    vehicle: '2019 Jeep Grand Cherokee 4WD',
    serviceType: 'Brake Service & Custom Caliper Tuning',
    description: 'The vehicle arrived complaining of extreme steering wheel vibration and pedal shudder when driving down the Highway 19 mountain descent into Dahlonega. Our inspection showed severely warped heavy-duty front rotors and crystallized brake pad surfaces due to extreme thermal stress.',
    image: '/src/assets/images/jeep_mountain_brakes_1782646194307.jpg',
    duration: '2.5 Hours',
    completionYear: '2026',
    challenges: 'Ensuring absolute thermal tolerance for heavy mountain commuting without creating squeaking or aggressive pedal noise.',
    feedback: {
      author: 'David L., Dahlonega resident',
      rating: 5,
      text: 'EG Evans solved a brake vibration that two other local shops couldn’t fix. They upgraded my Jeep to heavy-duty rotors designed for mountain descents. The difference is incredible. Driving down Waterloo and Highway 19 is fully smooth now!'
    }
  },
  {
    id: 'project-2',
    title: 'Check Engine Light Diagnostic & Evap Fix',
    vehicle: '2017 Chevrolet Silverado 1500 5.3L',
    serviceType: 'Computer Diagnostics & Emissions Repair',
    description: 'Owner experienced sudden fuel mileage drops and an active Check Engine Light throwing a persistent evap system fault (P0442). We connected our snap-on diagnostic suite, ran a smoke test through the EVAP fuel purge lines, and successfully discovered a cracked vent solenoid vacuum neck.',
    image: '/src/assets/images/silverado_evap_smoke_1782646208987.jpg',
    duration: '1.5 Hours',
    completionYear: '2026',
    challenges: 'Finding an elusive micro-leak along the upper subframe fuel lines without dropping the entire fuel tank unnecessary.',
    feedback: {
      author: 'Sarah K., Lumpkin County',
      rating: 5,
      text: 'Super professional shop. They didn’t try to sell me a whole new fuel tank or expensive catalytic converter. They found the exact vacuum leak, showed me the cracked part, and had it swapped and tested in under two hours. Highly recommend their diagnostics!'
    }
  },
  {
    id: 'project-3',
    title: 'Subaru Timing Belt & Water Pump Service',
    vehicle: '2015 Subaru Outback 2.5i',
    serviceType: 'Preventive Maintenance & Engine Service',
    description: 'This local SUV was at 105,000 miles, making it critical to change the timing belt to prevent catastrophic engine failure. We replaced the timing belt, idler pulleys, tensioner, water pump, and flushed the cooling system with OEM blue long-life coolant.',
    image: '/src/assets/images/subaru_timing_belt_1782646222692.jpg',
    duration: '4 Hours',
    completionYear: '2026',
    challenges: 'Ensuring perfect camshaft alignment on the horizontal boxer engine layout during belt installation.',
    feedback: {
      author: 'Mark R., Cleveland, GA',
      rating: 5,
      text: 'A major dealer service was quoted at double what EG Evans Auto charged me. They did a flawless job on my Subaru timing belt and water pump. They even sent me step-by-step photos during the service. Authentic, reliable, and honest.'
    }
  }
];

export const FAQS: FAQ[] = [
  {
    question: 'How often should I have my vehicle scanned or diagnosed?',
    answer: 'You should bring your vehicle in for a scan immediately if your check engine light, ABS light, or traction control light illuminates on your dashboard, or if you feel any change in engine performance, gear shifting, or braking. Even if the car feels normal, a flashing engine light represents a critical misfire that requires immediate attention.'
  },
  {
    question: 'What makes mountain driving different for my car’s brakes and transmission?',
    answer: 'Dahlonega and the North Georgia region feature steep, winding terrain that places extreme demands on your vehicles. Commuting down these slopes causes brakes to heat up rapidly, which can lead to rotor warping, brake fade, and fluid boiling. We specialize in heavy-duty brake systems and transmission service specifically engineered to tolerate high-thermal mountain environments.'
  },
  {
    question: 'Do you offer a warranty on your mechanical repairs?',
    answer: 'Yes! We stand firmly behind the quality of our craftsmanship. Most repairs completed at EG Evans Auto Services LLC come with a comprehensive 12-month / 12,000-mile warranty on both parts and labor. We use premium OEM-equivalent components to ensure reliability.'
  },
  {
    question: 'Can I wait at the shop while my car is being serviced?',
    answer: 'We have a comfortable, clean climate-controlled waiting lobby with high-speed guest Wi-Fi, fresh coffee, and phone charging docks for quick preventive services like oil changes and brake scans. For major engine repairs or complex diagnostics, we highly recommend arranging a drop-off.'
  },
  {
    question: 'What is the estimated turnaround time for check engine diagnostics?',
    answer: 'Standard diagnostic scanning, physical wire tracking, and active testing typically take between 45 and 90 minutes. Once we pull the codes and run our state-of-health assessments, we will contact you with a detailed repair report and price estimate before performing any work.'
  }
];
