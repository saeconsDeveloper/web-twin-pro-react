import {
  useDelete,
  useFetch,
  usePost,
  useUpdate,
} from "../utilities/react-query";

const scenesURL = "/web-twinprocms/scenes";

export const useGetScenesList = ({
  slug,
  title,
  status,
  limit,
  offset,
}: any) => {
  const response: any = useFetch<any[]>(
    `${scenesURL}?limit=${limit}&offset=${offset}&status=${status}&title=${title}&slug=${slug}`
  );
  return {
    ...response,
    data: response?.data ?? [],
  };
};

export const useGetScenesDropdown = () => {
  const url = `${scenesURL}?dropdown=`;
  const response: any = useFetch<any[]>(url);
  return {
    ...response,
    data: response?.data?.data ?? [],
  };
};

export const useGetSceneDetail = (id: number) => {
  const response: any = useFetch<any[]>(`${scenesURL}/${id}`, undefined, {
    enabled: !!id,
  });
  return {
    ...response,
    data: response?.data?.data,
  };
};

export const useCreateScene = (
  updater: (oldData: any[], newData: any) => any[]
) =>
  usePost<any[], any>(
    `${scenesURL}/create`,
    undefined,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
    updater
  );

export const useUpdateScene = (id: number) =>
  useUpdate<any, any>(`${scenesURL}/${id}/update`, undefined, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const useDeleteScene = () => useDelete<any>(`${scenesURL}`);
