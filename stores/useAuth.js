import axios from "axios";
import { setToast } from "~/componsables/setToast";

export const useAuth = defineStore("auth", () => {
  const { user, session, loggedIn, fetch, clear } = useUserSession();

  const error = ref(null);
  const loading = ref(false);

  async function login(email, password) {
    try {
      error.value = null;
      loading.value = true;

      const response = await axios.post("/login", { email, password });
      await fetch();

      loading.value = false;
      setToast({ title: "Welcome Back🥰🥰", duration: 3000 });

      if (response.status === 200 && response.statusText == "OK") {
        return navigateTo("/", { replace: true });
      }
    } catch (e) {
      loading.value = false;
      error.value = e.response.data.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
      throw createError({
        statusCode: e.response.status,
        statusMessage: e.response.statusText,
      });
    }
  }

  async function register(username, email, password) {
    try {
      error.value = null;
      loading.value = true;
      
      const response = await axios.post("/register", {
        username,
        email,
        password,
      });
      await fetch();

      loading.value = false;
      setToast({ title: "Account Created", description:"Welcome to my website👋👋😍", duration: 3000 });

      if (response.status === 200 && response.statusText == "OK") {
        return navigateTo("/", { replace: true });
      }
    } catch (e) {
      loading.value = false;
      error.value = e.response.data.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
      throw createError({
        statusCode: e.response.status,
        statusMessage: e.response.statusText,
      });
    }
  }

  return {
    user,
    session,
    loggedIn,
    error,
    loading,
    login,
    register,
    fetch,
    clear,
  };
});


function setErrorToast(e){
  const data = {
    title: e.message,
    description: e.response.statusText,
    duration: 3000,
    type: "background",
    variant: "destructive",
  };
  setToast(data);
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
