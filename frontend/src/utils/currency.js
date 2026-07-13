// src/utils/currency.js
/*
================================================================================
File Name : currency.js
Description : Formats a rupee amount the way Indian car-buyers expect to
              read it — "₹9.99 Lakh", "₹1.25 Crore" — instead of a raw
              ₹9,99,000 or a Western-style ₹999,000.
================================================================================
*/

export const formatINRCompact = (amount) => {
  if (amount === null || amount === undefined || Number.isNaN(amount)) return '—'

  const value = Number(amount)
  const absValue = Math.abs(value)

  if (absValue >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Crore`
  }
  if (absValue >= 100000) {
    return `₹${(value / 100000).toFixed(2)} Lakh`
  }
  return `₹${value.toLocaleString('en-IN')}`
}

export const formatINRFull = (amount) => {
  if (amount === null || amount === undefined || Number.isNaN(amount)) return '—'
  return `₹${Number(amount).toLocaleString('en-IN')}`
}
