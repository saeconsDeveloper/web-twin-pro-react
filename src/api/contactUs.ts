import { usePost } from "../utilities/react-query";

const contactUsURL = "/web-twinprocms/contactus";

export const useContactUs = (updater: any) => {
  const response = usePost(contactUsURL, undefined, updater);
  return {
    ...response,
  };
};
