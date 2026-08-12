import axios from "axios";
import { useApiWrapper } from "~/componsables/apiUtils";
import type { Pagination } from "~/types/Project";
import type { FormData, User } from "~/types/User";

export const useUsersStore = defineStore("users", () => {
  const pagination = ref<Pagination | null>(null);
  const user = ref<User | null>(null);
  const users = ref<User[]>([]);
  const loading = ref({ type: "", value: false });
  const error = ref(null);

  const get = async function (page: number) {
    const response = await useApiWrapper(
      () => axios.get(`/api/users?page=${page}`),
      error,
      loading,
      "get",
      false,
    );
    if (!response) return;
    users.value = response.data.data;
    pagination.value = response.data.pagination;
    return response;
  };

  const show = async (id: string) => {
    const response = await useApiWrapper(
      () => axios.get(`/api/users/${id}`),
      error,
      loading,
      "show",
      false,
    );
    if (!response) return;
    user.value = response.data;
    return response;
  };

  const update = async (id: string, data: FormData) => {
    const response = await useApiWrapper(
      () => axios.patch(`/api/users/${id}`, data),
      error,
      loading,
      "update",
      true,
      "User updated successfully👏",
    );

    if (!response) return;
    users.value = users.value.map((user) =>
      user.id === response.data.id
        ? {
            ...user,
            ...response.data,
          }
        : user,
    );
    return response;
  };

  const destroy = async (id: string) => {
    const response = await useApiWrapper(
      () => axios.delete(`/api/users/${id}`),
      error,
      loading,
      "delete",
      true,
      "User deleted successfully👏",
    );
    return response;
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
