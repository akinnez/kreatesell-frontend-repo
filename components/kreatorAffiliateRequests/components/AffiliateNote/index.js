import { Modal, Typography } from "antd";
import CloseIcon from "components/affiliates/CloseIcon";
import styles from "./index.module.scss";

const { Text, Title } = Typography;

const AffiliateNote = ({ notes, hideNotes, affiliateNote }) => {
  return (
    <Modal
      title={null}
      footer={null}
      visible={notes}
      onCancel={hideNotes}
      closeIcon={<CloseIcon />}
      className={styles.modal}
      width={700}
    >
      <header className={styles.header}>
        <Title level={2}>Affiliate Note</Title>
      </header>
      <div className={styles.note}>
        <p>
          <Text>{affiliateNote}</Text>
        </p>
      </div>
    </Modal>
  );
};

export default AffiliateNote;
