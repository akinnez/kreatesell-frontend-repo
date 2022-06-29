import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./index.module.scss";

const RequestAccessLink = ({ productId, status }) => (
  <div className={styles.request__link}>
    {!status ? (
      <Link href={`/account/affiliate/market-place/${productId}`}>
        <a>
          Request Access&nbsp;
          <AiOutlineArrowRight />
        </a>
      </Link>
    ) : (
      <a disabled>
        Request Access&nbsp;
        <AiOutlineArrowRight />
      </a>
    )}
  </div>
);

export default RequestAccessLink;
