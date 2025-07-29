import {
  useDelete,
  useFetch,
  usePost,
  useUpdate,
} from "../utilities/react-query";

const categoriesURL = "/web-twinprocms/scene-categories";

export const useGetCategoriesList = ({ limit, offset, name, status }: any) => {
  const response: any = useFetch<any[]>(
    `${categoriesURL}?limit=${limit}&offset=${offset}&status=${status}&name=${name}`
  );
  return {
    ...response,
    data: response?.data ?? {},
  };
};

export const useGetCategoriesDetail = (id: number) => {
  const response: any = useFetch<any[]>(`${categoriesURL}/${id}`, undefined, {
    enabled: !!id,
  });
  return {
    ...response,
    data: response?.data?.data,
  };
};

export const useGetCategoriesList2 = () => {
  const response: any = useFetch<any[]>(categoriesURL);
  return {
    ...response.data,
  };
};

//fetching the data for catalog dropdown and gallary page
export const useGetCategoriesListForCatalogView = () => {
  const response: any = useFetch<any[]>(categoriesURL);
  return {
    ...response.data,
  };
};

export const useGetCategoriesDropdown = () => {
  const response: any = useFetch<any[]>(`${categoriesURL}?dropdown=`);
  return {
    ...response.data,
  };
};

export const useCreateCategories = (
  updater: (oldData: any[], newData: any) => any[]
) =>
  usePost<any[], any>(`${categoriesURL}/create`, undefined, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const useUpdateCategories = (id: number) =>
  useUpdate<any, any>(`${categoriesURL}/${id}/update`, undefined, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const useDeleteCategories = () => useDelete<any>(`${categoriesURL}`);

export const useGetCategoriesFilterList = () => {
  const response: any = useFetch<any[]>(`${categoriesURL}/filter`);
  return {
    ...response,
    data: response?.data?.data ?? [],
  };
};

export const useGetCategoriesFilterUpdate = (
  updater: (oldData: any[], newData: any) => any[]
) =>
  usePost<any[], any>(`${categoriesURL}/filter`, undefined, undefined, updater);
