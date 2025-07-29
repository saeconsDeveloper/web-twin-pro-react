import { useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import Head from "../../../Components/Head";
import styles from "./SceneGroup.module.css";
import DeleteModal from "../../../Components/Modal/DeleteModal";
import {
  useDeleteSceneGroup,
  useGetSceneGroupsList,
} from "../../../api/settings";

const SceneGroup = () => {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { mutateAsync: mutateAsyncDelete } = useDeleteSceneGroup();
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetSceneGroupsList();

  const handleDeleteInteraction = () => {
    mutateAsyncDelete(deleteId).then(res => {
      if (res?.data) {
        refetch();
      }
    });
    setShowModal(false);
  };

  const handleDelete = id => {
    setDeleteId(id);
    setShowModal(prev => !prev);
  };

  return (
    <div className="py-[30px] px-[90px] w-[80rem]">
      <Head title="Scene Group" />
      <div className="flex justify-end">
        <button
          className={styles["add-btn"]}
          onClick={() => navigate("/web-twinprocms/scene-group/create")}
        >
          <span>+</span>
          <span>Add Group</span>
        </button>
      </div>

      <div className="mt-[58px]">
        <table className="w-full">
          <thead>
            <tr>
              <td>S.N</td>
              <td>Name</td>
              <td>Color</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {isLoading || isFetching ? (
              <tr>
                <td colSpan={6}>Loading...</td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5}>Error: {JSON.stringify(error?.message)}</td>
              </tr>
            ) : (
              data?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.name}</td>
                  <td>{item?.color}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(
                          `/web-twinprocms/scene-group/${item?.id}/update`,
                          {
                            state: item,
                          }
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>{" "}
                    <button onClick={() => handleDelete(item?.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {showModal && (
            <DeleteModal
              onClose={setShowModal}
              onDelete={handleDeleteInteraction}
            />
          )}
        </table>
      </div>
    </div>
  );
};

export default SceneGroup;
