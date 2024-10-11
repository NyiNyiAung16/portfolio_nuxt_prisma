import axios from "axios";
import { resetLoading, setLoading } from "~/componsables/loadingHelper";
import { setErrorToast, setToast } from "~/componsables/toastHelper.js";

export const useProjectsStore = defineStore("projects", () => {
  const pagination = ref(null);
  const project = ref(null);
  const loading = ref({ type: "", value: false });
  const error = ref(null);

  const projects = computed({
    get() {
      return pagination.value?.data;
    },
    set(newProjects) {
      pagination.value.data = newProjects;
    },
  });

  async function get(page) {
    try {
      error.value = null;
      loading.value = setLoading({ type: "get", value: true });

      const response = await axios.get(`/api/projects?page=${page}`);
      pagination.value = response.data;

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
  }

  async function show(id) {
    try {
      error.value = null;
      loading.value = setLoading({ type: "show", value: true });

      const response = await axios.get(`/api/projects/${id}`);
      project.value = response?.data;

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
  }

  async function create(data, files) {
    try {
      error.value = null;
      loading.value = setLoading({ type: "create", value: true });

      const filesResponse = await axios.post("/api/files", { files });
      data.images_path = filesResponse.data;

      const response = await axios.post("/api/projects", data);

      setToast({ title: "Project created successfully👏", duration: 3000 });

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
  }

  const update = async (id, data, files) => {
    try {
      error.value = null;
      loading.value = setLoading({ type: "update", value: true });

      if (Object.keys(files).length > 0) {
        await axios.delete("/api/files", {
          data: { files: data.images_path },
        });

        const filesResponse = await axios.post("/api/files", { files });
        data.images_path = filesResponse.data;
      }

      const response = await axios.patch(`/api/projects/${id}`, data);

      projects.value = projects.value.map((project) =>
        project.id === response.data.id
          ? {
              ...project,
              ...response.data,
            }
          : project
      );

      setToast({ title: "Project updated successfully👏", duration: 2000 });
      return response;
    } catch (e) {
      error.value = e.response?.data?.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
      return e;
    } finally {
      loading.value = resetLoading();
    }
  };

  const destroy = async (id) => {
    try {
      loading.value = setLoading({ type: "delete", value: true });
      const response = await axios.delete(`/api/projects/${id}`);
      projects.value = projects.value.filter(
        (user) => user.id !== response.data.id
      );

      setToast({ title: "Project deleted successfully👏", duration: 2000 });

      return response;
    } catch (e) {
      setErrorToast(e);
    } finally {
      loading.value = resetLoading();
    }
  };

  return {
    projects,
    project,
    error,
    pagination,
    loading,
    create,
    get,
    show,
    update,
    destroy,
  };
});
