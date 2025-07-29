import { useState } from "react";
import { Select, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Head from "../../Components/Head";
import { useColumns } from "./useColumns";
import { statusOptions } from "../../data";
import styleProductCategories from "./ProductCategories.module.css";
import { useGetProductCategoriesList } from "../../api/productCategories";

const ProductCategories = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [status, setStatus] = useState("");
  const [filters, setFilters] = useState({ name: "", status: "" });
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetProductCategoriesList({ limit, offset, ...filters });
  const { columns } = useColumns(refetch);

  const handleSearch = () => {
    setFilters({
      name: name,
      status: status,
    });
  };

  const dataWithKeys = data?.data?.map((productCategory, index) => ({
    ...productCategory,
    key: productCategory?.id,
    sn: offset + (index + 1),
  }));

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    setLimit(pagination?.pageSize);
    setOffset((pagination?.current - 1) * pagination?.pageSize);
  };

  return (
    <main
      className={styleProductCategories["product-categories-main-container"]}
    >
      <Head title="Product Categories" />
      <div className={styleProductCategories["product-categories-form"]}>
        <div
          className={
            styleProductCategories["product-categories-input-go-btn-container"]
          }
        >
          <input
            type="text"
            onChange={event => {
              setName(event.target.value);
            }}
            placeholder="Search by Name"
          />
          <Select
            options={statusOptions}
            placeholder="Search by Status"
            styles={{ borderColor: "border: 1px solid red" }}
            onChange={option => setStatus(option)}
          />
          <button onClick={handleSearch}>Go</button>
        </div>
        <div className={styleProductCategories["add-product-categories"]}>
          <button
            onClick={() => {
              navigate("/web-twinprocms/product-category/create");
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Product Categories
          </button>
        </div>
      </div>
      {isError && <p>{error?.message}</p>}
      <div
        className={styleProductCategories["product-categories-table-container"]}
      >
        <Table
          rowClassName="cursor-pointer"
          columns={columns}
          dataSource={dataWithKeys}
          onChange={onChange}
          loading={isLoading || isFetching}
          pagination={{ total: data?.total, showSizeChanger: true }}
        />
      </div>
    </main>
  );
};

export default ProductCategories;
