export const featuresData = {
  safety: {
    id: 'safety',
    name: 'Safety Features',
    description: 'Critical safety technologies that protect you and your passengers on Indian roads.',
    icon: '🛡️',
    color: 'red',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    features: [
      {
        id: 'abs',
        name: 'Anti-lock Braking System (ABS)',
        tagline: 'Your car\'s smart braking assistant that prevents skidding',
        shortDesc: 'Prevents wheels from locking up during emergency braking, allowing you to steer while braking hard.',
        
        // Simple explanation for everyone
        simpleExplanation: {
          what: "ABS is like having a super-fast automatic brake pumper. When you slam the brakes hard, ABS pumps the brakes many times per second - much faster than any human can. This prevents your wheels from locking up and skidding.",
          analogy: "Imagine running on a slippery floor and trying to stop suddenly. If you lock your knees, you'll slide and fall. But if you take quick, short steps, you can stop safely while staying upright. ABS does the same for your car.",
          whenUsed: "ABS activates automatically when you brake hard in emergency situations or on slippery roads like wet, muddy, or icy surfaces."
        },
        
        // How it works - technical but simple
        howItWorks: {
          step1: "Sensors on each wheel constantly monitor how fast each wheel is spinning",
          step2: "When you brake hard, if a wheel is about to stop spinning (lock up), the system detects this instantly",
          step3: "The ABS computer releases brake pressure on that wheel for a split second",
          step4: "Then immediately reapplies the brakes - repeating this up to 15 times per second",
          step5: "This prevents skidding while maintaining maximum braking force"
        },
        
        // Benefits for Indian drivers
        benefits: [
          "✅ You can STEER while braking hard - avoid obstacles instead of sliding into them",
          "✅ Stops faster on wet, slippery roads - crucial for Indian monsoons",
          "✅ Prevents dangerous skidding that causes loss of control",
          "✅ Works on all surfaces - highways, city roads, rural roads",
          "✅ Gives you confidence in emergency situations"
        ],
        
        // Real-world cons/limitations
        cons: [
          "⚠️ On loose surfaces like gravel or sand, ABS might increase stopping distance slightly",
          "⚠️ Does NOT replace careful driving - still need to maintain safe distance",
          "⚠️ You might feel a pulsing sensation in the brake pedal - this is normal"
        ],
        
        // Myths busted
        myths: [
          "Myth: ABS helps you stop faster always - Truth: ABS's main job is to let you steer, not necessarily stop faster",
          "Myth: Pump your brakes with ABS - Truth: Just brake hard and let ABS do its job, don't pump"
        ],
        
        // Technical specifications
        technical: {
          components: "Wheel speed sensors, hydraulic control unit, ECU (computer)",
          responseTime: "Activates in milliseconds, pulses brakes up to 15 times/second",
          mandatoryInIndia: "Yes - mandatory on all new cars since April 2019"
        },
        
        // Who needs it most
        bestFor: [
          "New drivers who might panic brake",
          "Drivers in areas with heavy rainfall",
          "Highway drivers who encounter sudden traffic stops",
          "Anyone wanting maximum safety"
        ],
        
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop',
        isStandard: true,
        applicableVehicles: 'All modern cars (mandatory in India since 2019)',
        priceRange: 'Standard feature - included in all new cars'
      },
      
      {
        id: 'airbags',
        name: 'Airbags',
        tagline: 'Your inflatable guardian that deploys in a crash',
        shortDesc: 'Inflatable cushions that deploy during a collision to protect occupants from hitting hard surfaces.',
        
        simpleExplanation: {
          what: "Airbags are like instant balloons that explode out of your steering wheel, dashboard, and seats when your car crashes. They create a soft cushion between you and the hard parts of your car.",
          analogy: "Imagine falling off a bicycle. Would you rather hit the hard ground or a big, soft pillow? Airbags are that pillow - they catch you before you hit the steering wheel or dashboard.",
          whenUsed: "Airbags deploy in moderate to severe crashes, typically above 20-25 km/h, when sensors detect sudden deceleration."
        },
        
        howItWorks: {
          step1: "Crash sensors detect sudden deceleration (like hitting another car or wall)",
          step2: "Within 15-30 milliseconds, a chemical reaction creates nitrogen gas",
          step3: "The gas inflates the airbag at speeds up to 300 km/h",
          step4: "You hit the fully inflated airbag, which then deflates slowly to cushion impact",
          step5: "The entire process happens before you can blink - in about 1/25th of a second"
        },
        
        benefits: [
          "✅ Reduces risk of death in frontal crashes by 30% for drivers",
          "✅ Protects your head and chest from hitting steering wheel/dashboard",
          "✅ Side airbags protect your head and torso in side impacts",
          "✅ Curtain airbags protect all outboard passengers in rollovers",
          "✅ Works together with seatbelts for maximum protection"
        ],
        
        cons: [
          "⚠️ Airbags deploy with significant force - can injure small children or people sitting too close",
          "⚠️ Not effective if you're not wearing a seatbelt",
          "⚠️ Loud noise and smoke during deployment - don't be alarmed, it's normal",
          "⚠️ Expensive to replace after deployment (₹30,000-1,00,000+ depending on car)"
        ],
        
        myths: [
          "Myth: Airbags alone protect you - Truth: Airbags are designed to work WITH seatbelts",
          "Myth: Airbags are dangerous - Truth: They save far more lives than they injure",
          "Myth: More airbags always better - Truth: Quality and positioning matter more than count"
        ],
        
        technical: {
          components: "Crash sensors, inflator module, airbag fabric, diagnostic unit",
          deploymentSpeed: "Faster than a blink - 15-30 milliseconds",
          types: "Front airbags, side airbags, curtain airbags, knee airbags"
        },
        
        bestFor: [
          "Every single passenger - airbags protect everyone",
          "Families with children (with proper child seats)",
          "Highway drivers facing higher speed crashes"
        ],
        
        image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600&h=400&fit=crop',
        isStandard: true,
        applicableVehicles: 'All passenger vehicles (dual front airbags mandatory in India)',
        priceRange: 'Standard on most cars, premium cars have up to 6-8 airbags'
      },
      
      {
        id: 'esc',
        name: 'Electronic Stability Control (ESC)',
        tagline: 'The guardian angel that prevents you from spinning out',
        shortDesc: 'Automatically applies brakes to individual wheels to prevent skidding and help you maintain control.',
        
        simpleExplanation: {
          what: "ESC is like having a co-pilot who can brake individual wheels to keep your car pointing where you want it to go. If you're about to spin out or slide, ESC gently corrects your car.",
          analogy: "Imagine walking on ice and starting to slip. Your body automatically adjusts to keep you upright. ESC does the same for your car - it senses when the car isn't going where you're steering and corrects it automatically.",
          whenUsed: "ESC activates when your car starts to skid or lose traction, like taking a turn too fast on a wet road."
        },
        
        howItWorks: {
          step1: "Sensors monitor your steering wheel angle and the car's actual direction",
          step2: "If the car isn't following your steering (oversteer or understeer), ESC detects the difference",
          step3: "The system automatically applies brakes to specific wheels to correct the car's path",
          step4: "It can also reduce engine power if needed",
          step5: "All this happens in milliseconds, often before you even notice the skid"
        },
        
        benefits: [
          "✅ Reduces crash risk by 35% in wet or slippery conditions",
          "✅ Prevents dangerous oversteer (back end sliding out) - common in SUVs",
          "✅ Prevents understeer (front end not turning) on wet roads",
          "✅ Saves lives - estimated to reduce fatal single-vehicle crashes by 50%",
          "✅ Particularly useful on India's diverse road conditions"
        ],
        
        cons: [
          "⚠️ ESC cannot defy physics - if you drive too fast for conditions, it may not save you",
          "⚠️ Some drivers become overconfident and drive more aggressively",
          "⚠️ On loose surfaces like gravel, ESC might feel intrusive"
        ],
        
        myths: [
          "Myth: ESC makes you invincible - Truth: It helps, but safe driving is still your responsibility",
          "Myth: You don't need ESC if you're a good driver - Truth: Even professional drivers benefit from ESC"
        ],
        
        technical: {
          components: "Steering angle sensor, yaw rate sensor, lateral acceleration sensor, ABS module",
          activationTime: "Milliseconds - faster than human reaction time",
          worksWith: "Works with ABS and Traction Control systems"
        },
        
        bestFor: [
          "SUV and tall vehicle owners (higher rollover risk)",
          "Drivers in hilly or winding areas",
          "Anyone driving in rainy or slippery conditions",
          "New drivers still learning vehicle dynamics"
        ],
        
        image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop',
        isStandard: true,
        applicableVehicles: 'Most modern cars (mandatory in many segments since 2019)',
        priceRange: 'Standard on most cars, may be absent on very budget models'
      }
    ]
  },
  
  adas: {
    id: 'adas',
    name: 'ADAS (Advanced Driver Assistance Systems)',
    description: 'AI-powered safety systems that use cameras and sensors to assist, warn, and protect drivers.',
    icon: '🤖',
    color: 'blue',
    bgColor: 'bg-dark-50',
    textColor: 'text-dark-600',
    features: [
      {
        id: 'aeb',
        name: 'Automatic Emergency Braking (AEB)',
        tagline: 'Your car\'s automatic brake that prevents collisions',
        shortDesc: 'Detects potential collisions and automatically applies brakes if the driver doesn\'t respond in time.',
        
        simpleExplanation: {
          what: "AEB is like having a guardian angel watching the road ahead. If there's a car, person, or obstacle in front and you don't brake in time, your car will brake automatically to avoid or reduce the crash.",
          analogy: "Imagine you're walking while looking at your phone. A friend beside you sees a hole ahead and pulls you back before you fall. AEB is that friend - it watches the road even when you're distracted.",
          whenUsed: "AEB works at city and highway speeds when a collision is imminent and the driver hasn't reacted."
        },
        
        howItWorks: {
          step1: "Radar, cameras, or LiDAR sensors constantly monitor what's ahead",
          step2: "The system calculates distance and relative speed to vehicles/obstacles",
          step3: "If a collision risk is detected and you don't brake, AEB issues warnings",
          step4: "If you still don't react, the system applies brakes automatically",
          step5: "AEB can prevent or significantly reduce crash severity"
        },
        
        benefits: [
          "✅ Reduces rear-end collisions by up to 50%",
          "✅ Can detect pedestrians and cyclists, not just cars",
          "✅ Works in both city traffic and highway speeds",
          "✅ Invaluable in Indian traffic with unpredictable movements",
          "✅ Reduces insurance costs on some vehicles"
        ],
        
        cons: [
          "⚠️ May not work in heavy rain, fog, or snow",
          "⚠️ Some systems have maximum speed limits (usually 80-100 km/h)",
          "⚠️ Can be overly sensitive in some situations",
          "⚠️ Adds to vehicle cost (typically ₹30,000-1,00,000 extra)"
        ],
        
        myths: [
          "Myth: AEB means you never have to brake - Truth: AEB is a backup, not a replacement for attentive driving",
          "Myth: AEB always stops completely - Truth: It aims to reduce severity, sometimes just reducing speed"
        ],
        
        technical: {
          components: "Forward radar sensor, camera, ECU, braking system interface",
          detectionRange: "Typically up to 200 meters ahead",
          limitations: "May not detect small objects, animals, or stationary vehicles at high speeds"
        },
        
        bestFor: [
          "City drivers facing stop-and-go traffic",
          "Drivers who frequently use crowded roads",
          "Anyone wanting maximum collision protection",
          "Fleet and taxi operators"
        ],
        
        image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop',
        isStandard: false,
        applicableVehicles: 'Premium and mid-range cars, becoming common in new models',
        priceRange: '₹30,000 - ₹1,00,000 as optional feature'
      },
      
      {
        id: 'acc',
        name: 'Adaptive Cruise Control (ACC)',
        tagline: 'Cruise control that thinks and adapts to traffic',
        shortDesc: 'Maintains your set speed but automatically slows down to keep safe distance from vehicles ahead.',
        
        simpleExplanation: {
          what: "ACC is like smart cruise control. Regular cruise control keeps your speed no matter what - ACC pays attention to traffic ahead and slows down automatically when needed, then speeds back up when safe.",
          analogy: "Imagine driving behind a careful friend who always maintains safe distance. If the car ahead slows down, your friend slows down too. ACC does exactly that - it's cruise control with eyes.",
          whenUsed: "Perfect for highway driving and expressways, especially in moderate traffic."
        },
        
        howItWorks: {
          step1: "You set your desired speed (like 100 km/h) and following distance",
          step2: "Radar sensors detect vehicles ahead and their speed",
          step3: "If a slower vehicle is ahead, ACC reduces speed to maintain safe distance",
          step4: "When the slower vehicle moves or speeds up, ACC resumes your set speed",
          step5: "Some systems can bring the car to a complete stop and resume automatically"
        },
        
        benefits: [
          "✅ Reduces driver fatigue on long journeys - no constant speed adjustment",
          "✅ Maintains safe following distance automatically",
          "✅ Improves fuel efficiency by maintaining smooth acceleration/deceleration",
          "✅ Perfect for expressway driving and long road trips",
          "✅ Stop-and-go version works in city traffic too"
        ],
        
        cons: [
          "⚠️ Can be expensive (₹40,000 - ₹1,50,000)",
          "⚠️ May not work well in heavy rain or fog",
          "⚠️ Some drivers become less attentive",
          "⚠️ Not all systems work at very low speeds"
        ],
        
        myths: [
          "Myth: ACC drives the car for you - Truth: You still need to steer and stay alert",
          "Myth: ACC works in all weather - Truth: Heavy rain or snow can affect sensor performance"
        ],
        
        technical: {
          components: "Forward radar, camera, cruise control module, braking actuator",
          operatingRange: "Typically 30-180 km/h (stop-and-go versions work 0-180)",
          sensorRange: "Typically up to 150-200 meters ahead"
        },
        
        bestFor: [
          "Frequent highway travelers",
          "Long distance commuters",
          "Those wanting reduced driving fatigue",
          "Expressway users"
        ],
        
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop',
        isStandard: false,
        applicableVehicles: 'Premium vehicles, some mid-range cars',
        priceRange: '₹40,000 - ₹1,50,000 depending on car brand'
      },
      
      {
        id: 'ldw',
        name: 'Lane Departure Warning (LDW)',
        tagline: 'Your alert system when drifting out of lane',
        shortDesc: 'Warns you when your vehicle begins to drift out of its lane without using turn signals.',
        
        simpleExplanation: {
          what: "LDW is like having a passenger who taps your shoulder when you start drifting out of your lane. It doesn't steer for you - just alerts you so you can correct.",
          analogy: "Imagine walking on a path while looking at your phone. A friend says 'watch out!' when you're about to step off the path. LDW does the same for your car.",
          whenUsed: "Activated at highway speeds, LDW alerts you if you're unintentionally leaving your lane."
        },
        
        howItWorks: {
          step1: "A forward-facing camera detects lane markings on the road",
          step2: "The system tracks your position within the lane",
          step3: "If you approach or cross a lane marking without using turn signal, LDW activates",
          step4: "You receive an alert - vibration in steering wheel, beep sound, or visual warning",
          step5: "You can then correct your steering to return to lane"
        },
        
        benefits: [
          "✅ Prevents accidents caused by driver fatigue or distraction",
          "✅ Essential for highway safety where lane drifts are dangerous",
          "✅ Encourages proper turn signal usage",
          "✅ Reduces side-swipe collisions with adjacent vehicles",
          "✅ Particularly useful for long journeys"
        ],
        
        cons: [
          "⚠️ Only works when lane markings are visible (not on rural roads without markings)",
          "⚠️ May not work in heavy rain, fog, or snow",
          "⚠️ Can be annoying if you frequently change lanes without signaling",
          "⚠️ Does NOT steer - only warns"
        ],
        
        myths: [
          "Myth: LDW steers the car - Truth: LDW only warns, Lane Keep Assist actually steers",
          "Myth: LDW works on all roads - Truth: Requires visible lane markings"
        ],
        
        technical: {
          components: "Forward camera, vibration motor/alert system, ECU",
          activationSpeed: "Usually 50-60 km/h and above",
          alertTypes: "Audible beeps, steering wheel vibration, dashboard warning"
        },
        
        bestFor: [
          "Highway drivers facing long stretches",
          "Night drivers (fatigue is more common)",
          "Those prone to distraction",
          "Commercial fleet vehicles"
        ],
        
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
        isStandard: false,
        applicableVehicles: 'Mid-range to premium vehicles',
        priceRange: 'Often bundled with other ADAS features'
      },
      
      {
        id: 'bsm',
        name: 'Blind Spot Monitoring (BSM)',
        tagline: 'Your extra eyes for dangerous blind spots',
        shortDesc: 'Detects vehicles in adjacent lanes that may be hidden in your mirrors and warns you before changing lanes.',
        
        simpleExplanation: {
          what: "BSM is like having extra mirrors that can see where you can't. It alerts you when there's a vehicle in your blind spot - the area your mirrors don't show.",
          analogy: "Imagine being on a crowded train and wanting to move sideways. A friend tells you 'someone's there' before you bump into them. BSM does this when changing lanes.",
          whenUsed: "Active at highway speeds when vehicles enter your blind spot zones."
        },
        
        howItWorks: {
          step1: "Radar or ultrasonic sensors monitor the blind spot zones on both sides",
          step2: "When a vehicle enters your blind spot, a warning light appears in the side mirror",
          step3: "If you activate your turn signal while a vehicle is in your blind spot, you get an additional alert",
          step4: "The alert could be a flashing light, beep, or steering wheel vibration",
          step5: "This gives you time to check and avoid a dangerous lane change"
        },
        
        benefits: [
          "✅ Prevents dangerous lane-change collisions",
          "✅ Works in all weather conditions (unlike cameras)",
          "✅ Particularly useful for large vehicles like SUVs with larger blind spots",
          "✅ Reduces stress when changing lanes on crowded highways",
          "✅ Helps drivers with limited neck mobility"
        ],
        
        cons: [
          "⚠️ May not detect very fast-approaching vehicles",
          "⚠️ Some systems false-alert from guardrails or parked cars",
          "⚠️ Adds to vehicle cost",
          "⚠️ Not a replacement for actually checking mirrors"
        ],
        
        myths: [
          "Myth: BSM sees everything - Truth: Vehicles approaching very fast may not be detected",
          "Myth: You don't need to check mirrors with BSM - Truth: BSM is an aid, not a replacement"
        ],
        
        technical: {
          components: "Radar/ultrasonic sensors (rear bumper), indicator lights in mirrors, alert system",
          detectionRange: "Typically 3-5 meters beside and behind vehicle",
          activationSpeed: "Usually 10-15 km/h and above"
        },
        
        bestFor: [
          "SUV and large vehicle drivers",
          "Drivers with limited neck mobility",
          "Highway commuters frequently changing lanes",
          "New drivers still developing spatial awareness"
        ],
        
        image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop',
        isStandard: false,
        applicableVehicles: 'Premium and mid-range vehicles',
        priceRange: '₹15,000 - ₹40,000 as add-on'
      }
    ]
  },
  
  connected: {
    id: 'connected',
    name: 'Connected Car Technology',
    description: 'Internet-connected vehicles offering remote access, navigation, and real-time vehicle data.',
    icon: '📱',
    color: 'purple',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    features: [
      {
        id: 'remote',
        name: 'Remote Vehicle Access',
        tagline: 'Control your car from anywhere using your smartphone',
        shortDesc: 'Lock/unlock, start/stop engine, control AC, and locate your vehicle using your mobile phone.',
        
        simpleExplanation: {
          what: "Remote access lets you control your car from your phone, even if you're kilometers away. Want to cool your car before driving? Lock doors you forgot? Find where you parked? Your phone can do it all.",
          analogy: "Think of it like a smart home system, but for your car. Just as you can turn on AC from your phone before reaching home, you can do the same with your car.",
          whenUsed: "Any time you have internet connectivity - from across the street or across the city."
        },
        
        howItWorks: {
          step1: "Your car has a built-in SIM card and cellular connection (like a phone)",
          step2: "You install the car manufacturer's app on your smartphone",
          step3: "When you send a command (like 'lock doors'), it goes to cloud servers",
          step4: "Cloud servers send the command to your car via cellular network",
          step5: "Your car executes the command and confirms back"
        },
        
        benefits: [
          "✅ Never worry about forgetting to lock your car - check and lock from anywhere",
          "✅ Pre-cool or pre-heat your car before driving - no more hot steering wheels",
          "✅ Find your car in massive parking lots using GPS",
          "✅ Share digital keys with family members (no physical key needed)",
          "✅ Get alerts if your car is moved without authorization"
        ],
        
        cons: [
          "⚠️ Requires good cellular coverage - may not work in remote areas",
          "⚠️ Subscription fees after free period (usually 1-3 years free)",
          "⚠️ Battery drain if used excessively",
          "⚠️ Security concerns about hacking (though manufacturers work hard on this)"
        ],
        
        myths: [
          "Myth: Anyone can hack my connected car - Truth: Manufacturers use bank-level encryption",
          "Myth: Connected features drain car battery - Truth: The system uses very little power"
        ],
        
        technical: {
          components: "Telematics Control Unit (TCU), cellular modem, GPS receiver, mobile app",
          networkType: "4G LTE or 5G cellular connectivity",
          subscription: "Typically free for 1-3 years, then paid"
        },
        
        bestFor: [
          "Forgetful people who often wonder 'did I lock my car?'",
          "People in hot climates wanting pre-cooling",
          "Families sharing one car",
          "Anyone wanting peace of mind"
        ],
        
        image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=600&h=400&fit=crop',
        isStandard: false,
        applicableVehicles: 'Connected car variants of modern vehicles',
        priceRange: 'Often included in higher trims, ₹10,000-30,000 extra'
      },
      
      {
        id: 'telematics',
        name: 'Vehicle Telematics & Health Monitoring',
        tagline: 'Your car\'s health dashboard on your phone',
        shortDesc: 'Get real-time updates about your car\'s health, service reminders, and driving behavior analytics.',
        
        simpleExplanation: {
          what: "Telematics is like a fitness tracker for your car. It tells you how your car is doing - when it needs service, if something's wrong, and even how efficiently you're driving.",
          analogy: "Just as a smartwatch tracks your heart rate and steps, telematics tracks your car's health, fuel efficiency, and driving patterns.",
          whenUsed: "Continuous monitoring - you get alerts when something needs attention."
        },
        
        howItWorks: {
          step1: "Sensors throughout your car collect data on engine, battery, brakes, tire pressure, etc.",
          step2: "The telematics unit sends this data to cloud servers",
          step3: "The system analyzes data to predict maintenance needs and detect issues",
          step4: "You receive alerts on your phone for service reminders or problems",
          step5: "You can also view detailed reports on driving habits and efficiency"
        },
        
        benefits: [
          "✅ Never miss a service with automatic reminders based on actual usage",
          "✅ Catch problems early before they become expensive repairs",
          "✅ Track your fuel efficiency and driving habits",
          "✅ Get tire pressure alerts - crucial for safety and fuel economy",
          "✅ Reduce maintenance costs with timely alerts",
          "✅ Monitor your teenage driver's behavior (speed, harsh braking, etc.)"
        ],
        
        cons: [
          "⚠️ Requires subscription after free period",
          "⚠️ Some drivers uncomfortable with data tracking",
          "⚠️ Privacy concerns about driving data being shared with insurance companies",
          "⚠️ Not available on all cars"
        ],
        
        myths: [
          "Myth: Telematics is just for fleet vehicles - Truth: Individual owners benefit too",
          "Myth: My data is sold to insurance - Truth: You usually need to consent to sharing"
        ],
        
        technical: {
          components: "Various vehicle sensors, telematics unit, cloud platform",
          monitoring: "Engine health, battery voltage, tire pressure, brake wear, fuel efficiency",
          alertTypes: "Push notifications, email, in-app alerts"
        },
        
        bestFor: [
          "Owners wanting to reduce maintenance costs",
          "Parents of teenage drivers",
          "Fleet operators",
          "Anyone wanting peace of mind about car health"
        ],
        
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        isStandard: false,
        applicableVehicles: 'Connected car variants, commercial vehicles',
        priceRange: 'Often bundled with connected car packages'
      }
    ]
  },
  
  ev: {
    id: 'ev',
    name: 'Electric Vehicles (EV)',
    description: 'Complete guide to understanding EV technology, batteries, charging, and ownership in India.',
    icon: '⚡',
    color: 'green',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    features: [
      {
        id: 'battery',
        name: 'EV Battery Technology',
        tagline: 'The heart of every electric vehicle',
        shortDesc: 'Lithium-ion battery packs store electricity to power the electric motor - determining range, performance, and longevity.',
        
        simpleExplanation: {
          what: "An EV battery is like a giant version of your phone's battery, but much more advanced. It stores electricity that powers the motor to move the car. The bigger the battery (kWh), the farther you can drive.",
          analogy: "Think of the battery as a water tank. The larger the tank (kWh), the more water (electricity) you store, and the longer you can drive. Charging is like filling the tank back up.",
          whenUsed: "Every time you drive - the battery powers everything from the motor to the AC to the lights."
        },
        
        howItWorks: {
          step1: "Thousands of small lithium-ion cells are arranged into a battery pack",
          step2: "A Battery Management System (BMS) monitors each cell's health and temperature",
          step3: "The battery sends DC (direct current) electricity to the inverter",
          step4: "The inverter converts DC to AC (alternating current) for the motor",
          step5: "The motor uses this electricity to turn the wheels"
        },
        
        benefits: [
          "✅ Zero tailpipe emissions - better for the environment and air quality",
          "✅ Lower running costs (₹1-2 per km vs ₹6-10 for petrol/diesel)",
          "✅ Smooth, instant torque - no waiting for gears to shift",
          "✅ Quiet and refined driving experience",
          "✅ Lower maintenance (no oil changes, fewer moving parts)",
          "✅ Home charging possible - wake up to a 'full tank' every day"
        ],
        
        cons: [
          "⚠️ Higher upfront cost than petrol/diesel cars",
          "⚠️ Range anxiety - worry about running out of charge",
          "⚠️ Charging takes longer than filling petrol (30 min to many hours)",
          "⚠️ Battery degrades over time (typically 70-80% capacity after 8-10 years)",
          "⚠️ Battery replacement is expensive (₹3-8 lakhs)",
          "⚠️ Charging infrastructure still growing in India"
        ],
        
        myths: [
          "Myth: EV batteries die quickly - Truth: Most last 8-10 years or 1,50,000-2,00,000 km",
          "Myth: EVs are worse for the environment - Truth: Even with battery production, EVs are cleaner over lifetime",
          "Myth: EV batteries just become toxic waste - Truth: 95% can be recycled"
        ],
        
        technical: {
          batteryTypes: "Lithium-ion (Li-ion), Lithium Iron Phosphate (LFP)",
          capacityRange: "20 kWh (small city car) to 80+ kWh (luxury EV)",
          voltageSystem: "400V common, 800V in newer premium EVs",
          warranty: "Typically 8 years / 1,60,000 km on battery"
        },
        
        bestFor: [
          "Daily commuters with access to home charging",
          "Two-car households (EV for city, petrol for long trips)",
          "Environmentally conscious buyers",
          "Those wanting lowest running costs"
        ],
        
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop',
        isStandard: true,
        applicableVehicles: 'All electric vehicles',
        priceRange: 'Battery is 30-40% of EV cost - ₹3-10 lakhs depending on size'
      },
      
      {
        id: 'charging',
        name: 'EV Charging Explained',
        tagline: 'Everything you need to know about charging your EV',
        shortDesc: 'Understand home charging, public fast charging, charging times, costs, and India\'s charging network.',
        
        simpleExplanation: {
          what: "Charging an EV is like charging your phone, but bigger. You plug it in, electricity flows into the battery, and you wait. Different chargers fill the battery at different speeds.",
          analogy: "Think of charging like filling a bucket with water. A slow charger is a garden hose (takes many hours). A fast charger is a fire hose (fills in 30 minutes).",
          whenUsed: "Every time the battery is low - home charging overnight, fast charging during long trips."
        },
        
        howItWorks: {
          step1: "Plug the charging cable into your car and power source",
          step2: "The car and charger communicate to determine safe charging speed",
          step3: "Electricity flows through the charger into the battery",
          step4: "The Battery Management System controls the rate to protect battery health",
          step5: "Charging slows down as battery nears full to prevent damage"
        },
        
        chargingSpeeds: {
          slow: {
            name: "Slow Charger (AC)",
            speed: "2.5-7 kW",
            timeFor30kWh: "5-12 hours",
            bestFor: "Home overnight charging",
            costPer100km: "₹100-150"
          },
          fast: {
            name: "Fast Charger (DC)",
            speed: "25-50 kW",
            timeFor30kWh: "30-60 minutes",
            bestFor: "Public charging stations",
            costPer100km: "₹150-200"
          },
          ultraFast: {
            name: "Ultra-Fast Charger (DC)",
            speed: "100-350 kW",
            timeFor30kWh: "15-20 minutes",
            bestFor: "Highway travel",
            costPer100km: "₹200-250"
          }
        },
        
        benefits: [
          "✅ Home charging costs just ₹1-2 per km - 80% cheaper than petrol",
          "✅ Charge while you sleep - wake up to a full battery every day",
          "✅ Growing network of public chargers across Indian highways",
          "✅ Government subsidies available for home chargers (₹10,000-30,000)",
          "✅ Fast chargers can add 100km in just 15-20 minutes"
        ],
        
        cons: [
          "⚠️ Public charging infrastructure still limited in many areas",
          "⚠️ Fast charging costs more than home charging",
          "⚠️ Charging takes longer than petrol refueling (30 min vs 5 min)",
          "⚠️ Not all chargers work with all EVs (different connectors)",
          "⚠️ Apartment dwellers may struggle with home charging"
        ],
        
        myths: [
          "Myth: Charging is expensive - Truth: Home charging is 80% cheaper than petrol",
          "Myth: You need a special charger - Truth: Regular 15A socket works for slow charging",
          "Myth: Fast charging damages battery - Truth: Modern EVs manage battery health well"
        ],
        
        technical: {
          connectorTypes: "CCS2 (European/Indian standard), CHAdeMO (Japanese), Tesla",
          homeSetup: "15A socket or dedicated wall box (3.3-7.2 kW)",
          fastChargersInIndia: "2000+ public chargers, growing rapidly",
          chargeTime: "30-60 minutes for 20-80% on fast charger"
        },
        
        bestFor: [
          "Home owners with parking and power access",
          "Daily commuters with predictable routes",
          "Those willing to plan long trips around charging stops",
          "Two-car households (one EV for daily use)"
        ],
        
        image: 'https://images.unsplash.com/photo-1625070121002-7e74e1f2770a?w=600&h=400&fit=crop',
        isStandard: true,
        applicableVehicles: 'All electric vehicles',
        priceRange: 'Home charger: ₹10,000-50,000 (subsidies available)'
      },
      
      {
        id: 'range',
        name: 'EV Range & Efficiency',
        tagline: 'Maximizing how far your EV can go on a single charge',
        shortDesc: 'Understand real-world range, factors that affect it, and tips to maximize efficiency.',
        
        simpleExplanation: {
          what: "Range is how far your EV can drive on a full charge. Like a petrol car's fuel tank capacity, but affected differently by driving style, weather, and conditions.",
          analogy: "Think of range like your phone's battery life. It lasts longer if you're not watching videos (like driving gently) and less if you're playing games (like driving aggressively).",
          whenUsed: "Every time you drive - understanding range helps plan trips and avoid range anxiety."
        },
        
        howItWorks: {
          step1: "The battery stores a certain amount of energy (kWh) - like fuel in a tank",
          step2: "Your driving uses energy - accelerating, maintaining speed, climbing hills",
          step3: "Regenerative braking recovers some energy when slowing down",
          step4: "AC/heater, music, lights all use battery power",
          step5: "The car estimates remaining range based on recent driving patterns"
        },
        
        rangeFactors: {
          drivingStyle: {
            factor: "Aggressive driving (rapid acceleration)",
            impact: "20-40% range reduction",
            tip: "Drive smoothly, use Eco mode"
          },
          speed: {
            factor: "Highway driving above 80 km/h",
            impact: "15-25% range reduction",
            tip: "Stay at 80-90 km/h for best efficiency"
          },
          weather: {
            factor: "Extreme heat or cold",
            impact: "15-30% range reduction",
            tip: "Pre-condition while plugged in"
          },
          load: {
            factor: "Heavy cargo or roof box",
            impact: "10-15% range reduction",
            tip: "Remove roof accessories when not needed"
          }
        },
        
        benefits: [
          "✅ 200-500 km range meets most daily needs (average daily drive: 40 km)",
          "✅ Regenerative braking extends range by 10-20% in city driving",
          "✅ Real-time range estimates help plan trips",
          "✅ Indian warm climate is ideal for EV efficiency (no extreme cold)",
          "✅ Charging stations every 50-100 km on major highways"
        ],
        
        cons: [
          "⚠️ Range anxiety is real - fear of running out of charge",
          "⚠️ Highway range is lower than city range (opposite of petrol cars)",
          "⚠️ Range drops in very cold weather (not a major issue in most of India)",
          "⚠️ Advertised range (MIDC/ARAI) is higher than real-world range",
          "⚠️ Range decreases as battery ages (typically 10-15% over 5 years)"
        ],
        
        myths: [
          "Myth: EVs can't do long trips - Truth: With planning, EVs handle 500+ km trips",
          "Myth: Range is always what the display shows - Truth: It's an estimate based on recent driving",
          "Myth: Using AC kills range - Truth: AC uses about 10% of range, heater uses more"
        ],
        
        realWorldRangeExamples: {
          city: "300-400 km (higher due to regenerative braking)",
          highway: "200-300 km (lower due to high speeds and less regen)",
          mixed: "250-350 km typical"
        },
        
        efficiencyTips: [
          "✅ Use Eco mode for smoother acceleration",
          "✅ Enable maximum regenerative braking",
          "✅ Pre-condition cabin while plugged in",
          "✅ Keep tires properly inflated",
          "✅ Remove unnecessary weight from car",
          "✅ Use AC rather than opening windows at high speeds"
        ],
        
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
        isStandard: true,
        applicableVehicles: 'All electric vehicles',
        priceRange: 'Larger range = higher battery cost (₹3-10 lakhs more)'
      }
    ]
  }
}

// Helper function to get all features
export const getAllFeatures = () => {
  const allFeatures = []
  Object.keys(featuresData).forEach(categoryId => {
    const category = featuresData[categoryId]
    category.features.forEach(feature => {
      allFeatures.push({
        ...feature,
        categoryId: category.id,
        categoryName: category.name,
        categoryColor: category.color
      })
    })
  })
  return allFeatures
}

// Helper function to get feature by ID
export const getFeatureById = (id) => {
  for (const category of Object.values(featuresData)) {
    const feature = category.features.find(f => f.id === id)
    if (feature) return { ...feature, categoryName: category.name, categoryColor: category.color }
  }
  return null
}