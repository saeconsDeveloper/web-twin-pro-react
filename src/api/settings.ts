import {
  useDelete,
  useDelete2,
  useFetch,
  usePost,
  useUpdate,
} from "../utilities/react-query";

const settingsURL = "/web-twinprocms/settings";

export const useGetBasicSettingsList = () => {
  const response: any = useFetch<any[]>(settingsURL);
  return {
    ...response,
    data: response?.data?.data
  };
};

export const useUpdateBasicSettings = (
  updater: (oldData: any[], newData: any) => any[]
) =>
  usePost<any[], any>(
    settingsURL,
    undefined,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
    updater
  );

  export const useDeleteBasicSettingsList = () =>  useDelete2<any>(settingsURL);
  

export const useGetHomepageOptionsList = () => {
  const response: any = useFetch<any[]>(`${settingsURL}/homepage`);
  return {
    ...response?.data,
  };
};

export const useUpdateHomepageSettings = (
  updater: (oldData: any[], newData: any) => any[]
) =>
  usePost<any[], any>(
    `${settingsURL}/homepage`,
    undefined,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
    updater
  );

export const useGetSceneGroupsList = () => {
  const response: any = useFetch<any[]>(`${settingsURL}/scene-groups`);
  return {
    ...response,
    data: response?.data?.data ?? [],
  };
};

export const useCreateSceneGroup = (
  updater: (oldData: any[], newData: any) => any[]
) => usePost<any[], any>(`${settingsURL}/scene-groups`, undefined, updater);

export const useUpdateSceneGroup = (id: number) =>
  useUpdate<any, any>(`${settingsURL}/scene-groups/${id}/update`);

export const useDeleteSceneGroup = () =>
  useDelete<any>(`${settingsURL}/scene-groups`);

export const useGetFilterActionsList = () => {
  const response: any = useFetch<any[]>(`${settingsURL}/filter-actions`);
  return {
    ...response,
    data: response?.data?.data ?? [],
  };
};

export const useUpdateFilterActions = (
  updater: (oldData: any[], newData: any) => any[]
) =>
  usePost<any[], any>(
    `${settingsURL}/filter-actions`,
    undefined,
    undefined,
    updater
  );

export const useGetShareIconsList = () => {
  const response: any = useFetch<any[]>(`${settingsURL}/share-icons`);
  return {
    ...response,
    data: response?.data?.data ?? [],
  };
};

export const useUpdateShareIcon = (
  updater: (oldData: any[], newData: any) => any[]
) =>
  usePost<any[], any>(
    `${settingsURL}/share-icons`,
    undefined,
    undefined,
    updater
  );
