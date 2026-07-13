// backend/src/scripts/seedLocations.js
/*
================================================================================
File Name : seedLocations.js
Description : One-time (idempotent) seed for the Location collection —
              major cities across every Indian state/UT, each tagged with
              its district, state, RTO-style stateCode (matches
              StatePricingRule.stateCode), coordinates, and common aliases
              (old city names) so manual search works the way Zomato's
              does — instant, local, partial-match, no external API calls.

              This is a curated starting dataset (~150 cities), not an
              exhaustive census list. It's meant to cover every state/UT
              with its capital + major cities so the location experience
              works everywhere on day one; more towns can be appended the
              same way (or bulk-imported from an official gazetteer) later
              without any code change.

Run:  node backend/src/scripts/seedLocations.js
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

require('dotenv').config();
const connectDB = require('../config/database');
const Location = require('../models/Location');

// [city, district, lat, lng, pincode, aliases[], popularity]
const CITIES_BY_STATE = {
  'Andhra Pradesh|AP': [
    ['Visakhapatnam', 'Visakhapatnam', 17.6868, 83.2185, '530001', ['Vizag'], 80],
    ['Vijayawada', 'NTR', 16.5062, 80.6480, '520001', [], 78],
    ['Guntur', 'Guntur', 16.3067, 80.4365, '522001', [], 60],
    ['Tirupati', 'Tirupati', 13.6288, 79.4192, '517501', [], 65],
    ['Nellore', 'SPSR Nellore', 14.4426, 79.9865, '524001', [], 50],
    ['Kurnool', 'Kurnool', 15.8281, 78.0373, '518001', [], 45],
  ],
  'Arunachal Pradesh|AR': [
    ['Itanagar', 'Papum Pare', 27.0844, 93.6053, '791111', [], 40],
  ],
  'Assam|AS': [
    ['Guwahati', 'Kamrup Metropolitan', 26.1445, 91.7362, '781001', [], 75],
    ['Dibrugarh', 'Dibrugarh', 27.4728, 94.9120, '786001', [], 42],
    ['Silchar', 'Cachar', 24.8333, 92.7789, '788001', [], 40],
  ],
  'Bihar|BR': [
    ['Patna', 'Patna', 25.5941, 85.1376, '800001', [], 74],
    ['Gaya', 'Gaya', 24.7955, 84.9994, '823001', [], 45],
    ['Bhagalpur', 'Bhagalpur', 25.2425, 87.0079, '812001', [], 42],
    ['Muzaffarpur', 'Muzaffarpur', 26.1225, 85.3906, '842001', [], 43],
  ],
  'Chhattisgarh|CG': [
    ['Raipur', 'Raipur', 21.2514, 81.6296, '492001', [], 63],
    ['Bhilai', 'Durg', 21.2094, 81.4285, '490001', [], 48],
    ['Bilaspur', 'Bilaspur', 22.0797, 82.1409, '495001', [], 42],
  ],
  'Goa|GA': [
    ['Panaji', 'North Goa', 15.4909, 73.8278, '403001', ['Panjim'], 55],
    ['Margao', 'South Goa', 15.2832, 73.9862, '403601', [], 45],
    ['Vasco da Gama', 'South Goa', 15.3981, 73.8110, '403802', ['Vasco'], 40],
  ],
  'Gujarat|GJ': [
    ['Ahmedabad', 'Ahmedabad', 23.0225, 72.5714, '380001', [], 90],
    ['Surat', 'Surat', 21.1702, 72.8311, '395001', [], 80],
    ['Vadodara', 'Vadodara', 22.3072, 73.1812, '390001', ['Baroda'], 70],
    ['Rajkot', 'Rajkot', 22.3039, 70.8022, '360001', [], 62],
    ['Gandhinagar', 'Gandhinagar', 23.2156, 72.6369, '382001', [], 50],
    ['Bhavnagar', 'Bhavnagar', 21.7645, 72.1519, '364001', [], 44],
  ],
  'Haryana|HR': [
    ['Gurugram', 'Gurugram', 28.4595, 77.0266, '122001', ['Gurgaon'], 85],
    ['Faridabad', 'Faridabad', 28.4089, 77.3178, '121001', [], 68],
    ['Panipat', 'Panipat', 29.3909, 76.9635, '132103', [], 45],
    ['Ambala', 'Ambala', 30.3752, 76.7821, '134003', [], 42],
    ['Hisar', 'Hisar', 29.1492, 75.7217, '125001', [], 40],
  ],
  'Himachal Pradesh|HP': [
    ['Shimla', 'Shimla', 31.1048, 77.1734, '171001', [], 55],
    ['Manali', 'Kullu', 32.2432, 77.1892, '175131', [], 48],
    ['Dharamshala', 'Kangra', 32.2190, 76.3234, '176215', [], 45],
  ],
  'Jharkhand|JH': [
    ['Ranchi', 'Ranchi', 23.3441, 85.3096, '834001', [], 62],
    ['Jamshedpur', 'East Singhbhum', 22.8046, 86.2029, '831001', ['Tatanagar'], 58],
    ['Dhanbad', 'Dhanbad', 23.7957, 86.4304, '826001', [], 50],
  ],
  'Karnataka|KA': [
    ['Bengaluru', 'Bengaluru Urban', 12.9716, 77.5946, '560001', ['Bangalore'], 95],
    ['Mysuru', 'Mysuru', 12.2958, 76.6394, '570001', ['Mysore'], 60],
    ['Mangaluru', 'Dakshina Kannada', 12.9141, 74.8560, '575001', ['Mangalore'], 55],
    ['Hubballi', 'Dharwad', 15.3647, 75.1240, '580001', ['Hubli'], 48],
    ['Belagavi', 'Belagavi', 15.8497, 74.4977, '590001', ['Belgaum'], 44],
  ],
  'Kerala|KL': [
    ['Thiruvananthapuram', 'Thiruvananthapuram', 8.5241, 76.9366, '695001', ['Trivandrum'], 68],
    ['Kochi', 'Ernakulam', 9.9312, 76.2673, '682001', ['Cochin'], 72],
    ['Kozhikode', 'Kozhikode', 11.2588, 75.7804, '673001', ['Calicut'], 55],
    ['Thrissur', 'Thrissur', 10.5276, 76.2144, '680001', [], 48],
  ],
  'Madhya Pradesh|MP': [
    ['Indore', 'Indore', 22.7196, 75.8577, '452001', [], 78],
    ['Bhopal', 'Bhopal', 23.2599, 77.4126, '462001', [], 72],
    ['Jabalpur', 'Jabalpur', 23.1815, 79.9864, '482001', [], 52],
    ['Gwalior', 'Gwalior', 26.2183, 78.1828, '474001', [], 50],
    ['Ujjain', 'Ujjain', 23.1765, 75.7885, '456001', [], 42],
  ],
  'Maharashtra|MH': [
    ['Mumbai', 'Mumbai', 19.0760, 72.8777, '400001', ['Bombay'], 98],
    ['Pune', 'Pune', 18.5204, 73.8567, '411001', ['Poona'], 88],
    ['Nagpur', 'Nagpur', 21.1458, 79.0882, '440001', [], 66],
    ['Nashik', 'Nashik', 19.9975, 73.7898, '422001', [], 58],
    ['Aurangabad', 'Chhatrapati Sambhajinagar', 19.8762, 75.3433, '431001', ['Sambhajinagar'], 48],
    ['Thane', 'Thane', 19.2183, 72.9781, '400601', [], 62],
    ['Nagpur Rural', 'Nagpur', 21.1300, 79.0500, '440002', [], 30],
  ],
  'Manipur|MN': [
    ['Imphal', 'Imphal West', 24.8170, 93.9368, '795001', [], 40],
  ],
  'Meghalaya|ML': [
    ['Shillong', 'East Khasi Hills', 25.5788, 91.8933, '793001', [], 42],
  ],
  'Mizoram|MZ': [
    ['Aizawl', 'Aizawl', 23.7271, 92.7176, '796001', [], 38],
  ],
  'Nagaland|NL': [
    ['Kohima', 'Kohima', 25.6751, 94.1086, '797001', [], 36],
    ['Dimapur', 'Dimapur', 25.9091, 93.7266, '797112', [], 38],
  ],
  'Odisha|OR': [
    ['Bhubaneswar', 'Khordha', 20.2961, 85.8245, '751001', [], 62],
    ['Cuttack', 'Cuttack', 20.4625, 85.8828, '753001', [], 48],
    ['Rourkela', 'Sundargarh', 22.2604, 84.8536, '769001', [], 40],
  ],
  'Punjab|PB': [
    ['Ludhiana', 'Ludhiana', 30.9010, 75.8573, '141001', [], 58],
    ['Amritsar', 'Amritsar', 31.6340, 74.8723, '143001', [], 56],
    ['Jalandhar', 'Jalandhar', 31.3260, 75.5762, '144001', [], 48],
    ['Patiala', 'Patiala', 30.3398, 76.3869, '147001', [], 42],
    ['Mohali', 'SAS Nagar', 30.7046, 76.7179, '160055', [], 44],
  ],
  'Rajasthan|RJ': [
    ['Jaipur', 'Jaipur', 26.9124, 75.7873, '302001', [], 76],
    ['Jodhpur', 'Jodhpur', 26.2389, 73.0243, '342001', [], 56],
    ['Udaipur', 'Udaipur', 24.5854, 73.7125, '313001', [], 52],
    ['Kota', 'Kota', 25.2138, 75.8648, '324001', [], 48],
    ['Ajmer', 'Ajmer', 26.4499, 74.6399, '305001', [], 44],
  ],
  'Sikkim|SK': [
    ['Gangtok', 'Gangtok', 27.3389, 88.6065, '737101', [], 36],
  ],
  'Tamil Nadu|TN': [
    ['Chennai', 'Chennai', 13.0827, 80.2707, '600001', ['Madras'], 88],
    ['Coimbatore', 'Coimbatore', 11.0168, 76.9558, '641001', [], 62],
    ['Madurai', 'Madurai', 9.9252, 78.1198, '625001', [], 55],
    ['Tiruchirappalli', 'Tiruchirappalli', 10.7905, 78.7047, '620001', ['Trichy'], 48],
    ['Salem', 'Salem', 11.6643, 78.1460, '636001', [], 44],
  ],
  'Telangana|TG': [
    ['Hyderabad', 'Hyderabad', 17.3850, 78.4867, '500001', [], 92],
    ['Warangal', 'Warangal Urban', 17.9689, 79.5941, '506001', [], 50],
    ['Nizamabad', 'Nizamabad', 18.6725, 78.0941, '503001', [], 38],
    ['Karimnagar', 'Karimnagar', 18.4386, 79.1288, '505001', [], 36],
    ['Secunderabad', 'Hyderabad', 17.4399, 78.4983, '500003', [], 55],
  ],
  'Tripura|TR': [
    ['Agartala', 'West Tripura', 23.8315, 91.2868, '799001', [], 36],
  ],
  'Uttar Pradesh|UP': [
    ['Lucknow', 'Lucknow', 26.8467, 80.9462, '226001', [], 78],
    ['Kanpur', 'Kanpur Nagar', 26.4499, 80.3319, '208001', [], 62],
    ['Noida', 'Gautam Buddha Nagar', 28.5355, 77.3910, '201301', [], 72],
    ['Ghaziabad', 'Ghaziabad', 28.6692, 77.4538, '201001', [], 60],
    ['Agra', 'Agra', 27.1767, 78.0081, '282001', [], 58],
    ['Varanasi', 'Varanasi', 25.3176, 82.9739, '221001', ['Banaras', 'Kashi'], 56],
    ['Prayagraj', 'Prayagraj', 25.4358, 81.8463, '211001', ['Allahabad'], 52],
    ['Meerut', 'Meerut', 28.9845, 77.7064, '250001', [], 48],
  ],
  'Uttarakhand|UK': [
    ['Dehradun', 'Dehradun', 30.3165, 78.0322, '248001', [], 55],
    ['Haridwar', 'Haridwar', 29.9457, 78.1642, '249401', [], 44],
    ['Nainital', 'Nainital', 29.3803, 79.4636, '263001', [], 36],
  ],
  'West Bengal|WB': [
    ['Kolkata', 'Kolkata', 22.5726, 88.3639, '700001', ['Calcutta'], 85],
    ['Howrah', 'Howrah', 22.5958, 88.2636, '711101', [], 50],
    ['Durgapur', 'Paschim Bardhaman', 23.5204, 87.3119, '713201', [], 42],
    ['Siliguri', 'Darjeeling', 26.7271, 88.3953, '734001', [], 44],
  ],
  'Andaman and Nicobar Islands|AN': [
    ['Port Blair', 'South Andaman', 11.6234, 92.7265, '744101', [], 30],
  ],
  'Chandigarh|CH': [
    ['Chandigarh', 'Chandigarh', 30.7333, 76.7794, '160001', [], 58],
  ],
  'Dadra and Nagar Haveli and Daman and Diu|DH': [
    ['Daman', 'Daman', 20.3974, 72.8328, '396210', [], 28],
    ['Silvassa', 'Dadra and Nagar Haveli', 20.2766, 73.0169, '396230', [], 28],
  ],
  'Delhi|DL': [
    ['New Delhi', 'New Delhi', 28.6139, 77.2090, '110001', ['Delhi'], 95],
    ['Dwarka', 'South West Delhi', 28.5921, 77.0460, '110075', [], 55],
    ['Rohini', 'North West Delhi', 28.7041, 77.1025, '110085', [], 48],
  ],
  'Jammu and Kashmir|JK': [
    ['Srinagar', 'Srinagar', 34.0837, 74.7973, '190001', [], 48],
    ['Jammu', 'Jammu', 32.7266, 74.8570, '180001', [], 46],
  ],
  'Ladakh|LA': [
    ['Leh', 'Leh', 34.1526, 77.5771, '194101', [], 30],
  ],
  'Lakshadweep|LD': [
    ['Kavaratti', 'Lakshadweep', 10.5669, 72.6420, '682555', [], 20],
  ],
  'Puducherry|PY': [
    ['Puducherry', 'Puducherry', 11.9416, 79.8083, '605001', ['Pondicherry'], 42],
  ],
};

const buildDocs = () => {
  const docs = [];
  for (const key of Object.keys(CITIES_BY_STATE)) {
    const [state, stateCode] = key.split('|');
    for (const [city, district, latitude, longitude, pincode, aliases, popularity] of CITIES_BY_STATE[key]) {
      const doc = {
        city,
        district,
        state,
        stateCode,
        latitude,
        longitude,
        pincode,
        country: 'India',
        aliases: aliases || [],
        popularity: popularity || 0,
      };
      // findOneAndUpdate does NOT run document middleware (pre('validate')
      // never fires for query-level updates), so searchText must be
      // computed and included here explicitly — otherwise every seeded
      // document ends up with no searchText and search returns nothing.
      doc.searchText = Location.buildSearchText(doc);
      docs.push(doc);
    }
  }
  return docs;
};

const seedLocations = async () => {
  try {
    await connectDB();

    const docs = buildDocs();
    let created = 0;
    let updated = 0;

    for (const doc of docs) {
      const result = await Location.findOneAndUpdate(
        { city: doc.city, state: doc.state },
        { $set: doc },
        {
          upsert: true,
          new: true,
          rawResult: true,
          setDefaultsOnInsert: true,
          // Safety net: even though searchText is already included above,
          // this makes sure required-field validation (e.g. a future
          // field added to the schema) can't silently pass on an
          // incomplete document the way it did before.
          runValidators: true,
        }
      );
      if (result.lastErrorObject?.updatedExisting) {
        updated++;
      } else {
        created++;
      }
    }

    console.log(`✅ Location seed complete — ${created} created, ${updated} updated (${docs.length} total across ${Object.keys(CITIES_BY_STATE).length} states/UTs).`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Location seed failed:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedLocations();
}

module.exports = { seedLocations, CITIES_BY_STATE };
