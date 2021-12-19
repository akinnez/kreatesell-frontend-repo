import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Layout } from "antd";
import Sidebar from "./sidebar";
import Logo from "./logo";
import Nav from "./header";
import { Spin } from "antd";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { getCountries } from "../../redux/actions/utilityActions";
import { getStore } from "../../redux/actions/store.actions";
import ApiService from "../../utils/axios";
import * as types from "../../redux/types";
import {
  checkExpiredUserToken,
  getUserToken,
  showToast,
  _isUserLoggedIn,
} from "utils";
import { useRouter } from "next/router";

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

const Index = ({ loading, children, contentStyle, mobilePadding = false }) => {
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

  return (
    <>
      <Layout>
        <Sider
          width={300}
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
          <div style={{ padding: "0 15px" }}>
            <Logo />
            <Sidebar />
          </div>
        </Sider>
        <Layout>
          <Nav />
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
          padding: 50px 20px 10px 20px;
        }
      `}</style>
    </>
  );
};

export default Index;
