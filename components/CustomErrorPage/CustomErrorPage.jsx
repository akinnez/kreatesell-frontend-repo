import React from "react";
import styles from "./CustomErrorPage.module.scss";
import AuthLayout from "components/authlayout";
const CustomErrorPage = () => {
  return (
    // <AuthLayout>
    <div className={styles.errorContainer}>
      <h1 className={styles.errorText}>
        Oops, Sorry an unexepected error just occured
      </h1>
    </div>
    // </AuthLayout>
  );
};

export default CustomErrorPage;
