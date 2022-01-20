import React from "react";
import styles from "./CustomErrorPage.module.scss";
import AuthLayout from "components/authlayout";
import { Button } from "components/button/Button";
import { useRouter } from "next/router";

const CustomErrorPage = () => {
  const router = useRouter();
  return (
    // <AuthLayout>
    <div className={styles.errorContainer}>
      <h1 className={styles.errorText}>
        Oops, Sorry an unexepected error just occured
      </h1>

      <br />

      <Button
        onClick={() => router.push("/")}
        text="Return Home"
        bgColor="blue"
      />
    </div>
    // </AuthLayout>
  );
};

export default CustomErrorPage;
