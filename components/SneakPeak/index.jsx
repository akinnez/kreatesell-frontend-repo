import styles from "./sneakPeak.module.scss";
import { benefits } from "./data";
import { motion } from "framer-motion";
import { useVariants } from "../variants";

const SneakPeak = ( { setShowModal } ) => {
  const { pageVariant, variantProps } = useVariants(); 
  return (
    <div className={styles.container}>
      <motion.h3
        className={styles.heading}
        {...variantProps}
        variants={pageVariant(2, 0)}
      > 
        As a Premium user, you enjoy:
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
      <motion.h2
        className={styles.so__much__more}
        {...variantProps}
        variants={pageVariant(2, 0)}
      >
        And so much more!
      </motion.h2>
      <motion.p className={styles.peak_text}>Quickly join the early birds to enjoy all these for FREE once KreateSell launches! Time is running out and people are joining fast! Don’t be left out of this mouth-watering offer.</motion.p>
      <button type="submit" className={styles.btn} onClick={()=> setShowModal(true)}>
        Join For Free Now!
      </button>
    </div>
  );
};

export default SneakPeak;
