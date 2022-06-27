import { Layout } from "components";
import styles from "../public/css/payouts.module.scss";
import Image from "next/image";
import { Flag } from "components/paymentsPayouts/data";

const Payouts = () => {
  return (
    <Layout subFooter={false} defaultMarginTop={true}>
      <section className={styles.payoutsContainer}>
        <div className={styles.details}>
          <h1 className={styles.mobileHeading}>Payout and Transaction Fee</h1>
          <h1 className={styles.lgHeading}>
            Payout And <br />
            Transaction Fee
          </h1>
        </div>
        <div className={styles.flagItems}>
          <FlagItem />
          {/* <FlagItem /> */}
        </div>
      </section>
    </Layout>
  );
};

export default Payouts;

const FlagItem = () => {
  return (
    <div
      className={styles.flagItem}
      style={{
        // backgroundImage: `url(${Flag?.src})`,
        border: "1px solid green;",
      }}
    >
      <Image
        src={Flag}
        alt="flag"
        layout="fixed"
        width={50}
        objectFit="fill"
        height={50}
      />
    </div>
  );
};
