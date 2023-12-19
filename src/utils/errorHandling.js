export const asyncHandler = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch((error) => {
      if (error.message === "jwt expired") {
        return res
          .status(401)
          .json({ message: "Invalid account or token is expired" });
      }
      return next(new Error(error));
    });
  };
};
export const globalErrorHandling = (error, req, res, next) => {
  if (error) {
    if (process.env.MOOD == "DEV") {
      error.statusCode = error.statusCode || 500;
      return res.status(error.statusCode).json({
        status: error.statusCode,
        ErrorMessage: error.message,
      });
    }
  } else {
    return res.status(error.status || 500).json({
      ErrorMessage: error.message,
    });
  }
};
