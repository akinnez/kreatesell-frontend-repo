import { useState, useEffect } from "react";
import Image from "next/image";
import { Typography, Select, Button } from "antd";
import { BsDownload } from "react-icons/bs";
import Spinner from "components/Spinner";
import RecoveryStatusFilters from "../RecoveryStatusFilters";
import AbandonedCartsStats from "../AbandonedCartsStats";
import useFetchData from "hooks/useFetchData";
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
  const [uri, setUri] = useState("");
  const [filters, setFilters] = useState({ currency: null, from: "", to: "" });

  const { data, error } = useFetchData(uri);

  useEffect(() => {
    const url = new URL(
      `${process.env.BASE_URL}v1/kreatesell/product/campaign/get-recovery`
    );

    if (filters.currency && filters.currency !== "All") {
      url.searchParams.set("Currency", filters.currency);
    }

    if (filters.from) {
      url.searchParams.set("FromDate", filters.from);
    }

    if (filters.to) {
      url.searchParams.set("ToDate", filters.to);
    }

    setUri(url);
  }, [filters.currency, filters.from, filters.to]);

  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!data) return <Spinner />;

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
        <RecoveryStatusFilters setFilters={setFilters} />
      </section>
      <section>
        <AbandonedCartsStats
          inRecovery={data.in_recovery}
          abandoned={data.abandoned}
          recovered={data.recovered}
        />
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
