import Head from 'next/head';
import ProfileLayout from 'components/ProfileLayout';
import BackButton from 'components/BackButton';
import Spinner from 'components/Spinner';
import styles from './index.module.scss';

const ProfilePageLoading = ({title, showBackBtn = true}) => (
	<ProfileLayout>
		<Head>
			<title>KreateSell | {title}</title>
		</Head>
		{showBackBtn && (
			<div className={styles.back__button}>
				<BackButton />
			</div>
		)}
		<Spinner />
	</ProfileLayout>
);

export default ProfilePageLoading;
