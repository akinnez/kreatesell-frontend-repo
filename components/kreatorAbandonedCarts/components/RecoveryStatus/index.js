import { useState, useEffect } from "react";
import Image from "next/image";
import { Typography, Select } from "antd";
import Spinner from "components/Spinner";
import SyncDataToCSV from "components/DataToCSV/SyncDataToCSV";
import RecoveryStatusFilters from "../RecoveryStatusFilters";
import RecoveryStatusStats from "../RecoveryStatusStats";
import RecoveryStatusChart from "../RecoveryStatusChart";
import { headers } from "../../data/recoveryStatusData";
import axiosAPI from "utils/axios";
import Img from "public/images/recovery_status_img.png";
import styles from "./index.module.scss";

const { Text } = Typography;

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
          {/* <div>
            <Text>In last</Text>
            &nbsp;&nbsp;
            <Select options={options} defaultValue="30 Days" />
          </div> */}
        </div>
      </header>
      <section>
        <RecoveryStatusFilters setFilters={setFilters} />
      </section>
      <section>
        <RecoveryStatusStats
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
