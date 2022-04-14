import styles from "./attention.module.scss";
import Form from "./Form";
import { motion } from "framer-motion";
import { useVariants } from "../variants";

const MainAttention = (props) => {
  const { projectCardVariant, landRVariant, variantProps } = useVariants();
  return (
    <section className={styles.container}>
      <motion.h1
        className={styles.mainHeading}
        variants={projectCardVariant(1, 0)}
        {...variantProps}
      >
        Be the <span className={styles.green}>FIRST</span> <br />
        to Know!
      </motion.h1>
      <motion.div variants={landRVariant("-100%", 1)} {...variantProps}>
        <h2 className={styles.subHeading}>
          Are you ready to experience a mind-blowing platform made just for you
          to sell all your content and digital products across borders, and
          massively earn without any hassle?
        </h2>
        <p className={styles.stopFlicker}>
          Submit your details to join the wait-list
        </p>
        <Form {...props} />
      </motion.div>
    </section>
  );
};

export default MainAttention;
