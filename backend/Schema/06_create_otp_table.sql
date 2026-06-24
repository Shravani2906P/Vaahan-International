-- ================================================================================
-- File Name : 06_create_otp_table.sql
-- Author : Tahseen Raza
-- Created Date : 2026-06-22
-- Description : OTP table for authentication (MongoDB to PostgreSQL)
-- Company : Vaahan International
-- Copyright : (c) 2026 Vaahan International. All rights reserved.
-- ================================================================================

DROP TABLE IF EXISTS otps CASCADE;

CREATE TABLE otps (
    id SERIAL PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL,
    otp VARCHAR(10) NOT NULL,
    type VARCHAR(20) DEFAULT 'email' CHECK (type IN ('email', 'phone')),
    purpose VARCHAR(50) DEFAULT 'verify' CHECK (purpose IN ('verify', 'login', 'verify_phone', 'reset_password')),
    expires_at TIMESTAMP NOT NULL DEFAULT (NOW() + INTERVAL '10 minutes'),
    is_used BOOLEAN DEFAULT false,
    attempts INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE otps IS 'Stores OTPs for email and phone verification';
COMMENT ON COLUMN otps.identifier IS 'Email or phone number';
COMMENT ON COLUMN otps.otp IS 'One-time password code';
COMMENT ON COLUMN otps.type IS 'Type of identifier (email or phone)';
COMMENT ON COLUMN otps.purpose IS 'Purpose of OTP (verify, login, etc.)';
COMMENT ON COLUMN otps.expires_at IS 'Expiry timestamp for OTP';
COMMENT ON COLUMN otps.is_used IS 'Whether OTP has been used';

CREATE INDEX idx_otps_identifier ON otps(identifier);
CREATE INDEX idx_otps_expires_at ON otps(expires_at);

-- Auto-delete expired OTPs (PostgreSQL 14+)
-- For older versions, use a scheduled job
CREATE INDEX idx_otps_expires_at_delete ON otps(expires_at) WHERE is_used = false;