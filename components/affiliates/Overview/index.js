import { useMemo } from "react";
import Image from "next/image";
import { Typography } from "antd";
import { FaRegUser } from "react-icons/fa";
import KreatorInfo from "../KreatorInfo";
import KreatorProductImage from "../KreatorProductImage";
import ProductPricing from "../ProductPricing";
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
  const productImage = useMemo(() => {
    if (productImages.length === 0) return null;

    return productImages
      .filter(images => images.file_type !== 4)
      .map(item => item.filename.split(",")[0])[0];
  }, [productImages]);

  return (
    <div className={styles.overview__container}>
      <section className={styles.product__overview}>
        <div className={styles.product__overview__img}>
          <KreatorProductImage
            productImage={productImage}
            productName={productName}
            width={515}
            height={295}
          />
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
              <Image
                src={kreatorImage}
                alt={kreatorName}
                layout="fill"
                objectFit="cover"
              />
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
