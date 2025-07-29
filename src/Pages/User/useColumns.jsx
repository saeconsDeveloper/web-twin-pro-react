import MoreAction from "./MoreAction";
import styleUser from "./User.module.css";

export const useColumns = ({ refetch}) => {
  const columns = [
    {
      title: "S.N",
      render: ({ sn }) => {
        return <div>{sn}</div>;
      },
    },
    {
      title: "Name",
      render: ({ first_name, last_name }) => {
        return <div>{`${first_name} ${last_name}`}</div>;
      },
    },
    {
      title: "Username/Email",
      render: ({ username, email }) => {
        return <div>{username || email}</div>;
      },
    },
    {
      title: "Role",
      render: ({ groups }) => {
        return <div>{groups?.[0]?.role}</div>;
      },
    },

    {
      title: "Status",
      render: ({ is_active }) => {
        return (
          <div className={is_active ? styleUser.active : styleUser.inactive}>
            {is_active ? "Active" : "Inactive"}
          </div>
        );
      },
    },
    {
      title: "Action",
      render: (row) => {
        return <MoreAction refetch={refetch} row={row} />;
      },
    },
  ];
  return { columns };
};
