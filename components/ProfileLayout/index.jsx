import { useEffect } from "react";
import { Layout } from "antd";
import Nav from "./Header";
import { Spin } from "antd";
import { ToastContainer } from "react-toastify";
import { checkExpiredAdminToken, showToast, _isUserLoggedIn } from "utils";
import { useRouter } from "next/router";
import styles from "./index.module.scss";

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

const ProfileLayout = ({
  loading,
  children,
  contentStyle,
  mobilePadding = false,
}) => {
  const { Content } = Layout;
  const router = useRouter();

  useEffect(() => {
    checkExpiredAdminToken();
  }, [router]);

  useEffect(() => {
    if (!_isUserLoggedIn()) {
      showToast("Login required to view page", "info");
      return router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Layout>
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
            {loading ? (
              <Loader />
            ) : (
              <div className={styles.container}>{children}</div>
            )}
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

export default ProfileLayout;
