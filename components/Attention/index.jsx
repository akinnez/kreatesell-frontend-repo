import styles from './attention.module.scss';
import Form from './Form';
import { motion } from 'framer-motion';
import { useVariants } from '../variants';

const MainAttention = (props) => {
  const { projectCardVariant, pageVariant, variantProps } = useVariants();
  const { setShowModal } = props;
  return (
    <section className={styles.container}>
      <p className={styles.subheader}>Be the first to know</p>
      <motion.h1
        className={styles.mainHeading}
        variants={projectCardVariant(1, 0)}
        {...variantProps}
      >
        Quickly Sell Content, Ebooks, Audio, Templates and Other Digital
        Products to Anyone Anywhere in The World With No Payment
        Barriers!
      </motion.h1>
      <motion.div variants={pageVariant(3, 2)} {...variantProps}>
        <h2 className={styles.subHeading}>
          This machine can create a $1,000 cash flow in your first
          month of using it and consistently every month. Join the
          early birds now to be the first to use KreateSell once it
          launches on March 28th 2023.
        </h2>
        <h2 className={styles.subHeading__second}>
          <span style={{ fontWeight: 600 }}>First 28 people</span> to
          join the list get{' '}
          <span style={{ fontWeight: 600 }}>
            FREE PREMIUM ACCESS WORTH $300.
          </span>
          Don&apos;t miss out! Join the early birds now.
        </h2>
        {/* <p className={styles.stopFlicker}>
          Submit your details to join the wait-list
        </p> */}
        <button
          type="submit"
          className={styles.btn}
          onClick={() => setShowModal(true)}
        >
          Join For Free Now!
        </button>
        <p className={styles.offer__end}>Offer ends before Launch!</p>
        {/* <Form {...props} /> */}
      </motion.div>
    </section>
  );
};

export default MainAttention;