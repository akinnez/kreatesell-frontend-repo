import { useState } from "react";
import { Modal, Typography, Button } from "antd";
import { showToast } from "utils";
import axiosAPI from "utils/axios";
import styles from "./index.module.scss";

const { Title, Text } = Typography;

const ActionModal = ({
  actionIsVisible,
  hideAction,
  updateStatus,
  status,
  title,
  requestId,
  affiliate,
  affiliateId,
  product,
  productId,
}) => {
  const [loading, setLoading] = useState(false);

  const handlePermissions = () => {
    const data = {
      request_status: status,
      request_id: requestId,
      product_id: productId,
      affiliate_id: affiliateId,
    };

    console.log(data);

    const statuses = {
      approve: "Approved",
      decline: "Declined",
      revoke: "Revoked",
    };

    setLoading(true);
    axiosAPI.request(
      "post",
      `${process.env.BASE_URL}v1/kreatesell/product/permit/affiliates`,
      res => {
        showToast(res.message, "success");
        updateStatus(requestId, statuses[status]);
        hideAction();
      },
      err => {
        showToast(err.message, "error");
        hideAction();
      },
      data
    );
  };

  return (
    <Modal
      title={null}
      footer={null}
      closable={false}
      onCancel={hideAction}
      visible={actionIsVisible}
    >
      <header className={styles.header}>
        <Title level={4}>
          {title} {affiliate}
        </Title>
      </header>
      <section className={styles.content}>
        <p>
          <Text>
            Are you sure you want to {status}&nbsp;
            <span className={styles.name}>{affiliate}</span>
            {status !== "revoke" && (
              <>
                {status === "approve" ? " to market " : " from marketing "}
                <span className={styles.product}>{product}</span>
              </>
            )}
            ?
          </Text>
        </p>
      </section>
      <footer className={styles.footer}>
        <Button size="large" onClick={hideAction}>
          Cancel
        </Button>
        <Button
          size="large"
          type={status === "approve" ? "primary" : "danger"}
          onClick={handlePermissions}
          loading={loading}
        >
          {title}
        </Button>
      </footer>
    </Modal>
  );
};

export default ActionModal;
