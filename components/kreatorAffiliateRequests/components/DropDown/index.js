import Image from "next/image";
import { Dropdown, Button, Menu } from "antd";
import { BsThreeDots } from "react-icons/bs";
import ApproveImg from "public/images/approve_icon.png";
import DeclineImg from "public/images/decline_icon.png";
import RevokeImg from "public/images/revoke_icon.png";
import approveRequest from "components/kreatorAffiliateRequests/approveRequest";
import declineRequest from "components/kreatorAffiliateRequests/declineRequest";
import revokeRequest from "components/kreatorAffiliateRequests/revokeRequest";
import styles from "./index.module.scss";

const menu = (record, updateRequest) => {
  const handleApprove = () => {
    approveRequest(record, updateRequest);
  };

  const handleDecline = () => {
    declineRequest(record, updateRequest);
  };

  const handleRevoke = () => {
    revokeRequest(record, updateRequest);
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
