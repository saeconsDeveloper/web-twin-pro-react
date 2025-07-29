import { useFetch, usePost } from "../utilities/react-query";

const homePageOption = "/web-twinprocms/settings/homepage";

export const useGetHomepageOption = () => {
  const response: any = useFetch<any[]>(homePageOption);
  return {
    ...response.data,
  };
};

export const useCreateHomepageOption = (
  updater: (oldData: any[], newData: any) => any[]
) => usePost<any[], any>(`${homePageOption}`, undefined, updater);
