import Link from "next/link";
import { Typography } from "antd";
import { BsPlusLg } from "react-icons/bs";
import { abandonedCartsMails } from "components/kreatorAbandonedCarts/data";
import { formatDateString } from "utils/dateFormat";
import styles from "./index.module.scss";

const { Title, Text } = Typography;

const Campaigns = () => {
  return (
    <>
      <header className={styles.header}>
        <Title>Manage All Of Your Pro Campaign Email From This Page</Title>
        <div>
          <Link href="/account/kreator/abandoned-carts/add">
            <a>
              <BsPlusLg />
              &nbsp; Add Email
            </a>
          </Link>
        </div>
      </header>
      <article className={styles.mail__wrapper}>
        <div className={styles.mails__container}>
          {abandonedCartsMails.map(mail => (
            <div className={styles.mail} key={mail.id}>
              <p>
                <Text>{mail.title}</Text>
              </p>
              <p>
                <Text type="secondary">
                  {formatDateString(mail.date_created)} | {mail.elapsedTime}
                </Text>
              </p>
              <div className={styles.actions}>
                <Link href="/account/kreator/abandoned-carts/edit">
                  <a>Edit</a>
                </Link>
                <Link href="/account/kreator/abandoned-carts/preview">
                  <a>Preview Email</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link href="/account/kreator/abandoned-carts/add">
          <a>
            <BsPlusLg />
            &nbsp; Add Email
          </a>
        </Link>
      </article>
    </>
  );
};

export default Campaigns;
