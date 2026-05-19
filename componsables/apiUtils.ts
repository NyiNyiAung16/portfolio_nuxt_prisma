import { AxiosError } from "axios";
import { setErrorToast, setToast } from "./toastHelper";
import { resetLoading, setLoading } from "./loadingHelper";

type AsyncFunction<T> = () => Promise<T>;


// A custom hook to handle API calls with loading and error states, and optional toast notifications.
async function useApiWrapper(
  action: AsyncFunction<any>,
  error: Ref<any>,
  loading: Ref<{ type: string; value: boolean }>,
  loadingType: string,
  showToast: boolean, // whether to show or not.
  toastMessage: string = "Action completed successfully👏",
): Promise<any> {
  try {
    error.value = null;
    loading.value = setLoading({ type: loadingType, value: true });

    const response = await action();
    if (showToast) {
      setToast({ title: toastMessage });
    }
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
    } else {
      setErrorToast(e);
    }
    return null;
  } finally {
    error.value = null;
    loading.value = resetLoading();
  }
}


const useMap = (newData: any, base: any, key: string) => {
  if (!newData) return ;

  return base.value.map((data: any) =>
      data[key] === newData[key]
        ? {
            ...data,
            ...newData,
          }
        : data
    );
}

const useFilter = (newData: any, base: any, key: string) => {
  if (!newData) return ;

  return base.value.filter((data: any) =>
    data[key] === newData[key]
  );
}


const useAdd = (newData: any, base: any) => {
  if (!newData) return ;

  return [...base.value, newData];
}


export { useApiWrapper, useMap, useFilter, useAdd };
