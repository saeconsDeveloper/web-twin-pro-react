import { Table } from "antd";
import { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Head from "../../Components/Head";
import { useColumns } from "./useColumns";
import { statusOptions } from "../../data";
import styleScene from "./Scene.module.css";
import { useGetScenesList } from "../../api/scenes";

const Scene = ({ role }) => {
  const navigate = useNavigate();
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({ title: "", slug: "", status: "" });
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetScenesList({ limit, offset, ...filters });
  const { columns } = useColumns(refetch);

  const handleSearch = () => {
    setFilters({
      title: title,
      slug: slug,
      status: status,
    });
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    setLimit(pagination?.pageSize);
    setOffset((pagination?.current - 1) * pagination?.pageSize);
  };

  const dataWithKeys = data?.data?.map((scene, index) => ({
    ...scene,
    key: scene?.id,
    sn: offset + (index + 1),
  }));

  return (
    <main className={styleScene["main-container"]}>
      <Head title="Scene" />
      <div className={styleScene["scene-form"]}>
        <div className={styleScene["input-go-btn-container"]}>
          <input
            type="text"
            placeholder="Search by Title"
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Search by Slug"
            onChange={event => {
              setSlug(event.target.value);
            }}
          />
          <Select
            options={statusOptions}
            placeholder="Search by Status"
            styles={{ borderColor: "border: 1px solid red" }}
            onChange={option => setStatus(option?.value)}
          />
          <button onClick={handleSearch}>Go</button>
        </div>
        <div className={styleScene["add-scene"]}>
          <button onClick={() => navigate("/web-twinprocms/scene/create")}>
            <FontAwesomeIcon icon={faPlus} className={styleScene.plus} /> Add
            Scene
          </button>
        </div>
      </div>
      {isError && <p>{error?.message}</p>}
      <div className={styleScene["table-container"]}>
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

export default Scene;
