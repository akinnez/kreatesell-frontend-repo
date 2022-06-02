import Image from "next/image";
import { Modal, Button, Typography } from "antd";
import CloseIcon from "components/affiliates/CloseIcon";
import Img from "public/images/CheckMark.png";
import styles from "./index.module.scss";

const { Text } = Typography;

const SuccessModal = ({ successIsVisible, hideSuccess }) => (
  <Modal
    title={null}
    footer={null}
    onCancel={hideSuccess}
    visible={successIsVisible}
    closeIcon={<CloseIcon />}
    className={styles.success__modal}
    maskClosable={false}
    width={750}
  >
    <header className={styles.header}>
      <div>
        <Image src={Img} alt="success icon" />
      </div>
    </header>
    <section className={styles.content}>
      <p>
        <Text>Report Successfully Sent</Text>
      </p>
      <p>
        <Text>
          We would review it and if the affiliate is found guilty, they would no
          longer have access to your products.
        </Text>
      </p>
    </section>
    <footer className={styles.footer}>
      <Button size="large" type="primary" onClick={hideSuccess}>
        Go Back
      </Button>
    </footer>
  </Modal>
);

export default SuccessModal;
