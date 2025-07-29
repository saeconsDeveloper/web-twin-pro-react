import { useFetch } from "../utilities/react-query";

// to search everything on the home page; scene, scene_category, products
export const useGetSearchInHomePage = (URL: any) => {
  const response: any = useFetch<any[]>(URL);
  return {
    ...response,
    data: response?.data?.data ?? [],
  };
};
