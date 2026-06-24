-- ================================================================================
-- File Name : 04_create_articles_table.sql
-- Author : Tahseen Raza
-- Created Date : 2026-06-22
-- Description : Articles table for storing blog posts and reviews (MongoDB to PostgreSQL)
-- Company : Vaahan International
-- Copyright : (c) 2026 Vaahan International. All rights reserved.
-- ================================================================================

DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Feature Reviews', 'New Launches', 'Tech Insights')),
    sub_category VARCHAR(100),
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(500) NOT NULL,
    author VARCHAR(100) NOT NULL,
    date VARCHAR(50) NOT NULL,
    read_time VARCHAR(50) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('published', 'coming-soon', 'draft')),
    
    -- SEO fields
    seo_title VARCHAR(255),
    seo_description TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP
);

COMMENT ON TABLE articles IS 'Stores articles, reviews, and blog posts';
COMMENT ON COLUMN articles.id IS 'Unique identifier for the article';
COMMENT ON COLUMN articles.title IS 'Article title';
COMMENT ON COLUMN articles.slug IS 'URL-friendly version of the title (unique)';
COMMENT ON COLUMN articles.category IS 'Article category (Feature Reviews, New Launches, Tech Insights)';
COMMENT ON COLUMN articles.sub_category IS 'Sub-category for better organization';
COMMENT ON COLUMN articles.excerpt IS 'Short summary of the article (max 500 chars)';
COMMENT ON COLUMN articles.content IS 'Full article content (HTML)';
COMMENT ON COLUMN articles.image IS 'URL path to the featured image';
COMMENT ON COLUMN articles.author IS 'Author name';
COMMENT ON COLUMN articles.date IS 'Publication date (display format)';
COMMENT ON COLUMN articles.read_time IS 'Estimated reading time (e.g., 8 min read)';
COMMENT ON COLUMN articles.tags IS 'Array of tags for search and filtering';
COMMENT ON COLUMN articles.status IS 'Article status (published, coming-soon, draft)';
COMMENT ON COLUMN articles.seo_title IS 'SEO optimized title';
COMMENT ON COLUMN articles.seo_description IS 'SEO meta description';

-- Indexes for performance
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);

-- Full-text search index
CREATE INDEX idx_articles_search ON articles 
    USING GIN (to_tsvector('english', 
        COALESCE(title, '') || ' ' || 
        COALESCE(excerpt, '') || ' ' || 
        COALESCE(array_to_string(tags, ' '), '')
    ));

-- Trigger to auto-update updated_at
CREATE TRIGGER update_articles_updated_at 
    BEFORE UPDATE ON articles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();