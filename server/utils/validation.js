import Joi from "joi";

function signUpValidation(body) {
  const schema = Joi.object({
    username: Joi.string().required().messages({
      "string.empty": "Username is required.",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Please provide a valid email address.",
    }),
    password: Joi.string().min(6).max(20).required().messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 6 characters.",
      "string.max": "Password cannot exceed 20 characters.",
    }),
  });

  const { error, value } = schema.validate(body, {
    abortEarly: false,
  });

  const errorObject = makeErrorObject(error);

  return { error: errorObject, value };
}

function signInValidation(body) {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Please provide a valid email address.",
    }),
    password: Joi.string().min(6).max(20).required().messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 6 characters.",
      "string.max": "Password cannot exceed 20 characters.",
    }),
  });

  const { error, value } = schema.validate(body, {
    abortEarly: false,
  });

  const errorObject = makeErrorObject(error);

  return { error: errorObject, value };
}

function makeErrorObject(error) {
  const errorMessages = {};

  if (error) {
    error.details.forEach((errorDetail) => {
      const field = errorDetail.path[0];

      if (!errorMessages[field]) {
        errorMessages[field] = errorDetail.message;
      }
    });
  }

  return errorMessages;
}

export { signUpValidation, signInValidation };
