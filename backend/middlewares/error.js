class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  // Ensure err.message and err.statusCode have default values if not set
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;

  // Check for specific error types and set appropriate messages and status codes
  if (err.name === "CaseError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  } else if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  } else if (err.name === "JsonWebTokenError") {
    const message = `Json WebToken is invalid. Try again`;
    err = new ErrorHandler(message, 400);
  } else if (err.name === "JsonWebTokenExpiredError") {
    const message = `Json WebToken is expired. Try again`;
    err = new ErrorHandler(message, 400);
  } else {
    // If err is not one of the above types, ensure it has a valid status code and message
    err = new ErrorHandler(message, statusCode);
  }

  // Send response with the error message and status code
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
