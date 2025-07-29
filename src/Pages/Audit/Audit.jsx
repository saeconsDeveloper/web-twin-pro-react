import { Table } from "antd";
import { useState } from "react";

import Head from "../../Components/Head";
import { useColumns } from "./useColumns";
import styleAudit from "./Audit.module.css";
import { useGetAuditsList } from "../../api/audits";
import Unauthorized from "../../Components/Unauthorized/Unauthorized";

const Audit = () => {
  const { columns } = useColumns();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const { data, isLoading, isFetching, isError, error } = useGetAuditsList({
    limit,
    offset,
  });

  const dataWithKeys = data?.data?.map((audit, index) => ({
    ...audit,
    key: index + 1,
  }));

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    setLimit(pagination?.pageSize);
    setOffset((pagination?.current - 1) * pagination?.pageSize);
  };

  return (
    <main className={styleAudit["audit-main-container"]}>
      <Head title="Audit" />
      <div className={styleAudit["audit-title-container"]}>
        <h3>Audit</h3>
        {isError && <p>{error?.message}</p>}
      </div>
      <div className={styleAudit["autdit-tabel-container"]}>
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

export default Audit;
