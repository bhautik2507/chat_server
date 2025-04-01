function errorHandler(err, req, res, next) {
  console.error(`Error: ${err.message}`);
  let statusCode = 500;
  if (err.message.includes('not found')) {
    statusCode = 404;
  } else if (err.message.includes('Invalid') || err.message.includes('required')) {
    statusCode = 400;
  }
  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode
    }
  });
}

module.exports = errorHandler;