import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { CONFIG } from "../config";

const onRequest = (config: any): any => {
  const token = localStorage.getItem("Token");
  const parsedToken = token && JSON.parse(token ?? "");

  if (parsedToken?.access_token) {
    config.headers["Authorization"] = `Bearer ${parsedToken.access_token}`;
  }

  return config;
};

const onRequestError = async (error: any): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: any): Promise<any> => {
  if (error.response) {
    console.log("error on request");
    // Access Token was expired
    if (error.response.status === 403) {
      console.log("401 error");
      const storedToken = localStorage.getItem("Token");
      const parsedToken = storedToken && JSON.parse(storedToken ?? "");
      console.log(parsedToken, "pasrsed");

      try {
        console.log("trying to refresh token");
        console.log(parsedToken?.refresh_token);
        const rs = await axios.post(`${CONFIG.BASE_URI}/api/token/access`, {
          data: {
            refresh: parsedToken?.refresh_token,
          },
        });

        const { access_token } = rs?.data?.data;

        const updatedUsr = {
          ...parsedToken,
          access_token,
        };

        localStorage.setItem("Token", JSON.stringify(updatedUsr));

        return;
      } catch (_error) {
        console.log("refresh token failed");
        localStorage.removeItem("Token");
        window.location.href = "/login";
        return Promise.reject(_error);
      }
    }
  }
  return Promise.reject(error);
};

export const setupInterceptorsTo = (
  axiosInstance: AxiosInstance
): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};
