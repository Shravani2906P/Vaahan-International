// src/components/auth/PasswordStep.jsx
/*
================================================================================
File Name : PasswordStep.jsx
Author : Tahseen Raza
Created Date : 2026-06-20
Description : Password login step for existing users
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/


import { useState } from 'react'

const PasswordStep = ({ email, onLogin, onBack, isDark }) => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!password) {
      setError('Please enter your password')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    setError('')

    const result = await onLogin(password)
    
    if (result && !result.success) {
      setError(result.message || 'Invalid credentials')
    }
    
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Password
          </label>
          <button
            type="button"
            className="text-xs text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors"
          >
            Forgot Password?
          </button>
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
            placeholder="Enter your password"
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all duration-300 pr-12 ${
              error
                ? 'border-red-500 ring-2 ring-red-500/20'
                : isDark 
                  ? 'bg-dark-700 border-dark-600 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30'
            }`}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>

      {/* ADDED: Show message for users without password */}
      <div className={`p-3 rounded-lg text-center text-sm ${
        isDark ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-50 text-yellow-700'
      }`}>
        <p>
          Don't have a password?{' '}
          <button
            type="button"
            onClick={onBack}
            className="font-semibold underline hover:no-underline"
          >
            Use OTP Login
          </button>
        </p>
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
        {loading ? 'Signing In...' : 'Sign In'}
      </button>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className={`text-sm ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
        >
          ← Back
        </button>
        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {email}
        </p>
      </div>
    </form>
  )
}

export default PasswordStep