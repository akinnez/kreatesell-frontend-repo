import { useState } from "react";
import Image from "next/image";
import { Button, Popover, Typography, Divider } from "antd";
import { IoEllipsisVertical } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from "./index.module.scss";

const { Text } = Typography;

const PopOver = ({ record, showReportModal }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibility = value => visible => {
    setVisible(value ? value : visible);
  };

  const showReport = id => {
    showReportModal(id);
    handleVisibility(false)();
  };

  const content = (
    <div className={styles.content__container}>
      <div className={styles.close__btn}>
        <Button
          onClick={handleVisibility(false)}
          icon={<AiOutlineCloseCircle />}
        />
      </div>
      <header className={styles.header}>
        <div>
          <Image src="" alt="" />
        </div>
      </header>
      <section className={styles.affiliate__info}>
        <p>
          <Text>{record.affiliate}</Text>
        </p>
        <p>
          <Text>Unique Username</Text>
        </p>
        <p>
          <Text>Nigeria</Text>
        </p>
      </section>
      <Divider className={styles.divider} />
      <footer className={styles.footer}>
        <Button type="danger" onClick={() => showReport(record.affiliateId)}>
          Report Affiliate
        </Button>
      </footer>
    </div>
  );

  return (
    <Popover
      title={null}
      content={content}
      trigger="click"
      placement="top"
      visible={visible}
      onVisibleChange={handleVisibility()}
    >
      <Button icon={<IoEllipsisVertical />} type="link">
        {record.affiliate}
      </Button>
    </Popover>
  );
};

export default PopOver;
