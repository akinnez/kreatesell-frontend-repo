import Link from "next/link";
import { Typography } from "antd";
import { formatDateString } from "utils/dateFormat";
import styles from "./index.module.scss";

const Campaign = ({ campaign }) => (
  <div className={styles.campaign}>
    <p>
      <Typography.Text>{campaign.email_subject}</Typography.Text>
    </p>
    <p>
      <Typography.Text type="secondary">
        {formatDateString(campaign.date_created)} | {campaign.time_to_send}
      </Typography.Text>
    </p>
    <div className={styles.actions}>
      <Link href={`/account/kreator/abandoned-carts/edit/${campaign.id}`}>
        <a>Edit</a>
      </Link>
      <Link href={`/account/kreator/abandoned-carts/preview/${campaign.id}`}>
        <a>Preview Email</a>
      </Link>
    </div>
  </div>
);

export default Campaign;
