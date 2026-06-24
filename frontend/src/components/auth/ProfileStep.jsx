// src/components/auth/ProfileStep.jsx
/*
================================================================================
File Name : ProfileStep.jsx
Author : Tahseen Raza
Created Date : 2026-06-20
Description : Profile creation step for new users - Backend Integrated
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { useState } from 'react'

const ProfileStep = ({ email, onCreate, onBack, isDark }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  // UPDATED: Real profile creation with backend
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.lastName || !formData.username) {
      setError('Please fill in all fields')
      return
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters')
      return
    }

    setLoading(true)
    setError('')

    const result = await onCreate(formData)
    
    if (result && !result.success) {
      setError(result.message || 'Failed to create profile')
    }
    
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
              isDark 
                ? 'bg-dark-700 border-dark-600 text-white placeholder-gray-500' 
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
            }`}
            disabled={loading}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1.5 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
              isDark 
                ? 'bg-dark-700 border-dark-600 text-white placeholder-gray-500' 
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
            }`}
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-1.5 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="johndoe"
          className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
            isDark 
              ? 'bg-dark-700 border-dark-600 text-white placeholder-gray-500' 
              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
          }`}
          disabled={loading}
        />
        <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Choose a unique username for your account
        </p>
      </div>

      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} -mt-1`}>
        Email: <span className="font-medium">{email}</span>
      </div>

      {error && (
        <div className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
          loading
            ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
        }`}
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>

      <button
        type="button"
        onClick={onBack}
        disabled={loading}
        className={`text-sm w-full text-center ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
      >
        ← Back
      </button>
    </form>
  )
}

export default ProfileStep