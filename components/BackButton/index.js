import { useRouter } from "next/router";
import { Button } from "antd";
import { MdChevronLeft } from "react-icons/md";
import styles from "./index.module.scss";

const BackButton = () => {
  const { back } = useRouter();

  return (
    <Button
      type="link"
      icon={<MdChevronLeft />}
      onClick={() => back()}
      className={styles.backBtn}
    >
      BACK
    </Button>
  );
};

export default BackButton;
