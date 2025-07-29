import { Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Head from "../../Components/Head";
import { useColumns } from "./useColumns";
import styleProducts from "./Products.module.css";
import { useGetProductsList } from "../../api/products";

const Products = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({ name: "" });
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetProductsList({ limit, offset, ...filters });
  const { columns } = useColumns(refetch);
  const handleSearch = () => {
    setFilters({
      name: name,
    });
  };

  const dataWithKeys = data?.data?.map((product, index) => ({
    ...product,
    key: product?.id,
    sn: offset + (index + 1),
  }));

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    setLimit(pagination?.pageSize);
    setOffset((pagination?.current - 1) * pagination?.pageSize);
  };

  return (
    <main className={styleProducts["products-main-container"]}>
      <Head title="Products" />
      <div className={styleProducts["products-form"]}>
        <div className={styleProducts["products-input-go-btn-container"]}>
          <input
            type="text"
            placeholder="Search by Name"
            onChange={event => {
              setName(event.target.value);
            }}
          />
          <button onClick={handleSearch}>Go</button>
        </div>
        <div className={styleProducts["add-products"]}>
          <button
            onClick={() => {
              navigate("/web-twinprocms/products/create");
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Product
          </button>
        </div>
      </div>
      {isError && <p>{error?.message}</p>}
      <div className={styleProducts["products-table-container"]}>
        <Table
          rowClassName="cursor-pointer"
          columns={columns}
          dataSource={dataWithKeys}
          onChange={onChange}
          loading={isLoading || isFetching}
          pagination={{ total: data?.total, showSizeChanger: true }}
        />
        {/* <table>
          <thead>
            <tr>
              <th>S.N</th>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || isFetching ? (
              <tr>
                <td colSpan={5}>Loading...</td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5}>Error: {JSON.stringify(error.message)}</td>
              </tr>
            ) : (
              data?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.name}</td>
                  <td>{item?.product_category ?? "None"}</td>
                  <td>{item?.status}</td>

                  <td>
                    <button
                      onClick={() =>
                        navigate(`/web-twinprocms/products/${item.id}/update`, {
                          state: item,
                        })
                      }
                      className={styleProducts["product-edit-btn"]}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      onClick={() => handleDelete(item?.id)}
                      className={styleProducts["product-delete-btn"]}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {showModal && (
            <DeleteModal
              onClose={setShowModal}
              onDelete={handleDeleteProduct}
            />
          )}
        </table> */}
      </div>
    </main>
  );
};

export default Products;
