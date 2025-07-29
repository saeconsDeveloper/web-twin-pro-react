import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import styleInteraction from "./Interactions.module.css";
import { useDisclosure } from "../../hooks/useDisclosure";
import { useDeleteInteraction } from "../../api/interactions";
import StyledModal from "../../Components/Modal/StyledModal";

export const useColumns = refetch => {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { mutateAsync: mutateAsyncDelete, isLoading: isLoadingDelete } =
    useDeleteInteraction();

  const handleDelete = id => {
    onOpen();
    setDeleteId(id);
  };

  const handleDeleteScene = () => {
    mutateAsyncDelete(deleteId)
      .then(res => {
        if (res?.data) {
          toast.success(res?.data?.message);
          onClose();
          refetch();
        }
      })
      .catch(err => {
        toast.error(err?.response?.data?.error);
        onClose();
      });
  };

  const columns = [
    {
      title: "S.N",
      render: ({ sn }) => {
        return <div>{sn}</div>;
      },
    },
    {
      title: "Name",
      render: ({ name }) => {
        return <div>{name}</div>;
      },
    },
    {
      title: "Action Type",
      render: ({ action_type }) => {
        return <div>{action_type}</div>;
      },
    },
    {
      title: "Status",
      render: ({ status }) => {
        return <div>{status}</div>;
      },
    },
    {
      title: "Action",
      render: ({ id }) => {
        return (
          <div className="flex gap-2">
            <button
              className={styleInteraction["modify-interation-btn"]}
              onClick={() =>
                navigate(`/web-twinprocms/interaction/update/${id}`)
              }
            >
              <FontAwesomeIcon icon={faPen} />
            </button>{" "}
            <button
              className={styleInteraction["delete-interation-btn"]}
              onClick={() => handleDelete(id)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <StyledModal
              isOpen={isOpen}
              onClose={onClose}
              onConfirm={handleDeleteScene}
              loading={isLoadingDelete}
            />
          </div>
        );
      },
    },
  ];
  return { columns };
};
