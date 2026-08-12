import axios from "axios";
import {useApiWrapper, useAdd} from "~/componsables/apiUtils";
import type { Comment, ErrorData, FormData } from "~/types/Comment";

export const useCommentsStore = defineStore("comments", () => {
  const comments = ref<Comment[]>([]);
  const error = ref<ErrorData | null>(null);
  const loading = ref({ type: "", value: false });

  const get = async (projectId: string) => {
    const response = await useApiWrapper(
      () => axios.get(`/api/projects/${projectId}/comments`),
      error,
      loading,
      "get",
      false
    );
    if (!response) return;
    comments.value = response.data;
  };

  const create = async (data: FormData) => {
    const response = await useApiWrapper(
      () => axios.post("/api/comments", data),
      error,
      loading,
      "create",
      true,
      "Comment created successfully👏"
    );
    if (!response) return;
    comments.value = [response.data, ...comments.value];
  };

  const update = async (id: string, data: FormData) => {
    const response = await useApiWrapper(
      () => axios.patch(`/api/comments/${id}`, data),
      error,
      loading,
      "update",
      true,
      "Comment updated successfully👏"
    );
    if (!response) return;
    comments.value = comments.value.map((comment) =>
      comment.id === response.data.id
        ? { ...comment, ...response.data }
        : comment
    );
  };

  const destroy = async (commentId: string) => {
    const response = await useApiWrapper(
      () => axios.delete(`/api/comments/${commentId}`),
      error,
      loading,
      "delete",
      true,
      "Comment deleted successfully👏"
    );
    if (!response) return;
    comments.value = comments.value.filter((comment) => comment.id !== commentId);
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
