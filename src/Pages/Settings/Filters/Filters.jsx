import { Switch } from "antd";

import {
  useGetFilterActionsList,
  useUpdateFilterActions,
} from "../../../api/settings";
import styles from "./Filters.module.css";
import Head from "../../../Components/Head";

const Filters = () => {
  const { data: filterActions } = useGetFilterActionsList();
  const { mutateAsync } = useUpdateFilterActions((oldData, newData) => oldData);

  const handleChange = field => value => {
    mutateAsync({ data: { id: [field] } });
  };

  return (
    <div className="flex justify-center ">
      <Head title="Filters" />
      <div className="w-[787px] py-[70px]">
        <span className={`${styles["heading"]}`}>Action Types</span>
        <div className="mt-[52px] flex flex-col gap-6">
          <div className="flex flex-col gap-[38px]">
            {filterActions &&
              (filterActions || [])?.map(filterAction => (
                <div className={styles["row"]} key={filterAction?.id}>
                  <span className={styles["text"]}>{filterAction?.name}</span>
                  <Switch
                    defaultChecked={filterAction?.show_in_filter}
                    onChange={handleChange(filterAction?.id)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
