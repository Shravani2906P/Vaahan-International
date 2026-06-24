-- ================================================================================
-- File Name : 03_create_variants_table.sql
-- Author : Tahseen Raza
-- Created Date : 2026-06-22
-- Description : Variants table for car variants with detailed scores (MongoDB to PostgreSQL)
-- Company : Vaahan International
-- Copyright : (c) 2026 Vaahan International. All rights reserved.
-- ================================================================================

DROP TABLE IF EXISTS variants CASCADE;

CREATE TABLE variants (
    id SERIAL PRIMARY KEY,
    model_id INTEGER NOT NULL REFERENCES models(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    price VARCHAR(100) NOT NULL,
    ex_showroom_price NUMERIC(12,2),
    on_road_price NUMERIC(12,2),
    
    -- Engine & Performance
    engine VARCHAR(100),
    displacement VARCHAR(50),
    fuel_type VARCHAR(20) CHECK (fuel_type IN ('Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'N/A')),
    transmission VARCHAR(20) CHECK (transmission IN ('Manual', 'Automatic', 'AMT', 'CVT', 'DCT', 'EV', 'N/A')),
    power VARCHAR(50),
    torque VARCHAR(50),
    mileage VARCHAR(50),
    
    -- MAIN SCORE - Overall rating
    overall_score NUMERIC(3,1) DEFAULT 0 CHECK (overall_score >= 0 AND overall_score <= 10),
    
    -- CATEGORY SCORES - JSONB format (pre-calculated)
    scores JSONB DEFAULT '{}'::jsonb,
    
    -- FACTOR SCORES - JSONB format (detailed breakdown)
    factor_scores JSONB DEFAULT '{}'::jsonb,
    
    -- Specifications (flexible key-value pairs)
    specifications JSONB DEFAULT '{}'::jsonb,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE variants IS 'Stores car variants with detailed scores and specifications';
COMMENT ON COLUMN variants.id IS 'Unique identifier for the variant';
COMMENT ON COLUMN variants.model_id IS 'Foreign key reference to models table';
COMMENT ON COLUMN variants.name IS 'Variant name (e.g., SX(O) 1.5 Diesel AT)';
COMMENT ON COLUMN variants.price IS 'Price range displayed on UI';
COMMENT ON COLUMN variants.ex_showroom_price IS 'Ex-showroom price in INR';
COMMENT ON COLUMN variants.on_road_price IS 'On-road price in INR';
COMMENT ON COLUMN variants.engine IS 'Engine specification';
COMMENT ON COLUMN variants.displacement IS 'Engine displacement (e.g., 1493 cc)';
COMMENT ON COLUMN variants.fuel_type IS 'Fuel type (Petrol, Diesel, etc.)';
COMMENT ON COLUMN variants.transmission IS 'Transmission type';
COMMENT ON COLUMN variants.power IS 'Engine power (e.g., 115 bhp)';
COMMENT ON COLUMN variants.torque IS 'Engine torque (e.g., 250 Nm)';
COMMENT ON COLUMN variants.mileage IS 'Fuel efficiency (e.g., 18 km/L)';
COMMENT ON COLUMN variants.overall_score IS 'Overall rating out of 10';
COMMENT ON COLUMN variants.scores IS 'JSONB object containing category scores';
COMMENT ON COLUMN variants.factor_scores IS 'JSONB object containing detailed factor scores';
COMMENT ON COLUMN variants.specifications IS 'JSONB object for flexible specifications';

-- Indexes for performance
CREATE INDEX idx_variants_model_id ON variants(model_id);
CREATE INDEX idx_variants_overall_score ON variants(overall_score DESC);
CREATE INDEX idx_variants_fuel_type ON variants(fuel_type);
CREATE INDEX idx_variants_transmission ON variants(transmission);

-- GIN indexes for JSONB queries
CREATE INDEX idx_variants_scores ON variants USING GIN (scores);
CREATE INDEX idx_variants_factor_scores ON variants USING GIN (factor_scores);

ALTER TABLE variants ADD CONSTRAINT fk_variants_model 
    FOREIGN KEY (model_id) REFERENCES models(id) ON DELETE CASCADE;

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_variants_updated_at 
    BEFORE UPDATE ON variants 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();