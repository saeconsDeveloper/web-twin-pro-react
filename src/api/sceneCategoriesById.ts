import { useFetch } from "../utilities/react-query";

const URL = `/web-twinprocms/scene-categories/`;

export const useGetSceneCategoriesById = (slugId: any) => {
  const response: any = useFetch<any[]>(
    `${URL}${slugId}?related-scenes=${slugId}`,
    undefined,
    { enabled: !!slugId }
  );
  return {
    ...response?.data,
  };
};
