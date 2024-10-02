function validation(schema, body) {
  const { error, value } = schema.validate(body, {
    abortEarly: false,
  });

  return {
    error: error ? makeErrorObject(error) : {},
    value,
  };
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

export { validation };
