import { useRef } from "react";
import { Typography, Button } from "antd";
import styles from "./index.module.scss";
import { showToast } from "utils";

const { Text } = Typography;

const AffiliateLink = () => {
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
    <section className={styles.link__container}>
      <div className={styles.label}>
        <Text>Affiliate Link</Text>
      </div>
      <div className={styles.link}>
        <span ref={linkElement}>
          23dghy5668jjkkloo//pred892gykk//ujjikhs7778
        </span>
      </div>
      <Button className={styles.link__btn} onClick={handleCopy}>
        Copy Link
      </Button>
    </section>
  );
};

export default AffiliateLink;
