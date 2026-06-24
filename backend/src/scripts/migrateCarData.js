// backend/src/scripts/migrateCarData.js
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const Brand = require('../models/Brand');
const Model = require('../models/Model');
const Variant = require('../models/Variant');

// Brand icons mapping
const brandIcons = {
  'Hyundai': '🚗',
  'Kia': '🚙',
  'Tata': '🚘',
  'Mahindra': '🚛',
  'Suzuki': '🚕',
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vaahan_auth');
    console.log('✅ MongoDB Connected');
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Load all JSON files
const loadCarData = () => {
  try {
    // Try multiple possible paths
    const possiblePaths = [
      path.join(__dirname, '../data/cars/'),
      path.join(__dirname, '../../data/cars/'),
      path.join(__dirname, '../../../frontend/src/data/cars/'),
      path.join(process.cwd(), 'src/data/cars/'),
    ];
    
    let carsPath = null;
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        carsPath = p;
        console.log(`📁 Found cars data at: ${p}`);
        break;
      }
    }
    
    if (!carsPath) {
      console.error('❌ No cars data directory found. Please copy JSON files to backend/src/data/cars/');
      console.log('📁 Run: mkdir -p backend/src/data/cars');
      console.log('📁 Then copy: cp frontend/src/data/cars/*.json backend/src/data/cars/');
      process.exit(1);
    }
    
    const carFiles = ['hyundai.json', 'kia.json', 'tata.json', 'mahindra.json', 'suzuki.json'];
    const allData = [];
    
    for (const file of carFiles) {
      const filePath = path.join(carsPath, file);
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        allData.push(data);
        console.log(`📁 Loaded ${file}`);
      } else {
        console.warn(`⚠️ File not found: ${file}`);
      }
    }
    
    if (allData.length === 0) {
      console.error('❌ No car data files found!');
      process.exit(1);
    }
    
    return allData;
  } catch (error) {
    console.error('❌ Error loading car data:', error);
    process.exit(1);
  }
};

// Migrate all data
const migrateData = async () => {
  console.log('\n🚀 Starting Car Data Migration...\n');
  console.log('─'.repeat(50));
  
  await connectDB();
  
  // Clear existing data
  console.log('\n🗑️ Clearing existing data...');
  await Variant.deleteMany({});
  await Model.deleteMany({});
  await Brand.deleteMany({});
  console.log('✅ Existing data cleared\n');
  
  const allData = loadCarData();
  
  let totalBrands = 0;
  let totalModels = 0;
  let totalVariants = 0;
  
  for (const brandData of allData) {
    console.log(`\n📦 Processing ${brandData.brand}...`);
    
    // 1. Create Brand
    const brand = new Brand({
      name: brandData.brand,
      slug: brandData.brand.toLowerCase().replace(/\s+/g, '-'),
      icon: brandIcons[brandData.brand] || '🚗',
      description: `${brandData.brand} - Leading Indian automotive brand`,
    });
    await brand.save();
    console.log(`   ✅ Brand created: ${brand.name} (${brand.icon})`);
    totalBrands++;
    
    // 2. Create Models
    for (const modelData of brandData.models) {
      const model = new Model({
        brandId: brand._id,
        name: modelData.name,
        slug: modelData.slug || modelData.name.toLowerCase().replace(/\s+/g, '-'),
        image: modelData.image || `/images/${modelData.name}.png`,
        bodyType: modelData.bodyType || 'SUV',
        seatingCapacity: modelData.seatingCapacity || 5,
        description: `${modelData.name} by ${brandData.brand}`,
      });
      await model.save();
      console.log(`   ✅ Model created: ${model.name}`);
      totalModels++;
      
      // 3. Create Variants
      for (const variantData of modelData.variants) {
        const variant = new Variant({
          modelId: model._id,
          name: variantData.name,
          price: variantData.price,
          overallScore: variantData.overallScore || 0,
          scores: variantData.scores || {},
          factorScores: variantData.factorScores || {},
          engine: variantData.engine || 'N/A',
          fuelType: variantData.fuelType || 'N/A',
          transmission: variantData.transmission || 'N/A',
          mileage: variantData.mileage || 'N/A',
        });
        await variant.save();
        totalVariants++;
      }
    }
  }
  
  console.log('\n' + '─'.repeat(50));
  console.log('\n📊 Migration Summary:');
  console.log(`   Brands: ${totalBrands}`);
  console.log(`   Models: ${totalModels}`);
  console.log(`   Variants: ${totalVariants}`);
  
  console.log('\n✅ Migration Completed Successfully!');
  
  // Verify data
  const brandCount = await Brand.countDocuments();
  const modelCount = await Model.countDocuments();
  const variantCount = await Variant.countDocuments();
  
  console.log('\n📈 Database Counts:');
  console.log(`   Brands: ${brandCount}`);
  console.log(`   Models: ${modelCount}`);
  console.log(`   Variants: ${variantCount}`);
  
  process.exit(0);
};

migrateData();