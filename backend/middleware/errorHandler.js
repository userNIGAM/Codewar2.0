export const errorHandler = (err, req, res, next) => {
  const errorMessage = err?.message || err?.toString?.() || "Internal Server Error";
  console.error("🔥 Error:", err?.stack || errorMessage);

  const status = err?.status || 500;
  res.status(status).json({
    success: false,
    message: errorMessage,
  });
};