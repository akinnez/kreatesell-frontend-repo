import Image from "next/image";
import { Typography, Modal, Button } from "antd";
import Img from "public/images/CheckMark.png";
import styles from "./index.module.scss";

const { Text } = Typography;

const WithdrawSuccess = ({ successModal, hideModal }) => (
  <Modal
    title={null}
    footer={null}
    closable={false}
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
    <section className={styles.content}>
      <p>
        <Text>Money is being processed</Text>
      </p>
      <p>
        <Text>
          Kindly exercise patience while we process your funds. Processing takes
          about 24 hours before reflecting in your account
        </Text>
      </p>
    </section>
    <footer className={styles.footer}>
      <Button size="large" type="primary" onClick={hideModal}>
        Go Back
      </Button>
    </footer>
  </Modal>
);

export default WithdrawSuccess;
