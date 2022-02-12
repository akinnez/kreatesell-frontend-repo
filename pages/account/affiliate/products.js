import React from "react";
import AuthLayout from "components/authlayout";
import styles from "public/css/AffiliateProducts.module.scss";
import { useSelector } from "react-redux";

const AffiliateProducts = () => {
  const state = useSelector(state => state);
  console.log(state);
  return (
    <AuthLayout>
      <div>AffiliateProducts</div>
    </AuthLayout>
  );
};

export default AffiliateProducts;
