import Image from "next/image";
import { Dropdown, Button, Menu } from "antd";
import { BsThreeDots } from "react-icons/bs";
import handleRequest from "../../handleRequest";
import ApproveImg from "public/images/approve_icon.png";
import DeclineImg from "public/images/decline_icon.png";
import RevokeImg from "public/images/revoke_icon.png";
import styles from "./index.module.scss";

const menu = (record, updateRequest) => {
  const request = handleRequest(record, updateRequest);

  const handleApprove = () => {
    request({
      status: "Approved",
      title: "Approve",
      content: `Are you sure you want to approve ${record.affiliate_name} to market ${record.product_name}?`,
    });
  };

  const handleDecline = () => {
    request({
      status: "Declined",
      title: "Decline",
      content: `Are you sure you want to decline ${record.affiliate_name} from marketing ${record.product_name}?`,
      okButtonProps: {
        type: "danger",
      },
    });
  };

  const handleRevoke = () => {
    request({
      status: "Revoked",
      title: "Revoke",
      content: `Are you sure you want to revoke ${record.affiliate_name}`,
      okButtonProps: {
        type: "danger",
      },
    });
  };

  return (
    <Menu className={styles.menu}>
      <Menu.Item
        key={1}
        onClick={handleApprove}
        disabled={record.status === "Approved" || record.status === "Revoked"}
      >
        <span className={styles.image__wrapper}>
          <Image src={ApproveImg} alt="" />
        </span>
        Approve
      </Menu.Item>
      <Menu.Item
        key={2}
        onClick={handleDecline}
        disabled={record.status === "Declined" || record.status === "Revoked"}
      >
        <span className={styles.image__wrapper}>
          <Image src={DeclineImg} alt="" />
        </span>
        Decline
      </Menu.Item>
      <Menu.Item
        key={3}
        onClick={handleRevoke}
        disabled={record.status === "Revoked"}
      >
        <span className={styles.image__wrapper}>
          <Image src={RevokeImg} alt="" />
        </span>
        Revoke
      </Menu.Item>
    </Menu>
  );
};

const DropDown = ({ record, updateRequest }) => {
  return (
    <Dropdown
      overlay={menu(record, updateRequest)}
      placement="bottomRight"
      arrow
    >
      <Button type="text" shape="circle" icon={<BsThreeDots />} />
    </Dropdown>
  );
};

export default DropDown;
