import datetimeDifference from "datetime-difference";

export const useColumns = () => {
  const columns = [
    {
      title: "S.N",
      render: ({ key }) => {
        return <div>{key}</div>;
      },
    },
    {
      title: "Who",
      render: ({ user }) => {
        return <div>{user}</div>;
      },
    },
    {
      title: "Action",
      render: ({ action }) => {
        return <span>{action}</span>;
      },
    },
    {
      title: "Item",
      render: ({ model_type }) => {
        return <span>{model_type}</span>;
      },
    },
    {
      title: "Item Name",
      render: ({ object_str }) => {
        return <div>{object_str}</div>;
      },
    },
    {
      title: "IP",
      render: ({ ip }) => {
        return <div>{ip}</div>;
      },
    },
    {
      title: "Ago",
      render: ({ created_at }) => {
        const timeDiff = datetimeDifference(new Date(), new Date(created_at));
        const result =
          (timeDiff?.years > 0 ? `${timeDiff?.years} yrs, ` : "") +
          (timeDiff?.months > 0 ? `${timeDiff?.months} months, ` : "") +
          (timeDiff?.months > 0 ? `${timeDiff?.months} months, ` : "") +
          (timeDiff?.days > 0 ? `${timeDiff?.days} days, ` : "") +
          (timeDiff?.hours > 0 ? `${timeDiff?.hours} hrs, ` : "") +
          (timeDiff?.minutes > 0 ? `${timeDiff?.minutes} mins ` : "");
        return <div>{result}</div>;
      },
    },
  ];
  return { columns };
};
