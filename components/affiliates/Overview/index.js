import { useMemo } from "react";
import Image from "next/image";
import { Typography, Avatar } from "antd";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { BsFillImageFill } from "react-icons/bs";
import styles from "./index.module.scss";

const { Title, Text, Link } = Typography;
const breakpoint = { xs: 240, sm: 280, md: 280, lg: 280, xl: 280, xxl: 280 };

const Overview = ({
  productImages,
  productName,
  productDescription,
  productPriceDetails,
  productAffiliateCommission,
  kreatorName,
  kreatorImage,
  kreatorBio,
}) => {
  const productImage = useMemo(() => {
    if (productImages.length === 0) return null;

    return productImages
      .filter(images => images.file_type !== 4)
      .map(item => item.filename.split(",")[0])[0];
  }, [productImages]);

  const productPrice = useMemo(() => {
    if (productPriceDetails.length === 0) return null;

    const details = productPriceDetails[0];
    return {
      currency: details.currency_name,
      price: details.price,
      commission: (productAffiliateCommission / 100) * details.price,
    };
  }, [productPriceDetails, productAffiliateCommission]);

  return (
    <div className={styles.overview__container}>
      <section className={styles.product__overview}>
        <div className={styles.product__overview__img}>
          {productImage ? (
            <Image
              src={productImage}
              alt={productName}
              layout="fill"
              objectFit="cover"
              className={styles.product_image}
              priority
            />
          ) : (
            <div className={styles.empty_image_Banner}>
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
        <div className={styles.product__overview__stats}>
          <div>
            <p>
              <Text strong>Sales Price:</Text>
            </p>
            <p>
              <Text>
                {productPrice ? (
                  <>
                    {productPrice.currency} {productPrice.price.toFixed(2)}
                  </>
                ) : (
                  <>{(0).toFixed(2)}</>
                )}
              </Text>
            </p>
          </div>
          <div>
            <p>
              <Text strong>Commission:</Text>
            </p>
            <p>
              <Text>
                {productPrice ? (
                  <>
                    {productPrice.currency} {productPrice.commission.toFixed(2)}
                  </>
                ) : (
                  <>{(0).toFixed(2)}</>
                )}
              </Text>
            </p>
          </div>
          <div>
            <p>
              <Text strong>Commission (%):</Text>
            </p>
            <p>
              <Text>{productAffiliateCommission}%</Text>
            </p>
          </div>
        </div>
      </section>
      <section className={styles.kreator__overview}>
        <div className={styles.kreator__overview__title}>
          <Title level={2}>Kreator</Title>
        </div>
        <div className={styles.kreator__overview__image}>
          {kreatorImage ? (
            <Avatar
              className={styles.image}
              shape="square"
              size={breakpoint}
              src={<Image src={kreatorImage} layout="fill" alt={kreatorName} />}
            />
          ) : (
            <Avatar
              className={`${styles.image} ${styles.bg__color}`}
              shape="square"
              size={breakpoint}
              icon={<FaRegUser />}
            />
          )}
        </div>
        <div className={styles.kreator__overview__info}>
          <Title level={3}>{kreatorName}</Title>
          <Link>
            Visit Store&nbsp;&nbsp; <HiOutlineExternalLink />
          </Link>
        </div>
        <div className={styles.kreator__overview__text}>
          <p>
            <Text>{kreatorBio}</Text>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Overview;
