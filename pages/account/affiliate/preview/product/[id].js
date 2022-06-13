import { useMemo } from "react";
import { useRouter } from "next/router";
import { Card, Typography, Divider } from "antd";
import RenderQuillHTML from "components/RenderQuillHTML";
import Spinner from "components/Spinner";
import PageWrapper from "components/affiliates/PageWrapper";
import ProductImages from "components/affiliateProductPreview/ProductImages";
import ProductKreator from "components/affiliateProductPreview/ProductKreator";
import AffiliatePageFooter from "components/affiliates/AffiliatePageFooter";
import useProductOverview from "hooks/useProductOverview";
import formatNumber from "utils/formatNumber";
import styles from "public/css/AffiliateProductPreview.module.scss";

const { Title } = Typography;

const ProductPreview = () => {
  const router = useRouter();
  const { data: product, error } = useProductOverview(router.query.id);

  const productPrice = useMemo(() => {
    if (product && product.kreator_product_price_details.length > 0) {
      const details = product.kreator_product_price_details[0];
      return {
        currency: details.currency_name,
        price: details.price,
      };
    }

    return null;
  }, [product]);

  if (error) {
    return (
      <PageWrapper title="Product Preview">
        <section className={styles.error__section}>
          <p>
            <strong>{error}</strong>
          </p>
        </section>
      </PageWrapper>
    );
  }

  if (!product) {
    return (
      <PageWrapper title="Product Preview">
        <Spinner />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Product Preview">
      <article className={styles.product}>
        <Card className={styles.product__card}>
          <section className={styles.product__header}>
            <div className={styles.product__images}>
              <ProductImages
                productName={product.affiliate_kreator_product.product_name}
                imageFiles={product.kreator_product_files}
              />
            </div>
            <div className={styles.product__info}>
              <Title level={1}>
                {product.affiliate_kreator_product.product_name}
              </Title>
              <ProductKreator
                kreatorImage={product.kreator_user_details.profile_image}
                kreatorName={product.kreator_user_details.full_name}
                storeName={product.kreator_user_details.store_name}
              />
              <Divider className={styles.divider} />
              <div className={styles.product__description}>
                <Title level={2}>Product Description</Title>
                <p>{product.affiliate_kreator_product.product_description}</p>
              </div>
              <Divider />
              <div className={styles.product__checkout}>
                <strong>
                  {productPrice.currency} {formatNumber(productPrice.price)}
                </strong>
                <a>Buy Now</a>
              </div>
            </div>
          </section>
          <section className={styles.product__details}>
            <Title level={2}>More Details:</Title>
            <RenderQuillHTML
              html={product.affiliate_kreator_product.product_details}
            />
          </section>
        </Card>
      </article>
      <AffiliatePageFooter />
    </PageWrapper>
  );
};

export default ProductPreview;
