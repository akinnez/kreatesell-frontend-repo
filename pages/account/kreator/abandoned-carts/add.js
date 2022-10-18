import {useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {Typography, Card} from 'antd';
import ProfileLayout from 'components/ProfileLayout';
import BackButton from 'components/BackButton';
import SuccessModalBox from 'components/SuccessModalBox';
import AbandonedCartsForm from 'components/kreatorAbandonedCarts/components/AbandonedCartsForm';
import styles from 'public/css/AbandonedCartsMail.module.scss';

const {Title, Text} = Typography;

const Add = () => {
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const router = useRouter();

	const showModal = () => {
		setModalIsVisible(true);
	};

	const redirect = () => {
		router.push('/account/kreator/abandoned-carts');
	};

	return (
		<>
			<ProfileLayout>
				<Head>
					<title>KreateSell | Compose Mail</title>
				</Head>
				<div className={styles.back__btn}>
					<BackButton />
				</div>
				<header className={styles.header}>
					<Title>Campaigns</Title>
					<Text>
						Create valuable, personal touches at scale with your
						email campaigns.
					</Text>
				</header>
				<section>
					<Card className={styles.card__container}>
						<div className={styles.container}>
							<div className={styles.title}>
								<Title level={2}>Add Email</Title>
								<Text>Create your custom email</Text>
							</div>
							<div>
								<AbandonedCartsForm showModal={showModal} />
							</div>
						</div>
					</Card>
				</section>
			</ProfileLayout>
			{modalIsVisible && (
				<SuccessModalBox
					modalIsVisible={modalIsVisible}
					closeModal={redirect}
				>
					<section className={styles.content}>
						<p>Email Successfully Added</p>
					</section>
				</SuccessModalBox>
			)}
		</>
	);
};

export default Add;
