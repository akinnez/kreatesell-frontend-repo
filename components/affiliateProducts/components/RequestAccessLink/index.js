import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./index.module.scss";

const RequestAccessLink = ({ id, hasRequested }) => (
  <div className={styles.request__link}>
    {!hasRequested ? (
      <Link href={`/account/affiliate/market-place/${id}`}>
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
