import Image from 'next/image';

import {Line} from 'react-chartjs-2';

import {Select} from '../';
import {DownloadIcon, formatDate2} from '../../utils';
import {dayOptions} from './partials';
import styles from './Recent.module.scss';
import useViewMembershipFilters from './hooks/useKreatorRecentCustomers';
import useKreatorRecentCustomers from 'services/swrQueryHooks/KreatorRecentCustomers';

export const RecentKreatorAnalytics = () => {
	// TODO: change these
	const {url, filters, setFilters} = useViewMembershipFilters(
		'v1/kreatesell/store/kreator/recent-transactions'
	);
	const {
		recentKreatorsData,
		recentKreatorsError,
		recentKreatorsLoading,
		isValidating,
	} = useKreatorRecentCustomers(url);

	// console.log('recentKreatorsData', recentKreatorsData);
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
				data: [25, 0, 50, 75, 25, 100, 50, 25, 75, 75, 2500, 1000],
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
							<sup className={styles.currency}>#</sup>0
						</div>
						<div className={styles.duration}>
							<div className={styles.selectCont}>
								<Select
									name="day"
									value="Select value"
									options={dayOptions}
									placeholder="Sales this Week"
									arrowIconColor="#0072EF"
									borderColor="#69C0FF"
									bgColor="#E6F7FF"
									placeHolderColor="#0072EF"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
