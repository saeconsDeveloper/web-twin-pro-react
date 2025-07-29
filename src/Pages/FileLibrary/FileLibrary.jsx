import { useState } from "react";
import { Dropdown, Space } from "antd";
import {
  faChevronDown,
  faDownload,
  faPen,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AddFile from "./AddFile";
import AddFolder from "./AddFolder";
import EditFolder from "./EditFolder";
import Head from "../../Components/Head";
import styleFileLibrary from "./FileLibrary.module.css";
import StackLogo from "../../assets/stack-logo-blue.svg";
import { useDisclosure } from "../../hooks/useDisclosure";
import DeleteModal from "../../Components/Modal/DeleteModal";
import {
  useDeleteFile,
  useGetFileLibraryDetail,
  useGetFileLibraryList,
} from "../../api/fileLibrary";
import { CONFIG } from "../../config";

const FileLibrary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenAddFolder,
    onOpen: onOpenAddFolder,
    onClose: onCloseAddFolder,
  } = useDisclosure();
  const {
    isOpen: isOpenAddFile,
    onOpen: onOpenAddFile,
    onClose: onCloseAddFile,
  } = useDisclosure();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { data, refetch, isLoading, isError, error } = useGetFileLibraryList();
  const {
    data: dataDetail,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
    error: errorDetail,
    refetch: refetchdt,
  } = useGetFileLibraryDetail(id);
  const { mutateAsync: mutateAsyncDelete } = useDeleteFile();

  const handleDeleteModel = () => {
    mutateAsyncDelete(deleteId).then((res) => {
      if (res.data) {
        setShowModal(false);
        if (id) {
          refetchdt();
        } else {
          refetch();
        }
      }
    });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal((prev) => !prev);
  };

  const handleMenuClick = (e) => {
    navigate(`/web-twinprocms/file-library/${e.key}`);
  };

  const items = ((id ? dataDetail?.sub_folders : data?.sub_folders) || [])?.map(
    (sub_folder) => ({
      label: sub_folder?.name,
      key: sub_folder?.id,
    })
  );

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <main className={styleFileLibrary["file-library-main-container"]}>
      <Head title='File Library' />
      <div className={styleFileLibrary["file-library-title-btn-container"]}>
        <h1>{id ? dataDetail?.name : data?.name}</h1>
        <div className={styleFileLibrary["file-library-btn-container"]}>
          <Dropdown menu={menuProps}>
            <button>
              <Space>
                Go To
                <FontAwesomeIcon icon={faChevronDown} />
              </Space>
            </button>
          </Dropdown>
          <button className={styleFileLibrary.edit} onClick={onOpenEdit}>
            <FontAwesomeIcon icon={faPen} /> Edit Folder
          </button>
          <button className={styleFileLibrary.add} onClick={onOpenAddFolder}>
            <FontAwesomeIcon icon={faPlus} /> Add Folder
          </button>
          <button
            className={styleFileLibrary["add-file"]}
            onClick={onOpenAddFile}>
            <FontAwesomeIcon icon={faPlus} /> Add File
          </button>
          <EditFolder
            name={id ? dataDetail?.name : data?.name}
            isOpen={isOpenEdit}
            onClose={onCloseEdit}
            id={id ? id : data?.id}
            refetch={id ? refetchdt : refetch}
          />
          <AddFolder
            isOpen={isOpenAddFolder}
            onClose={onCloseAddFolder}
            id={id ? id : data?.id}
            refetch={id ? refetchdt : refetch}
          />
          <AddFile
            isOpen={isOpenAddFile}
            onClose={onCloseAddFile}
            id={id ? id : data?.id}
            refetch={id ? refetchdt : refetch}
          />
        </div>
      </div>
      <div>
        {(id ? isLoadingDetail : isLoading) ? (
          <p>Loading....</p>
        ) : (id ? isErrorDetail : isError) ? (
          <p>{id ? errorDetail?.message : error?.message}</p>
        ) : (
          <div
            className={`${styleFileLibrary["responsive-cards"]} grid grid-cols-3 gap-6 py-8`}>
            {/* <div className="flex flex-wrap gap-6 py-8"> */}
            {((id ? dataDetail?.model_3Ds : data?.model_3Ds) || [])?.map(
              (model_3Ds) => {
                const downLoadFile = `${CONFIG.BASE_URI}${model_3Ds?.file}`;
                return (
                  <div
                    key={model_3Ds?.id}
                    className='border rounded py-8 px-12 flex flex-col items-center gap-8'>
                    <div className='w-full flex gap-2 justify-end'>
                      <button
                        className={styleFileLibrary.trash}
                        onClick={() => handleDelete(model_3Ds?.id)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                      <a
                        href={downLoadFile}
                        download
                        className={`${styleFileLibrary.download} text-black`}>
                        <FontAwesomeIcon icon={faDownload} />
                      </a>
                    </div>
                    <img
                      src={StackLogo}
                      alt='stack-logo'
                      height='100'
                      width='100'
                    />
                    <p>{model_3Ds?.file.replace(/^\/media\/models\//, "")}</p>
                  </div>
                );
              }
            )}
          </div>
        )}
        {showModal && (
          <DeleteModal onClose={setShowModal} onDelete={handleDeleteModel} />
        )}
      </div>
    </main>
  );
};

export default FileLibrary;
