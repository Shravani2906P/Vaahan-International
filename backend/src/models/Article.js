// backend/src/models/Article.js
/*
================================================================================
File Name : Article.js
Author : Tahseen Raza
Created Date : 2026-06-22
Description : Article schema for storing articles with categories
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Feature Reviews', 'New Launches', 'Tech Insights'],
  },
  subCategory: {
    type: String,
    trim: true,
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 500,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  readTime: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ['published', 'coming-soon', 'draft'],
    default: 'published',
  },
  seoTitle: {
    type: String,
    trim: true,
  },
  seoDescription: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  publishedAt: {
    type: Date,
  },
});

// Update updatedAt on save
ArticleSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Indexes for search
ArticleSchema.index({ title: 'text', excerpt: 'text', tags: 'text' });
ArticleSchema.index({ slug: 1 });
ArticleSchema.index({ category: 1 });
ArticleSchema.index({ status: 1 });

module.exports = mongoose.model('Article', ArticleSchema);

// backend/src/models/Article.js
/*
================================================================================
File Name : Article.js
Author : Tahseen Raza
Created Date : 2026-06-23
Description : Article schema - Lean version without embeddings
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

// const mongoose = require('mongoose');

// const ArticleSchema = new mongoose.Schema({
//   // ========================================
//   // EXISTING FIELDS (UNCHANGED)
//   // ========================================
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   slug: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true,
//   },
//   category: {
//     type: String,
//     required: true,
//     enum: ['Feature Reviews', 'New Launches', 'Tech Insights'],
//   },
//   subCategory: {
//     type: String,
//     trim: true,
//   },
//   excerpt: {
//     type: String,
//     required: true,
//     maxlength: 500,
//   },
//   content: {
//     type: String,
//     required: true,  // HTML content for UI display
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   author: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: String,
//     required: true,
//   },
//   readTime: {
//     type: String,
//     required: true,
//   },
//   tags: {
//     type: [String],
//     default: [],
//   },
//   status: {
//     type: String,
//     enum: ['published', 'coming-soon', 'draft'],
//     default: 'published',
//   },
//   seoTitle: {
//     type: String,
//     trim: true,
//   },
//   seoDescription: {
//     type: String,
//     trim: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
//   publishedAt: {
//     type: Date,
//   },

//   // ========================================
//   //  AI/RAG METADATA (Lightweight)
//   // ========================================
//   ragMetadata: {
//     isProcessed: { type: Boolean, default: false },
//     chunkCount: { type: Number, default: 0 },
//     totalChunks: { type: Number, default: 0 },
//     lastProcessedAt: { type: Date },
//     embeddingModel: { type: String },  // e.g., "gemini-2.5-flash", "text-embedding-3-small"
//     embeddingVersion: { type: String, default: '1.0' },
//   },
// });

// // Indexes
// ArticleSchema.index({ slug: 1 });
// ArticleSchema.index({ category: 1 });
// ArticleSchema.index({ status: 1 });
// ArticleSchema.index({ 'ragMetadata.isProcessed': 1 });

// ArticleSchema.pre('save', function(next) {
//   this.updatedAt = new Date();
//   next();
// });

// module.exports = mongoose.model('Article', ArticleSchema);