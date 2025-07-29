import {
  useDelete,
  useFetch,
  usePost,
  useUpdate,
} from "../utilities/react-query";

const fileLibraryURL = "/web-twinprocms/file-library";

export const useGetFileLibraryList = () => {
  const response: any = useFetch<any[]>(fileLibraryURL);
  return {
    ...response,
    data: response?.data?.data ?? {}
  };
};

export const useGetFileLibraryDetail = (id: number) => {
  const response: any = useFetch<any[]>(`${fileLibraryURL}/${id}/detail`, undefined, {
    enabled: !!id
  });
  return {
    ...response,
    data: response?.data?.data
  };
};

export const useEditFolder = (id: number) =>
  useUpdate<any, any>(`${fileLibraryURL}/${id}/update`);

export const useAddFolder = (id: number) =>
  usePost<any[], any>(`${fileLibraryURL}${id ?  `/${id}` : ''}`, undefined, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const useAddFile = (id: number) =>
  usePost<any[], any>(`${fileLibraryURL}/${id}/create`, undefined, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const useDeleteFile = () => useDelete<any>(fileLibraryURL);
