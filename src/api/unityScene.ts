import {
  useDelete,
  useFetch,
  usePost,
  useUpdate,
} from "../utilities/react-query";

const unityScenesURL = "/web-twinprocms/unity-scenes";

export const useGetUnityScenesList = ({ limit, offset, name }: any) => {
  const response: any = useFetch<any[]>(
    `${unityScenesURL}?limit=${limit}&offset=${offset}&name=${name}`
  );
  return {
    ...response,
    data: response?.data ?? {},
  };
};

export const useGetUnityScenesDropdownForScene = (id: any) => {
  const response: any = useFetch<any[]>(
    `${unityScenesURL}?dropdown=${id ? `&scene_id=${id}` : ""}`
  );
  return {
    ...response,
    data: response?.data?.data ?? [],
  };
};

export const useGetUnityScenesDropdownSettings = () => {
  const response: any = useFetch<any[]>(`${unityScenesURL}?dropdown-settings=`);
  return {
    ...response,
    data: response?.data?.data ?? [],
  };
};

export const useCreateUnityScene = (
  updater: (oldData: any[], newData: any) => any[]
) =>
  usePost<any[], any>(
    `${unityScenesURL}/create`,
    undefined,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
    updater
  );

export const useUpdateUnityScene = (id: number) =>
  useUpdate<any, any>(`${unityScenesURL}/${id}/update`, undefined, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const useDeleteUnityScene = () => useDelete<any>(`${unityScenesURL}`);
