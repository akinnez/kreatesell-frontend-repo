import { Layout } from "components";
import styles from "../public/css/payouts.module.scss";
import Image from "next/image";
import { Flag, data } from "components/paymentsPayouts/data";
import { MoneyRain } from "utils";

const Payouts = () => {
  return (
    <Layout subFooter={false} defaultMarginTop={true}>
      <section className={styles.payoutsContainer}>
        <div>
          <section>
            <div className={styles.details}>
              <h1 className={styles.mobileHeading}>
                Payout and Transaction Fee
              </h1>
              <h1 className={styles.lgHeading}>
                Payout And <br />
                Transaction Fee
              </h1>
            </div>

            <div className={styles.flagsAndText}>
              <div className={styles.flagItems}>
                <GenerateFlags data={data} withDetails={false} dimension={40} />
              </div>
              <div className={styles.text}>
                Kreatesell supports twenty one (21) currencies today and because
                we work with multiple providers to make this possible,
                settlements into your bank account/wallet are made based on your
                default currency. So, you get to sell in any currency around the
                globe and have the amount converted and credited in your
                country&aops;s default currency.
              </div>
            </div>
          </section>
          <div className={styles.moneyRain}>
            <Image src={MoneyRain} alt="money rain" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payouts;

const FlagItem = ({
  flag,
  country,
  fullWidth = false,
  withDetails = false,
  dimension = "29.73",
}) => {
  return (
    <div
      className={`${styles.flagItem} ${withDetails ? styles.withDetails : ""}`}
    >
      <Image
        src={flag}
        alt="flag"
        layout="fixed"
        width={dimension}
        objectFit="fill"
        height={dimension}
      />
      {withDetails && (
        <div
          className={`${styles.countryName} ${
            fullWidth ? styles.fullWidth : ""
          }`}
        >
          {country}
        </div>
      )}
    </div>
  );
};

const GenerateFlags = ({ data, withDetails = false, dimension }) => {
  return (
    <>
      {data?.map((item) => (
        <FlagItem
          key={item?.country}
          {...item}
          withDetails={withDetails}
          dimension={dimension}
        />
      ))}
    </>
  );
};
