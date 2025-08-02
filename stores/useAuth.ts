import axios, { AxiosError } from "axios";
import { setErrorToast, setToast } from "~/componsables/toastHelper.js";

export const useAuth = defineStore("auth", () => {
  const {
    user,
    session,
    loggedIn,
    fetch: refreshSession,
    clear,
  } = useUserSession();

  const error = ref<any>(null);
  const loading = ref(false);

  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      error.value = null;
      loading.value = true;

      const response = await axios.post("/login", { email, password });
      await refreshSession();

      setToast({ title: `Welcome Back ${(user.value as any).username}🥰🥰` });
      return response;
    } catch (e: any) {
      if (e instanceof AxiosError) {
        error.value = e.response?.data?.data;

        setErrorToast(e);

        setTimeout(() => {
          error.value = null;
        }, 3000);
      } else if (e instanceof Error) {
        setToast({ title: e.message, description: "Something went wrong" });
      }
    } finally {
      loading.value = false;
    }
  }

  async function register({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    try {
      error.value = null;
      loading.value = true;

      const response = await axios.post("/register", {
        username,
        email,
        password,
      });
      await refreshSession();

      setToast({
        title: "Account Created",
        description: `Welcome to ${(user.value as any).username}👋👋😍`,
        duration: 3000,
      });
      return response;
    } catch (e: any) {
      if(e instanceof AxiosError) {
      error.value = e.response?.data?.data;
      setErrorToast(e);
      setTimeout(() => {
        error.value = null;
      }, 3000);
      }
      else if (e instanceof Error) {
        setToast({ title: e.message, description: "Something went wrong" });
      }
    } finally {
      loading.value = false;
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
