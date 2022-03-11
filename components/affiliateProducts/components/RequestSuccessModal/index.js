import Image from "next/image";
import { Modal, Typography } from "antd";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Img from "public/images/CheckMark.png";
import styles from "./index.module.scss";

const { Text } = Typography;

const CloseIcon = () => (
  <span
    role="img"
    aria-label="close"
    className="anticon anticon-close ant-modal-close-icon"
  >
    <AiOutlineCloseCircle />
  </span>
);

const RequestSuccessModal = ({ showModal, handleHideModal }) => {
  return (
    <Modal
      title={null}
      footer={null}
      onCancel={handleHideModal}
      visible={showModal}
      closeIcon={<CloseIcon />}
      className={styles.success__modal}
      width={600}
    >
      <header className={styles.header}>
        <div>
          <Image src={Img} alt="success icon" />
        </div>
      </header>
      <div className={styles.content}>
        <p>
          <Text strong>Your request has been sent to the Kreator</Text>
        </p>
        <p>
          <Text>
            You will be notified when the Kreator accepts or rejects your
            request
          </Text>
        </p>
      </div>
    </Modal>
  );
};

export default RequestSuccessModal;
