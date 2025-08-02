import type { User } from "~/types/User"

export const hasUser = (user: User) => {
    if (!user) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthorized'
        })
    }

    return true;
}


export const isAdmin = (user: User) => {
    if (user?.role !== 'ADMIN') {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden! You are not admin'
        })
    }

    return true;
}
