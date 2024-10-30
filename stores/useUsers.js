import axios from "axios";
import { resetLoading, setLoading } from "~/componsables/loadingHelper";
import { setErrorToast, setToast } from "~/componsables/toastHelper";

export const useUsersStore = defineStore("users", () => {
  const pagination = ref(null);
  const user = ref(null);
  const loading = ref({ type: '', value: false });
  const error = ref(null);

  const users = computed({
    get() {
      return pagination.value?.data;
    },
    set(newUsers) {
      pagination.value.data = newUsers;
    },
  });  
  const get = async function (page) {
    try {
      error.value = null;
      loading.value = setLoading({ type: 'get', value: true });

      const response = await axios.get(`/api/users?page=${page}`);
      pagination.value = response.data;

      return response;
    } catch (e) {
      setErrorToast(e);
    } finally {
      loading.value = resetLoading();
    }
  };

  const show = async (id) => {
    try {
      error.value = null;

      const response = await axios.get(`/api/users/${id}`);

      user.value = response.data;
      return response;
    } catch (e) {
      setErrorToast(e);
    }
  };

  const update = async (id, data) => {
    try {
      error.value = null;
      loading.value = setLoading({ type: 'update', value: true });

      const response = await axios.patch(`/api/users/${id}`, data);
      users.value = users.value.map((user) =>
        user.id === response.data.id
          ? {
              ...user,
              ...response.data
            }
          : user
      );

      setToast({ title: "User updated successfully👏", duration: 2000});
      return response;
    } catch (e) {
      error.value = e.response?.data?.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
    } finally{
      loading.value = resetLoading();
    }
  };

  const destroy = async (id) => {
    try {
      error.value = null;
      loading.value = setLoading({ type: 'delete', value: true });

      const response = await axios.delete(`/api/users/${id}`);

      setToast({ title: "User deleted successfully👏"});
      return response;
    } catch (e) {
      setErrorToast(e);
    } finally {
      loading.value = resetLoading();
    }
  };




  return {
    users,
    user,
    error,
    pagination,
    loading,
    get,
    show,
    update,
    destroy,
  };
});
