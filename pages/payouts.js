import { Layout } from "components";
import styles from "../public/css/payouts.module.scss";

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
      </section>
    </Layout>
  );
};

export default Payouts;
