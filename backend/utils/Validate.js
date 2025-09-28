const { body, param, query, validationResult } = require('express-validator');

const formatValidationErrors = (errors) => {
  return errors.array().map(error => ({
    field: error.param,
    message: error.msg,
    value: error.value
  }));
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: formatValidationErrors(errors)
    });
  }
  next();
};

const validateOrder = [
  body('school_id')
    .notEmpty()
    .withMessage('School ID is required')
    .isString()
    .withMessage('School ID must be a string'),
  
  body('instituteName')
    .notEmpty()
    .withMessage('Institute name is required')
    .isString()
    .withMessage('Institute name must be a string'),
  
  body('trustee_id')
    .notEmpty()
    .withMessage('Trustee ID is required')
    .isString()
    .withMessage('Trustee ID must be a string'),
  
  body('student_info.name')
    .notEmpty()
    .withMessage('Student name is required')
    .isString()
    .withMessage('Student name must be a string'),
  
  body('student_info.id')
    .notEmpty()
    .withMessage('Student ID is required')
    .isString()
    .withMessage('Student ID must be a string'),
  
  body('student_info.phone_no')
    .notEmpty()
    .withMessage('Phone number is required')
    .isString()
    .withMessage('Phone number must be valid'),
  
  body('amount')
    .isFloat({ min: 1 })
    .withMessage('Amount must be at least 1')
    .toFloat(),
  
  body('callback_url')
    .isURL()
    .withMessage('Callback URL must be valid'),
  
  body('gateway_name')
    .optional()
    .isIn(['Razorpay', 'Stripe', 'PayPal','CashFree','Paytm'])
    .withMessage('Gateway must be one of: Razorpay, Stripe, PayPal, CashFree, Paytm')
];
