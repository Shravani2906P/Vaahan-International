-- ================================================================================
-- File Name : 02_create_models_table.sql
-- Author : Tahseen Raza
-- Created Date : 2026-06-22
-- Description : Models table for car models under brands (MongoDB to PostgreSQL)
-- Company : Vaahan International
-- Copyright : (c) 2026 Vaahan International. All rights reserved.
-- ================================================================================

DROP TABLE IF EXISTS models CASCADE;

CREATE TABLE models (
    id SERIAL PRIMARY KEY,
    brand_id INTEGER NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    image VARCHAR(500) NOT NULL,
    body_type VARCHAR(50) CHECK (body_type IN ('SUV', 'Sedan', 'Hatchback', 'MUV', 'Coupe', 'Convertible', 'Pickup', 'Van')),
    seating_capacity INTEGER CHECK (seating_capacity BETWEEN 2 AND 10) DEFAULT 5,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE models IS 'Stores car models under each brand';
COMMENT ON COLUMN models.id IS 'Unique identifier for the model';
COMMENT ON COLUMN models.brand_id IS 'Foreign key reference to brands table';
COMMENT ON COLUMN models.name IS 'Model name (e.g., Creta, Nexon)';
COMMENT ON COLUMN models.slug IS 'URL-friendly version of model name';
COMMENT ON COLUMN models.image IS 'URL path to model image';
COMMENT ON COLUMN models.body_type IS 'Type of vehicle body';
COMMENT ON COLUMN models.seating_capacity IS 'Number of seats in the vehicle';
COMMENT ON COLUMN models.description IS 'Model description';

CREATE INDEX idx_models_brand_id ON models(brand_id);
CREATE INDEX idx_models_slug ON models(slug);
CREATE INDEX idx_models_body_type ON models(body_type);

ALTER TABLE models ADD CONSTRAINT fk_models_brand 
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE;