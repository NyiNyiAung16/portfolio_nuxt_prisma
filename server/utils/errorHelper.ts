import type { NuxtError } from "nuxt/app"

export const throwError = (error: NuxtError) => {
    if(error instanceof Error) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.message || 'Internal Server Error',
            data: error.data || {},
        })
    }
}