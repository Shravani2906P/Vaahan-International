// backend/src/scripts/seedAccessories.js
/*
================================================================================
File Name : seedAccessories.js
Description : One-time (idempotent) seed for AccessoryOption — the default
              catalog of optional, user-selectable accessories. Add more
              any time via this array or directly in the collection; the
              pricing engine automatically sums whatever the caller says
              was selected, with zero code changes required.

Run:  node backend/src/scripts/seedAccessories.js
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

require('dotenv').config();
const connectDB = require('../config/database');
const AccessoryOption = require('../models/AccessoryOption');

const ACCESSORIES = [
  {
    key: 'extended-warranty',
    name: 'Extended Warranty',
    description: 'Extends manufacturer warranty coverage beyond the standard term.',
    price: 15000,
    category: 'warranty',
  },
  {
    key: 'rsa',
    name: 'Road Side Assistance (RSA)',
    description: '24x7 breakdown assistance for one year.',
    price: 1500,
    category: 'assistance',
  },
  {
    key: 'basic-kit',
    name: 'Basic Accessories Kit',
    description: 'Floor mats, mud flaps, and door visors.',
    price: 2000,
    category: 'accessory-kit',
  },
  {
    key: 'accessories-package',
    name: 'Premium Accessories Package',
    description: 'Seat covers, body cover, boot mat, and premium floor mats.',
    price: 25000,
    category: 'accessory-kit',
  },
  {
    key: 'zero-dep',
    name: 'Zero Depreciation Cover',
    description: 'Insurance add-on covering full part replacement cost with no depreciation deduction.',
    price: 6000,
    category: 'protection',
  },
  {
    key: 'engine-protect',
    name: 'Engine Protection Cover',
    description: 'Insurance add-on covering engine damage from water ingress or oil leakage.',
    price: 3500,
    category: 'protection',
  },
  {
    key: 'return-to-invoice',
    name: 'Return To Invoice (RTI)',
    description: 'Insurance add-on covering the full invoice value (incl. taxes) in case of total loss/theft.',
    price: 4500,
    category: 'protection',
  },
];

const seedAccessories = async () => {
  try {
    await connectDB();

    let created = 0;
    let updated = 0;

    for (const accessory of ACCESSORIES) {
      const result = await AccessoryOption.findOneAndUpdate(
        { key: accessory.key },
        { $set: { ...accessory, isActive: true } },
        { upsert: true, new: true, rawResult: true, setDefaultsOnInsert: true }
      );
      if (result.lastErrorObject?.updatedExisting) {
        updated++;
      } else {
        created++;
      }
    }

    console.log(`✅ AccessoryOption seed complete — ${created} created, ${updated} updated (${ACCESSORIES.length} total).`);
    process.exit(0);
  } catch (error) {
    console.error('❌ AccessoryOption seed failed:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedAccessories();
}

module.exports = { seedAccessories, ACCESSORIES };
