import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Card, Tabs, Typography } from "antd";
import styles from "./index.module.scss";
import Spinner from "components/Spinner";

const { Title, Text } = Typography;

const AffiliateRequestContainer = ({ children }) => {
  const router = useRouter();
  const { productTypes } = useSelector(state => state.product);
  let productType;

  if (router.query["product-type"]) {
    productType = productTypes.find(type => {
      return type.id == +router.query["product-type"];
    });
  }

  return (
    <>
      {!productType ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.product__name}>
            <Title>
              <Text>{router.query["product-name"]} -</Text>
              &nbsp;
              <Text type="secondary">{productType.product_type_name}</Text>
            </Title>
          </div>
          <Card className={styles.card__container}>
            <Tabs className={styles.tabs} defaultActiveKey="1" centered>
              {children}
            </Tabs>
          </Card>
        </>
      )}
    </>
  );
};

export default AffiliateRequestContainer;
