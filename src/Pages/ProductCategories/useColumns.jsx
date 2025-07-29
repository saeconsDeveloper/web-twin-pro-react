import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { CONFIG } from "../../config";
import { useDisclosure } from "../../hooks/useDisclosure";
import StyledModal from "../../Components/Modal/StyledModal";
import styleProductCategories from "./ProductCategories.module.css";
import { useDeleteProductCategories } from "../../api/productCategories";

export const useColumns = refetch => {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { mutateAsync: mutateAsyncDelete, isLoading: isLoadingDelete } =
    useDeleteProductCategories();

  const handleDelete = id => {
    onOpen();
    setDeleteId(id);
  };

  const handleDeleteProductCategories = () => {
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
              alt="product-category"
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
      render: ({ id }) => {
        return (
          <div className="flex gap-2">
            <button
              onClick={() =>
                navigate(`/web-twinprocms/product-category/${id}/update`)
              }
              className={styleProductCategories["product-category-edit-btn"]}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button
              onClick={() => handleDelete(id)}
              className={styleProductCategories["product-category-delete-btn"]}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <StyledModal
              isOpen={isOpen}
              onClose={onClose}
              onConfirm={handleDeleteProductCategories}
              loading={isLoadingDelete}
            />
          </div>
        );
      },
    },
  ];
  return { columns };
};
