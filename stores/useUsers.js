import axios from "axios";
import { setErrorToast, setToast } from "~/componsables/toastHelper";

export const useUsersStore = defineStore("users", () => {
  const pagination = ref(null);
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const users = computed({
    get() {
      return pagination.value?.data;
    },
    set(newValue) {
      pagination.value.data = newValue;
    }
  });

  const get = async function (page) {
    try {
      error.value = null;
      loading.value = true;

      const response = await axios.get(`/api/users?page=${page}`);
      pagination.value = response.data;

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
    pagination,
    get,
    show,
    update,
    destroy,
  };
});
