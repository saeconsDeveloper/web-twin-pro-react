import { useState } from "react";
import { Select, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { roles } from "../../data";
import Head from "../../Components/Head";
import styleUser from "./User.module.css";
import { useColumns } from "./useColumns";
import { useGetUsersList } from "../../api/users";

const User = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({ role: "", name: "" });
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetUsersList({ limit, offset, ...filters });
  const { columns } = useColumns({ refetch });

  const handleSearch = () => {
    setFilters({
      role: role,
      name: name,
    });
  };

  const dataWithKeys = data?.data?.map((unityScene, index) => ({
    ...unityScene,
    key: unityScene?.id,
    sn: offset + (index + 1),
  }));

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    setLimit(pagination?.pageSize);
    setOffset((pagination?.current - 1) * pagination?.pageSize);
  };

  return (
    <main className={styleUser["user-main-container"]}>
      <Head title="Users" />
      <div className={styleUser["user-form"]}>
        <div className={styleUser["user-input-go-btn-container"]}>
          <label htmlFor="role">Role: </label>
          <Select
            options={roles}
            placeholder="Search by Status"
            styles={{ borderColor: "border: 1px solid red" }}
            onChange={option => setRole(option)}
          />
          <input
            type="text"
            placeholder="Search"
            onChange={event => {
              setName(event.target.value);
            }}
          />
          <button onClick={handleSearch}>Go</button>
        </div>
        <div className={styleUser["add-user"]}>
          <button
            onClick={() => {
              navigate("/web-twinprocms/users/create");
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add User
          </button>
        </div>
      </div>
      {isError && <p>{error?.message}</p>}
      <div className={styleUser["user-table-container"]}>
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

export default User;
