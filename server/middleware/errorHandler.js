export const errorHandler = (err, req, res, next) => {
  // If the error doesn't have a status code, default to 500 (Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
    // Only show the detailed stack trace if we are NOT in production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
