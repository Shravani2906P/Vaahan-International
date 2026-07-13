// src/components/location/LocationBadge.jsx
/*
================================================================================
File Name : LocationBadge.jsx
Description : The 📍 City navbar button. Clicking it opens the global
              location modal — this is the ONE place a user changes their
              location; every other page just reads it from context.
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { useDsLocation } from '../../context/LocationContext'

const LocationBadge = ({ isDark, variant = 'desktop' }) => {
  const { location, openLocationModal } = useDsLocation()

  const label = location?.city || 'Set location'

  if (variant === 'mobile') {
    return (
      <button
        onClick={openLocationModal}
        className={`w-full flex items-center gap-2 py-2 font-medium text-base transition-colors duration-300 ${
          isDark ? 'text-white hover:text-yellow-400' : 'text-gray-900 hover:text-gray-700'
        }`}
      >
        <span>📍</span>
        <span className="truncate">{label}</span>
        <span className={`text-xs ml-auto ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Change</span>
      </button>
    )
  }

  return (
    <button
      onClick={openLocationModal}
      className={`flex items-center gap-1.5 font-semibold text-sm xl:text-[16px] tracking-wide transition-colors duration-300 px-2 py-1 rounded-lg ${
        isDark ? 'text-white hover:text-yellow-400 hover:bg-dark-700' : 'text-gray-900 hover:text-gray-700 hover:bg-gray-100'
      }`}
      title="Change your location"
    >
      <span>📍</span>
      <span className="max-w-[110px] truncate">{label}</span>
      <svg className="w-3 h-3 xl:w-3.5 xl:h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}

export default LocationBadge
