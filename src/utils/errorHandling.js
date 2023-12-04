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
      return res.status(error.catch || 500).json({
        Error: error.message,
        error,
        stack: error.stack
      });
    }
  } else {
    return res.status(error.status || 500).json({
      Error: error.message,
    });
  }
};
