import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    duration: {
      type: String,
      default: '3 months',
    },
    location: {
      type: String,
      default: 'Remote',
      enum: ['Remote', 'On-site', 'Hybrid'],
    },
    status: {
      type: String,
      enum: ['Active', 'Paused'],
      default: 'Active',
    },
    applicants: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Internship = mongoose.model('Internship', internshipSchema);

export default Internship;
