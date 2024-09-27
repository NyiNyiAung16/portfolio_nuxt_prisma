export default defineNuxtRouteMiddleware(async(to, from) => {

    const data = await useFetch('/api/getSession'); 

    if (!data) {
        return navigateTo('/login')
    }else if(data.data.value.role === 'ADMIN') {
        return navigateTo('/admin');
    }
})