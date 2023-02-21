import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

import useSWR from 'swr';
import {Table, Pagination, Spin, Modal, Button, Switch} from 'antd';
import {useSelector} from 'react-redux';

import SyncDataToCSV from 'components/DataToCSV/SyncDataToCSV';
import PaginationSizeChanger from 'components/PaginationSizeChanger';
import WalletBalance from '../WalletBalance';
import WalletHistoryMobileView from '../WalletHistoryMobileView';
import Filters from '../Filters';
import {walletColumns} from '../../columns/walletColumns';
import {walletHeaders} from '../../utils/walletHeaders';
import useFilters from '../../useFilters';
import axiosApi from 'utils/axios';
import {showToast} from 'utils';
import styles from './index.module.scss';
import Loader from 'components/loader';
import CloseIcon from 'components/affiliates/CloseIcon';
import {AddBankModal} from 'components/bank';

const rowKey = (record) => record.id;

const Wallet = ({bankDetails, walletInfo, storeLoading}) => {
	const [loading, setLoading] = useState(false);
	const [isBank, setIsBank] = useState(false);
	const Router = useRouter();
	const {store} = useSelector((state) => state.store);

	// const {url, filters, setFilters} = useFilters(
	// 	'v1/kreatesell/store/wallet/history'
	// );
	useEffect(() => {
		if (Object.keys(store).length > 0) {
			const {bank_details, user} = store;
			if (!bank_details) {
				setIsBank(true);
			} else {
				setIsBank(false);
			}
			return () => {
				setIsBank(false);
			};
		}
	}, [store]);
	// TODO: put the wallet ID
	const {url, filters, setFilters} = useFilters(
		'v1/kreatesell/store/wallet/history'
	);

	const {
		data,
		error,
		isValidating,
		isLoading: swrLoading,
	} = useSWR(url, (url) => {
		return axiosApi.request(
			'get',
			url,
			(res) => {
				setLoading(false);
				return res.data;
			},
			(err) => {
				setLoading(false);
				showToast('Error fetching your wallet history', 'error');
				return err;
			}
		);
	});

	const histories = data?.data || [];
	const historiesTotal = data?.total_records || 0;
	// console.log('histories', histories);

	// FIXME: This is not necessary, as SWR gives us the accurate loading state across board
	let isLoading;

	if (loading) {
		isLoading = true;
	} else if (!data && !error) {
		isLoading = true;
	} else if (histories.length === 0 && !isValidating) {
		isLoading = false;
	} else {
		isLoading = false;
	}
	// console.log('data', data);

	const handlePageChange = (page) => {
		setFilters({...filters, page});
	};

	const handleKreatorAffiliateFilter = (walletType = '') => {
		setFilters((prev) => ({...prev, WalletType: walletType}));
	};
	// if (!data && !error) {
	// 	return <Loader />;
	// }

	// TODO: Check to see if this if statement is still required
	if (
		typeof data === 'string' &&
		data.includes(
			'is not an affiliate yet, accept the Affiliate terms and conditions first to proceed.'
		)
	) {
		return (
			<Modal
				title={null}
				footer={null}
				visible
				centered
				maskClosable={false}
				style={{textAlign: 'center'}}
			>
				<div style={{marginBlockStart: '2rem', marginBlockEnd: '1rem'}}>
					<h1 style={{fontSize: '1.5rem', fontWeight: '500'}}>
						User is not yet an affiliate, accept the Affiliate Terms
						and conditions
					</h1>
					<Button
						disabled={false}
						type={'primary'}
						onCancel={() =>
							Router.push('/account/affiliate/market-place')
						}
						onClick={() =>
							Router.push('/account/affiliate/market-place')
						}
						loading={false}
						closeIcon={<CloseIcon />}
						style={{padding: '1rem'}}
					>
						Go to Terms and conditions page
					</Button>
				</div>
			</Modal>
		);
	}

	return (
		<>
			<WalletBalance
				bankDetails={bankDetails}
				walletInfo={walletInfo}
				loading={storeLoading}
			/>
			<div className={`flex items-center mb-10 gap-4`}>
				<h2 className={`${styles.heading} mb-0`}>Wallet History</h2>
				<Switch
					checkedChildren={"Kreator's Wallet"}
					unCheckedChildren={"Affiliate's Wallet"}
					onChange={(e) => {
						handleKreatorAffiliateFilter(
							e ? 'Kreator' : 'Affiliate'
						);
					}}
					defaultChecked={true}
					// disabled={swrLoading || isValidating}
				/>
			</div>
			<section>
				<Filters setFilters={setFilters} setLoading={setLoading} />
			</section>
			<section>
				<SyncDataToCSV
					data={histories || []}
					headers={walletHeaders}
					filename="wallet_history"
				/>
			</section>
			<Spin spinning={isLoading} wrapperClassName={styles.spin__wrapper}>
				<PaginationSizeChanger
					dataSize={historiesTotal}
					filters={filters}
					setFilters={setFilters}
				/>
				<section className={styles.data__section}>
					<WalletHistoryMobileView
						histories={histories ? histories : []}
					/>
					<div className={styles.table__wrapper}>
						<Table
							dataSource={histories || []}
							columns={walletColumns}
							pagination={false}
							rowKey={rowKey}
							// loading={swrLoading || isValidating}
						/>
					</div>
				</section>
				{histories?.length > 0 && (
					<section>
						<Pagination
							pageSize={filters.limit}
							current={filters.page}
							total={historiesTotal}
							responsive={true}
							onChange={handlePageChange}
							showSizeChanger={false}
						/>
					</section>
				)}
			</Spin>
			{isBank && (
				<AddBankModal closable={false} {...{isBank, setIsBank}} />
			)}
		</>
	);
};

export default Wallet;
