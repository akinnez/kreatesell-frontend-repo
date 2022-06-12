import { useRouter } from "next/router";
import Link from "next/link";
import { Tabs, Typography } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import BackButton from "components/BackButton";
import Spinner from "components/Spinner";
import AffiliateRequestContainer from "components/affiliates/AffiliateRequestContainer";
import AffiliateProductPageWrapper from "components/affiliates/AffiliateProductPageWrapper";
import Request from "components/affiliateProducts/components/Request";
import Overview from "components/affiliates/Overview";
import useProductOverview from "hooks/useProductOverview";
import styles from "public/css/AffiliateProductRequest.module.scss";

const { TabPane } = Tabs;
const { Text } = Typography;

const AffiliateProductRequest = () => {
  const router = useRouter();
  const { data: product, error } = useProductOverview(router.query.pId);

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
        <Link href={`/account/affiliate/preview/product/${router.query.pId}`}>
          <a className={styles.header__btn}>
            <MdOutlineRemoveRedEye /> View Product Page
          </a>
        </Link>
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
            productImages={product.kreator_product_files}
            productName={product.affiliate_kreator_product.product_name}
            productDescription={
              product.affiliate_kreator_product.product_description
            }
            productPriceDetails={product.kreator_product_price_details}
            productAffiliateCommission={
              product.affiliate_kreator_product.affiliate_percentage_on_sales
            }
            kreatorName={product.kreator_user_details.full_name}
            kreatorImage={product.kreator_user_details.profile_image}
            kreatorBio={product.kreator_user_details.store_description}
            storeName={product.kreator_user_details.store_name}
          />
        </TabPane>
      </AffiliateRequestContainer>
    </AffiliateProductPageWrapper>
  );
};

export default AffiliateProductRequest;
