import axios from "axios";
import { setErrorToast, setToast } from "~/componsables/toastHelper.js";

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
      setToast({ title: `Welcome Back ${user?.value?.username}🥰🥰`, duration: 3000 });

      return response;
    } catch (e) {
      loading.value = false;
      error.value = e.response?.data?.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
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
      setToast({
        title: "Account Created",
        description: `Welcome to ${user?.value?.username}👋👋😍`,
        duration: 3000,
      });

      return response;
    } catch (e) {
      loading.value = false;
      error.value = e.response?.data?.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
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


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
