import { Button, Modal } from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export const SModal = styled(Modal)`
  &.ant-modal {
    background: #fff;
    border-radius: 12px;
    padding-bottom: 0px;
    box-shadow: 6px 6px 6px 6px rgb(16 24 40 / 3%) !important;
    .ant-modal-content {
      box-shadow: none !important;
    }
  }
`;

const StyledModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  confirmText,
  title,
  label
}: any) => {
  return (
    <SModal
      centered
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      mask={false}
      closable={false}
      footer={
        <div className="flex flex-row gap-[12px] mt-[32px] w-full">
          <Button
            size="large"
            key="back"
            onClick={onClose}
            style={{ width: "80%" }}
          >
            <span className="text-[#344054] leading-[24px]">Cancel</span>
          </Button>
          <Button
            key="submit"
            size="large"
            onClick={onConfirm}
            style={{
              background: "#F04438",
              border: "1px solid #F04438",
              width: "80%",
            }}
            loading={loading}
          >
            <span className="text-white">{confirmText ?? "Delete"}</span>
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center text-center gap-6">
        <FontAwesomeIcon
          icon={faCircleExclamation}
          color="#ff6969"
          className="h-[6rem]"
        />
        <p className="text-2xl font-bold">{title ?? "Are you sure?"}</p>
        <p className="text-xl font-normal">{label ?? "You wont be able to revert this!"}</p>
      </div>
    </SModal>
  );
};

export default StyledModal;
