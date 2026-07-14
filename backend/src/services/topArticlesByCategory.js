// backend/src/services/topArticlesByCategory.js
/*
================================================================================
File Name : topArticlesByCategory.js
Description : Dynamically finds all article categories and returns the top N
              most-viewed published articles for each category.
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

const Article = require('../models/Article');

/**
 * Fetch every distinct published category and the top articles by views in each.
 * New categories are included automatically as soon as a published article uses them.
 *
 * @param {object} [options]
 * @param {number} [options.limitPerCategory=5] - Max articles per category
 * @returns {Promise<Array<{ category: string, articles: Array }>>}
 */
async function getTopArticlesByCategory({ limitPerCategory = 5 } = {}) {
  const results = await Article.aggregate([
    { $match: { status: 'published' } },
    { $sort: { views: -1, createdAt: -1 } },
    {
      $group: {
        _id: '$category',
        articles: {
          $push: {
            _id: '$_id',
            title: '$title',
            slug: '$slug',
            category: '$category',
            excerpt: '$excerpt',
            image: '$image',
            thumbnail: '$thumbnail',
            author: '$author',
            date: '$date',
            readTime: '$readTime',
            views: '$views',
            weeklyViews: '$weeklyViews',
            tags: '$tags',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        category: '$_id',
        articles: { $slice: ['$articles', limitPerCategory] },
      },
    },
    { $sort: { category: 1 } },
  ]);

  return results;
}

/**
 * Pretty-print categories and their top articles (for testing / CLI).
 */
function printTopArticlesByCategory(groupedArticles) {
  if (!groupedArticles.length) {
    console.log('No published articles found.');
    return;
  }

  console.log('\n========== Top articles by category ==========\n');

  for (const group of groupedArticles) {
    console.log(`Category: ${group.category}`);
    if (!group.articles.length) {
      console.log('  (no articles)\n');
      continue;
    }

    group.articles.forEach((article, index) => {
      console.log(
        `  ${index + 1}. ${article.title} — ${article.views ?? 0} views`
      );
    });
    console.log('');
  }

  console.log('==============================================\n');
}

module.exports = {
  getTopArticlesByCategory,
  printTopArticlesByCategory,
};
