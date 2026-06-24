-- ================================================================================
-- File Name : 05_create_users_table.sql
-- Author : Tahseen Raza
-- Created Date : 2026-06-22
-- Description : Users table for authentication (MongoDB to PostgreSQL)
-- Company : Vaahan International
-- Copyright : (c) 2026 Vaahan International. All rights reserved.
-- ================================================================================

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(20) UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    username VARCHAR(100) UNIQUE,
    is_email_verified BOOLEAN DEFAULT false,
    is_phone_verified BOOLEAN DEFAULT false,
    auth_provider VARCHAR(20) DEFAULT 'email' CHECK (auth_provider IN ('email', 'phone', 'both')),
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE users IS 'Stores user account information';
COMMENT ON COLUMN users.id IS 'Unique identifier for the user';
COMMENT ON COLUMN users.email IS 'User email address (unique)';
COMMENT ON COLUMN users.phone_number IS 'User phone number (unique)';
COMMENT ON COLUMN users.first_name IS 'User first name';
COMMENT ON COLUMN users.last_name IS 'User last name';
COMMENT ON COLUMN users.username IS 'Unique username for the user';
COMMENT ON COLUMN users.is_email_verified IS 'Whether email is verified';
COMMENT ON COLUMN users.is_phone_verified IS 'Whether phone number is verified';
COMMENT ON COLUMN users.auth_provider IS 'Authentication provider used';
COMMENT ON COLUMN users.last_login IS 'Last login timestamp';

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_username ON users(username);

-- Trigger to auto-update updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();