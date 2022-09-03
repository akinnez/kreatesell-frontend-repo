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
import {
  checkExpiredUserToken,
  getUser,
  getUserToken,
  showToast,
  _isUserLoggedIn,
  isAnEmpytyObject,
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

  const dispatch = useDispatch();
  const userIsEmpty = isAnEmpytyObject(user.user);
  const productTypes = GetProductTypes();

  useEffect(() => {
    if (userIsEmpty) {
      dispatch({ type: USER.REQUEST });

      const userStorage = getUser();

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
    <>
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
        {/* <div className={styles.mobileSideBar}>
          <Sidebar isMobileView={true} />
        </div> */}
        <Layout>
          <Nav
            headerTitle={headerTitle}
            toggleView={toggleView}
            isMobileSideBarOpen={isMobileSideBarOpen}
          />
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
    </>
  );
};

export default Index;
