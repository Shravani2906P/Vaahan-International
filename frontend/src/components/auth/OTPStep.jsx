// src/components/auth/OTPStep.jsx
/*
================================================================================
File Name : OTPStep.jsx
Author : Tahseen Raza
Created Date : 2026-06-22
Description : OTP verification step for Email or Phone
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

import { useState, useEffect, useRef } from 'react'
import { api } from '../../services/api'

const OTPStep = ({ identifier, isEmail, onVerify, onBack, isDark }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const inputRefs = useRef([])

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
    setError('')

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
      setError('')
      inputRefs.current[5].focus()
    }
  }

  const handleVerify = async () => {
    const otpCode = otp.join('')
    if (otpCode.length < 6) {
      setError('Please enter complete 6-digit OTP')
      return
    }

    setLoading(true)
    setError('')

    const result = await onVerify(otpCode)
    
    if (result && !result.success) {
      setError(result.message || 'Invalid OTP. Please try again.')
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0].focus()
    }
    
    setLoading(false)
  }

  const handleResend = async () => {
    setResendLoading(true)
    setError('')
    setTimer(60)
    setCanResend(false)
    setOtp(['', '', '', '', '', ''])
    inputRefs.current[0].focus()

    try {
      const purpose = 'verify'
      const result = await api.sendOTP(identifier, purpose)
      if (!result.success) {
        setError(result.message || 'Failed to resend OTP')
      } else if (result.otp) {
        console.log('🔑 New OTP:', result.otp)
      }
    } catch (error) {
      console.error('Resend error:', error)
      setError('Network error. Please try again.')
    }

    setTimeout(() => {
      setResendLoading(false)
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

  const displayIdentifier = identifier?.length > 20 
    ? identifier.slice(0, 20) + '...' 
    : identifier

  return (
    <div className="space-y-4">
      <div>
        <p className={`text-sm text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Enter the 6-digit code sent to
        </p>
        <p className={`text-sm font-medium text-center mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {displayIdentifier}
        </p>
        <p className={`text-xs text-center mb-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          via {isEmail ? '📧 Email' : '📱 SMS'}
        </p>

        {error && (
          <div className="mb-4 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <div className="flex justify-center gap-2 mb-6">
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
              className={`w-11 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all duration-300 ${
                error
                  ? 'border-red-500 ring-2 ring-red-500/20'
                  : isDark 
                    ? 'bg-dark-700 border-dark-600 text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30'
              }`}
              autoFocus={index === 0}
              disabled={loading || resendLoading}
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={loading || resendLoading}
          className={`w-full py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
            loading || resendLoading
              ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
          }`}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            onClick={onBack}
            disabled={loading || resendLoading}
            className={`text-sm ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
          >
            ← Back
          </button>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Didn't receive the code?
            {canResend ? (
              <button
                onClick={handleResend}
                disabled={loading || resendLoading}
                className="ml-2 text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 font-semibold transition-colors"
              >
                {resendLoading ? 'Sending...' : 'Resend'}
              </button>
            ) : (
              <span className="ml-2 text-yellow-600 dark:text-yellow-400">
                Resend in {timer}s
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OTPStep