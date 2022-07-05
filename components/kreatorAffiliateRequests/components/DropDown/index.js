import Image from "next/image";
import { Dropdown, Button, Menu } from "antd";
import { BsThreeDots } from "react-icons/bs";
import ApproveImg from "public/images/approve_icon.png";
import DeclineImg from "public/images/decline_icon.png";
import RevokeImg from "public/images/revoke_icon.png";
import styles from "./index.module.scss";

const menu = ({ status, showActionModal, ...props }) => {
  const handler = (requestStatus, title) => {
    showActionModal({ status: requestStatus, title, ...props });
  };

  return (
    <Menu className={styles.menu}>
      <Menu.Item
        key={1}
        onClick={() => handler("approve", "Approve")}
        disabled={status === "Approved" || status === "Revoked"}
      >
        <span className={styles.image__wrapper}>
          <Image src={ApproveImg} alt="Approve Icon" />
        </span>
        Approve
      </Menu.Item>
      <Menu.Item
        key={2}
        onClick={() => handler("decline", "Decline")}
        disabled={status === "Declined" || status === "Revoked"}
      >
        <span className={styles.image__wrapper}>
          <Image src={DeclineImg} alt="Decline Icon" />
        </span>
        Decline
      </Menu.Item>
      <Menu.Item
        key={3}
        onClick={() => handler("revoke", "Revoke")}
        disabled={status === "Revoked"}
      >
        <span className={styles.image__wrapper}>
          <Image src={RevokeImg} alt="Revoke Icon" />
        </span>
        Revoke
      </Menu.Item>
    </Menu>
  );
};

const DropDown = props => (
  <Dropdown
    overlay={menu(props)}
    placement="bottomRight"
    trigger={["click", "hover"]}
    arrow
  >
    <Button
      className={styles.btn}
      type="text"
      shape="circle"
      icon={<BsThreeDots />}
    />
  </Dropdown>
);

export default DropDown;
