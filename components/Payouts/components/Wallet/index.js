import {useState} from 'react';
import useSWR from 'swr';
import {useRouter} from 'next/router';
import {Table, Pagination, Spin, Modal, Button} from 'antd';
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

const rowKey = (record) => record.id;

const Wallet = ({bankDetails, walletInfo, storeLoading}) => {
	const [loading, setLoading] = useState(false);
	const Router = useRouter();

	const {url, filters, setFilters} = useFilters(
		'affiliate/get-wallet-history'
	);

	const {data, error, isValidating} = useSWR(url, (url) => {
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

	const histories = data || [];
	const historiesTotal = data?.total_records || 0;

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

	const handlePageChange = (page) => {
		setFilters({...filters, page});
	};
	if (!data && !error) {
		return <Loader />;
	}

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
			<h2 className={styles.heading}>Wallet History</h2>
			<section>
				<Filters setFilters={setFilters} setLoading={setLoading} />
			</section>
			<section>
				<SyncDataToCSV
					data={histories}
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
		</>
	);
};

export default Wallet;
