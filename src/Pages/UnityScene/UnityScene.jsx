import { Table } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Head from "../../Components/Head";
import { useColumns } from "./useColumns";
import styleUnityScene from "./UnityScene.module.css";
import { useGetUnityScenesList } from "../../api/unityScene";

const UnityScene = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({ name: "" });
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetUnityScenesList({ limit, offset, ...filters });
  const { columns } = useColumns(refetch);

  const handleSearch = () => {
    setFilters({
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
    <main className={styleUnityScene["unity-scene-main-container"]}>
      <Head title="Unity Scene" />
      <div className={styleUnityScene["unity-scene-form"]}>
        <div className={styleUnityScene["unity-scene-input-go-btn-container"]}>
          <input
            type="text"
            placeholder="Search by Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <button onClick={handleSearch}>Go</button>
        </div>
        <div className={styleUnityScene["add-unity-scene"]}>
          <button
            onClick={() => {
              navigate("/web-twinprocms/unity-scene/create");
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Unity Scene
          </button>
        </div>
      </div>
      {isError && <p>{error?.message}</p>}
      <div className={styleUnityScene["unity-scene-table-container"]}>
        <Table
          rowClassName="cursor-pointer"
          columns={columns}
          dataSource={dataWithKeys}
          onChange={onChange}
          loading={isLoading || isFetching}
          pagination={{ total: data?.total, showSizeChanger: true }}
          expandable={{
            expandedRowKeys: dataWithKeys?.map((o) => o?.key),
            expandedRowRender: (record) => (
              <div className="flex">
                <div className="w-[150px]">Scenes:</div>
                <Link to={`/scene/${record?.related_scene?.id}`} className="text-[#4a90e2]">
                  {record?.related_scene?.name}
                </Link>
              </div>
            ),
            rowExpandable: (record) => record?.related_scene,
          }}
        />
      </div>
    </main>
  );
};

export default UnityScene;
