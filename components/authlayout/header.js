import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Layout, Menu, Button, Dropdown, Badge } from "antd";
import { MdOutlineMenu, MdOutlineLogout } from "react-icons/md";
import NotificationsDropdown from "components/notifications/NotificationsDropdown";
import { MobileLogo } from "./logo";
import { PageDot, ProfileIcon, Cog, EditPen2 } from "../IconPack";
import { Logout } from "../../redux/actions";
import style from "./Header.module.scss";
import { shortenDetail } from "utils";

const Profile = ({ name, avi }) => {
  return (
    <>
      <div className="profile-wrapper">
        <div id="profile-content">
          <h4 title={name}>
            {/* {name} */}
            {shortenDetail(false, name, 31, 30) || "Undefined"}
          </h4>
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

const menu = (logout) => (
  <Menu className={style.authMenu}>
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

const Nav = ({ headerTitle }) => {
  const { Header } = Layout;

  const [info, setInfo] = useState({});

  const { pathname } = useRouter();

  const {
    store: { store_details },
  } = useSelector((state) => state.store);

  const logout = Logout();

  const pageTitle = pathname?.split("/");
  const title =
    pageTitle.length >= 4
      ? pageTitle[3].toLocaleUpperCase().replace(/[\-_]/g, " ")
      : "Home";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // const user = JSON.parse(sessionStorage.getItem("user"));
    setInfo(user);
  }, []);

  return (
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
        <NotificationsDropdown />
        <Dropdown overlay={menu(logout)} placement="bottomRight" arrow>
          <Button type="text" className={style.dropdown__btn}>
            <Profile
              name={info?.full_name}
              avi={store_details?.display_picture}
            />
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default Nav;
