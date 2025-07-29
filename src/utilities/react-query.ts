import { AxiosError, AxiosResponse } from "axios";

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  QueryFunctionContext,
} from "@tanstack/react-query";

import { request } from "../api";

type ObjectT = Record<string, unknown>;

type QueryKeyT = [string, ObjectT | undefined];

export const fetcher = async <T>({
  queryKey,
  pageParam,
}: Pick<
  QueryFunctionContext<QueryKeyT>,
  "queryKey" | "pageParam"
>): Promise<T> => {
	//destructuring queryKey which has url and params
  const [url, params] = queryKey;
  //intercpet
  const response = await request.get<T>(url, {
    params: { ...params, pageParam },
  });
  return response.data;
};


//hook to fetch the data using useQuery()
//it takes parameters -> url, params, and config
//URL and params are used as queryKey
export const useFetch = <T>(
  url: string | null,
  params?: ObjectT,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  const context = useQuery<T, Error, T, QueryKeyT>(
    [url!, params],
	// queryKey can be passed as parameters to queryFuntion which has a object of 
    ({ queryKey }) => fetcher({ queryKey }),
    {
      enabled: !!url,
      ...config,
    }
  );
	//promise from useQuery
  return context;
};

const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  url: string,
  params?: ObjectT,
  updater?: ((oldData: T, newData: S) => T) | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, T | S>(func, {
    onMutate: async data => {
      await queryClient.cancelQueries([url!, params]);

      const previousData = queryClient.getQueryData([url!, params]);

      queryClient.setQueryData<T>([url!, params], oldData => {
        return updater ? updater(oldData!, data as S) : (data as T);
      });

      return previousData;
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([url!, params], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries([url!, params]);
    },
  });
};

export const usePost = <T, S>(
	url: string,
	params?: ObjectT,
	config?:any,
	updater?: (oldData: T, newData: S) => T,
) => {
	return useGenericMutation<T, S>((data) => request.post<S>(url, data, config), url, params, updater);
};

export const usePartialPost = <T, S>(
	url: string,
  action: string,
	params?: ObjectT,
	config?:any,
	updater?: (oldData: T, newData: S) => T,
) => {
	return useGenericMutation<T, S>( id => request.post(`${url}/${id}/${action}`), url, params, updater);
};

export const useUpdate = <T, S>(
	url: string,
	params?: ObjectT,
	config?:any,
	updater?: (oldData: T, newData: S) => T,
) => {
	return useGenericMutation<T, S>((data) => request.put<S>(url, data, config), url, params, updater);
};

export const usePartialUpdate = <T, S>(
  url: string,
  params?: ObjectT,
  updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>(
    data => request.patch<S>(url, data),
    url,
    params,
    updater
  );
};

export const useDelete = <T>(
  url: string,
  params?: ObjectT,
  updater?: (oldData: T, id: string | number) => T
) => {
  return useGenericMutation<T, string | number>(
    id => request.delete(`${url}/${id}/delete`),
    url,
    params,
    updater,
  );
};

export const useDelete2 = <T>(
  url: string,
  params?: ObjectT,
  updater?: (oldData: T, data: any) => T
) => {
  return useGenericMutation<T, any>(
    data => request.delete(url, data),
    url,
    params,
    updater,
  );
};

