import { useFetch } from "../utilities/react-query";

// const configURL = "/web-twinprocms/config";

// export const useGetConfig = () => {
//   const response: any = useFetch<any[]>(configURL);
//   return {
//     ...response,
//   };
// };

//Added 
// src/api/config.ts
import CONFIG from "../config/config"; // ✅ import config

const configURL = `${CONFIG.BASE_URI}/web-twinprocms/config`; // ✅ use the BASE_URI

export const useGetConfig = () => {
  const response: any = useFetch<any[]>(configURL);
  return {
    ...response,
  };
};

