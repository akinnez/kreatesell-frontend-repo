import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { CreateProductTab, CheckoutProductTab } from "components";
import Tab from "components/tab";
import AuthLayout from "../../../../components/authlayout";
import { Card } from "components/card";
import { useSelector } from "react-redux";
import { SetProductTab } from "redux/actions";
import MembershipTab from "components/products/BusinessSection/MembershipTab";
import styles from "../../../../public/css/CreateProducts.module.scss";

const CreateProduct = () => {
  const router = useRouter();
  const setProductTab = SetProductTab();
  const { productTab, product } = useSelector((state) => state.product);
  // const state = useSelector((state) => state.product);
  const [titles, setTitles] = useState(["Product Design", "Checkout"]);
  const [isTabsActive, setIsTabsActive] = useState(true);
  const [selectedTab, setSelectedTab] = useState(1);
  const [productId, setProductId] = useState(null);
  useEffect(() => {
    return () => {
      setProductTab(0);
    };
  }, []);

  // console.log("productTab = ", productTab);
  const productName = product?.product_details?.product_name;

  // const productCreationNotComplete = productName === undefined || productName === "";
  const productCreationNotComplete = !productName;
  useEffect(() => {
    if (router.query) {
      setProductId(router.query.productId);
    }
  }, [router.query]);

  return (
    <AuthLayout>
      {isTabsActive && (
        <Card
          style={{ padding: "5px 2px 0", marginBottom: "1em" }}
          className={styles.cardContainer}
        >
          <Tab
            titles={titles}
            disableCheckout={productCreationNotComplete}
            active={productTab}
            onSelect={(e) => {
              setProductTab(e);
            }}
            key={productTab}
          ></Tab>
        </Card>
      )}
      {productTab === 0 && (
        <Card style={{ padding: "60px 1.5rem 60px 1.5rem " }}>
          <CreateProductTab
            setSelectedTab={setSelectedTab}
            titles={titles}
            setTitles={setTitles}
            {...{ selectedTab, productId }}
          />
        </Card>
      )}
      {productTab === 1 && (
        <Card style={{ padding: "60px 48px 60px 48px " }}>
          <CheckoutProductTab {...{ productId }} />
        </Card>
      )}
      {productTab === 2 && (
        <MembershipTab setIsTabsActive={setIsTabsActive} {...{ productId }} />
      )}
    </AuthLayout>
  );
};

export default CreateProduct;
