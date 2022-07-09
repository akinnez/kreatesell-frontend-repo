import { useSelector, useDispatch } from "react-redux";
import { useSWRConfig } from "swr";
import { Dropdown, Button } from "antd";
import notificationsMenu from "./notificationsMenu";
import { Bell } from "../IconPack";

const NotificationsDropdown = () => {
  const { mutate } = useSWRConfig();
  const { notifications, error } = useSelector(state => state.notification);
  const dispatch = useDispatch();

  return (
    <Dropdown
      overlay={() =>
        notificationsMenu({ notifications, error, dispatch, mutate })
      }
      placement="bottomCenter"
      trigger={["click", "hover"]}
      arrow
    >
      <Button type="text" shape="circle" icon={<Bell />} />
    </Dropdown>
  );
};

export default NotificationsDropdown;
