import { useFetch, usePost } from "../utilities/react-query";

const themeSettingsURL = "/web-twinprocms/settings/theme";

export const useGetThemeSettingsList = () => {
  const response: any = useFetch<any[]>(themeSettingsURL);
  return {
    ...response.data,
  };
};

export const useCreateThemeSettings = (
  updater: (oldData: any[], newData: any) => any[]
) => usePost<any[], any>(`${themeSettingsURL}`, undefined, updater);
