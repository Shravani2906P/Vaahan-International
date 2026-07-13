// src/context/LocationContext.jsx
/*
================================================================================
File Name : LocationContext.jsx
Description : Single global location used by every page (Home, Car Detail,
              Compare Cars, Search, AI Advisor, EMI Calculator, ...).
              Selected once, persisted to localStorage (and to the user's
              MongoDB profile when logged in), and restored automatically
              on every future visit — no page ever asks for it twice.
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'

const LOCATION_STORAGE_KEY = 'locationContext'

const LocationContext = createContext(undefined)

const readStoredLocation = () => {
  try {
    const raw = localStorage.getItem(LOCATION_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || !parsed.city || !parsed.state) return null
    return parsed
  } catch {
    return null
  }
}

const writeStoredLocation = (location) => {
  try {
    if (location) {
      localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location))
    } else {
      localStorage.removeItem(LOCATION_STORAGE_KEY)
    }
  } catch {
    // localStorage can throw in private-browsing/quota-exceeded cases —
    // the in-memory context state still works for this tab.
  }
}

export const LocationProvider = ({ children }) => {
  const [location, setLocationState] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRestoring, setIsRestoring] = useState(true)
  const [outsideIndiaMessage, setOutsideIndiaMessage] = useState(null)

  // Restore location once on app load: localStorage first (instant, works
  // logged-out), then reconcile with the MongoDB profile if logged in and
  // no local copy exists yet (e.g. same account, new device).
  useEffect(() => {
    let cancelled = false

    const restore = async () => {
      const stored = readStoredLocation()
      if (stored) {
        if (!cancelled) setLocationState(stored)
      }

      const token = localStorage.getItem('token')
      if (token) {
        try {
          const result = await api.getCurrentUser(token)
          if (!cancelled && result.success && result.user?.savedLocation?.city) {
            const profileLocation = result.user.savedLocation
            // Only adopt the profile's saved location if we didn't already
            // restore one locally — a location picked on this device very
            // recently should win over a possibly-older profile copy.
            if (!stored) {
              setLocationState(profileLocation)
              writeStoredLocation(profileLocation)
            }
          }
        } catch {
          // Non-fatal — localStorage (if any) already applied above.
        }
      }

      if (!cancelled) setIsRestoring(false)
    }

    restore()
    return () => { cancelled = true }
  }, [])

  // Show the "choose your location" modal on first-ever visit — once
  // restoration has finished and there's genuinely no saved location.
  useEffect(() => {
    if (!isRestoring && !location) {
      setIsModalOpen(true)
    }
  }, [isRestoring, location])

  const persistLocation = useCallback(async (loc) => {
    setLocationState(loc)
    writeStoredLocation(loc)

    const token = localStorage.getItem('token')
    if (token) {
      try {
        await api.saveLocationToProfile(token, loc)
      } catch {
        // Best-effort — localStorage copy is already the source of truth
        // for this device even if the profile sync fails.
      }
    }
  }, [])

  const setLocation = useCallback((loc) => {
    if (!loc || !loc.city || !loc.state) return
    setOutsideIndiaMessage(null)
    persistLocation(loc)
    setIsModalOpen(false)
  }, [persistLocation])

  const clearLocation = useCallback(() => {
    setLocationState(null)
    writeStoredLocation(null)
  }, [])

  const openLocationModal = useCallback(() => setIsModalOpen(true), [])
  const closeLocationModal = useCallback(() => setIsModalOpen(false), [])

  // "Use My Current Location" — browser geolocation -> backend reverse
  // geocode (OpenCage) -> India-only enforcement.
  const detectCurrentLocation = useCallback(() => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({ success: false, message: 'Geolocation is not supported by this browser.' })
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            const result = await api.getCurrentLocation(latitude, longitude)
            if (result.outsideIndia) {
              setOutsideIndiaMessage('This feature is currently available only in India.')
              resolve({ success: false, outsideIndia: true, message: result.message })
              return
            }
            if (result.success && result.data?.city) {
              setLocation(result.data)
              resolve({ success: true, data: result.data })
            } else {
              resolve({ success: false, message: result.message || 'Could not determine your location.' })
            }
          } catch (error) {
            resolve({ success: false, message: 'Network error while detecting location.' })
          }
        },
        (error) => {
          const message =
            error.code === error.PERMISSION_DENIED
              ? 'Location permission denied. Please search for your city instead.'
              : 'Could not access your location. Please search for your city instead.'
          resolve({ success: false, message })
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 5 * 60 * 1000 }
      )
    })
  }, [setLocation])

  const value = useMemo(() => ({
    location,
    isModalOpen,
    isRestoring,
    outsideIndiaMessage,
    setLocation,
    clearLocation,
    openLocationModal,
    closeLocationModal,
    detectCurrentLocation,
  }), [
    location,
    isModalOpen,
    isRestoring,
    outsideIndiaMessage,
    setLocation,
    clearLocation,
    openLocationModal,
    closeLocationModal,
    detectCurrentLocation,
  ])

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}

export const useDsLocation = () => {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error('useDsLocation must be used within a LocationProvider')
  }
  return context
}

export default LocationContext
