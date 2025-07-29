import { useFetch } from "../utilities/react-query";

const auditsURL = "/web-twinprocms/audits";

export const useGetAuditsList = ({ limit, offset }: any) => {
  const response: any = useFetch<any[]>(
    `${auditsURL}?limit=${limit}&offset=${offset}`
  );
  return {
    ...response,
    data: response?.data ?? [],
  };
};
