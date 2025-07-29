import { Switch } from "antd";

import {
  useGetShareIconsList,
  useUpdateShareIcon,
} from "../../../api/settings";
import styles from "./ShareIcon.module.css";
import Head from "../../../Components/Head";

const ShareIcon = () => {
  const { data } = useGetShareIconsList();
  const { mutateAsync } = useUpdateShareIcon((oldData, newData) => oldData);

  const handleChange = field => value => {
    mutateAsync({ data: { id: [field] } });
  };

  return (
    <div className="flex justify-center">
      <Head title="Share Icon" />
      <div className="w-[80rem] py-[50px]">
        <span className={`${styles["heading"]}  `}>Share Icons</span>
        <div className="mt-[52px] flex flex-col gap-6">
          <div className="flex flex-col gap-[38px]">
            {data &&
              (data || [])?.map(shareIcon => (
                <div className={styles["row"]} key={shareIcon?.id}>
                  <span className={styles["text"]}>{shareIcon?.name}</span>
                  <Switch
                    defaultChecked={shareIcon?.value}
                    onChange={handleChange(shareIcon?.id)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareIcon;
