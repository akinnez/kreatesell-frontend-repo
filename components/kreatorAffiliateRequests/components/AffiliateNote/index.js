import { Modal, Typography } from "antd";
import CloseIcon from "components/affiliates/CloseIcon";
import styles from "./index.module.scss";

const { Text } = Typography;

const AffiliateNote = ({ notes, hideNotes }) => {
  return (
    <Modal
      title={null}
      footer={null}
      visible={notes}
      onCancel={hideNotes}
      closeIcon={<CloseIcon />}
      className={styles.modal}
      width={765}
    >
      <header className={styles.header}>Affiliate Note</header>
      <div className={styles.note}>
        <p>
          <Text>{notes}</Text>
        </p>
      </div>
    </Modal>
  );
};

export default AffiliateNote;
