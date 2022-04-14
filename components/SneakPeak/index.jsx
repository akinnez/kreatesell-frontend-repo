import styles from "./sneakPeak.module.scss";
import { benefits } from "./data";
import { motion } from "framer-motion";
import { useVariants } from "../variants";

const SneakPeak = () => {
  const { pageVariant, variantProps } = useVariants();
  return (
    <div className={styles.container}>
      <motion.h3
        className={styles.heading}
        {...variantProps}
        variants={pageVariant(2, 0)}
      >
        Sneak peek of what to expect
      </motion.h3>
      <ol>
        {benefits.map((benefit, index) => (
          <motion.li
            className={styles.offers}
            key={index}
            {...variantProps}
            variants={pageVariant(3, (index + 1) * 0.5)}
          >
            <span className={styles.animateFire}>•</span> {benefit}
          </motion.li>
        ))}
      </ol>
    </div>
  );
};

export default SneakPeak;
