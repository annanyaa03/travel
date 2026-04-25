import ApiResponse from '../utils/apiResponse.js';

/**
 * Middleware to validate request body/query/params using Zod
 */
const validate = (schema) => (req, res, next) => {
  try {
    // Validate body, query, and params
    const dataToValidate = {
      body: req.body,
      query: req.query,
      params: req.params,
    };

    const parsed = schema.safeParse(dataToValidate);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => ({
        field: issue.path[issue.path.length - 1],
        message: issue.message,
      }));
      return res.status(400).json(ApiResponse.error('Validation failed', errors));
    }

    // Replace req data with parsed data (handles type conversion)
    if (parsed.data.body) req.body = parsed.data.body;
    if (parsed.data.query) req.query = parsed.data.query;
    if (parsed.data.params) req.params = parsed.data.params;

    next();
  } catch (error) {
    next(error);
  }
};

export default validate;
