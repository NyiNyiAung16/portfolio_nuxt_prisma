import axios from "axios";
import { resetLoading, setLoading } from "~/componsables/loadingHelper";
import { setErrorToast, setToast } from "~/componsables/toastHelper.js";

export const useCommentsStore = defineStore("comments", () => {
  const comments = ref(null);
  const error = ref(null);
  const loading = ref({ type: "", value: false });

  const get = async (projectId) => {
    try {
      loading.value = setLoading({ type: "get", value: true });

      const response = await axios.get(`/api/projects/${projectId}/comments`);

      comments.value = response?.data;
      return response;
    } catch (e) {
      setErrorToast(e);
    } finally {
      loading.value = resetLoading();
    }
  };

  const create = async (data) => {
    try {
      error.value = null;
      loading.value = setLoading({ type: "create", value: true });

      const response = await axios.post("/api/comments", data);

      comments.value = [response.data,...comments.value];

      setToast({ title: "Comment created successfully👏 " , duration: 2000 });

      return response;
    } catch (e) {
      error.value = e.response?.data?.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
    } finally {
      loading.value = resetLoading();
    }
  };

  const update = async (id, data) => {
    try {
      error.value = null;
      loading.value = setLoading({ type: "update", value: true });
      const response = await axios.patch(`/api/comments/${id}`, data);

      setToast({ title: "Comment updated successfully👏" , duration: 2000 });
      return response;
    } catch (e) {
      error.value = e.response?.data?.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
    } finally {
      loading.value = resetLoading();
    }
  };

  const destroy = async (commentId) => {
    try {
      loading.value = setLoading({ type: "delete", value: true });

      const response = await axios.delete(
        `/api/comments/${commentId}`
      );

      setToast({ title: "Comment deleted successfully👏", duration: 1500 });

      return response;
    } catch (e) {
      setErrorToast(e);
    } finally {
      loading.value = resetLoading();
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
