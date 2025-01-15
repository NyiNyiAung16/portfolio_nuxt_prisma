export const zodErrorsToObject = (errors) => {
    return errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
    }, {});
}

