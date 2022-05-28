import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Layout, Menu, Button, Dropdown } from "antd";
import { MdOutlineMenu, MdOutlineLogout } from "react-icons/md";
import { Logout, GetNotifications } from "../../redux/actions";
import { PageDot, ProfileIcon, Cog, Bell, EditPen2, LogoutIcon2} from "../IconPack";
import { _getMyStoreDetails } from "utils";
import { MobileLogo } from "./logo";
import { NotificationDropdown } from "components/notification/Dropdown";
import style from "./Header.module.scss";

const Profile = ({ name, avi }) => {
  return (
    <>
      <div className="profile-wrapper">
        <div id="profile-content">
          <h4>{name || "Undefined"}</h4>
          <p>Account</p>
        </div>
        <div className="profile">
          {avi ? <Image src={avi} width={"100%"} height={"100%"} objectFit="cover"/> :<ProfileIcon />}
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
      
      <a className={style.edit}><EditPen2 />Edit Profile</a>
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

const Nav = ({ headerTitle }) => {
  const { Header } = Layout;

  const [info, setInfo] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  const { pathname } = useRouter();
  const [store] = useState(_getMyStoreDetails())
  // const store = _getMyStoreDetails();

  const { notifications } = useSelector(state => state.notification);

  const unreadNotification = notifications?.filter(item => !item?.is_read);

  const logout = Logout();
  const getNotifications = GetNotifications();

  const pageTitle = pathname?.split("/");
  const title =
    pageTitle.length >= 4
      ? pageTitle[3].toLocaleUpperCase().replace(/[\-_]/g, " ")
      : "Home";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setInfo(user);
    getNotifications(store?.user_id);
  }, []);

  return (
    <>
      <Header className={style.header}>
        <div className={style.nav_left}>
          <div className={style.mobileMenu}>
            <Button type="text" shape="circle" icon={<MdOutlineMenu />} />
            <MobileLogo />
          </div>
          <div className={style.pageDot}>
            <PageDot />
            <h1>{headerTitle || title}</h1>
          </div>
        </div>
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
              <Profile name={info?.full_name} avi={info?.business_logo} />
            </Button>
          </Dropdown>
        </div>
      </Header>
      {showNotification && <NotificationDropdown />}
    </>
  );
};

export default Nav;
