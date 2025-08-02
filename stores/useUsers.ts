import axios from "axios";
import { resetLoading, setLoading } from "~/componsables/loadingHelper";
import { setErrorToast, setToast } from "~/componsables/toastHelper";
import type { Pagination } from "~/types/Project";
import type { FormData, User } from "~/types/User";


export const useUsersStore = defineStore("users", () => {
  const pagination = ref<Pagination | null>(null);
  const user = ref<User | null>(null);
  const users = ref<User[]>([]);
  const loading = ref({ type: '', value: false });
  const error = ref(null);

  
  const get = async function (page: number) {
    try {
      error.value = null;
      loading.value = setLoading({ type: 'get', value: true });

      const response = await axios.get(`/api/users?page=${page}`);
      users.value = response.data.data;
      pagination.value = response.data.pagination;

      return response;
    } catch (e) {
      setErrorToast(e);
    } finally {
      loading.value = resetLoading();
    }
  };

  const show = async (id: string) => {
    try {
      error.value = null;

      const response = await axios.get(`/api/users/${id}`);

      user.value = response.data;
      return response;
    } catch (e: any) {
      setErrorToast(e);
    }
  };

  const update = async (id: string, data: FormData) => {
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
    } catch (e: any) {
      error.value = e.response?.data?.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
    } finally{
      loading.value = resetLoading();
    }
  };

  const destroy = async (id: string) => {
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
