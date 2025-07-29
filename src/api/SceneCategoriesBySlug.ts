import {

    useFetch,

  } from "../utilities/react-query";

  export const useGetSceneCategoriesBySlug = (URL: any) => {
    const response: any = useFetch<any[]>(URL);
    return {
      ...response.data,
    };
  };