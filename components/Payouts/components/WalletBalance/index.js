import {useEffect, useState} from 'react';

import useSWR from 'swr';
import {Typography, Row, Col, Button} from 'antd';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {useSelector} from 'react-redux';

import Spinner from 'components/Spinner';
import SuccessModalBox from 'components/SuccessModalBox';
import WithdrawModal from '../WithdrawModal';
import WalletInfo from '../WalletInfo';
import axiosApi from 'utils/axios';
import {showToast, getTransactionFees} from 'utils';
import styles from './index.module.scss';

const {Text} = Typography;
const breakPoints = {
	xs: {span: 24},
	md: {span: 12},
};

const WalletBalance = ({bankDetails, walletInfo, loading, mutateCallback}) => {
	const [withdrawModal, setWithdrawModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);

	const {user} = useSelector((state) => state.auth);
	const {store} = useSelector((state) => state.store);
	const [fees, setFees] = useState('');

	//get transaction fees for each withdrawals made based on bank type and currency
	useEffect(() => {
		if (bankDetails && walletInfo[0]) {
			const transactionFees = getTransactionFees(
				walletInfo[0].currency,
				bankDetails.bank_type
			);
			setFees(transactionFees);
		}
	}, [bankDetails, walletInfo]);

	const {data: affiliateBalance, error} = useSWR(
		`${process.env.BASE_URL}v1/kreatesell/store/wallet/get-balance`,
		(url) => {
			return axiosApi.request(
				'get',
				url,
				(res) => res.data,
				() => {
					showToast(
						'An error occurred fetching your account balance',
						'error'
					);
				}
			);
		}
	);

	const handleClicks = (setter, value) => () => {
		setter(value);
	};
	if (!walletInfo[0]?.currency) {
		// console.log('Currency does not exist');
		return null;
	}
	if (!affiliateBalance && !error) return null;

	if (error) {
		showToast('An error occurred', 'error');
		return null;
	}
	const {available_balance} = affiliateBalance?.wallet_balance[0];

	return (
		<header className={styles.header}>
			<div className={styles.card}>
				{loading ||
				affiliateBalance === null ||
				affiliateBalance === undefined ? (
					<Spinner />
				) : (
					<Row gutter={[40, 16]}>
						<Col {...breakPoints}>
							<WalletInfo
								title="Kreator"
								currency={
									affiliateBalance?.wallet_balance[0]
										?.currency_name
								}
								balance={available_balance}
							>
								<div className={styles.withdraw__btn}>
									<Button
										size="large"
										onClick={handleClicks(
											setWithdrawModal,
											true
										)}
										disabled={
											parseFloat(available_balance) <= 0
										}
									>
										Withdraw Funds $
									</Button>
								</div>
							</WalletInfo>
						</Col>
						<Col {...breakPoints}>
							<WalletInfo
								title="Affiliate"
								currency={
									affiliateBalance?.wallet_balance[1]
										?.currency_name ||
									store?.bank_details?.currency_name
								}
								balance={
									affiliateBalance?.wallet_balance[1]
										?.available_balance || 0
								}
								isAffiliate={user?.is_affiliate}
							>
								<div className={styles.affiliate__info}>
									<span>
										<AiOutlineInfoCircle />
									</span>
									<span
										className={`${
											!user?.is_affiliate &&
											styles.isAffiliate
										}`}
									>
										Money in your wallet will be withdrawn
										into your account every Tuesday of the
										week.
									</span>
								</div>
							</WalletInfo>
						</Col>
					</Row>
				)}
			</div>
			{withdrawModal && (
				<WithdrawModal
					withdrawModal={withdrawModal}
					hideModal={handleClicks(setWithdrawModal, false)}
					showSuccess={handleClicks(setSuccessModal, true)}
					currency={walletInfo[0]?.currency}
					balance={available_balance}
					bankDetails={bankDetails}
					fees={fees}
					mutateCallback={mutateCallback}
				/>
			)}
			{successModal && (
				<SuccessModalBox
					modalIsVisible={successModal}
					closeModal={handleClicks(setSuccessModal, false)}
					closable={false}
				>
					<section className={styles.content}>
						<p>
							<Text>Money is being processed</Text>
						</p>
						<p>
							<Text>
								Kindly exercise patience while we process your
								funds. Processing takes about 24 hours before
								reflecting in your account
							</Text>
						</p>
					</section>
				</SuccessModalBox>
			)}
		</header>
	);
};

export default WalletBalance;
