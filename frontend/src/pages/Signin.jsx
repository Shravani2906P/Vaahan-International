// src/pages/Signin.jsx
/*
================================================================================
File Name : Signin.jsx
Author : Tahseen Raza
Created Date : 2026-06-20
Description : Professional Sign In page with proper header spacing
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { isDark } = useTheme()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1500)
  }

  return (
    <div className={`min-h-screen flex items-center justify-center pt-24 pb-12 px-4 transition-colors duration-300 ${
      isDark ? 'bg-dark-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none pt-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white dark:bg-dark-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-dark-700">
          
          {/* Left Side - Illustration */}
          <div className={`hidden lg:flex flex-col items-center justify-center p-10 ${
            isDark ? 'bg-dark-900' : 'bg-gradient-to-br from-yellow-50 to-yellow-100'
          }`}>
            <div className="text-center">
              <div className="text-7xl mb-6 animate-float">🚗</div>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Welcome Back!
              </h2>
              <p className={`mt-2 text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Sign in to continue your automotive journey
              </p>
              <div className="mt-6 space-y-2.5 text-sm">
                <div className={`flex items-center gap-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span className="text-yellow-500 text-lg">✓</span>
                  Compare cars side by side
                </div>
                <div className={`flex items-center gap-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span className="text-yellow-500 text-lg">✓</span>
                  Save your favorite articles
                </div>
                <div className={`flex items-center gap-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span className="text-yellow-500 text-lg">✓</span>
                  Get personalized recommendations
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-8 md:p-10">
            <div className="max-w-sm mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-yellow-500/10 rounded-2xl mb-3">
                  <span className="text-2xl">🔐</span>
                </div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Welcome Back
                </h1>
                <p className={`mt-1.5 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Sign in to your account
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
                      isDark 
                        ? 'bg-dark-700 border-dark-600 text-white placeholder-gray-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={`block text-sm font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Password
                    </label>
                    <Link 
                      to="/forgot-password" 
                      className="text-xs text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors font-medium"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
                      isDark 
                        ? 'bg-dark-700 border-dark-600 text-white placeholder-gray-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
                    loading
                      ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                      : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 font-semibold transition-colors">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin