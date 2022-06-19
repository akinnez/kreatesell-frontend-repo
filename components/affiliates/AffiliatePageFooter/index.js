import Image from "next/image";
import LogoImg from "public/images/footer-logo.svg";
import styles from "./index.module.scss";

const AffiliatePageFooter = () => (
  <footer className={styles["affiliate-page__footer"]}>
    <span>Powered by</span>
    <Image src={LogoImg} alt="KreateSell Logo" sidth={170} height={40} />
  </footer>
);

export default AffiliatePageFooter;
