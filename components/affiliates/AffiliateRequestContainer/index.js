import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Card, Tabs } from "antd";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import BackButton from "components/BackButton";
import styles from "./index.module.scss";

const AffiliateRequestContainer = ({
  children,
  productTypeId,
  productName,
}) => {
  const router = useRouter();
  const { productTypes } = useSelector(state => state.product);
  const productType = productTypes.find(type => type.id === +productTypeId);

  return (
    <>
      <header className={styles.header}>
        <span>
          <BackButton />
        </span>
        <h1>
          {productName} - <span>{productType?.product_type_name}</span>
        </h1>
        <Link href={`/account/affiliate/preview/product/${router.query.pId}`}>
          <a>
            <MdOutlineRemoveRedEye /> View Product Page
          </a>
        </Link>
      </header>
      <div className={styles.card__container}>
        <Tabs className={styles.tabs} defaultActiveKey="1" centered>
          {children}
        </Tabs>
      </div>
    </>
  );
};

export default AffiliateRequestContainer;
