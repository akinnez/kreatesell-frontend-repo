import Image from "next/image";
import { Typography } from "antd";
import { HiOutlineExternalLink } from "react-icons/hi";
import ProductImage from "public/images/checkout-placeholder.png";
import KreatorImage from "public/images/placeholder-2.jpg";
import styles from "./index.module.scss";

const { Title, Text, Link } = Typography;

const Overview = () => {
  return (
    <div className={styles.overview__container}>
      <section className={styles.kreator__overview}>
        <div className={styles.kreator__overview__title}>
          <Title level={2}>Kreator</Title>
        </div>
        <div className={styles.kreator__overview__image}>
          <Image
            alt="Kreator Image"
            src={KreatorImage}
            objectFit="cover"
            className={styles.image}
          />
        </div>
        <div className={styles.kreator__overview__info}>
          <Title level={3}>Olumide John</Title>
          <Link>
            Visit Store&nbsp;&nbsp; <HiOutlineExternalLink />
          </Link>
        </div>
        <div className={styles.kreator__overview__text}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus
            feugiat turpis sed fusce in. Pulvinar id enim tellus pharetra diam
            ac. Bibendum in consectetur amet mi condimentum suspendisse.
            Pellentes integer aliquet congue at proin adipiscing aliquet. Neque,
            nunc arcu euismod eget proin est volutpat, vestibulum nibh.{" "}
          </p>
        </div>
      </section>
      <section className={styles.product__overview}>
        <div className={styles.product__overview__img}>
          <Image src={ProductImage} alt="Product Image" objectFit="cover" />
        </div>
        <Title level={2}>The Land Of Hope</Title>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus
          feugiat turpis sed fusce in. Pulvinar id enim tellus pharetra diam ac.
          Bibendum in consectetur amet mi condimentum suspendisse. Pellentes
          integer aliquet congue at proin adipiscing aliquet. Neque, nunc arcu
          euismod eget proin est volutpat, vestibulum nibh. Pharetra lectus
          semper tellus condimentum risus, tortor pulvinar nullam senectus.
          Dignissim malesuada eu, aliquam enim ultrices neque, eget nibh. At
          adipiscing congue bibendum at. Viverra justo, viverra dictum risus
          lacus nullam pharetra lacus. Aliquet feugiat magna proin elementum
          mauris. Duis vulputate ante magna tellus.
        </p>
        <div className={styles.product__overview__stats}>
          <div>
            <p>
              <Text strong>Sales Price:</Text>
            </p>
            <p>
              <Text>NGN 4,565.97</Text>
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
              <Text>47%</Text>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;
