import axios from "axios";
import { setErrorToast, setToast } from "~/componsables/toastHelper.js";

export const useProjectsStore = defineStore("projects", () => {
  const projects = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function createProject(data,files) {
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
      console.log(e)
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
    loading,
    error,
    createProject,
  };
});
