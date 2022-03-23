import Link from "next/link";
import { useRouter } from "next/router";
import { Typography } from "antd";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./index.module.scss";

const StatsHeader = ({ title, url, orderUrl }) => {
  const router = useRouter();

  return (
    <div className={styles.stats__header}>
      <Typography.Text>{title}</Typography.Text>
      {router.pathname.endsWith("dashboard") ? (
        <Link href={url}>
          <a>
            {title}&#39;s Dashboard &nbsp; <AiOutlineArrowRight />
          </a>
        </Link>
      ) : (
        <Link href={orderUrl}>
          <a>
            See Orders &nbsp; <AiOutlineArrowRight />
          </a>
        </Link>
      )}
    </div>
  );
};

export default StatsHeader;
