import { Layout } from "../components";
import styles from "../public/css/integrations.module.scss";
import Image from "next/image";
import { IntegrationsCircle, IntZoom } from "utils";

const Integrations = () => {
  return (
    <Layout subFooter={false} defaultMarginTop={true}>
      <section className={styles.container}>
        {/* header */}
        <div className={styles.mobileHeader}>
          <h1 className={styles.heading}>Integrations</h1>
          <p className={styles.text}>
            Are you wondering if you can work with your favourite tools on
            Kreatesell?
          </p>
          <div className={styles.imageBox}>
            <Image src={IntegrationsCircle} alt="integrations circle" />
          </div>
          <p className={styles.text}>
            Don’t worry, we’ve got you covered! We have integrated the best
            tools you can find across the internet. All within your reach! Check
            out the tools we have integrated below.
          </p>
        </div>

        <div className={styles.lgHeader}>
          <div>
            <h1 className={styles.heading}>Integrations</h1>
            <p className={styles.text}>
              Are you wondering if you can work with your favourite tools on
              Kreatesell? Don’t worry, we’ve got you covered! We have integrated
              the best tools you can find across the internet. All within your
              reach! Check out the tools we have integrated below.
            </p>
          </div>
          <div className={styles.imageBox}>
            <Image src={IntegrationsCircle} alt="integrations circle" />
          </div>
        </div>
        {/* end of header */}

        <section className={styles.intCards}>
          <IntCard />
          <IntCard />
          <IntCard />
          <IntCard />
          <IntCard />
          <IntCard />
          <IntCard />
          <IntCard />
          <IntCard />
          <IntCard />
          <IntCard />
          <IntCard />
          <IntCard />
        </section>
      </section>
    </Layout>
  );
};

export default Integrations;

const IntCard = () => {
  return (
    <div className={styles.intCard}>
      <div className={styles.intImg}>
        <Image src={IntZoom} alt="zoom" />
      </div>
      <p className={styles.intName}>Zoom</p>
      <p className={styles.details}>
        Zoom is a cloud-based video conferencing service you can use to
        virtually meet with people. You can engage either by video, audio or
        both.
      </p>
    </div>
  );
};
