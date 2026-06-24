// backend/src/services/smsService.js
/*
================================================================================
File Name : smsService.js
Author : Tahseen Raza
Created Date : 2026-06-23
Description : SMS service for sending OTP via Brevo (Sendinblue)
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

const axios = require('axios');

// Brevo SMS API endpoint
const BREVO_SMS_API_URL = 'https://api.brevo.com/v3/transactionalSMS/sms';

// Send SMS via Brevo
const sendSMSOTP = async (phoneNumber, otp, purpose = 'verify') => {
  try {
    console.log(`📱 Attempting to send SMS to ${phoneNumber}...`);

    // Format phone number - ensure it's in international format
    let formattedNumber = phoneNumber.replace(/\s/g, '');
    if (!formattedNumber.startsWith('+')) {
      formattedNumber = `+${formattedNumber}`;
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^\+[0-9]{8,15}$/;
    if (!phoneRegex.test(formattedNumber)) {
      console.error('❌ Invalid phone number format:', formattedNumber);
      return {
        success: false,
        error: 'Invalid phone number format. Please include country code.',
      };
    }

    // Check for SMS credits (if using Brevo)
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('❌ BREVO_API_KEY not found in .env');
      return {
        success: false,
        error: 'SMS service not configured. Please add BREVO_API_KEY to .env',
      };
    }

    // Customize message based on purpose
    let message = '';
    if (purpose === 'login') {
      message = `🔐 Vaahan International\nYour login OTP is: ${otp}\nValid for 10 minutes. Do not share this OTP with anyone.\n\n- Vaahan International`;
    } else if (purpose === 'verify_phone') {
      message = `🔐 Vaahan International\nYour mobile verification OTP is: ${otp}\nValid for 10 minutes. Do not share this OTP with anyone.\n\n- Vaahan International`;
    } else if (purpose === 'verify') {
      message = `🔐 Vaahan International\nYour verification OTP is: ${otp}\nValid for 10 minutes. Do not share this OTP with anyone.\n\n- Vaahan International`;
    } else {
      message = `🔐 Vaahan International\nYour OTP is: ${otp}\nValid for 10 minutes.\n\n- Vaahan International`;
    }

    // Prepare request data for Brevo SMS API
    const smsData = {
      sender: process.env.BREVO_SMS_SENDER || 'VAAHAN',
      recipient: formattedNumber,
      content: message,
      type: 'transactional',
      tag: 'otp_verification',
    };

    console.log(`📤 Sending SMS to ${formattedNumber}...`);

    // Send SMS via Brevo API
    const response = await axios.post(BREVO_SMS_API_URL, smsData, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      timeout: 10000,
    });

    console.log(`✅ SMS sent successfully to ${formattedNumber}`);
    console.log(`📊 Response:`, response.data);

    return {
      success: true,
      messageId: response.data?.messageId || 'sms_sent',
      status: response.data?.status || 'sent',
    };
  } catch (error) {
    console.error('❌ SMS sending failed:', error.message);

    // Detailed error handling
    if (error.response) {
      console.error('📊 Brevo API Response:', error.response.data);
      console.error('📊 Status Code:', error.response.status);

      // Handle specific Brevo error codes
      if (error.response.status === 402) {
        return {
          success: false,
          error: 'Insufficient SMS credits. Please add credits in Brevo.',
        };
      } else if (error.response.status === 403) {
        return {
          success: false,
          error: 'SMS not enabled for this account. Please enable SMS in Brevo.',
        };
      } else if (error.response.status === 400) {
        return {
          success: false,
          error: error.response.data?.message || 'Invalid SMS request',
        };
      }
    } else if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        error: 'SMS service timeout. Please try again.',
      };
    }

    return {
      success: false,
      error: error.message || 'Failed to send SMS',
    };
  }
};

// Alternative: Use Twilio if you prefer (fallback)
const sendSMSViaTwilio = async (phoneNumber, otp, purpose = 'verify') => {
  try {
    // Only use Twilio if configured
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.log('⚠️ Twilio not configured, falling back to Brevo');
      return await sendSMSOTP(phoneNumber, otp, purpose);
    }

    const twilio = require('twilio');
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    let formattedNumber = phoneNumber.replace(/\s/g, '');
    if (!formattedNumber.startsWith('+')) {
      formattedNumber = `+${formattedNumber}`;
    }

    const message = `🔐 Vaahan International\nYour OTP is: ${otp}\nValid for 10 minutes. Do not share this OTP with anyone.`;

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedNumber,
    });

    console.log(`✅ SMS sent via Twilio to ${formattedNumber}: ${result.sid}`);
    return {
      success: true,
      messageId: result.sid,
      status: result.status,
    };
  } catch (error) {
    console.error('❌ Twilio SMS failed:', error.message);
    // Fallback to Brevo
    console.log('🔄 Falling back to Brevo SMS...');
    return await sendSMSOTP(phoneNumber, otp, purpose);
  }
};

// Main SMS sending function (auto-selects provider)
const sendSMS = async (phoneNumber, otp, purpose = 'verify') => {
  // Try Brevo first (since we already use it for email)
  return await sendSMSOTP(phoneNumber, otp, purpose);
};

module.exports = { sendSMSOTP, sendSMS, sendSMSViaTwilio };