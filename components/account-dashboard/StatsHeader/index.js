import Link from "next/link";
import { useRouter } from "next/router";
import { Typography } from "antd";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./index.module.scss";

const StatsHeader = ({
  title,
  url,
  orderUrl,
  isAffiliateCard = false,
  isAnAffiliate,
}) => {
  const router = useRouter();

  return (
    <div className={styles.stats__header}>
      {title === "Affiliate" && isAffiliateCard ? (
        <>
          {!isAnAffiliate ? (
            <Typography.Text>
              {title} - Ready to become an affiliate?{" "}
              <Link href="/account/affiliate/market-place">
                Click to get started now
              </Link>
            </Typography.Text>
          ) : (
            <Typography.Text>{title} </Typography.Text>
          )}
        </>
      ) : (
        <Typography.Text>{title}</Typography.Text>
      )}

      {router.pathname.endsWith("dashboard") ? (
        <>
          {title === "Affiliate" && !isAnAffiliate ? (
            <Link href="#">
              <a className={styles.notYetAnAffiliate}>
                {title}&#39;s Dashboard &nbsp; <AiOutlineArrowRight />
              </a>
            </Link>
          ) : (
            <Link href={url}>
              <a>
                {title}&#39;s Dashboard &nbsp; <AiOutlineArrowRight />
              </a>
            </Link>
          )}
        </>
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
