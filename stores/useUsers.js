import axios from "axios";
import { setErrorToast, setToast } from "~/componsables/toastHelper";

export const useUsersStore = defineStore("users", () => {
  const users = ref(null);
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const get = async function () {
    try {
      error.value = null;
      loading.value = true;

      const response = await axios.get("/api/users");
      users.value = response.data;

      loading.value = false;
      return response;
    } catch (e) {
      loading.value = false;
      setErrorToast(e);
    }
  };

  const show = async (id) => {
    try {
      error.value = null;
      loading.value = true;

      const response = await axios.get(`/api/users/${id}`);

      user.value = response.data;
      loading.value = false;

      return response;
    } catch (e) {
      loading.value = false;
      setErrorToast(e);
    }
  };

  const update = async (id, data) => {
    try {
      error.value = null;
      loading.value = true;

      const response = await axios.patch(`/api/users/${id}`, data);

      await get();

      loading.value = false;
      return response;
    } catch (e) {
      loading.value = false;
      error.value = e.response?.data?.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
    }
  };

  const destroy = async (id) => {
    try {
      error.value = null;
      loading.value = true;

      const response = await axios.delete(`/api/users/${id}`);

      loading.value = false;
      setToast({ title: "User deleted successfully👏", duration: 3000 });

      return response;
    } catch (e) {
      loading.value = false;
      setErrorToast(e);
    }
  };

  return {
    users,
    user,
    loading,
    error,
    get,
    show,
    update,
    destroy,
  };
});
