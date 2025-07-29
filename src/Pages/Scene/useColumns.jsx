import { Switch } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import {
  useGetBasicSettingsList,
  useUpdateBasicSettings,
} from "../../api/settings";
import { CONFIG } from "../../config";
import styleScene from "./Scene.module.css";
import { useDeleteScene } from "../../api/scenes";
import { useDisclosure } from "../../hooks/useDisclosure";
import StyledModal from "../../Components/Modal/StyledModal";

export const useColumns = refetch => {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { mutateAsync } = useUpdateBasicSettings();
  const { data: settings } = useGetBasicSettingsList();
  const { mutateAsync: mutateAsyncDelete, isLoading: isLoadingDelete } =
    useDeleteScene();

  const handleChange = checkedId => checked => {
    if (checked) {
      const formData = new FormData();
      formData.append("default_scene", checkedId);
      mutateAsync(formData)
        .then(res => {
          if (res?.data) {
            refetch();
            toast.success(res?.data?.message);
          }
        })
        .catch(err => {
          toast.error(err?.message);
        });
    }
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

  const handleDelete = id => {
    onOpen();
    setDeleteId(id);
  };

  const columns = [
    {
      title: "S.N",
      render: ({ sn }) => {
        return <div>{sn}</div>;
      },
    },
    {
      title: "Title",
      render: ({ id, title }) => {
        return (
          <Link to={`/scene/${id}`} className={styleScene.link} target="_blank">
            {title}
          </Link>
        );
      },
    },
    {
      title: "Unity Associated",
      render: ({ Unity_Scene }) => {
        return <div>{Unity_Scene}</div>;
      },
    },
    {
      title: "Scene ID",
      render: ({ id }) => {
        return <div>{id}</div>;
      },
    },
    {
      title: "Image",
      render: ({ image }) => {
        return (
          <div style={{ display: "flex", justifyContent: "left" }}>
            <img
              style={{ width: "80px", height: "auto" }}
              src={`${CONFIG.BASE_URI}${image}`}
              alt="scene"
            />
          </div>
        );
      },
    },
    {
      title: "Action",
      render: row => {
        return (
          <div className="flex gap-2">
            <button className={styleScene["edit-scene-btn"]}>Edit Scene</button>{" "}
            <button
              onClick={() =>
                navigate(`/web-twinprocms/scene/${row?.id}/update`, {
                  state: { item: row },
                })
              }
              className={styleScene["modify-scene-btn"]}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button
              className={styleScene["delete-scene-btn"]}
              onClick={() => handleDelete(row?.id)}
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

    {
      ...(settings?.immersive_experience && {
        title: "Set Homepage",
        render: ({ id, immersive_default_scene }) => {
          return (
            <Switch
              checked={immersive_default_scene}
              onChange={handleChange(id)}
            />
          );
        },
      }),
    },
  ];
  return { columns };
};
