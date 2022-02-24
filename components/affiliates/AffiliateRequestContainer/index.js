import { Card, Tabs, Typography } from "antd";
import styles from "./index.module.scss";

const { Title, Text } = Typography;

const AffiliateRequestContainer = ({ children }) => {
  return (
    <>
      <div className={styles.product__name}>
        <Title>
          The Land Of Hope - <Text type="secondary">DIGITAL DOWNLOAD</Text>
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
