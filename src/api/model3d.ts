import {
    useFetch
  
  } from "../utilities/react-query";
  
  const models3dURL = "/web-twinprocms/3dmodels";
  
  export const useGet3dModelsDropdown = () => {
    const response: any = useFetch<any[]>(models3dURL);
    return {
      ...response.data,
    };
  };