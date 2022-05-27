import Image from "next/image";
import { Typography, Avatar } from "antd";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { BsFillImageFill } from "react-icons/bs";
import styles from "./index.module.scss";

const { Title, Text, Link } = Typography;
const breakpoint = { xs: 240, sm: 280, md: 280, lg: 280, xl: 280, xxl: 280 };

const Overview = ({
  productImage,
  productName,
  productDescription,
  productPrice,
  productAffiliateCommission,
  currency,
  kreatorName,
  kreatorImage,
  kreatorBio,
}) => {
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
                {currency} {productPrice}
              </Text>
            </p>
          </div>
          <div>
            <p>
              <Text strong>Commission:</Text>
            </p>
            <p>
              <Text>NGN 234,533.33</Text>
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
