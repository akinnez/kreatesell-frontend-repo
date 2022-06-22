import { Layout } from "components";
import styles from "../public/css/payouts.module.scss";
// import Image from 'next/image'

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
          <Flag />
        </div>
      </section>
    </Layout>
  );
};

export default Payouts;

const Flag = () => {
  return <div className={styles.flagItem}>flag</div>;
};
