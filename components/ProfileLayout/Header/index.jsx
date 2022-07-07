import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Button, Dropdown, Layout, Menu, Badge } from "antd";
import { MdOutlineLogout } from "react-icons/md";
import NotificationsDropdown from "components/notifications/NotificationsDropdown";
import Logo from "../Logo";
import { ProfileIcon, Cog, EditPen2 } from "../../IconPack";
import { notificationTypes } from "utils/notificationTypes";
import { Logout } from "../../../redux/actions";
import style from "./index.module.scss";

const Profile = ({ name, avi }) => {
  return (
    <>
      <div className="profile-wrapper">
        <div id="profile-content">
          <h4>{name || "Undefined"}</h4>
          <p>Account</p>
        </div>
        <div className="profile">
          {!avi || avi === "Images\\ProfilePicture\\imageIcon" ? (
            <ProfileIcon />
          ) : (
            <Image
              src={avi}
              width={"100%"}
              height={"100%"}
              alt={name}
              objectFit="cover"
            />
          )}
        </div>
      </div>
      <style jsx>{`
        .profile-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        #profile-content h4,
        #profile-content p {
          margin: 0;
          line-height: 1.1;
          text-align: right;
        }

        #profile-content h4 {
          color: rgba(89, 89, 89, 1);
          font-weight: bold;
        }

        #profile-content p {
          color: rgba(140, 140, 140, 1);
        }

        .profile {
          box-shadow: 0px 20px 27px rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          width: 42px;
          height: 42px;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

const menu = logout => (
  <Menu>
    <Menu.Item key="prof-1">
      <Link href="/account/kreator/store/edit">
        <a className={style.edit}>
          <EditPen2 />
          Edit Profile
        </a>
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="prof-2" onClick={() => logout()}>
      <a className={style.edit}>
        <MdOutlineLogout />
        Logout
      </a>
    </Menu.Item>
  </Menu>
);

const Header = () => {
  const { Header: AntHeader } = Layout;

  const [info, setInfo] = useState({});

  const { notifications } = useSelector(state => state.notification);

  const {
    store: { store_details },
  } = useSelector(state => state.store);

  const count = useMemo(() => {
    if (!notifications || notifications.length === 0) return 0;

    return notifications.reduce((total, notification) => {
      const typeExists = notification.notification_type in notificationTypes;
      if (!typeExists) return total;

      return notification.is_read === false ? total + 1 : total;
    }, 0);
  }, [notifications]);

  const logout = Logout();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setInfo(user);
  }, []);

  return (
    <AntHeader className={style.header}>
      <Link href="/account/dashboard">
        <a>
          <Logo />
        </a>
      </Link>
      <div className={style.nav_right}>
        <Button type="text" shape="circle" icon={<Cog />} />
        <Badge
          count={count}
          color="#f5222d"
          overflowCount={10}
          offset={count > 10 ? [5, 5] : [-2, 5]}
        >
          <NotificationsDropdown />
        </Badge>
        <Dropdown overlay={menu(logout)} placement="bottomCenter" arrow>
          <Button type="text" className={style.dropdown__btn}>
            <Profile
              name={info?.full_name}
              avi={store_details?.display_picture}
            />
          </Button>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;
