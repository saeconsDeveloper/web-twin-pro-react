import { useState } from "react";
import { Select, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Head from "../../Components/Head";
import { useColumns } from "./useColumns";
import { statusOptions } from "../../data";
import styleInteraction from "./Interactions.module.css";
import { useGetInteractionList } from "../../api/interactions";

const Interactions = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [status, setStatus] = useState("");
  const [filters, setFilters] = useState({ name: "", status: "" });

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetInteractionList({ limit, offset, ...filters });
  const { columns } = useColumns(refetch);

  const handleSearch = () => {
    setFilters({
      name: name,
      status: status,
    });
  };

  const dataWithKeys = data?.data?.map((interaction, index) => ({
    ...interaction,
    key: interaction?.id,
    sn: offset + (index + 1),
  }));

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    setLimit(pagination?.pageSize);
    setOffset((pagination?.current - 1) * pagination?.pageSize);
  };

  return (
    <main className={styleInteraction["interaction-main-container"]}>
      <Head title="Interactions" />
      <div className={styleInteraction["interaction-form"]}>
        <div className={styleInteraction["interaction-input-go-btn-container"]}>
          <input
            type="text"
            placeholder="Search by Name"
            onChange={event => {
              setName(event.target.value);
            }}
          />
          <Select
            options={statusOptions}
            placeholder="Search by Status"
            styles={{ borderColor: "border: 1px solid red" }}
            onChange={option => setStatus(option)}
          />
          <button onClick={handleSearch}>Go</button>
        </div>
        <div className={styleInteraction["add-interactions"]}>
          <button
            onClick={() => {
              navigate("/web-twinprocms/interaction/create");
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Interactions
          </button>
        </div>
      </div>
      {isError && <p>{error?.message}</p>}
      <div className={styleInteraction["interaction-table-container"]}>
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

export default Interactions;
