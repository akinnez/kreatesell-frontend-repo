import Image from "next/image";
import { Modal, Button } from "antd";
import Img from "public/images/CheckMark.png";
import styles from "./index.module.scss";

const SuccessModal = ({ successModal, hideModal, children, closable }) => (
  <Modal
    title={null}
    footer={null}
    closable={closable}
    onCancel={hideModal}
    visible={successModal}
    className={styles.success__modal}
    maskClosable={false}
    width={700}
  >
    <header className={styles.header}>
      <div>
        <Image src={Img} alt="success icon" />
      </div>
    </header>
    <section className={styles.content}>{children}</section>
    <footer className={styles.footer}>
      <Button size="large" type="primary" onClick={hideModal}>
        Go Back
      </Button>
    </footer>
  </Modal>
);

export default SuccessModal;
