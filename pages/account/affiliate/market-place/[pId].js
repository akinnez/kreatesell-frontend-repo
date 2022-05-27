import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Tabs, Typography } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import BackButton from "components/BackButton";
import Spinner from "components/Spinner";
import AffiliateRequestContainer from "components/affiliates/AffiliateRequestContainer";
import AffiliateProductPageWrapper from "components/affiliates/AffiliateProductPageWrapper";
import Request from "components/affiliateProducts/components/Request";
import Overview from "components/affiliates/Overview";
import axiosAPI from "utils/axios";
import styles from "public/css/AffiliateProductRequest.module.scss";

const { TabPane } = Tabs;
const { Text } = Typography;

const AffiliateProductRequest = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.pId) {
      axiosAPI.request(
        "get",
        `${process.env.BASE_URL}affiliate/get-products-by-id/${router.query.pId}`,
        res => {
          setProduct(res.data);
        },
        err => {
          setError(err.message);
        }
      );
    }
  }, [router.query.pId]);

  if (error) {
    return (
      <AffiliateProductPageWrapper back>
        <section className={styles.error__section}>
          <p>
            <Text strong>{error}</Text>
          </p>
        </section>
      </AffiliateProductPageWrapper>
    );
  }

  if (!product) {
    return (
      <AffiliateProductPageWrapper back>
        <Spinner />
      </AffiliateProductPageWrapper>
    );
  }

  const updateProduct = () => {
    setProduct(state => ({
      ...state,
      affiliate_kreator_product: {
        ...state.affiliate_kreator_product,
        has_requested_access: true,
      },
    }));
  };

  return (
    <AffiliateProductPageWrapper>
      <header className={styles.header}>
        <BackButton />
        <Button className={styles.header__btn} icon={<MdOutlineRemoveRedEye />}>
          View Sales Page
        </Button>
      </header>
      <AffiliateRequestContainer
        productTypeId={product.affiliate_kreator_product.product_type_id}
        productName={product.affiliate_kreator_product.product_name}
      >
        <TabPane tab="Request" key="1">
          <Request
            hasRequestedAccess={
              product.affiliate_kreator_product.has_requested_access
            }
            productId={product.affiliate_kreator_product.id}
            updateProduct={updateProduct}
          />
        </TabPane>
        <TabPane tab="Overview" key="2">
          <Overview
            productImage={product.affiliate_kreator_product.product_image}
            productName={product.affiliate_kreator_product.product_name}
            productDescription={
              product.affiliate_kreator_product.product_description
            }
            productPrice={product.affiliate_kreator_product.product_price}
            productAffiliateCommission={
              product.affiliate_kreator_product.affiliate_percentage_on_sales
            }
            currency={product.affiliate_kreator_product.currency}
            kreatorName={product.kreator_user_details.full_name}
            kreatorImage={product.kreator_user_details.profile_image}
            kreatorBio={product.kreator_user_details.store_description}
          />
        </TabPane>
      </AffiliateRequestContainer>
    </AffiliateProductPageWrapper>
  );
};

export default AffiliateProductRequest;
