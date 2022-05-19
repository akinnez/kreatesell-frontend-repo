// import { RightArrow } from "../../utils";
// import { InputButton } from "../inputButton/InputButton";
import styles from "./Footer.module.scss";

export const SubFooter = ({
  //   placeholder,
  //   buttonText,
  //   firstText = "dummy text One",
  //   lastText = "dummy text Two",
  children,
}) => {
  return (
    <div className={styles.subFooter}>
      {children}
      {/* <h3>
        {firstText} <br /> {lastText}
      </h3>
      <div>
        <InputButton
          name="email"
          placeholder="Enter your email..."
          buttonText="Get Started Free"
          buttonIcon={<RightArrow />}
        />
      </div> */}
    </div>
  );
};
