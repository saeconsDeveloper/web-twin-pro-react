import {
  useDelete,
  useFetch,
  usePost,
  useUpdate,
} from "../utilities/react-query";

const productCategoriesURL = "/web-twinprocms/product-categories";

export const useGetProductCategoriesList = ({ limit, offset, name, status }: any) => {
  const response: any = useFetch<any[]>(
    `${productCategoriesURL}?limit=${limit}&offset=${offset}&status=${status}&name=${name}`
  );
  return {
    ...response,
    data: response?.data ?? {},
  };
};

export const useGetProductCategoriesDropdown = () => {
  const response: any = useFetch<any[]>(`${productCategoriesURL}?dropdown=`);
  return {
    ...response.data,
  };
};
export const useGetProductCategoriesDetail = (id: number) => {
  const response: any = useFetch<any[]>(`${productCategoriesURL}/${id}`, undefined, {enabled: !!id});
  return {
    ...response.data,
  };
};

export const useCreateProductCategories = (
  updater: (oldData: any[], newData: any) => any[]
) =>
  usePost<any[], any>(`${productCategoriesURL}/create`, undefined, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const useUpdateProductCategories = (id: number) =>
  useUpdate<any, any>(`${productCategoriesURL}/${id}/update`, undefined, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const useDeleteProductCategories = () =>
  useDelete<any>(`${productCategoriesURL}`);
