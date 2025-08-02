export const zodErrorsToObject = (errors: any[]) => {
    return errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
    }, {});
}

