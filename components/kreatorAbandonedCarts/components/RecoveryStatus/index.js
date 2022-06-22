import { useState, useEffect } from "react";
import Image from "next/image";
import { Typography, Select } from "antd";
import Spinner from "components/Spinner";
import SyncDataToCSV from "components/DataToCSV/SyncDataToCSV";
import RecoveryStatusFilters from "../RecoveryStatusFilters";
import AbandonedCartsStats from "../AbandonedCartsStats";
import RecoveryStatusChart from "../RecoveryStatusChart";
import axiosAPI from "utils/axios";
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
const headers = [
  { label: "Recovered By Days", key: "recoveredByDays" },
  { label: "Abandoned", key: "abandoned" },
  { label: "Recovered", key: "recovered" },
  { label: "In Recovery", key: "inRecovery" },
];

const RecoveryStatus = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ currency: null, from: "", to: "" });

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

  useEffect(() => {
    axiosAPI.request(
      "get",
      url.href,
      res => {
        const { recovered_last30, abandoned, recovered, in_recovery, ...rest } =
          res.data.data;

        setData({
          recoveredByDays: recovered_last30 || 0,
          abandoned: abandoned || 0,
          recovered: recovered || 0,
          inRecovery: in_recovery || 0,
          chartData: rest,
        });
      },
      err => {
        setError(err.message);
      }
    );
  }, [url.href]);

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
              <sup>#</sup>
              {data.recoveredByDays}
            </Text>
          </p>
          <div>
            <Text>In last</Text>
            &nbsp;&nbsp;
            <Select options={options} defaultValue="30 Days" />
          </div>
        </div>
      </header>
      <section>
        <RecoveryStatusFilters setFilters={setFilters} />
      </section>
      <section>
        <AbandonedCartsStats
          inRecovery={data.inRecovery}
          abandoned={data.abandoned}
          recovered={data.recovered}
        />
      </section>
      <section>
        <SyncDataToCSV
          data={[data]}
          headers={headers}
          filename="recovery_status"
        />
      </section>
      <section>
        <RecoveryStatusChart chartData={data.chartData} />
      </section>
    </div>
  );
};

export default RecoveryStatus;
