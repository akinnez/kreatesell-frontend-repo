import {Pagination, Spin, Table} from 'antd';
import PaginationSizeChanger from 'components/PaginationSizeChanger';
import Filters from '../Filters';
import MobileView from '../MobileView';
import StatusButtons from '../StatusButtons';
import tableColumns from 'components/kreatorAffiliateRequests/tableColumns';
import styles from './index.module.scss';

const rowKey = (record) => record.id;

const PageLayout = ({
	requests,
	isLoading,
	setLoading,
	filters,
	setFilters,
	showReportModal,
	showActionModal,
	showNoteModal,
}) => {
	const handlePage = (page) => {
		setFilters({...filters, page});
	};

	const columns = tableColumns(
		showReportModal,
		showActionModal,
		showNoteModal
	);

	return (
		<>
			<header className={styles.header}>
				<h1>Affiliate Requests</h1>
			</header>
			<section>
				<Filters setFilters={setFilters} setLoading={setLoading} />
			</section>
			<Spin spinning={isLoading} wrapperClassName={styles.spin__wrapper}>
				<PaginationSizeChanger
					dataSize={requests.total}
					filters={filters}
					setFilters={setFilters}
				/>
				<StatusButtons
					setFilters={setFilters}
					filters={filters}
					setLoading={setLoading}
				/>
				<section className={styles.data__section}>
					<MobileView
						requests={requests.data}
						showReportModal={showReportModal}
						showActionModal={showActionModal}
						showNoteModal={showNoteModal}
					/>
					<div className={styles.table__wrapper}>
						<Table
							dataSource={requests.data}
							columns={columns}
							pagination={false}
							rowKey={rowKey}
						/>
					</div>
				</section>
				{requests.data.length > 0 && (
					<section>
						<Pagination
							pageSize={filters.limit}
							current={filters.page}
							total={requests.total}
							responsive={true}
							onChange={handlePage}
							showSizeChanger={false}
						/>
					</section>
				)}
			</Spin>
		</>
	);
};

export default PageLayout;
