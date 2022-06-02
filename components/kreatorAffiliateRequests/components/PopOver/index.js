import { useState } from "react";
import Image from "next/image";
import { Button, Popover, Typography, Divider, Avatar } from "antd";
import { FaRegUser } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { AiOutlineCloseCircle, AiOutlineStop } from "react-icons/ai";
import styles from "./index.module.scss";

const { Text } = Typography;

const PopOver = ({ record, showReportModal }) => {
  const [visible, setVisible] = useState(false);

  const reported = record.affiliate_reported === "false" ? false : true;

  const handleVisibility = value => visible => {
    setVisible(value || value === false ? value : visible);
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
        {!record.affiliate_profile_image ||
        record.affiliate_profile_image ===
          "Images\\ProfilePicture\\imageIcon" ? (
          <Avatar
            size={100}
            icon={<FaRegUser />}
            className={styles.profile__image__placeholder}
          />
        ) : (
          <Avatar
            size={100}
            src={
              <Image
                src={record.affiliate_profile_image}
                layout="fill"
                alt={`${record.affiliate_name}`}
              />
            }
          />
        )}
      </header>
      <section className={styles.affiliate__info}>
        <p>
          <Text>{record.affiliate_name}</Text>
        </p>
        <p>
          <Text>{record.affiliate_unique_username}</Text>
        </p>
        <p>
          <Text>{record.affiliate_country}</Text>
        </p>
      </section>
      <Divider className={styles.divider} />
      <footer className={styles.footer}>
        {reported ? (
          <Button size="large" icon={<AiOutlineStop />} disabled>
            Reported
          </Button>
        ) : (
          <Button
            size="large"
            danger
            onClick={() => showReport(record.affiliate_id)}
            icon={<AiOutlineStop />}
          >
            Report Affiliate
          </Button>
        )}
      </footer>
    </div>
  );

  return (
    <Popover
      title={null}
      content={content}
      trigger="click"
      placement="bottomLeft"
      visible={visible}
      onVisibleChange={handleVisibility()}
    >
      <Button icon={<IoEllipsisVertical />} type="link" className={styles.btn}>
        {record.affiliate_name}
      </Button>
    </Popover>
  );
};

export default PopOver;
