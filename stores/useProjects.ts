import axios from "axios";
import {useApiWrapper} from "~/componsables/apiUtils";
import type { ErrorData, Pagination, Project } from "~/types/Project";


export const useProjectsStore = defineStore("projects", () => {
  const pagination = ref<Pagination | null>(null);
  const project = ref<Project | null>(null);
  const projects = ref<Project[]>([]);
  const loading = ref({ type: "", value: false });
  const error = ref<ErrorData| null>(null);


  const get = async (page: number) => {
    const repsonse = await useApiWrapper(
      () => axios.get(`/api/projects?page=${page}`),
      error,
      loading,
      "get",
      false
    );
    if(!repsonse) return;
    projects.value = repsonse.data.data;
    pagination.value = repsonse.data.pagination;
  }


  const show = async (id: number) => {
    const response = await useApiWrapper(
      () => axios.get(`/api/projects/${id}`),
      error,
      loading,
      "show",
      false
    );
    if(!response) return;
    project.value = response.data;
  }


  const create = async (data: FormData) => {
    const response = await useApiWrapper(
      () => axios.post("/api/projects", data),
      error,
      loading,
      "create",
      true,
      "Project created successfully👏"
    );
    return response;
  }


  const update = async (id: number, data: FormData) => {
    const response = await useApiWrapper(
      () => axios.patch(`/api/projects/${id}`, data),
      error,
      loading,
      "update",
      true,
      "Project updated successfully👏"
    );
    if (!response) return;
    projects.value = projects.value.map((project) =>
      project.id === response.data.id
        ? {
            ...project,
            ...response.data,
          }
        : project
    );
    return response;
  }

  const destroy = async (project: Project) => {
    const response = await useApiWrapper(
      async () => {
        // I need to refactor deleting photo first. Because if the project fails, the photo will be already deleted.
        await axios.delete('/api/files', { data: { images_path: project.images_path }});
        return await axios.delete(`/api/projects/${project.id}`);
      },
      error,
      loading,
      "delete",
      true,
      "Project deleted successfully👏"
    );
    return response;
  }

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
