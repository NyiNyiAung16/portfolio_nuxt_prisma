export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useUserSession();

  if( (to.path == '/login' || to.path == '/register') && user?.value && to.path !== '/') {
    return navigateTo('/')
  }else if(!user?.value && to.path !== '/login' && to.path !== '/register') {
    return navigateTo('/login',{ redirectCode: 302 });
  }
})
