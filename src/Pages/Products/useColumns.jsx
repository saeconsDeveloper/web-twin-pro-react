import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import styleProducts from "./Products.module.css";
import { useDeleteProduct } from "../../api/products";
import { useDisclosure } from "../../hooks/useDisclosure";
import StyledModal from "../../Components/Modal/StyledModal";

export const useColumns = refetch => {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { mutateAsync: mutateAsyncDelete, isLoading: isLoadingDelete } =
    useDeleteProduct();

  const handleDelete = id => {
    onOpen();
    setDeleteId(id);
  };

  const handleDeleteProduct = () => {
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
      title: "Category",
      render: ({ product_category }) => {
        return <div>{product_category}</div>;
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
          <div>
            <button
              onClick={() =>
                navigate(`/web-twinprocms/products/${row?.id}/update`, {
                  state: row,
                })
              }
              className={styleProducts["product-edit-btn"]}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button
              onClick={() => handleDelete(row?.id)}
              className={styleProducts["product-delete-btn"]}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <StyledModal
              isOpen={isOpen}
              onClose={onClose}
              onConfirm={handleDeleteProduct}
              loading={isLoadingDelete}
            />
          </div>
        );
      },
    },
  ];
  return { columns };
};
