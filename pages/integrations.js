import {Layout} from '../components';
import styles from '../public/css/integrations.module.scss';
import Image from 'next/image';
import {IntegrationsCircle} from 'utils';
import {integrations} from 'components/ks-integrations/data';

const Integrations = () => {
	return (
		<Layout subFooter={false} defaultMarginTop={true}>
			<section className={styles.container}>
				{/* header */}
				{/* header on mobile */}
				<div className={styles.mobileHeader}>
					<h1 className={styles.heading}>Integrations</h1>
					<p className={styles.text}>
						Are you wondering if you can work with your favourite
						tools on KreateSell?
					</p>
					<div className={styles.imageBox}>
						<Image
							src={IntegrationsCircle}
							alt="integrations circle"
						/>
					</div>
					<p className={styles.text}>
						Don’t worry, we’ve got you covered! We have integrated
						the best tools you can find across the internet. All
						within your reach! Check out the tools we have
						integrated below.
					</p>
				</div>

				{/* header on larger screens */}
				<div className={styles.lgHeader}>
					<div>
						<h1 className={styles.heading}>Integrations</h1>
						<p className={styles.text}>
							Are you wondering if you can work with your
							favourite tools on KreateSell? Don’t worry, we’ve
							got you covered! We have integrated the best tools
							you can find across the internet. All within your
							reach! Check out the tools we have integrated below.
						</p>
					</div>
					<div className={styles.imageBox}>
						<Image
							src={IntegrationsCircle}
							alt="integrations circle"
						/>
					</div>
				</div>
				{/* end of header */}

				{/* Integrations card */}
				<section className={styles.intCards}>
					{integrations.map((item) => (
						<IntCard key={item?.name} {...item} />
					))}
				</section>
			</section>
		</Layout>
	);
};

export default Integrations;

const IntCard = ({name, details, imageSrc}) => {
	return (
		<div className={styles.intCard}>
			<div className={styles.intImg}>
				<Image src={imageSrc} alt="zoom" />
			</div>
			<p className={styles.intName}>{name}</p>
			<p className={styles.details}>{details}</p>
		</div>
	);
};
