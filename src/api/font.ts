import { useFetch } from "../utilities/react-query";

const api_key = "AIzaSyD-ltjGweq0yakEjuPoXUnp-CPaUCweaxg";

const fontURL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${api_key}`;

export const useGoogleFont = () => {
  const response: any = useFetch<any[]>(fontURL);
  return {
    ...response,
    data: response?.data?.items,
  };
};
