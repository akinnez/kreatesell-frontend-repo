import styles from "./FormError.module.scss";
import { motion } from "framer-motion";
import { useVariants } from "../variants";

export const FormError = ({ errors }) => {
  const { projectCardVariant, variantProps } = useVariants();

  const error = Object.values(errors)?.map((data) => data);
  return (
    <motion.div
      className={styles.error}
      {...variantProps}
      variants={projectCardVariant(1, 0)}
      exit={{
        scale: 0,
        transition: {
          type: "spring",
          duration: duration,
        },
      }}
    >
      <p>{error?.[0]}</p>
    </motion.div>
  );
};
