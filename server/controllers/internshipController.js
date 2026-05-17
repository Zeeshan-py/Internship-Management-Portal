import Internship from '../models/Internship.js';

// @desc    Get all internships
// @route   GET /api/internships
export const getInternships = async (req, res, next) => {
  try {
    const internships = await Internship.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: internships });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new internship
// @route   POST /api/internships
export const createInternship = async (req, res, next) => {
  try {
    const { title, description, duration, location, status } = req.body;
    if (!title) {
      res.status(400);
      throw new Error('Title is required');
    }
    const internship = await Internship.create({ title, description, duration, location, status });
    res.status(201).json({ success: true, data: internship });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an internship
// @route   PUT /api/internships/:id
export const updateInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!internship) {
      res.status(404);
      throw new Error('Internship not found');
    }
    res.status(200).json({ success: true, data: internship });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an internship
// @route   DELETE /api/internships/:id
export const deleteInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) {
      res.status(404);
      throw new Error('Internship not found');
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
