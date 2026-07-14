// src/pages/VerifyOTP.jsx
/*
================================================================================
File Name : VerifyOTP.jsx
Author : Tahseen Raza
Created Date : 2026-06-20
Description : Premium OTP Verification page
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef([])
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  
  const email = location.state?.email || 'your email'
  const from = location.state?.from || 'signup'

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleChange = (index, value) => {
    if (value.length > 1) return
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
    if (e.key === 'Enter') {
      handleVerify()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('')
      setOtp(newOtp)
      inputRefs.current[5].focus()
    }
  }

  const handleVerify = () => {
    const otpCode = otp.join('')
    if (otpCode.length < 6) {
      setError('Please enter complete 6-digit OTP')
      return
    }

    setLoading(true)
    setError('')

    setTimeout(() => {
      setLoading(false)
      navigate('/create-password', { 
        state: { 
          email: email,
          from: from
        } 
      })
    }, 1500)
  }

  const handleResend = () => {
    setLoading(true)
    setTimer(60)
    setCanResend(false)
    setOtp(['', '', '', '', '', ''])
    inputRefs.current[0].focus()
    setError('')
    
    setTimeout(() => {
      setLoading(false)
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }, 1000)
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDark ? 'bg-dark-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-dark-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-dark-700">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-2xl mb-4">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Verify OTP
            </h1>
            <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Enter the 6-digit code sent to
            </p>
            <p className={`text-sm font-medium mt-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {email}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="flex justify-center gap-2 sm:gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
                  isDark 
                    ? 'bg-dark-700 border-dark-600 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
                autoFocus={index === 0}
                disabled={loading}
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-300 ${
              loading
                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
            }`}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <div className="mt-6 text-center">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Didn't receive the code?
              {canResend ? (
                <button
                  onClick={handleResend}
                  disabled={loading}
                  className="ml-2 text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 font-semibold transition-colors"
                >
                  Resend OTP
                </button>
              ) : (
                <span className="ml-2 text-yellow-600 dark:text-yellow-400">
                  Resend in {timer}s
                </span>
              )}
            </p>
            <Link 
              to={from === 'signup' ? '/signup' : '/forgot-password'} 
              className={`text-xs mt-3 inline-block ${isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
            >
              ← Go back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOTP