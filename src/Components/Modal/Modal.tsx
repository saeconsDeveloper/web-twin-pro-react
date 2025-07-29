import { createPortal } from "react-dom";
//@ts-ignore
import styleModal from "./Modal.module.css";

type ModalProps = {
  onClose?: Function;
  children?: any;
  icon: any;
  title?: string;
  subtitle?: string;
  onDelete?: any;
  confirmText?: string
};

const Modal = ({
  onClose,
  children,
  icon,
  title,
  subtitle,
  onDelete,
  confirmText
}: ModalProps) => {
  return createPortal(
    <div className={styleModal.overlay}>
      <div className={styleModal.wrapper}>
        <div className={styleModal.modal}>
          <picture>{icon}</picture>
          <div className={styleModal["title-container"]}>
            <span className={styleModal.title}>{title}</span>
            <br />
            <span className={styleModal.subtitle}>{subtitle}</span>
          </div>

          <div className={styleModal["btn-container"]}>
            <button
              type="button"
              value="Yes, delete it!"
              className={styleModal.done}
              onClick={onDelete}
            >
              {confirmText ?? 'Yes, delete it!'}
            </button>

            <button
              type="button"
              className={styleModal.cancel}
              //@ts-ignore
              onClick={() => onClose(prev => !prev)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>,
    //@ts-ignore
    document.getElementById("modal")
  );
};

export default Modal;
