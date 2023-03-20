import {useMemo, useState, useEffect} from 'react';
import Image from 'next/image';

import {Line} from 'react-chartjs-2';
import {format, subDays} from 'date-fns';

import {Select} from '../';
import {
	DownloadIcon,
	formatDate2,
	getDate12MonthsAgo,
	RenderIf,
} from '../../utils';
import {dayOptions} from './partials';
import styles from './Recent.module.scss';
import useViewMembershipFilters from './hooks/useKreatorRecentCustomers';
import useKreatorRecentCustomers from 'services/swrQueryHooks/KreatorRecentCustomers';
import useGetKreatorSalesHistory from 'services/swrQueryHooks/KreatorsSalesHistory';
import useGetRevenue from 'services/swrQueryHooks/useGetRevenue';
import useRevenueFilter from './hooks/useRevenueFilter';
import Loader from 'components/loader';

const monthMappings = {
	January: 'Jan',
	February: 'Feb',
	March: 'March',
	April: 'Apr',
	May: 'May',
	June: 'Jun',
	July: 'Jul',
	August: 'Aug',
	September: 'Sep',
	October: 'Oct',
	November: 'Nov',
	December: 'Dec',
};
export const RecentKreatorAnalytics = () => {
	const [show, setShow] = useState('All time');
	const [value, setValue] = useState(dayOptions[0]);

	// Revenue data
	/////////////////////////////////////////////////////////////
	const {
		url: revenueUrl,
		setFilters,
		filters,
	} = useRevenueFilter('v1/kreatesell/store/kreator/total-revenue');
	// api call for revenue
	const {revenueData, revenueLoading, revenueError} = useGetRevenue(
		revenueUrl,
		!!filters.startDate
	);
	/////////////////////////////////////////////////////////////

	// Recent transactions data
	/////////////////////////////////////////////////////////////
	// TODO: change these
	const {url} = useViewMembershipFilters(
		'v1/kreatesell/store/kreator/recent-transactions'
	);
	const {
		recentKreatorsData,
		recentKreatorsError,
		recentKreatorsLoading,
		isValidating,
	} = useKreatorRecentCustomers(url);
	/////////////////////////////////////////////////////////////

	// endpoint to get data for chart for last 12 months for chart data
	const {kreatorSalesHistoryData} = useGetKreatorSalesHistory(
		`v1/kreatesell/store/kreator/transactions-count?startDate=${getDate12MonthsAgo()}`
	);

	useEffect(() => {
		handleShowFilter();
	}, [show]);

	const formatDate = (date, formatArg = 'yyyy-MM-dd') => {
		return format(date, formatArg);
	};

	const handleShowFilter = () => {
		const day = new Date();
		switch (show) {
			case 'Today':
				setFilters((prev) => ({
					...prev,
					startDate: formatDate(subDays(day, 0)),
				}));
				break;
			case 'Yesterday':
				setFilters((prev) => ({
					...prev,
					startDate: formatDate(subDays(day, 1)),
				}));
				break;
			case 'Last 7 days':
				setFilters((prev) => ({
					...prev,
					startDate: formatDate(subDays(day, 7)),
				}));
				break;
			case 'Last 30 days':
				setFilters((prev) => ({
					...prev,
					startDate: formatDate(subDays(day, 30)),
				}));
				break;
			case 'This year':
				let year = new Date().getFullYear();
				setFilters((prev) => ({...prev, startDate: `${year}-01-01`}));
				break;
			case 'All time':
				setFilters((prev) => ({...prev, startDate: '2000-01-01'}));
				break;
			default:
				return;
		}
	};

	const MemoizedData = useMemo(() => {
		let months = new Array(12).fill(0);
		if (kreatorSalesHistoryData) {
			let KTotal = kreatorSalesHistoryData?.total_revenue;
			months.forEach((_, monthIndex) => {
				for (let i = 0; i < KTotal.length; i++) {
					if (monthIndex + 1 == KTotal[i].month_number) {
						months[monthIndex] = Number(KTotal[i].count);
					}
				}
			});
			return months;
		}
		return months;
	}, [kreatorSalesHistoryData]);

	const data = {
		labels: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
		datasets: [
			{
				data: MemoizedData,
				fill: false,
				backgroundColor: '#0072EF',
				borderColor: '#40A9FF',
			},
		],
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	};
	// Get list of recent customers' transactions

	return (
		<div className={styles.container}>
			<div className={styles.download}>
				<p>Download CSV</p>
				<div className={styles.downloadIcon}>
					<Image src={DownloadIcon} alt="download icon" />
				</div>
			</div>

			{/* TODO: for better performance, move the 3 sections to individual components 
                so they do not rerender for every changing data */}
			<div className={styles.analytics}>
				<div className={styles.recentSales}>
					<div className={styles.graphTitle}>
						<div className={styles.recentTitle}>
							Recent Kreator Sales
						</div>

						<div className={styles.graphLegend}>
							<div className={styles.roundIcon}></div>
							<p>Last 12 months</p>
						</div>
					</div>
					<Line data={data} options={options} />
				</div>

				<div className={styles.recentSection}>
					<div className={styles.customers}>
						<div className={styles.customerTitle}>
							Recent Customers
						</div>
						<div className={styles.customerSubTitle}>
							<ul className={styles.titleList}>
								<li>Customer name</li>
								<li>Transaction ID</li>
								<li>Date</li>
							</ul>
							{recentKreatorsData?.data?.recent_transactions
								?.slice(0, 3)
								?.map((data) => (
									<ul
										key={data.tnx_id}
										className={styles.contentList}
									>
										<li>{data?.customer_full_name}</li>
										<li>{data?.tnx_id}</li>
										<li>
											{formatDate2(data?.date_created)}
										</li>
									</ul>
								))}
						</div>
					</div>

					<div className={styles.revenue}>
						<div className={styles.revenueTitle}>Total Revenue</div>
						<div className={styles.revenueAmount}>
							<sup className={styles.currency}>#</sup>
							{revenueLoading ? (
								<span className="ml-4">
									<Loader />
								</span>
							) : (
								revenueData?.data?.revenue
							)}
						</div>
						<div className={styles.duration}>
							<div className={styles.selectCont}>
								<Select
									name="day"
									// defaultValue={dayOptions[0]}
									value={value}
									options={dayOptions}
									// placeholder="Sales this Week"
									arrowIconColor="#0072EF"
									borderColor="#69C0FF"
									bgColor="#E6F7FF"
									placeHolderColor="#0072EF"
									menuPlacement={'top'}
									cb={(e) => {
										setShow(e);
										let val = dayOptions.find(
											(opt) => opt.value === e
										);
										setValue(val);
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
