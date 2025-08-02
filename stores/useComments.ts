import axios, { AxiosError } from "axios";
import { resetLoading, setLoading } from "~/componsables/loadingHelper";
import { setErrorToast, setToast } from "~/componsables/toastHelper.js";
import type { Comment, ErrorData, FormData } from "~/types/Comment";

export const useCommentsStore = defineStore("comments", () => {
  const comments = ref<Comment[]>([]);
  const error = ref<ErrorData | null>(null);
  const loading = ref({ type: "", value: false });

  const get = async (projectId: string) => {
    try {
      loading.value = setLoading({ type: "get", value: true });

      const response = await axios.get(`/api/projects/${projectId}/comments`);

      comments.value = response?.data;
      return response;
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorToast(e);
      } else if (e instanceof Error) {
        setToast({ title: e.message, description: "Something went wrong" });
      }
    } finally {
      loading.value = resetLoading();
    }
  };

  const create = async (data: FormData) => {
    try {
      error.value = null;
      loading.value = setLoading({ type: "create", value: true });
      const response = await axios.post("/api/comments", data);

      comments.value = [response.data, ...comments.value];

      setToast({ title: "Comment created successfully👏 ", duration: 2000 });

      return response;
    } catch (e: any) {
      if (e instanceof AxiosError) {
        error.value = e.response?.data?.data;
        setErrorToast(e);
        setTimeout(() => {
          error.value = null;
        }, 2000);
      } else if (e instanceof Error) {
        setToast({ title: e.message, description: "Something went wrong" });
      }
    } finally {
      loading.value = resetLoading();
    }
  };

  const update = async (id: string, data: FormData) => {
    error.value = null;
    loading.value = setLoading({ type: "update", value: true });

    try {
      const response = await axios.patch(`/api/comments/${id}`, data);
      comments.value = comments.value.map((comment) =>
        comment.id === response.data.id
          ? { ...comment, ...response.data }
          : comment
      );

      setToast({ title: "Comment updated successfully👏", duration: 2000 });
      return response;
    } catch (e: any) {
      if (e instanceof AxiosError) {
        error.value = e.response?.data?.data;
        setErrorToast(e);
        setTimeout(() => {
          error.value = null;
        }, 2000);
      } else if (e instanceof Error) {
        setToast({ title: e.message, description: "Something went wrong" });
      }
    } finally {
      error.value = null;
      loading.value = resetLoading();
    }
  };

  const destroy = async (commentId: string) => {
    try {
      loading.value = setLoading({ type: "delete", value: true });

      let response = await axios.delete(`/api/comments/${commentId}`);

      comments.value = comments.value.filter(
        (comment) => comment.id !== commentId
      );

      setToast({ title: "Comment deleted successfully👏", duration: 1500 });
      return response;
    } catch (e: any) {
      if (e instanceof AxiosError) {
        setErrorToast(e);
      } else if (e instanceof Error) {
        setToast({ title: e.message, description: "Something went wrong" });
      }
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
