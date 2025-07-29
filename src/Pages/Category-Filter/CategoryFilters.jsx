import React from "react";
import { Spin, Switch } from "antd";

import {
  useGetCategoriesFilterList,
  useGetCategoriesFilterUpdate,
} from "../../api/categories";
import Head from "../../Components/Head";
import styleCategoryFilters from "./CategoryFilter.module.css";
import Unauthorized from "../../Components/Unauthorized/Unauthorized";

const CategoryFilters = () => {
  const { data, isLoading, isFetching } = useGetCategoriesFilterList();
  const { mutateAsync } = useGetCategoriesFilterUpdate(
    (oldData, newData) => oldData
  );

  const handleChange = field => value => {
    mutateAsync({ data: { id: [field] } });
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Head title="Category Filter" />
      <div className="w-[80rem] py-[70px]">
        <div className="flex justify-between">
          <span className={styleCategoryFilters["heading"]}>
            Category Filter
          </span>
          <button className={styleCategoryFilters["edit-position-btn"]}>
            Edit Position
          </button>
        </div>
        <div className="mt-[52px] flex flex-col gap-6">
          <div className="flex flex-col gap-[38px]">
            {data?.map(categoryFilter => (
              <div
                className={styleCategoryFilters["row"]}
                key={categoryFilter?.id}
              >
                <span className={styleCategoryFilters["text"]}>
                  {categoryFilter?.name}
                </span>

                <Switch
                  defaultChecked={categoryFilter?.value}
                  onChange={handleChange(categoryFilter?.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters;
