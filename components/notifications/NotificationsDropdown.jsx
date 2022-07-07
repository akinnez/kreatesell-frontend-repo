import { useSelector } from "react-redux";
import { Dropdown, Button } from "antd";
import notificationsMenu from "./notificationsMenu";
import { Bell } from "../IconPack";

const NotificationsDropdown = () => {
  const { notifications, error } = useSelector(state => state.notification);

  return (
    <Dropdown
      overlay={() => notificationsMenu(notifications, error)}
      placement="bottomCenter"
      trigger={["click", "hover"]}
      arrow
    >
      <Button type="text" shape="circle" icon={<Bell />} />
    </Dropdown>
  );
};

export default NotificationsDropdown;
