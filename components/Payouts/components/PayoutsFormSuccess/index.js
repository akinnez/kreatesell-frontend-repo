import Image from "next/image";
import { useRouter } from "next/router";
import { Typography, Modal, Button } from "antd";
import CloseIcon from "components/affiliates/CloseIcon";
import Img from "public/images/CheckMark.png";
import styles from "./index.module.scss";

const { Text } = Typography;

const PayoutsFormSuccess = ({ successModal, title }) => {
  const { back } = useRouter();

  const goBack = () => {
    back();
  };

  return (
    <Modal
      title={null}
      footer={null}
      onCancel={goBack}
      visible={successModal}
      closeIcon={<CloseIcon />}
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
          <Text>Account Details Successfully {title}</Text>
        </p>
        <p>
          <Text>
            Congratulations! You can now start seamlessly receiving your
            settlement as at when due.
          </Text>
        </p>
      </section>
      <footer className={styles.footer}>
        <Button size="large" type="primary" onClick={goBack}>
          Go Back
        </Button>
      </footer>
    </Modal>
  );
};

export default PayoutsFormSuccess;
