import { useSelector } from "react-redux";
import { Card, Tabs, Typography } from "antd";
import styles from "./index.module.scss";

const { Title, Text } = Typography;

const AffiliateRequestContainer = ({
  children,
  productTypeId,
  productName,
}) => {
  const { productTypes } = useSelector(state => state.product);
  const productType = productTypes.find(type => type.id === +productTypeId);

  return (
    <>
      <div className={styles.product__name}>
        <Title>
          <Text>{productName} -</Text>
          &nbsp;
          <Text type="secondary">{productType?.product_type_name}</Text>
        </Title>
      </div>
      <Card className={styles.card__container}>
        <Tabs className={styles.tabs} defaultActiveKey="1" centered>
          {children}
        </Tabs>
      </Card>
    </>
  );
};

export default AffiliateRequestContainer;
