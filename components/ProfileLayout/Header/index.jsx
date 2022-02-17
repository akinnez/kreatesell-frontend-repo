import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Button, Dropdown, Layout, Menu } from "antd";
import { Logout } from "../../../redux/actions";
import { ProfileIcon, Cog, Bell } from "../../IconPack";
import Logo from "../Logo";
import { NotificationDropdown } from "components/notification/Dropdown";
import style from "./index.module.scss";

const Profile = ({ name }) => {
  return (
    <>
      <div className="profile-wrapper">
        <div id="profile-content">
          <h4>{name || "Undefined"}</h4>
          <p>Account</p>
        </div>
        <div className="profile">
          <ProfileIcon />
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
        }
      `}</style>
    </>
  );
};

const menu = logout => (
  <Menu>
    <Menu.Item key="prof-1">
      <Link href="/account/kreator/store/edit">
        <a>Profile</a>
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="prof-2" onClick={() => logout()}>
      Logout
    </Menu.Item>
  </Menu>
);

const Nav = () => {
  const { Header } = Layout;

  const [info, setInfo] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  const { notifications } = useSelector(state => state.notification);

  const unreadNotification = notifications?.filter(item => !item?.is_read);

  const logout = Logout();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setInfo(user);
  }, []);

  return (
    <>
      <Header className={style.header}>
        <Logo />
        <div className={style.nav_right}>
          <Button type="text" shape="circle" icon={<Cog />} />
          <Button
            type="text"
            shape="circle"
            icon={<Bell />}
            onClick={() => setShowNotification(value => !value)}
          >
            {unreadNotification?.length > 0 && (
              <span className="red bg-red-500 absolute rounded-full h-5 w-5 text-white text-xs flex items-center justify-center -top-2 right-3">
                {unreadNotification.length}
              </span>
            )}
          </Button>
          <Dropdown overlay={menu(logout)} placement="bottomCenter" arrow>
            <Button type="text">
              <Profile name={info?.full_name} />
            </Button>
          </Dropdown>
        </div>
      </Header>
      {showNotification && <NotificationDropdown />}
    </>
  );
};

export default Nav;
