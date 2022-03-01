import Image from "next/image";
import { Typography, Select, Button } from "antd";
import { BsDownload } from "react-icons/bs";
import RecoveryStatusFilters from "../RecoveryStatusFilters";
import AbandonedCartsStats from "../AbandonedCartsStats";
import Img from "public/images/recovery_status_img.png";
import styles from "./index.module.scss";

const { Text } = Typography;
const options = [
  { label: "15 Days", value: "15 Days" },
  { label: "30 Days", value: "30 Days" },
  { label: "45 Days", value: "45 Days" },
  { label: "60 Days", value: "60 Days" },
  { label: "75 Days", value: "75 Days" },
  { label: "90 Days", value: "90 Days" },
];

const RecoveryStatus = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header__banner}>
        <div className={styles.header__img}>
          <Image src={Img} alt="Recovery status image" />
        </div>
        <div className={styles.header__stats}>
          <p>
            <Text>Recovered</Text>
          </p>
          <p>
            <Text>
              <sup>#</sup>4,456,234
            </Text>
          </p>
          <div>
            <Text>In last</Text>{" "}
            <Select options={options} defaultValue="30 Days" />
          </div>
        </div>
      </header>
      <section>
        <RecoveryStatusFilters />
      </section>
      <section>
        <AbandonedCartsStats />
      </section>
      <section>
        <div className={styles.csv__btn}>
          <Button type="link">
            Download CSV &nbsp;
            <BsDownload />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default RecoveryStatus;
