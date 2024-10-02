import axios from "axios";
import { setErrorToast, setToast } from "~/componsables/toastHelper.js";

export const useProjectsStore = defineStore("projects", () => {
  const projects = ref(null);
  const project = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function get() {
    try {
      error.value = null;
      loading.value = true;

      const response = await axios.get("/api/projects");

      loading.value = false;
      projects.value = response.data;
      
      return response;
    } catch (e) {
      loading.value = false;
      error.value = e.response?.data?.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
    }
  }

  async function show(id) {
    try {
      error.value = null;
      loading.value = true;

      const response = await axios.get(`/api/projects/${id}`);
      project.value = response?.data;

      loading.value = false;
      return response;
    } catch (e) {
      loading.value = false;
      error.value = e.response?.data?.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
    }
  }

  async function create(data,files) {
    try {
      error.value = null;
      loading.value = true;

      const filesResponse = await axios.post('/api/files',{ files });
      data.images_path = filesResponse.data;

      const response = await axios.post("/api/project", data);

      loading.value = false;
      setToast({ title: "Project created successfully👏" , duration: 3000});

      return response;
    } catch (e) {
      loading.value = false;
      error.value = e.response?.data?.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
    }
  }


  return {
    projects,
    project,
    loading,
    error,
    create,
    get,
    show
  };
});
