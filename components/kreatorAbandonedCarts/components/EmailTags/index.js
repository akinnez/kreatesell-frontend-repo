import { useState } from "react";
import { Typography, Button } from "antd";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { emailTags } from "components/kreatorAbandonedCarts/formData";
import styles from "./index.module.scss";

const { Text } = Typography;

const EmailTags = () => {
  const [showTags, setShowTags] = useState(false);

  const handleToggle = () => {
    setShowTags(!showTags);
  };

  return (
    <div className={styles.email__tags__container}>
      <div
        className={
          showTags
            ? `${styles.email__tags__header} ${styles["email__tags__header--clicked"]}`
            : `${styles.email__tags__header}`
        }
      >
        <Text>Email Tags</Text>
        <Button onClick={handleToggle}>
          Show Tags&nbsp;{" "}
          {showTags ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
        </Button>
      </div>
      <div
        className={
          showTags
            ? `${styles.email__tags} ${styles["email__tags--open"]}`
            : `${styles.email__tags}`
        }
      >
        {emailTags.map(({ id, tag, content }) => (
          <div key={id} className={styles.email__tag}>
            <Text>{`{${tag}}`}</Text>
            <Text>{content}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailTags;
