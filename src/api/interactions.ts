import {
  useDelete,
  useFetch,
  usePost,
  useUpdate,
} from "../utilities/react-query";

const interactionURL = "/web-twinprocms/interactions";


export const useGetInteractionList = ({ limit, offset, name, status }: any) => {
  const response: any = useFetch<any[]>(
    `${interactionURL}?limit=${limit}&offset=${offset}&status=${status}&name=${name}`
  );
  return {
    ...response,
    data: response?.data ?? {},
  };
};

export const useGetInteractionDetail = (id: number) => {
  const url = `${interactionURL}/${id}`;
  const response: any = useFetch<any[]>(url, undefined, {enabled : !!id});
  return {
    ...response,
    data: response?.data?.data,
  };
};

export const useGetInteractionDropdown = () => {
  const response: any = useFetch<any[]>(`${interactionURL}?dropdown=`);
  return {
    ...response.data,
  };
};

export const useCreateInteraction = (
  updater: (oldData: any[], newData: any) => any[]
) => usePost<any[], any>(`${interactionURL}/create`, undefined, updater);

export const useUpdateInteraction = (id: number) =>
  useUpdate<any, any>(`${interactionURL}/${id}/update`);

export const useDeleteInteraction = () =>
  useDelete<any>(`${interactionURL}`);
