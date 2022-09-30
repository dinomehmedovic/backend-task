export default class ApiError extends Error {
  statusCode?: number;
  status?: number;
  message: string;
  constructor({
    statusCode = 500,
    message = "Unexpected internal server error",
    stack = "",
  }) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
