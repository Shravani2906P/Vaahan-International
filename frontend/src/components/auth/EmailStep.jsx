// src/components/auth/EmailStep.jsx
/*
================================================================================
File Name : EmailStep.jsx
Author : Tahseen Raza
Created Date : 2026-06-22
Description : Email or Phone input step for authentication
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { useState } from 'react'
import { api } from '../../services/api'

const EmailStep = ({ onSubmit, isDark }) => {
  const [identifier, setIdentifier] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!identifier.trim()) {
      setError('Please enter your email or phone number')
      return
    }

    // Check if it's email or phone
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    const isEmail = emailRegex.test(identifier.trim())
    
    // If not email, validate as phone number
    if (!isEmail) {
      const phoneClean = identifier.replace(/\s/g, '')
      const phoneRegex = /^\+?[0-9]{8,15}$/
      if (!phoneRegex.test(phoneClean)) {
        setError('Please enter a valid phone number with country code (e.g., +919876543210)')
        return
      }
    }

    setLoading(true)
    setError('')

    try {
      // Step 1: Check if user exists
      const checkResult = await api.checkUser(identifier.trim())
      
      if (!checkResult.success) {
        setError(checkResult.message || 'Something went wrong')
        setLoading(false)
        return
      }

      const isExisting = checkResult.exists

      // Step 2: Send OTP
      const purpose = isExisting ? 'login' : 'verify'
      const otpResult = await api.sendOTP(identifier.trim(), purpose)

      if (!otpResult.success) {
        setError(otpResult.message || 'Failed to send OTP. Please try again.')
        setLoading(false)
        return
      }

      // Step 3: Go to OTP step with identifier and isEmail flag
      onSubmit(identifier.trim(), isExisting, isEmail)
      
    } catch (error) {
      console.error('Submission error:', error)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Email or Mobile Number
        </label>
        <input
          type="text"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value)
            setError('')
          }}
          placeholder="Enter your email or phone number"
          className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-300 ${
            error 
              ? 'border-red-500 ring-2 ring-red-500/20' 
              : isDark
                ? 'bg-dark-700 border-dark-600 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30'
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30'
          }`}
          autoFocus
          disabled={loading}
        />
        <p className={`text-xs mt-1.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Enter email address or mobile number with country code (e.g., +919876543210)
        </p>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
          loading
            ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Checking...
          </span>
        ) : (
          'Continue'
        )}
      </button>

      <p className={`text-center text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  )
}

export default EmailStep