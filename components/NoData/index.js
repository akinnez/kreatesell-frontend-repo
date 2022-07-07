import Image from "next/image";
import Clipboard from "public/images/clipboards.png";
import styles from "./index.module.scss";

const NoData = () => (
  <div className={styles.no__data}>
    <Image src={Clipboard} alt="Clipboard" width={200} height={200} />
    <p>No record yet</p>
  </div>
);

export default NoData;
