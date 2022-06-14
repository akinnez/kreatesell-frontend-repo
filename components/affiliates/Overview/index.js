import { useMemo } from "react";
import Image from "next/image";
import { Typography } from "antd";
import { FaRegUser } from "react-icons/fa";
import { BsFillImageFill } from "react-icons/bs";
import KreatorInfo from "../KreatorInfo";
import ProductPricing from "../ProductPricing";
import KreatorAvatar from "../KreatorAvatar";
import productImageFn from "utils/productImageFn";
import styles from "./index.module.scss";

const { Title, Text } = Typography;

const Overview = ({
  productImages,
  productName,
  productDescription,
  productPriceDetails,
  productAffiliateCommission,
  kreatorName,
  kreatorImage,
  kreatorBio,
  storeName,
}) => {
  const productImage = useMemo(
    () => productImageFn(productImages),
    [productImages]
  );

  return (
    <div className={styles.overview__container}>
      <section className={styles.product__overview}>
        <div className={styles.product__overview__img}>
          {productImage ? (
            <div className={styles.product__image}>
              <Image
                src={productImage}
                alt={productName}
                layout="responsive"
                width={516}
                height={295}
                objectFit="cover"
                priority
              />
            </div>
          ) : (
            <div className={styles.empty__image__Banner}>
              <BsFillImageFill />
            </div>
          )}
        </div>
        <div className={styles.product__overview__info}>
          <Title level={2}>{productName}</Title>
          <p>
            <Text>{productDescription}</Text>
          </p>
        </div>
        <ProductPricing
          productPriceDetails={productPriceDetails}
          productAffiliateCommission={productAffiliateCommission}
        />
      </section>
      <section className={styles.kreator__overview}>
        <div className={styles.kreator__overview__header}>
          <div className={styles.kreator__overview__title}>
            <Title level={2}>Kreator</Title>
          </div>
          {kreatorImage ? (
            <div className={styles.kreator__overview__image}>
              <KreatorAvatar image={kreatorImage} name={kreatorName} />
            </div>
          ) : (
            <div className={styles.empty__avatar}>
              <FaRegUser />
            </div>
          )}
          <div className={styles.kreator__overview__info}>
            <KreatorInfo href={storeName}>
              <Title level={3}>{kreatorName}</Title>
            </KreatorInfo>
          </div>
        </div>
        <div className={styles.kreator__overview__bio}>
          <p>
            <Text>{kreatorBio}</Text>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Overview;
