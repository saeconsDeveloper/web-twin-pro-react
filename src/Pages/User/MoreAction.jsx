import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck, faPen } from "@fortawesome/free-solid-svg-icons";

import styleUser from "./User.module.css";
import { useDisclosure } from "../../hooks/useDisclosure";
import StyledModal from "../../Components/Modal/StyledModal";
import { useChangeUserStatus, useResetUserPassword } from "../../api/users";
import { useNotification } from "../../Context/NotificationProvider";

const MoreAction = ({ refetch, row }) => {
  const notification = useNotification();
  const navigate = useNavigate();
  const [userID, setUserID] = useState();
  const {
    onOpen: onOpenResetPassword,
    isOpen: isOpenResetPassword,
    onClose: onCloseResetPassword,
  } = useDisclosure();
  const {
    onOpen: onOpenChangeStatus,
    isOpen: isOpenChangeStatus,
    onClose: onCloseChangeStatus,
  } = useDisclosure();
  const {
    mutateAsync: mutateAsyncResetPassword,
    isLoading: isLoadingResetPassword,
  } = useResetUserPassword();
  const {
    mutateAsync: mutateAsyncChangeStatus,
    isLoading: isLoadingChangeStatus,
  } = useChangeUserStatus();

  const handleChangeStatus = () => {
    mutateAsyncChangeStatus(userID).then(res => {
      if (res?.data) {
        refetch();
      }
    });
    onCloseChangeStatus();
  };

  const handleResetPassword = () => {
    mutateAsyncResetPassword(userID).then(res => {
      notification.success({
        message: res?.data?.message,
      });
    });

    onCloseResetPassword();
  };

  return (
    <div>
      <button
        onClick={() => {
          setUserID(row?.id);
          onOpenResetPassword();
        }}
        className={styleUser["user-reset-password-btn"]}
      >
        Reset Password
      </button>

      <button
        onClick={() =>
          navigate(`/web-twinprocms/users/${row.id}/update`, {
            state: row,
          })
        }
        className={styleUser["user-edit-btn"]}
      >
        <FontAwesomeIcon icon={faPen} />
      </button>
      <button
        onClick={() => {
          setUserID(row?.id);
          onOpenChangeStatus();
        }}
      >
        {row?.is_active ? (
          <FontAwesomeIcon icon={faBan} className={styleUser.deactivate} />
        ) : (
          <FontAwesomeIcon icon={faCheck} className={styleUser.activate} />
        )}
      </button>

      <StyledModal
        confirmText="Reset"
        isOpen={isOpenResetPassword}
        onClose={onCloseResetPassword}
        onConfirm={handleResetPassword}
        loading={isLoadingResetPassword}
      />

      <StyledModal
        label=""
        isOpen={isOpenChangeStatus}
        onClose={onCloseChangeStatus}
        onConfirm={handleChangeStatus}
        loading={isLoadingChangeStatus}
        title={
          row?.is_active
            ? "Are you sure you want to deactivate this user?"
            : "Are you sure you want to activate this user?"
        }
        confirmText={row?.is_active ? "Deactivate it" : "Activate it"}
      />
    </div>
  );
};

export default MoreAction;
