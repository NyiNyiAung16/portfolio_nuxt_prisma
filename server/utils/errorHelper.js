export const throwError = (error) => {
    if(error instanceof Error) {
        throw createError({
            statusCode: error?.statusCode || 500,
            statusMessage: error?.message || 'Internal Server Error',
            data: error?.data || {},
        })
    }
}