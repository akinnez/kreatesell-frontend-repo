import { RightArrow } from "../../utils";
import { InputButton } from "../inputButton/InputButton";
import styles from "./Footer.module.scss";

export const SubFooter = ({ withSearch = false, text, childComp }) => {
  return (
    <div className={styles.subFooter}>
      <h3>{text}</h3>
      {withSearch && (
        <div>
          <InputButton
            name="email"
            placeholder="Enter your email..."
            buttonText="Get Started Free"
            buttonIcon={<RightArrow />}
          />
        </div>
      )}
      <div className={styles.subFooterBottomChild}>{childComp}</div>
    </div>
  );
};
