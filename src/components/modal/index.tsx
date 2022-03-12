import ReactModal, { Props } from "react-modal";

// Styles
import styles from "./styles.module.scss";

interface ModalProps
  extends Pick<
    Props,
    | "isOpen"
    | "onRequestClose"
    | "shouldCloseOnOverlayClick"
    | "shouldCloseOnEsc"
    | "children"
  > {
  className: string;
}

export const Modal = ({ children, className, ...props }: ModalProps) => {
  return (
    <ReactModal
      className={{
        base: className,
        afterOpen: styles.afterOpen,
        beforeClose: styles.beforeClose,
      }}
      overlayClassName={{
        base: styles.overlayBaseModal,
        afterOpen: styles.overlayAfterOpen,
        beforeClose: styles.overlayBeforeClose,
      }}
      {...props}
      closeTimeoutMS={250}
    >
      {children}
    </ReactModal>
  );
};
