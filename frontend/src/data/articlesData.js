// src/data/articlesData.js
/*
================================================================================
File Name : articlesData.js
Author : Tahseen Raza
Created Date : 2026-06-22
Description : Article data service - Now fetches from backend API
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { api } from '../services/api';

let articlesCache = null;
let isFetching = false;
let fetchPromise = null;

// Fetch articles from backend
const fetchArticles = async () => {
  if (articlesCache) return articlesCache;
  
  if (isFetching) {
    return fetchPromise;
  }
  
  isFetching = true;
  fetchPromise = api.getAllArticles().then(result => {
    isFetching = false;
    if (result.success) {
      articlesCache = result.articles;
      return articlesCache;
    }
    console.error('❌ Failed to fetch articles:', result.message);
    return [];
  }).catch(error => {
    isFetching = false;
    console.error('❌ Error fetching articles:', error);
    return [];
  });
  
  return fetchPromise;
};

// Get all articles
export const getAllArticles = async () => {
  return await fetchArticles();
};

// Get article by slug
export const getArticleBySlug = async (slug) => {
  if (!slug) return null;
  const result = await api.getArticleBySlug(slug);
  if (result.success) {
    return result.article;
  }
  return null;
};

// Get articles by category
export const getArticlesByCategory = async (categoryName) => {
  const result = await api.getArticlesByCategory(categoryName);
  if (result.success) {
    return result.articles;
  }
  return [];
};

// Get all categories with counts
export const getCategories = async () => {
  const articles = await fetchArticles();
  const categories = {};
  articles.forEach(article => {
    if (!categories[article.category]) {
      categories[article.category] = 0;
    }
    categories[article.category]++;
  });
  
  return Object.keys(categories).map(name => ({
    id: name,
    name: name,
    count: categories[name]
  }));
};

// Search articles
export const searchArticles = async (query) => {
  if (!query || query.trim() === '') {
    return await fetchArticles();
  }
  const result = await api.searchArticles(query.trim());
  if (result.success) {
    return result.articles;
  }
  return [];
};

// ========================================
// ADDED: allArticles export for backward compatibility
// ========================================
export const allArticles = async () => {
  return await fetchArticles();
};

// ========================================
// ADDED: featureReviews, newLaunches, techInsights for backward compatibility
// ========================================
export const featureReviews = async () => {
  return await getArticlesByCategory('Feature Reviews');
};

export const newLaunches = async () => {
  return await getArticlesByCategory('New Launches');
};

export const techInsights = async () => {
  return await getArticlesByCategory('Tech Insights');
};

export default {
  getAllArticles,
  getArticleBySlug,
  getArticlesByCategory,
  getCategories,
  searchArticles,
  allArticles,
  featureReviews,
  newLaunches,
  techInsights,
};