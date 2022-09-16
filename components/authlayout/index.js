import React, { useEffect, useState } from "react";
import styles from "./sidebar.module.scss";
import { Layout } from "antd";
import Sidebar from "./sidebar";
import Logo from "./logo";
import Nav from "./header";
import { Spin } from "antd";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ApiService from "../../utils/axios";
import * as types from "../../redux/types";
import Image from "next/image";
import Link from "next/link";
import {
  checkExpiredUserToken,
  getUser,
  getUserToken,
  showToast,
  _isUserLoggedIn,
  isAnEmpytyObject,
  NavCloseDropdownIcon,
  SideBarLoginProfile,
  PromptInfoIcon,
} from "utils";

import { useRouter } from "next/router";
import { USER } from "redux/types/auth.types";
import { GetProductTypes } from "redux/actions/product.actions";
import useFetchUtilities from "hooks/useFetchUtilities";
import useFetchStore from "hooks/useFetchStore";
import useFetchNotifications from "hooks/useFetchNotifications";

const Loader = () => {
  return (
    <>
      <div className="loader">
        <Spin size="large" />
        <p>Please wait...</p>
      </div>

      <style jsx>{`
        .loader {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};

const Index = ({
  loading,
  children,
  contentStyle,
  mobilePadding = false,
  headerTitle,
}) => {
  const { Header, Footer, Sider, Content } = Layout;
  const router = useRouter();

  const pathname = router.pathname;

  const storeSetupPromptIsShown =
    pathname === "/account/kreator/store" || pathname === "/account/dashboard";

  // console.log("prompt is Visible = ", storeSetupPromptIsShown);

  useEffect(() => {
    checkExpiredUserToken();
  }, []);
  useEffect(() => {
    if (!_isUserLoggedIn()) {
      showToast("Login required to view page", "info");
      return router.push("/login");
    }
  }, []);

  const user = useSelector((state) => state.auth);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const userIsEmpty = isAnEmpytyObject(user.user);
  const productTypes = GetProductTypes();

  useEffect(() => {
    if (userIsEmpty) {
      dispatch({ type: USER.REQUEST });

      const userStorage = getUser();

      setUserName(userStorage?.full_name);

      if (userStorage) {
        dispatch({ type: USER.SUCCESS, payload: userStorage });
      }
    }
  }, [dispatch, userIsEmpty]);

  useEffect(() => {
    productTypes();
  }, []);

  useFetchUtilities();
  useFetchStore();
  useFetchNotifications();

  const [isMobileSideBarOpen, setIsMobileSideBarOpen] = useState(false);
  const toggleView = () => setIsMobileSideBarOpen(!isMobileSideBarOpen);

  return (
    <section className={styles.layoutMain}>
      {storeSetupPromptIsShown && <SetUpPrompt />}
      <Layout>
        <Sider
          width={250}
          theme="light"
          style={{
            height: "100vh",
            position: "sticky",
            top: 0,
            left: 0,
          }}
          trigger={null}
          breakpoint="lg"
          collapsedWidth={0}
        >
          <div style={{ padding: "0 5px" }}>
            <Logo />
            <Sidebar />
          </div>
        </Sider>
        {isMobileSideBarOpen && (
          <div className={styles.mobileSideBar}>
            <div className={styles.profile}>
              <div className={styles.profileImgBox}>
                <Image src={SideBarLoginProfile} alt="profile" />
              </div>
              <div className={styles.details}>
                <p>{userName ? userName : ""}</p>
                <div>Business Account</div>
              </div>
              <div className={styles.dropDown}>
                <Image src={NavCloseDropdownIcon} alt="closeDropdownIcon" />
              </div>
            </div>
            <Sidebar isMobileView={true} />
          </div>
        )}
        <Layout>
          <Nav
            headerTitle={headerTitle}
            toggleView={toggleView}
            isMobileSideBarOpen={isMobileSideBarOpen}
          />
          {/* <div className={styles.mobileLoginSideBar}>
            <Sidebar />
          </div> */}
          <Content
            // style={{
            // 	backgroundColor: "rgba(245, 245, 245, 1)",
            // 	padding: "50px 20px 10px 20px",
            // }}

            // The previous style above was replaced with the one below cos a different bg needed to be dynamically rendered for mobile view.
            className={`content ${
              mobilePadding && `authLayout-no-mobile-padding`
            }`}
          >
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {loading ? <Loader /> : children}
          </Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </Layout>

      <style jsx>{`
        .content {
          background-color: rgba(245, 245, 245, 1);
          padding: 50px 30px 10px 30px;
        }
      `}</style>
    </section>
  );
};

const SetUpPrompt = () => {
  return (
    <div className={styles.setUpPrompt}>
      <div className={styles.promptHeader}>
        <Image src={PromptInfoIcon} alt="prompt info" />
        <h4> Finish your store set up</h4>
      </div>
      <p>
        Provide all the required information for your store to be fully setup
        and activated. <Link href="/">Click here to proceed</Link>.
      </p>
    </div>
  );
};

export default Index;
