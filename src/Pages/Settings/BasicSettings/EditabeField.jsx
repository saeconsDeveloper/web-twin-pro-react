import { Button } from "antd";
import { toast } from "react-toastify";
import {
  faCheck,
  faPen,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  useDeleteBasicSettingsList,
  useGetBasicSettingsList,
  useUpdateBasicSettings,
} from "../../../api/settings";
import { CONFIG } from "../../../config";
import styles from "./BasicSettings.module.css";
import { initialState, settingsReducer } from "./settingsReducer";

const EditableField = ({ action, name, type }) => {
  const { data } = useGetBasicSettingsList();
  const [state, dispatch] = useReducer(settingsReducer, initialState);
  const { mutateAsync: mutateAsyncDelete } = useDeleteBasicSettingsList();
  const { mutateAsync: mutateAsyncUpdate, isLoading: isLoadingUpdate } =
    useUpdateBasicSettings();

  useEffect(() => {
    dispatch({
      type: "FETCH",
      payload: {
        ...data,
      },
    });
  }, [data]);

  const handleDelete = (field) => (evt) => {
    evt?.preventDefault();
    mutateAsyncDelete({
      data: {
        data: [field],
      },
    })
      .then((res) => {
        if (res?.data) {
          toast.success(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      });
  };

  const handleClick = (field) => (value) => {
    const formData = new FormData();
    formData.append(field, state?.[field]);

    mutateAsyncUpdate(formData)
      .then((res) => {
        if (res?.data) {
          toast.success(res?.data?.message);
          dispatch({
            type: "UPDATE",
            payload: {
              editTitle: false,
              editContactNumber: false,
              editNavbarLogo: false,
              editFavicon: false,
              editHolobiteName: false,
              editLoadingImage: false,
              editDefaultLoadingText: false,
              editAnalyticsHeader: false,
              editAnalyticsBody: false,
              editAnalyticsFooter: false,
              editInteractions: false,
              editCategories: false,
              editProductCategories: false,
              editProduct: false,
              editScene: false,
            },
          });
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  const toggleEditable = (field, isEditable) => () => {
    dispatch({
      type: "UPDATE",
      payload: {
        [field]: isEditable,
      },
    });
  };

  const handleChange = (field) => (event) => {
    dispatch({
      type: "UPDATE",
      payload: {
        [field]: event?.target?.files?.[0] ?? event?.target?.value,
      },
    });
  };

  const isEditable = state?.[action];

  return (
    <div>
      {isEditable ? (
        <div className="flex gap-2">
          {type === "file" ? (
            <input type="file" onChange={handleChange(name)} />
          ) : (
            <input
              type="text"
              value={state?.[name]}
              onChange={handleChange(name)}
            />
          )}
          <Button
            onClick={handleClick(name)}
            loading={isLoadingUpdate}
            disabled={isLoadingUpdate}
          >
            <FontAwesomeIcon icon={faCheck} />
          </Button>
          <Button onClick={toggleEditable(action, false)}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          {type === "file" ? (
            <img
              src={`${CONFIG.BASE_URI}${state?.[name]}`}
              alt="logo"
              height="200"
              width="200"
            />
          ) : (
            <span>{data?.[name]}</span>
          )}
          <button
            className={styles["btn"]}
            onClick={toggleEditable(action, true)}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button className={styles["btn"]} onClick={handleDelete(name)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableField;