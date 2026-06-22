-- ================================================================================
-- File Name : 01_create_brands_table.sql
-- Author : Tahseen Raza
-- Created Date : 2026-06-22
-- Description : Brands table for car manufacturers (MongoDB to PostgreSQL)
-- Company : Vaahan International
-- Copyright : (c) 2026 Vaahan International. All rights reserved.
-- ================================================================================

DROP TABLE IF EXISTS brands CASCADE;

CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    logo VARCHAR(500),
    icon VARCHAR(10) DEFAULT '🚗',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE brands IS 'Stores car manufacturer/brand information';
COMMENT ON COLUMN brands.id IS 'Unique identifier for the brand';
COMMENT ON COLUMN brands.name IS 'Brand name (e.g., Hyundai, Tata)';
COMMENT ON COLUMN brands.slug IS 'URL-friendly version of brand name';
COMMENT ON COLUMN brands.logo IS 'URL path to brand logo image';
COMMENT ON COLUMN brands.icon IS 'Emoji icon for the brand';
COMMENT ON COLUMN brands.description IS 'Brand description';

CREATE INDEX idx_brands_name ON brands(name);
CREATE INDEX idx_brands_slug ON brands(slug);

-- Sample data
INSERT INTO brands (name, slug, logo, icon, description) VALUES
('Hyundai', 'hyundai', '/images/logos/hyundai.png', '🚗', 'Hyundai Motor Company - Leading Indian automotive brand.'),
('Kia', 'kia', '/images/logos/kia.png', '🚙', 'Kia Corporation - Leading Indian automotive brand.'),
('Tata', 'tata', '/images/logos/tata.png', '🚘', 'Tata Motors - Indian multinational automotive manufacturing company.'),
('Mahindra', 'mahindra', '/images/logos/mahindra.png', '🚛', 'Mahindra & Mahindra - Indian multinational automotive manufacturing corporation.'),
('Suzuki', 'suzuki', '/images/logos/suzuki.png', '🚕', 'Suzuki Motor Corporation - Leading Indian automotive brand.');