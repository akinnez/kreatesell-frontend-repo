import React, { useEffect, useState, useCallback } from "react";
import styles from "./sidebar.module.scss";
import { Layout } from "antd";
import Sidebar from "./sidebar";
import Logo from "./logo";
import Nav from "./header";
import useSWR from "swr";
import { Spin, Dropdown } from "antd";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ApiService from "../../utils/axios";
import * as types from "../../redux/types";
import Image from "next/image";
import Link from "next/link";
import fetcher from "../../utils/fetcher";
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
import { Logout } from "../../redux/actions";
import { useRouter } from "next/router";
import { USER } from "redux/types/auth.types";
import { GetProductTypes } from "redux/actions/product.actions";
import useFetchUtilities from "hooks/useFetchUtilities";
import useFetchStore from "hooks/useFetchStore";
import useFetchNotifications from "hooks/useFetchNotifications";
import { menu } from "./header";

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
  const [info, setInfo] = useState("");
  const pathname = router.pathname;

  const {
    store: { store_details },
  } = useSelector((state) => state.store);

  const { data } = useSWR("v1/kreatesell/store/me", fetcher);
  // console.log("data from store = ", data?.user);

  const userPlan = data?.user?.user_plan;
  const percentageCompleted = data?.percentage_completed;

  const storeSetupPromptIsShown = useCallback(() => {
    return (
      percentageCompleted <= 80 &&
      (pathname === "/account/kreator/store" ||
        pathname === "/account/dashboard")
    );
  }, [percentageCompleted, pathname]);

  // console.log("prompt is Visible = ", storeSetupPromptIsShown);

  useEffect(() => {
    checkExpiredUserToken();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // const user = JSON.parse(sessionStorage.getItem("user"));
    setInfo(user);
  }, []);

  // console.log("info = ", info);
  // console.log("store details = ", store_details);

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
  const logout = Logout();
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

  const [showOverlayOnClick, setShowOverlayOnClick] = useState(false);

  return (
    <section className={styles.layoutMain}>
      {storeSetupPromptIsShown() && (
        <SetUpPrompt show={storeSetupPromptIsShown()} />
      )}
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
                {store_details?.display_picture ? (
                  <Image
                    src={store_details?.display_picture}
                    alt="profile"
                    width={"100%"}
                    height={"100%"}
                    objectFit="cover"
                  />
                ) : (
                  <Image src={SideBarLoginProfile} alt="profile" />
                )}
              </div>
              <div className={styles.details}>
                <p>{info?.full_name ? info.full_name : ""}</p>
                <div
                  className={
                    userPlan === "Business"
                      ? styles.businessPlan
                      : styles.basicPlan
                  }
                >
                  {userPlan === "Business"
                    ? "Business Account"
                    : "Basic Account"}
                </div>
              </div>
              <Dropdown
                overlay={menu(logout)}
                placement="bottomRight"
                arrow
                visible={showOverlayOnClick}
                // onMouseOut={() => setShowOverlayOnClick(false)}
                onClick={() => {
                  setShowOverlayOnClick(true);
                  // * close after 5 seconds
                  setTimeout(() => {
                    setShowOverlayOnClick(false);
                  }, 5000);
                }}
              >
                <div className={styles.dropDown}>
                  <Image src={NavCloseDropdownIcon} alt="closeDropdownIcon" />
                </div>
              </Dropdown>
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

const SetUpPrompt = ({ show }) => {
  return (
    <div className={`${styles.setUpPrompt} ${show ? styles.show : ""}`}>
      <div className={styles.promptHeader}>
        <Image src={PromptInfoIcon} alt="prompt info" />
        <h4> Finish your store set up</h4>
      </div>
      <p>
        Provide all the required information for your store to be fully setup
        and activated.{" "}
        <Link href="/account/kreator/store/edit">Click here to proceed</Link>.
      </p>
    </div>
  );
};

export default Index;
