// src/pages/Signup.jsx
/*
================================================================================
File Name : Signup.jsx
Author : Tahseen Raza
Created Date : 2026-06-20
Description : Premium Sign Up page with split layout
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: ''
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
    
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.email) {
      setError('Please fill in all fields')
      return
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/verify-otp', { 
        state: { 
          email: formData.email,
          from: 'signup'
        } 
      })
    }, 1500)
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDark ? 'bg-dark-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white dark:bg-dark-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-dark-700">
          
          {/* Left Side - Illustration */}
          <div className={`hidden lg:flex flex-col items-center justify-center p-12 order-2 ${
            isDark ? 'bg-dark-900' : 'bg-gradient-to-br from-yellow-50 to-yellow-100'
          }`}>
            <div className="text-center">
              <div className="text-8xl mb-6 animate-float">🚀</div>
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Join the Community
              </h2>
              <p className={`mt-3 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Start your automotive journey today
              </p>
              <div className="mt-8 flex flex-col gap-3 text-sm">
                <div className={`flex items-center gap-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span className="text-yellow-500 text-xl">✓</span>
                  Access expert reviews
                </div>
                <div className={`flex items-center gap-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span className="text-yellow-500 text-xl">✓</span>
                  Compare unlimited cars
                </div>
                <div className={`flex items-center gap-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span className="text-yellow-500 text-xl">✓</span>
                  Save and share insights
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-8 md:p-12 lg:p-16">
            <div className="max-w-sm mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-2xl mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Create Account
                </h1>
                <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Join Vaahan International today
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                      required
                      className={`w-full px-4 py-3.5 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
                        isDark 
                          ? 'bg-dark-700 border-dark-600 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder="John"
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
                      required
                      className={`w-full px-4 py-3.5 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
                        isDark 
                          ? 'bg-dark-700 border-dark-600 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder="Doe"
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
                    required
                    className={`w-full px-4 py-3.5 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
                      isDark 
                        ? 'bg-dark-700 border-dark-600 text-white placeholder-gray-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="johndoe"
                  />
                </div>

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
                    className={`w-full px-4 py-3.5 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
                      isDark 
                        ? 'bg-dark-700 border-dark-600 text-white placeholder-gray-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-300 ${
                    loading
                      ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Already have an account?{' '}
                  <Link to="/signin" className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 font-semibold transition-colors">
                    Sign In
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

export default Signup