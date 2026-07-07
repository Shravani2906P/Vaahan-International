const Setting = require('../models/Setting');

exports.getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne({ key: 'system_settings' });
    if (!settings) {
      // Initialize default settings
      settings = new Setting({
        key: 'system_settings',
        loanCtaLink: '/lead-loan',
        insuranceCtaLink: '/lead-insurance',
      });
      await settings.save();
    }
    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error('❌ Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve settings',
    });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { loanCtaLink, insuranceCtaLink } = req.body;

    const settings = await Setting.findOneAndUpdate(
      { key: 'system_settings' },
      {
        loanCtaLink: loanCtaLink || '/lead-loan',
        insuranceCtaLink: insuranceCtaLink || '/lead-insurance',
        updatedAt: new Date(),
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully!',
      settings,
    });
  } catch (error) {
    console.error('❌ Update settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update settings',
    });
  }
};
