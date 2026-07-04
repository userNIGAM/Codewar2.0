export const ApiResponse = (statusCode, data, message = "Success") => ({
  success: statusCode < 400,
  message,
  data,
});
