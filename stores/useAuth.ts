import axios from "axios";
import { setToast } from "~/componsables/toastHelper";
import {useApiWrapper} from "~/componsables/apiUtils";

export const useAuth = defineStore("auth", () => {
  const {
    user,
    session,
    loggedIn,
    fetch: refreshSession,
    clear,
  } = useUserSession();

  const error = ref<any>(null);
  const loading = ref({ type: "", value: false });

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await useApiWrapper(
      () => axios.post("/login", { email, password }),
      error,
      loading,
      "login",
      false,
    );
    await refreshSession();
    if(!!response){
      setToast({
        title: `Welcome Back ${(user.value as any)?.username || "User"}🥰🥰`,
      });
    }
    return response;
  };

  const register = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    const response = await useApiWrapper(
      () => axios.post("/register", { username, email, password }),
      error,
      loading,
      "register",
      false,
    );
    await refreshSession();
    if(!!response) {
      setToast({
        title: "Your account is ready!",
        description: `Welcome ${(user.value as any)?.username || username}👋👋😍 to my portfolio!`,
      });
    }
    return response;
  };

  return {
    user,
    session,
    loggedIn,
    error,
    loading,
    login,
    register,
    refreshSession,
    clear,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
