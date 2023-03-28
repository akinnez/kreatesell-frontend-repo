import {useMemo, useState, useEffect} from 'react';
import Image from 'next/image';

import {Line} from 'react-chartjs-2';
import {format, subDays} from 'date-fns';

import {Select} from '../';
import {DownloadIcon, formatDate2, getDate12MonthsAgo} from '../../utils';
import {dayOptions} from './partials';
import styles from './Recent.module.scss';
import useViewMembershipFilters from './hooks/useKreatorRecentCustomers';
import useKreatorRecentCustomers from 'services/swrQueryHooks/KreatorRecentCustomers';
import useGetKreatorSalesHistory from 'services/swrQueryHooks/KreatorsSalesHistory';
import useGetRevenue from 'services/swrQueryHooks/useGetRevenue';
import useRevenueFilter from './hooks/useRevenueFilter';
import Loader from 'components/loader';

export const RecentAnalytics = () => {
	const [show, setShow] = useState('All time');
	const [value, setValue] = useState(dayOptions[0]);

	// Revenue data
	/////////////////////////////////////////////////////////////
	const {url: revenueUrl, setFilters, filters} = useRevenueFilter(
		'affiliate/total-revenue'
	);
	// api call for revenue
	const {revenueData, revenueLoading, revenueError} = useGetRevenue(
		revenueUrl,
		!!filters.startDate
	);
	/////////////////////////////////////////////////////////////

	const {url} = useViewMembershipFilters('affiliate/recent-transactions');
	const {setLoading, recentKreatorsData} = useKreatorRecentCustomers(url);

	// endpoint to get data for chart for last 12 months
	const {
		kreatorSalesHistoryData: affiliateSalesHistory,
	} = useGetKreatorSalesHistory(
		`affiliate/transactions-count?startDate=${getDate12MonthsAgo()}`
	);

	const MemoizedData = useMemo(() => {
		let months = new Array(12).fill(0);
		if (affiliateSalesHistory) {
			let KTotal = affiliateSalesHistory?.total_revenue;
			months.forEach((_, monthIndex) => {
				for (let i = 0; i < KTotal?.length; i++) {
					if (monthIndex + 1 == KTotal[i]?.month_number) {
						months[i] = Number(KTotal[i]?.count);
					}
				}
			});
			return months;
		}
		return months;
	}, [affiliateSalesHistory]);

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

			<div className={styles.analytics}>
				<div className={styles.recentSales}>
					<div className={styles.graphTitle}>
						<div className={styles.recentTitle}>Recent Sales</div>

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
										<li>
											{data?.transaction_id || 'No ID'}
										</li>
										<li>{formatDate2(data?.sales_date)}</li>
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
