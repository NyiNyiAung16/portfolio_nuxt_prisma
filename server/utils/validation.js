function validate(schema, data) {
  const result = schema.validate(data, { abortEarly: false });

  return new Promise((resolve, reject) => {
    if (result.error) {
      const errorMessages = makeErrorObject(result.error);

      reject(
        createError({
          statusCode: 400,
          statusMessage: "Validation failed",
          data: errorMessages || {},
        })
      );
    } else {
      resolve(result.value);
    }
  });
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

export { validate, makeErrorObject };
