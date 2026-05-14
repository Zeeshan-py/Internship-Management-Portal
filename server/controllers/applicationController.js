import Application from '../models/Application.js';
import { Resend } from 'resend';

// @desc    Create a new internship application
// @route   POST /api/applications
// @access  Public
export const createApplication = async (req, res, next) => {
  try {
    const { name, email, phone, domain, message } = req.body;

    // Manual check for fields (Mongoose also does this, but this is for custom handling)
    if (!name || !email || !phone || !domain || !message) {
      res.status(400);
      throw new Error('Please fill in all fields');
    }

    // Create application in database
    const application = await Application.create({
      name,
      email,
      phone,
      domain,
      message,
    });

    // Send Confirmation Email using Resend (Non-blocking)
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'zeeshanahmad0159@gmail.com', // Sending notification to admin
      subject: `New Internship Application: ${domain}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">New Application Received!</h2>
          <p>You have a new internship application for <strong>${domain}</strong>.</p>
          <hr style="border: 1px solid #eee;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `
    }).catch(err => console.error('Resend Error:', err.message));

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: application,
    });
  } catch (error) {
    next(error); // Forward to the centralized error handler
  }
};

// @desc    Get all applications
// @route   GET /api/applications/all
// @access  Public (In a real app, this would be protected for Admin only)
export const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};
