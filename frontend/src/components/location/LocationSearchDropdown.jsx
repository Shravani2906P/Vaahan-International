// src/components/location/LocationSearchDropdown.jsx
/*
================================================================================
File Name : LocationSearchDropdown.jsx
Description : Searchable, debounced dropdown for manually picking a city,
              district, or state. Queries the local Location collection
              only (no OpenCage calls here) and debounces input so typing
              "hyd" doesn't fire 3 separate requests.
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { useEffect, useRef, useState } from 'react'
import { api } from '../../services/api'

const DEBOUNCE_MS = 300

const LocationSearchDropdown = ({ onSelect, isDark }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const debounceRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    const trimmed = query.trim()
    if (trimmed.length < 1) {
      setResults([])
      setHasSearched(false)
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    debounceRef.current = setTimeout(async () => {
      const response = await api.searchLocations(trimmed)
      if (response.success) {
        setResults(response.data || [])
      } else {
        setResults([])
      }
      setHasSearched(true)
      setIsSearching(false)
    }, DEBOUNCE_MS)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  return (
    <div>
      <div className="relative">
        <svg
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for your city, district or state"
          className={`w-full pl-9 pr-3 py-3 rounded-xl border text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all outline-none ${
            isDark
              ? 'bg-dark-700 border-dark-600 text-white placeholder-gray-500'
              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
          }`}
        />
      </div>

      <div className="mt-2 max-h-64 overflow-y-auto custom-scrollbar">
        {isSearching && (
          <p className={`text-center text-sm py-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Searching…
          </p>
        )}

        {!isSearching && hasSearched && results.length === 0 && (
          <p className={`text-center text-sm py-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            No matching city, district, or state found.
          </p>
        )}

        {!isSearching && results.map((place) => (
          <button
            key={place._id}
            onClick={() => onSelect(place)}
            className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between gap-2 ${
              isDark ? 'hover:bg-dark-700' : 'hover:bg-gray-100'
            }`}
          >
            <span className="flex flex-col min-w-0">
              <span className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {place.city}
              </span>
              <span className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {place.district}, {place.state}
              </span>
            </span>
            <span className="text-yellow-500 text-sm shrink-0">→</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default LocationSearchDropdown
