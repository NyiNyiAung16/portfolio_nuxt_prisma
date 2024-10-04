import axios from "axios";
import { setErrorToast, setToast } from "~/componsables/toastHelper.js";

export const useProjectsStore = defineStore("projects", () => {
  const pagination = ref(null);
  const project = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const projects = computed(() => pagination.value?.data);

  async function get(page) {
    try {
      error.value = null;
      loading.value = true;

      const response = await axios.get(`/api/projects?page=${page}`);
      pagination.value = response.data;
      
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

      const response = await axios.post("/api/projects", data);

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


  const update = async (id,data,files) => {
    try {
      error.value = null;
      loading.value = true;
      
      if(files) {
        const filesResponse = await axios.post('/api/files',{ files });
        data.images_path = filesResponse.data;
      }

      const response = await axios.patch(`/api/projects/${id}`,data);

      await get();

      loading.value = false;
      return response;
    } catch (e) {
      loading.value = false;
      error.value = e.response?.data?.data;

      setErrorToast(e);

      setTimeout(() => {
        error.value = null;
      }, 3000);
      return e;
    }
  }


  const destroy = async (id) => {
    try {
      loading.value = true;

      const response = await axios.delete(`/api/projects/${id}`);
      
      await get();

      loading.value = false;
      return response;
    } catch (e) {
      console.log(e)
      loading.value = false;
      setErrorToast(e);
    }
  }

  return {
    projects,
    project,
    loading,
    error,
    pagination,
    create,
    get,
    show,
    update,
    destroy
  };
});
