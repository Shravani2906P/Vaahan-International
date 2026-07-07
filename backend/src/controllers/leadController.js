const Lead = require('../models/Lead');

exports.createLead = async (req, res) => {
  try {
    const {
      type,
      name,
      email,
      phone,
      // Auto Loan specific fields
      carBudget,
      downPayment,
      // Insurance specific fields
      carModelOrBudget,
      insuranceType,
    } = req.body;

    if (!type || !name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Type, Name, Email, and Phone are required.',
      });
    }

    const newLead = new Lead({
      type,
      name,
      email,
      phone,
      carBudget,
      downPayment,
      carModelOrBudget,
      insuranceType,
    });

    await newLead.save();

    // Trigger Google Sheets Webhook if URL is configured in environment
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        console.log('Sending lead to Google Sheets webhook...', webhookUrl);
        const payload = {
          timestamp: new Date().toISOString(),
          type,
          name,
          email,
          phone,
          carBudget: carBudget || '',
          downPayment: downPayment || '',
          carModelOrBudget: carModelOrBudget || '',
          insuranceType: insuranceType || '',
        };

        // Post request using Node fetch
        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }).catch(err => console.error('Google Sheets webhook post error:', err));
        
      } catch (sheetError) {
        console.error('Google Sheets integration warning:', sheetError);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Lead captured successfully!',
      lead: newLead,
    });
  } catch (error) {
    console.error('❌ Lead capture error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit lead data.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    console.error('❌ Get leads error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leads',
    });
  }
};
