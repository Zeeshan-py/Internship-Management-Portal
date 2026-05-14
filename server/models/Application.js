import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      match: [
        /^[0-9]{10,15}$/,
        'Please add a valid phone number',
      ],
    },
    domain: {
      type: String,
      required: [true, 'Please select an internship domain'],
    },
    message: {
      type: String,
      required: [true, 'Please add a message'],
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
  }
);

const Application = mongoose.model('Application', applicationSchema);

export default Application;
