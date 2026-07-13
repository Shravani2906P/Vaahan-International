// backend/src/services/geocodingService.js
/*
================================================================================
File Name : geocodingService.js
Description : Thin wrapper around the OpenCage Geocoding API.
              Used ONLY for:
                1) Reverse geocoding — turning a browser's lat/lng into a
                   city/district/state ("Use My Current Location").
                2) Occasional forward geocoding of a location record that's
                   missing coordinates (e.g. during seeding).
              Manual "search as you type" NEVER calls this — that hits the
              local Location collection instead (see locationController.js).
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;
const OPENCAGE_BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';

// Node 18+ has global fetch; fall back gracefully if not available so this
// module doesn't crash the whole app on import in an older runtime.
const fetchFn = typeof fetch === 'function' ? fetch : require('node-fetch');

/**
 * Reverse geocode a lat/lng pair to a structured Indian location.
 * Returns { isIndia: false } if the coordinate resolves outside India.
 *
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<{
 *   isIndia: boolean,
 *   city: string|null,
 *   district: string|null,
 *   state: string|null,
 *   stateCode: string|null,
 *   pincode: string|null,
 *   country: string|null,
 *   latitude: number,
 *   longitude: number,
 * }>}
 */
const reverseGeocode = async (latitude, longitude) => {
  if (!OPENCAGE_API_KEY) {
    throw new Error('OPENCAGE_API_KEY is not configured on the server');
  }
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    throw new Error('latitude and longitude must be numbers');
  }

  const url = `${OPENCAGE_BASE_URL}?q=${encodeURIComponent(
    `${latitude}+${longitude}`
  )}&key=${OPENCAGE_API_KEY}&language=en&no_annotations=1&limit=1`;

  const response = await fetchFn(url);
  if (!response.ok) {
    throw new Error(`OpenCage reverse geocode failed with status ${response.status}`);
  }

  const data = await response.json();
  const result = data?.results?.[0];

  if (!result) {
    return {
      isIndia: false,
      city: null,
      district: null,
      state: null,
      stateCode: null,
      pincode: null,
      country: null,
      latitude,
      longitude,
    };
  }

  const components = result.components || {};
  const countryCode = (components.country_code || '').toLowerCase();
  const isIndia = countryCode === 'in';

  return {
    isIndia,
    city:
      components.city ||
      components.town ||
      components.village ||
      components.municipality ||
      components.suburb ||
      null,
    district: components.state_district || components.county || null,
    state: components.state || null,
    stateCode: components.state_code
      ? String(components.state_code).toUpperCase()
      : null,
    pincode: components.postcode || null,
    country: components.country || null,
    latitude,
    longitude,
  };
};

/**
 * Forward geocode a free-text place name to coordinates. Used sparingly —
 * e.g. by the seed script to backfill lat/lng for a Location record that
 * doesn't have them yet. Never called on user keystrokes.
 *
 * @param {string} query - e.g. "Warangal, Telangana, India"
 */
const forwardGeocode = async (query) => {
  if (!OPENCAGE_API_KEY) {
    throw new Error('OPENCAGE_API_KEY is not configured on the server');
  }

  const url = `${OPENCAGE_BASE_URL}?q=${encodeURIComponent(
    query
  )}&key=${OPENCAGE_API_KEY}&language=en&no_annotations=1&limit=1&countrycode=in`;

  const response = await fetchFn(url);
  if (!response.ok) {
    throw new Error(`OpenCage forward geocode failed with status ${response.status}`);
  }

  const data = await response.json();
  const result = data?.results?.[0];
  if (!result) return null;

  return {
    latitude: result.geometry.lat,
    longitude: result.geometry.lng,
  };
};

module.exports = { reverseGeocode, forwardGeocode };
