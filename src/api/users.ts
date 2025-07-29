import {
  useFetch,
  usePartialPost,
  usePost,
  useUpdate,
} from "../utilities/react-query";

const usersURL = "/web-twinprocms/users";

export const useGetUsersList = ({ limit, offset, role, name }: any) => {
  const response: any = useFetch<any[]>(
    `${usersURL}?limit=${limit}&offset=${offset}&role=${role}&first_name=${name}`
  );
  return {
    ...response,
    data: response?.data ?? {},
  };
};

export const useCreateUser = (
  updater: (oldData: any[], newData: any) => any[]
) =>
  usePost<any[], any>(`${usersURL}/create`, undefined, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const useUpdateUser = (id: number) =>
  useUpdate<any, any>(`${usersURL}/${id}/update`, undefined, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const useResetUserPassword = () =>
  usePartialPost<any, any>(usersURL, "password-reset");

export const useChangeUserStatus = () =>
  usePartialPost<any, any>(usersURL, "status");
