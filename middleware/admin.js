export default defineNuxtRouteMiddleware(async(to, from) => {
    const { user } = useUserSession();

    if(user?.value?.role !== 'ADMIN') {
        throw createError({
            statusCode: 403,    
            statusMessage: 'Unauthorized'
        })
    }
})