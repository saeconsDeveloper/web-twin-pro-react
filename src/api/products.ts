import {
  useDelete,
  useFetch,
  usePost,
  useUpdate,
} from "../utilities/react-query";

const productsURL = "/web-twinprocms/product";

export const useGetProductsList = ({ limit, offset, name }: any) => {
  const response: any = useFetch<any[]>(
    `${productsURL}?limit=${limit}&offset=${offset}&name=${name}`
  );
  return {
    ...response,
    data: response?.data ?? {},
  };
};

export const useGetProductDetail = (id: number) => {
  const response: any = useFetch<any[]>(`${productsURL}/${id}`, undefined, {
    enabled: !!id,
  });
  return {
    ...response.data,
  };
};

export const useCreateProduct = (
  updater: (oldData: any[], newData: any) => any[]
) =>
  usePost<any[], any>(`${productsURL}/create`, undefined, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const useUpdateProduct = (id: number) =>
  useUpdate<any, any>(`${productsURL}/${id}/update`, undefined, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const useDeleteProduct = (id: number) =>
  useDelete<any>(`${productsURL}`);
