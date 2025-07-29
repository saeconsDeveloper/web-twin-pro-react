import {
 
    usePost,
  
  } from "../utilities/react-query";

  export const useLogin = (updater: any) => {
    const response = usePost(`/login`, undefined, updater);
    return {
      ...response,
    };

  };

  export const useLogout = (updater: any) => {
    const response = usePost('/logout', undefined,updater);
    return {
      ...response,
    };
  }