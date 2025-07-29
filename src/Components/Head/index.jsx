import { Helmet } from "react-helmet";

import { useGetBasicSettingsList } from "../../api/settings";

const Head = ({ title, favicon }) => {
  const { data } = useGetBasicSettingsList();

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title ?? data?.title}</title>
      <link rel="icon" href={favicon ?? data?.favicon} />
    </Helmet>
  );
};

export default Head;