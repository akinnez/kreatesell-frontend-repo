import { Modal, Button } from "antd";
import styles from "./modal.module.scss";
const FeedBackModal = ({ closeModal, visible }) => {
  //   const handleOk = () => closeModal();
  const handleCancel = () => closeModal();

  return (
    <Modal
      title=""
      visible={visible}
      onCancel={handleCancel}
      className={styles.modal}
    >
      <div className={styles.container}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod aliquid
        magnam eligendi nesciunt error tempore cum velit sequi ipsam quasi nam,
        recusandae incidunt unde, numquam iste blanditiis, cumque laboriosam
        non?
      </div>
    </Modal>
  );
};

export default FeedBackModal;
