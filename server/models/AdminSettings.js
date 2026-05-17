import mongoose from 'mongoose';

const adminSettingsSchema = new mongoose.Schema(
  {
    settingsId: {
      type: String,
      default: 'admin_default',
      unique: true,
    },
    name: {
      type: String,
      default: 'Admin User',
      trim: true,
    },
    email: {
      type: String,
      default: 'admin@teyzix.core',
      trim: true,
    },
    bio: {
      type: String,
      default: 'Managing the platform infrastructure and student onboarding processes.',
      trim: true,
    },
    twoFA: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const AdminSettings = mongoose.model('AdminSettings', adminSettingsSchema);

export default AdminSettings;
