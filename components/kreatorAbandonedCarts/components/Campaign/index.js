import Link from "next/link";
import { useDispatch } from "react-redux";
import { Typography } from "antd";
import { setCampaign } from "redux/actions/abandonedCart.action";
import { formatDateString } from "utils/dateFormat";
import styles from "./index.module.scss";

const Campaign = ({ campaign }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setCampaign(campaign));
  };

  return (
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
        <Link href="/account/kreator/abandoned-carts/edit">
          <a onClick={onClick}>Edit</a>
        </Link>
        <Link href="/account/kreator/abandoned-carts/preview">
          <a onClick={onClick}>Preview Email</a>
        </Link>
      </div>
    </div>
  );
};

export default Campaign;
