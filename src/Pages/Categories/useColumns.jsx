import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { CONFIG } from "../../config";
import styleCategories from "./Categories.module.css";
import { useDisclosure } from "../../hooks/useDisclosure";
import { useDeleteCategories } from "../../api/categories";
import StyledModal from "../../Components/Modal/StyledModal";

export const useColumns = refetch => {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { mutateAsync: mutateAsyncDelete, isLoading: isLoadingDelete } =
    useDeleteCategories();

  const handleDelete = id => {
    onOpen();
    setDeleteId(id);
  };

  const handleDeleteCategories = () => {
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
      title: "Image",
      render: ({ image }) => {
        return (
          <div>
            <img
              style={{ width: "100px", height: "auto" }}
              src={`${CONFIG.BASE_URI}${image}`}
              alt="categories_image"
            />
          </div>
        );
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
      render: row => {
        return (
          <div className="flex gap-2">
            <button
              onClick={() =>
                navigate(`/web-twinprocms/categories/${row.id}/update`, {
                  state: { item: row },
                })
              }
              className={styleCategories["modify-categories-btn"]}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>{" "}
            <button
              onClick={() => handleDelete(row?.id)}
              className={styleCategories["delete-categories-btn"]}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <StyledModal
              isOpen={isOpen}
              onClose={onClose}
              onConfirm={handleDeleteCategories}
              loading={isLoadingDelete}
            />
          </div>
        );
      },
    },
  ];
  return { columns };
};
