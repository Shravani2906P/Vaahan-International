// backend/src/scripts/testTopArticlesByCategory.js
/*
================================================================================
File Name : testTopArticlesByCategory.js
Description : Test script — prints each category and its top 5 articles by views
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const {
  getTopArticlesByCategory,
  printTopArticlesByCategory,
} = require('../services/topArticlesByCategory');

const run = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is missing in backend/.env');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    const results = await getTopArticlesByCategory({ limitPerCategory: 5 });
    printTopArticlesByCategory(results);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
};

run();
