import {useEffect, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {Tabs} from 'antd';
import AuthLayout from 'components/authlayout';
import Spinner from 'components/Spinner';
import Payouts from 'components/Payouts/components/Payouts';
import BankAccountDetails from 'components/Payouts/components/BankAccountDetails';
import Wallet from 'components/Payouts/components/Wallet';
import {showToast} from 'utils';
import styles from 'public/css/PayoutsPage.module.scss';

const {TabPane} = Tabs;

const PayoutsPage = () => {
	const [tab, setTab] = useState('1');

	const router = useRouter();

	const {store, loading} = useSelector((state) => state.store);
	const {bank_details: bankDetails, wallet_details_dtos: walletInfo} = store;

	const handleClick = (key) => {
		setTab(key);
	};

	useEffect(() => {
		if (router.query.redirect) {
			showToast(
				'You have already set up your payout bank account',
				'info'
			);
		}
	}, [router.query.redirect]);

	return (
		<AuthLayout>
			<Head>
				<title>KreateSell | Payouts</title>
			</Head>
			{loading ? (
				<Spinner />
			) : (
				<Tabs
					activeKey={tab}
					onTabClick={handleClick}
					centered
					className={styles.tabs}
				>
					<TabPane tab="Payouts" key="1">
						<Payouts
							bankDetails={bankDetails}
							handleClick={handleClick}
						/>
					</TabPane>
					<TabPane tab="Bank Account Details" key="2">
						<BankAccountDetails bankDetails={bankDetails} />
					</TabPane>
					<TabPane tab="Wallet" key="3">
						<Wallet
							bankDetails={bankDetails}
							walletInfo={walletInfo}
							storeLoading={loading}
						/>
					</TabPane>
				</Tabs>
			)}
		</AuthLayout>
	);
};

export default PayoutsPage;
