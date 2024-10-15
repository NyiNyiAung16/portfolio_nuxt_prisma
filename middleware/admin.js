export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useUserSession();

  if (user?.value?.role !== "ADMIN") {
    throw showError({
      statusCode: 403,
      statusMessage: "Forbidden! You are not allowed to go there",
    });
  }
});
