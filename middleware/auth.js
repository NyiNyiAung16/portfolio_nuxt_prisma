export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn } = useUserSession();

  if( (to.path == '/login' || to.path == '/register') && loggedIn.value && to.path !== '/') {
    return navigateTo('/')
  }else if(!loggedIn.value && to.path !== '/login' && to.path !== '/register') {
    return navigateTo('/login',{ replace: true });
  }
});
