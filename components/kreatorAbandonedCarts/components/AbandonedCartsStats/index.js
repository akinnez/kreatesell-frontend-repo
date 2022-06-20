import Image from "next/image";
import { Typography, Row, Col, Card } from "antd";
import BasketImg from "public/images/basket.png";
import formatNumber from "utils/formatNumber";
import TrashImg from "public/images/trash_full.png";
import styles from "./index.module.scss";

const { Text } = Typography;

const breakpoints = {
  xs: { span: 24 },
  sm: { span: 12 },
  xl: { span: 8 },
};

const AbandonedCartsStats = ({
  inRecovery = 0,
  abandoned = 0,
  recovered = 0,
}) => (
  <Row gutter={[28, { xs: 24, sm: 24, lg: 32 }]}>
    <Col {...breakpoints}>
      <Card className={styles.card__wrapper}>
        <div className={styles.stats__content}>
          <div className={`${styles.image__wrapper} ${styles.recovery__img}`}>
            <div className={styles.image}>
              <Image src={BasketImg} alt="Basket Icon" />
            </div>
          </div>
          <div className={styles.stats}>
            <p>
              <Text>{formatNumber(inRecovery)}</Text>
            </p>
            <p>
              <Text>In Recovery</Text>
            </p>
          </div>
        </div>
      </Card>
    </Col>
    <Col {...breakpoints}>
      <Card className={styles.card__wrapper}>
        <div className={styles.stats__content}>
          <div className={`${styles.image__wrapper} ${styles.abandoned__img}`}>
            <div className={styles.image}>
              <Image src={TrashImg} alt="Trash Icon" />
            </div>
          </div>
          <div className={styles.stats}>
            <p>
              <Text>{formatNumber(abandoned)}</Text>
            </p>
            <p>
              <Text>Abandoned</Text>
            </p>
          </div>
        </div>
      </Card>
    </Col>
    <Col {...breakpoints}>
      <Card className={styles.card__wrapper}>
        <div className={styles.stats__content}>
          <div className={`${styles.image__wrapper} ${styles.recovered__img}`}>
            <div className={styles.image}>
              <Image src={BasketImg} alt="Basket Icon" />
            </div>
          </div>
          <div className={styles.stats}>
            <p>
              <Text>{formatNumber(recovered)}</Text>
            </p>
            <p>
              <Text>Recovered</Text>
            </p>
          </div>
        </div>
      </Card>
    </Col>
  </Row>
);

export default AbandonedCartsStats;
