import {Button, Divider, Modal, Typography} from 'antd';
import {showToast} from 'utils';
import axiosApi from 'utils/axios';
import styles from './index.module.scss';

const {Text} = Typography;
const fee = 2;

const WithdrawModal = ({
	withdrawModal,
	hideModal,
	showSuccess,
	currency,
	balance,
	bankDetails,
}) => {
	const handleWithdraw = () => {
		const data = {
			account_bank: bankDetails.account_name,
			account_number: bankDetails.account_number,
			amount: parseFloat(balance),
			narration: `Payout transaction for ${bankDetails.account_name}`,
			currency: bankDetails.currency_name,
			debit_currency: bankDetails.currency_name,
		};

		axiosApi.request(
			'post',
			`${process.env.BASE_URL}v1/kreatesell/payment/transfer`,
			() => {
				showSuccess();
				hideModal();
			},
			(err) => {
				showToast(err.message, 'error');
				hideModal();
			},
			data
		);
	};

	return (
		<Modal
			footer={null}
			title={null}
			closable={false}
			visible={withdrawModal}
			onCancel={hideModal}
			className={styles.modal}
			width={800}
		>
			<div className={styles.balance__info}>
				<div>
					<div className={styles.balance}>
						<p>
							<Text>You are about to withdraw</Text>
							&nbsp;
							<span
								className={styles.value}
							>{`${currency} ${balance}`}</span>
						</p>
						<p>
							<Text>into</Text>
						</p>
					</div>
					<div className={styles.bank__info}>
						{bankDetails.country_id === '1' ||
						bankDetails.country_id === '72' ? (
							<>
								<p>
									<Text>Account Number:</Text>
									&nbsp;
									<span className={styles.value}>
										{bankDetails.account_number}
									</span>
								</p>
								<p>
									<Text>Account Name:</Text>
									&nbsp;
									<span className={styles.value}>
										{bankDetails.account_name}
									</span>
								</p>
							</>
						) : (
							<p>
								<Text>PayPal Email:</Text>
								&nbsp;
								<span className={styles.value}>
									{bankDetails.account_name}
								</span>
							</p>
						)}
					</div>
					<p>
						<Text>
							Transaction Fee: {currency} {fee.toFixed(2)}
						</Text>
					</p>
				</div>
				<Divider className={styles.divider} />
				<footer className={styles.footer}>
					<p>
						<Text>
							The money will be sent to the account you added in
							your payout settings.
						</Text>
					</p>
					<Button
						type="primary"
						size="large"
						onClick={handleWithdraw}
					>
						Continue
					</Button>
				</footer>
			</div>
		</Modal>
	);
};

export default WithdrawModal;
