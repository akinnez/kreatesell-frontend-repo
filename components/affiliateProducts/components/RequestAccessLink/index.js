import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./index.module.scss";

const RequestAccessLink = ({ productId, status }) => (
  <>
    {!status ? (
      <Link href={`/account/affiliate/market-place/${productId}`}>
        <a className={styles.request__link}>
          Request Access
          <AiOutlineArrowRight />
        </a>
      </Link>
    ) : (
      <a className={styles.request__link} disabled>
        Request Access
        <AiOutlineArrowRight />
      </a>
    )}
  </>
);

export default RequestAccessLink;
