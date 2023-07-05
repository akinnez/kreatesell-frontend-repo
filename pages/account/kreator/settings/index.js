import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {Card, Tabs} from 'antd';
import {useSelector} from 'react-redux';

import AuthLayout from '../../../../components/authlayout';
import style from '../../../../public/css/Settings.module.scss';
import Currency from '../../../../components/settings/Currency';
import Account from '../../../../components/settings/Account';
import StoreSettings from 'components/settings/Store';
import Billing from 'components/settings/Billing';
import Domain from 'components/settings/Domain/Domain';
import Advanced from 'components/settings/Advanced';
import Loader from 'components/loader';
import {showToast} from 'utils';

const Index = () => {
	const {TabPane} = Tabs;
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('currencies');
	const {store, loading: storeDetailsLoading} = useSelector(
		(state) => state.store
	);
	const path = '/account/kreator/settings';
	const handleTabChange = (tab) => {
		router.push({pathname: path, query: {activeTab: tab}}, undefined, {});
	};

	useEffect(() => {
		if (store) {
			if (store?.bank_details === null) {
				showToast(
					'Redirecting!! You need to have filled your payout details to be able to edit setting!.',
					'warn',
					{hideAfter: 5}
				);
				setTimeout(() => {
					router.push('/account/sales/payouts?activeTab=wallet');
				}, 2000);
			}
		}
	}, [store]);

	useEffect(() => {
		if (router.query?.activeTab) {
			setActiveTab(router.query.activeTab);
		}
	}, [router.query]);

	// if (storeDetailsLoading)
	// 	return (
	// 		// <AuthLayout>
	// 		<Loader />
	// 		// </AuthLayout>
	// 	);

	return (
		<>
			<AuthLayout mobilePadding={true}>
				<Card bordered={false} className={style.card}>
					<Tabs
						activeKey={activeTab}
						centered
						size="large"
						onChange={handleTabChange}
						className={style.tabsBox}
					>
						<TabPane tab="Currencies" key="currencies">
							<Currency />
						</TabPane>
						<TabPane tab="Account" key="account">
							<Account />
						</TabPane>
						<TabPane tab="Store" key="store">
							<StoreSettings />
						</TabPane>
						<TabPane tab="Domain" key="domain">
							<Domain />
						</TabPane>
						<TabPane tab="Billing" key="billing">
							<Billing />
						</TabPane>
						<TabPane tab="Advanced" key="advanced">
							<Advanced />
						</TabPane>
					</Tabs>
				</Card>
			</AuthLayout>
		</>
	);
};

export default Index;
