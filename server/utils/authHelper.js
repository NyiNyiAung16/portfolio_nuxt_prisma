export const hasUser = (user) => {
    if (!user) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthorized'
        })
    }
}


export const isAdmin = (user) => {
    if (user?.role !== 'ADMIN') {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden! You are not admin'
        })
    }
}
