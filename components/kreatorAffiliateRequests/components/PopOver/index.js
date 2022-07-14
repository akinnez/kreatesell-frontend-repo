import { useState } from "react";
import Image from "next/image";
import { Button, Popover, Typography, Divider, Avatar } from "antd";
import { FaRegUser } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { AiOutlineCloseCircle, AiOutlineStop } from "react-icons/ai";
import styles from "./index.module.scss";
import AffiliateAvatar from "../AffiliateAvatar";
import PopOverFooter from "../PopOverFooter";

const { Text } = Typography;

const PopOver = ({
  affiliateReported,
  affiliateProfileImage,
  affiliateName,
  affiliateUniqueUsername,
  affiliateCountry,
  affiliateId,
  showReportModal,
}) => {
  const [visible, setVisible] = useState(false);

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
      <AffiliateAvatar
        image={affiliateProfileImage}
        affiliateName={affiliateName}
      />
      <section className={styles.affiliate__info}>
        <p>
          <Text>{affiliateName}</Text>
        </p>
        <p>
          <Text>{affiliateUniqueUsername}</Text>
        </p>
        <p>
          <Text>{affiliateCountry}</Text>
        </p>
      </section>
      <Divider className={styles.divider} />
      <PopOverFooter
        affiliateReported={affiliateReported}
        affiliateId={affiliateId}
        showReport={showReport}
      />
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
      <Button type="link" className={styles.btn}>
        <span>
          <IoEllipsisVertical />
        </span>
        {affiliateName}
      </Button>
    </Popover>
  );
};

export default PopOver;
