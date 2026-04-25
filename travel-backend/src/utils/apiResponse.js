/**
 * Standardized API Response class
 */
class ApiResponse {
  constructor(success, message, data = null, meta = null, errors = null) {
    this.success = success;
    this.message = message;
    if (data) this.data = data;
    if (meta) this.meta = meta;
    if (errors) this.errors = errors;
  }

  static success(message, data = null, meta = null) {
    return new ApiResponse(true, message, data, meta);
  }

  static error(message, errors = null) {
    return new ApiResponse(false, message, null, null, errors);
  }
}

export default ApiResponse;
