import { useRef } from "react";
import { Button } from "antd";
import { showToast } from "utils";
import styles from "./index.module.scss";

const AffiliateLink = ({ affiliateLink }) => {
  const linkElement = useRef();

  const handleCopy = async () => {
    try {
      const link = linkElement.current.textContent;

      if ("clipboard" in navigator) {
        await navigator.clipboard.writeText(link);
        showToast("Affiliate link copied", "success");
      } else {
        showToast("Unable to copy affiliate link in this browser", "info");
      }
    } catch (err) {
      showToast("Something went wrong. Can not copy link at this time", "warn");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.label}>
        <span>Affiliate Link</span>
      </div>
      <div className={styles.link__container}>
        <div className={styles.link}>
          <span ref={linkElement}>{affiliateLink}</span>
        </div>
        <Button className={styles.link__btn} onClick={handleCopy}>
          Copy Link
        </Button>
      </div>
    </section>
  );
};

export default AffiliateLink;
