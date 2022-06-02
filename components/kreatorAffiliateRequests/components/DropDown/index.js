import Image from "next/image";
import { Dropdown, Button, Menu } from "antd";
import { BsThreeDots } from "react-icons/bs";
import ApproveImg from "public/images/approve_icon.png";
import DeclineImg from "public/images/decline_icon.png";
import RevokeImg from "public/images/revoke_icon.png";
import styles from "./index.module.scss";

const menu = (record, showPermissionsModal) => {
  const handler = (status, title) => {
    const data = {
      status,
      title,
      requestId: record.id,
      affiliate: record.affiliate_name,
      affiliateId: record.affiliate_id,
      product: record.product_name,
      productId: record.product_id,
    };

    showPermissionsModal(data);
  };

  return (
    <Menu className={styles.menu}>
      <Menu.Item
        key={1}
        onClick={() => handler("approve", "Approve")}
        disabled={record.status === "Approved" || record.status === "Revoked"}
      >
        <span className={styles.image__wrapper}>
          <Image src={ApproveImg} alt="Approve Icon" />
        </span>
        Approve
      </Menu.Item>
      <Menu.Item
        key={2}
        onClick={() => handler("decline", "Decline")}
        disabled={record.status === "Declined" || record.status === "Revoked"}
      >
        <span className={styles.image__wrapper}>
          <Image src={DeclineImg} alt="Decline Icon" />
        </span>
        Decline
      </Menu.Item>
      <Menu.Item
        key={3}
        onClick={() => handler("revoke", "Revoke")}
        disabled={record.status === "Revoked"}
      >
        <span className={styles.image__wrapper}>
          <Image src={RevokeImg} alt="Revoke Icon" />
        </span>
        Revoke
      </Menu.Item>
    </Menu>
  );
};

const DropDown = ({ record, showPermissionsModal }) => {
  return (
    <Dropdown
      overlay={menu(record, showPermissionsModal)}
      placement="bottomRight"
      arrow
    >
      <Button type="text" shape="circle" icon={<BsThreeDots />} />
    </Dropdown>
  );
};

export default DropDown;
