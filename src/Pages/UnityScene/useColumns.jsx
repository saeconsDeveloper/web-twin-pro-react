import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import styleUnityScene from "./UnityScene.module.css";
import { useDisclosure } from "../../hooks/useDisclosure";
import { useDeleteUnityScene } from "../../api/unityScene";
import StyledModal from "../../Components/Modal/StyledModal";

export const useColumns = refetch => {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { mutateAsync: mutateAsyncDelete, isLoading: isLoadingDelete } =
    useDeleteUnityScene();

  const handleDelete = id => {
    onOpen();
    setDeleteId(id);
  };

  const handleDeleteUnityScene = () => {
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
        return <div className="w-[120px]">{sn}</div>;
      },
    },
    {
      title: "Name",
      render: ({ name }) => {
        return <div>{name}</div>;
      },
    },
    {
      title: "View Scene",
      render: row => {
        return (
          <div>
            <button
              className="bg-[#299aff] px-4 py-2 rounded text-white"
              onClick={() =>
                navigate(`/unity-scene/${row?.id}`, {
                  state: { item: row },
                })
              }
            >
              View Unity
            </button>
          </div>
        );
      },
    },
    {
      title: "Action",
      render: row => {
        return (
          <div>
            <button
              onClick={() =>
                navigate(`/web-twinprocms/unity-scene/${row?.id}/update`, {
                  state: { item: row },
                })
              }
              className={styleUnityScene["modify-scene-btn"]}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>{" "}
            <button
              className={styleUnityScene["delete-scene-btn"]}
              onClick={() => handleDelete(row?.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <StyledModal
              isOpen={isOpen}
              onClose={onClose}
              onConfirm={handleDeleteUnityScene}
              loading={isLoadingDelete}
            />
          </div>
        );
      },
    },
  ];
  return { columns };
};
