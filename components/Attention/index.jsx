import styles from './attention.module.scss';
import Form from './Form';
import {motion} from 'framer-motion';
import {useVariants} from '../variants';

const MainAttention = (props) => {
	const {projectCardVariant, pageVariant, variantProps} = useVariants();
	const {setShowModal} = props;
	return (
		<section className={styles.container}>
			<p className={styles.subheader}>Be the first to use it!</p>
			<motion.h1
				className={styles.mainHeading}
				variants={projectCardVariant(1, 0)}
				{...variantProps}
			>
				Create, Sell and Make Money from Online Courses in Minutes
			</motion.h1>
			<motion.div variants={pageVariant(3, 2)} {...variantProps}>
				<h2 className={styles.subTopic}>
					Made for Africans to receive payments from anyone,
					irrespective of their location WITHOUT DELAY!
				</h2>
				<h2 className={styles.subHeading}>
					This affiliate-powered machine can create a $1,000 cash flow
					in your first month of using it and consistently every
					month. Join the early birds now to be the first to use
					KreateSell once it launches from March 28th 2023.
				</h2>
				<h2 className={styles.subHeading__second}>
					<span style={{fontWeight: 600}}>First 28 people</span> to
					join the list get{' '}
					<span style={{fontWeight: 600}}>
						FREE PREMIUM ACCESS WORTH $300.
					</span>
					Don&apos;t miss out! Join the early birds now.
				</h2>
				{/* <p className={styles.stopFlicker}>
          Submit your details to join the wait-list
        </p> */}
				<div className={styles.btn_container}>
					<button
						type="submit"
						className={styles.btn}
						onClick={() => setShowModal(true)}
					>
						Join For Free Now!
					</button>
				</div>
				<div className={styles.btn_container}>
					<p className={styles.offer__end}>Offer ends soon!</p>
				</div>
				{/* <Form {...props} /> */}
			</motion.div>
		</section>
	);
};

export default MainAttention;
