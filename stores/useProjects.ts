import axios, { AxiosError } from "axios";
import { resetLoading, setLoading } from "~/componsables/loadingHelper";
import { setErrorToast, setToast } from "~/componsables/toastHelper";
import type { ErrorData, Pagination, Project } from "~/types/Project";


export const useProjectsStore = defineStore("projects", () => {
  const pagination = ref<Pagination | null>(null);
  const project = ref<Project | null>(null);
  const projects = ref<Project[]>([]);
  const loading = ref({ type: "", value: false });
  const error = ref<ErrorData| null>(null);


  async function get(page: number) {
    try {
      error.value = null;
      loading.value = setLoading({ type: "get", value: true });

      const response = await axios.get(`/api/projects?page=${page}`);
      projects.value = response.data.data;
      pagination.value = response.data.pagination;

      return response;
    } catch (e: any) {
      if(axios.isAxiosError(e)) {
        error.value = e.response?.data?.data;
  
        setErrorToast(e);
  
        setTimeout(() => {
          error.value = null;
        }, 3000);
      } else {
        setErrorToast(e);
      }
    } finally {
      loading.value = resetLoading();
    }
  }

  async function show(id: number) {
    try {
      error.value = null;
      loading.value = setLoading({ type: "show", value: true });

      const response = await axios.get(`/api/projects/${id}`);
      project.value = response?.data;

      return response;
    } catch (e: any) {
      if(axios.isAxiosError(e)) {
        error.value = e.response?.data?.data;
  
        setErrorToast(e);
  
        setTimeout(() => {
          error.value = null;
        }, 3000);
      } else {
        setErrorToast(e);
      }
    } finally {
      loading.value = resetLoading();
    }
  }

  async function create(data: FormData) {
    try {
      error.value = null;
      loading.value = setLoading({ type: "create", value: true });

      const response = await axios.post("/api/projects", data);

      setToast({ title: "Project created successfully👏", duration: 3000 });

      return response;
    } catch (e: any) {
      if(axios.isAxiosError(e)) {
        error.value = e.response?.data?.data;
  
        setErrorToast(e);
  
        setTimeout(() => {
          error.value = null;
        }, 3000);
      } else {
        setErrorToast(e);
      }
    } finally {
      loading.value = resetLoading();
    }
  }

  const update = async (id: number, data: FormData) => {
    try {
      error.value = null;
      loading.value = setLoading({ type: "update", value: true });

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
    } catch (e: any) {
      if(axios.isAxiosError(e)) {
        error.value = e.response?.data?.data;
  
        setErrorToast(e);
  
        setTimeout(() => {
          error.value = null;
        }, 3000);
      } else {
        setErrorToast(e);
      }
    } finally {
      loading.value = resetLoading();
    }
  };

  const destroy = async (project: Project) => {
    try {
      error.value = null;
      loading.value = setLoading({ type: "delete", value: true });

      await axios.delete('/api/files', { data: { images_path: project.images_path }});
      let projectResponse = await axios.delete(`/api/projects/${project.id}`);

      setToast({ title: "Project deleted successfully👏", duration: 2000 });
      return projectResponse;
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
