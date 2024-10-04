import axios from "axios";
import { setErrorToast, setToast } from "~/componsables/toastHelper.js";

export const useCommentsStore = defineStore("comments", () => {
  const comments = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const get = async (projectId) => {
    try {
      loading.value = true;

      const response = await axios.get(`/api/projects/${projectId}/comments`);

      comments.value = response?.data;
      loading.value = false;

      return response;
    } catch (e) {
      loading.value = false;
      setErrorToast(e);
    }
  };

  const create = async (data) => {
    try {
      error.value = null;
      loading.value = true;

      const response = await axios.post("/api/comments", data);

      await get(data.projectId);

      loading.value = false;
      setToast({ title: "Comment created successfully👏" });

      return response;
    } catch (e) {
      console.log(e);
      loading.value = false;
      error.value = e.response?.data?.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
    }
  };
  const update = async (id, data) => {
    try {
      error.value = null;
      const response = await axios.patch(`/api/comments/${id}`, data);

      // await get(data.projectId);

      setToast({ title: "Comment updated successfully👏" });
      return response;
    } catch (e) {
      error.value = e.response?.data?.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
    }
  };

  const destroy = async (projectId, commentId) => {
    try {
      const response = await axios.delete(
        `/api/comments/${commentId}/projects/${projectId}`
      );

      setToast({ title: "Comment deleted successfully👏", duration: 1500 });

      return response;
    } catch (e) {
      setErrorToast(e);
    }
  };

  return {
    comments,
    error,
    loading,
    get,
    update,
    create,
    destroy,
  };
});
