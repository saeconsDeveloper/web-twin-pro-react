import { useFetch } from "../utilities/react-query";

const loggedinUserURL = "/web-twinprocms/user";

export const useGetLoggedInUser = () => {
  const response: any = useFetch<any[]>(loggedinUserURL);
  return {
    ...response,
  };
};
