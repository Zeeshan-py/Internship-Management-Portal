import AdminSettings from '../models/AdminSettings.js';

// @desc    Get admin settings
// @route   GET /api/admin-settings
export const getAdminSettings = async (req, res, next) => {
  try {
    let settings = await AdminSettings.findOne({ settingsId: 'admin_default' });
    if (!settings) {
      // Create default settings if none exist
      settings = await AdminSettings.create({ settingsId: 'admin_default' });
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin settings
// @route   PUT /api/admin-settings
export const updateAdminSettings = async (req, res, next) => {
  try {
    const { name, email, bio, twoFA } = req.body;
    let settings = await AdminSettings.findOneAndUpdate(
      { settingsId: 'admin_default' },
      { name, email, bio, twoFA },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};
