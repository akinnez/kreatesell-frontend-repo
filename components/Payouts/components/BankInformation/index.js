import {Typography} from 'antd';
import styles from './index.module.scss';

const {Text} = Typography;

const BankInformation = ({bankDetails}) => (
	<>
		{bankDetails.country_id === '1' || bankDetails.country_id === '72' ? (
			<div
				className={`${styles.bank__info__details} ${styles.bank__info}`}
			>
				<p className={styles.text}>
					<Text>Currency:</Text>
					<Text>&nbsp; {bankDetails.currency || bankDetails.currency_name || 'NGN'}</Text>
				</p>
				<p className={styles.text}>
					<Text>Bank Name:</Text>
					<Text>&nbsp; {bankDetails.bank_name}</Text>
				</p>
				<p className={styles.text}>
					<Text>Account Number:</Text>
					<Text>&nbsp; {bankDetails.account_number}</Text>
				</p>
				<p className={styles.text}>
					<Text>Account Name:</Text>
					<Text>&nbsp; {bankDetails.account_name}</Text>
				</p>
			</div>
		) : (
			<div
				className={`${styles.bank__info__details} ${styles.paypal__info}`}
			>
				<p>
					<Text>PayPal Email:</Text>
					<Text>&nbsp; {bankDetails.account_name}</Text>
				</p>
			</div>
		)}
	</>
);

export default BankInformation;
