// src/components/location/OnRoadPriceDisplay.jsx
/*
================================================================================
File Name : OnRoadPriceDisplay.jsx
Description : Ex-Showroom + Estimated On-Road price block with the
              currently-selected location shown inline and a "Change"
              link — reused on Compare Cars and Comparison Results so
              there's exactly one implementation of this UI pattern.
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { useState } from 'react'
import { useDsLocation } from '../../context/LocationContext'
import { formatINRCompact, formatINRFull } from '../../utils/currency'

/**
 * @param {number} [exShowroomPrice] - raw numeric ex-showroom price
 * @param {string} [exShowroomPriceLabel] - preformatted fallback (e.g. "₹9.99 Lakh")
 *   used when only the backend's already-formatted string is available.
 * @param {Object|null} onRoadPricing - the onRoadPricing object returned by
 *   the backend (compareController / pricingController). null while
 *   loading or if no location is selected yet.
 * @param {boolean} isDark
 * @param {'default'|'compact'} size
 */
const OnRoadPriceDisplay = ({ exShowroomPrice, exShowroomPriceLabel, onRoadPricing, isDark, size = 'default' }) => {
  const { location, openLocationModal } = useDsLocation()
  const [showBreakdown, setShowBreakdown] = useState(false)

  const isCompact = size === 'compact'
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500'
  const exShowroomDisplay =
    exShowroomPrice !== undefined && exShowroomPrice !== null
      ? formatINRCompact(exShowroomPrice)
      : (exShowroomPriceLabel || '—')

  return (
    <div>
      <div className={`flex items-baseline gap-1.5 ${isCompact ? '' : 'flex-wrap'}`}>
        <span className={`${isCompact ? 'text-xs' : 'text-sm'} ${textMuted}`}>Ex-Showroom</span>
        <span className={`font-semibold ${isCompact ? 'text-xs' : 'text-sm'} ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {exShowroomDisplay}
        </span>
      </div>

      {location ? (
        onRoadPricing ? (
          <button
            onClick={() => setShowBreakdown((v) => !v)}
            className="w-full text-left mt-0.5"
          >
            <div className={`flex items-baseline gap-1.5 flex-wrap`}>
              <span className={`${isCompact ? 'text-xs' : 'text-sm'} font-semibold text-yellow-600 dark:text-yellow-400`}>
                Estimated On-Road
              </span>
              <span className={`font-bold ${isCompact ? 'text-sm' : 'text-lg'} text-yellow-600 dark:text-yellow-400`}>
                {formatINRCompact(onRoadPricing.onRoadPrice)}
              </span>
            </div>
            <div className={`flex items-center gap-1 mt-0.5 text-[11px] ${textMuted}`}>
              <span>📍 {location.city}</span>
              <span className="text-yellow-500 underline">
                {showBreakdown ? 'Hide details' : 'View details'}
              </span>
            </div>

            {showBreakdown && (
              <div className={`mt-2 p-2.5 rounded-lg text-xs space-y-1 ${isDark ? 'bg-dark-700/60' : 'bg-gray-50'}`}>
                {onRoadPricing.breakdown
                  ?.filter((row) => row.label !== 'Ex-Showroom Price' && row.label !== 'On-Road Price')
                  .map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className={textMuted}>{row.label}</span>
                      <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                        {row.amount < 0 ? '- ' : ''}{formatINRFull(Math.abs(row.amount))}
                      </span>
                    </div>
                  ))}
                <div className={`flex items-center justify-between pt-1.5 mt-1.5 border-t font-semibold ${
                  isDark ? 'border-dark-600 text-white' : 'border-gray-200 text-gray-900'
                }`}>
                  <span>On-Road Price</span>
                  <span>{formatINRFull(onRoadPricing.onRoadPrice)}</span>
                </div>
              </div>
            )}
          </button>
        ) : (
          <p className={`text-[11px] mt-0.5 ${textMuted}`}>Calculating on-road price…</p>
        )
      ) : (
        <button
          onClick={openLocationModal}
          className="text-[11px] mt-0.5 text-yellow-600 dark:text-yellow-400 underline"
        >
          📍 Set your location to see on-road price
        </button>
      )}
    </div>
  )
}

export default OnRoadPriceDisplay
