import {useState, useEffect, useCallback} from 'react';
import Head from 'next/head';
import {StatsCard} from 'components/account-dashboard/StatsCard';
import AuthLayout from 'components/authlayout';
import DashboardFilters from 'components/account-dashboard/DashboardFilters';
import StatsHeader from 'components/account-dashboard/StatsHeader';
import styles from 'public/css/DashboardPage.module.scss';
import {
	GetSalesStatistics,
	GetAffiliateSalesStatistics,
} from '../../../redux/actions';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {mutate} from 'swr';
import axiosAPI from 'utils/axios';

// import useSWR from "swr";

const Dashboard = () => {
	const [_, setFiltered] = useState(null);
	const [isAnAffiliate, setIsAnAffiliate] = useState(false);

	const getSalesStatistics = GetSalesStatistics();
	const getAffiliateSalesStatistics = GetAffiliateSalesStatistics();

	const isMobileSideBarOpen = useSelector(
		(state) => state.mobileSideBar.isMobileSideBarOpen
	);

	const [filters, setFilters] = useState({
		currency: '',
		fromDate: '',
		toDate: '',
	});

	const {salesStatistics} = useSelector((state) => state.store);
	const {affiliateSalesStatistics} = useSelector((state) => state.store);

	const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
	const mainStoreUrl = `${process.env.BASE_URL}v1/kreatesell/store/me`;

	// const welcomeMessageCheck = async () => {
	// 	await axiosAPI.request(
	// 		'get',
	// 		`v1/kreatesell/store/welcome-message`,
	// 		(res) => {
	// 			console.log(res);
	// 		},
	// 		(error) => {
	// 			console.log(error);
	// 		}
	// 	);
	// };

	// useEffect(() => {
	// 	welcomeMessageCheck();
	// 	return () => {};
	// }, []);

	const getUserVisitStatus = useCallback(() => {
		axiosAPI.request(
			'get',
			mainStoreUrl,
			(res) => {
				// console.log(
				// 	'isAnAffiliate from endpoint = ',
				// 	res?.data?.user?.is_affiliate
				// );
				setIsAnAffiliate(res?.data?.user?.is_affiliate);
				setIsFirstTimeUser(res?.data?.user?.is_first_time);
				mutate(mainStoreUrl);
			},
			(err) => {
				console.log('error = ', err);
			}
		);
	}, [mainStoreUrl]);

	const handleFilterSubmit = () => {
		getSalesStatistics(
			() => {},
			() => {},
			filters
		);
		getAffiliateSalesStatistics(
			() => {},
			() => {},
			filters
		);
	};
	// const { data } = useSWR("v1/kreatesell/store/me", fetcher);
	// console.log(data);

	useEffect(() => {
		getSalesStatistics();
		getAffiliateSalesStatistics();
	}, []);

	useEffect(() => {
		getUserVisitStatus();

		// console.log('isFirstTimeUser  from useEffect = ', isFirstTimeUser);
	}, [isFirstTimeUser, getUserVisitStatus]);

	return (
		<AuthLayout>
			<Head>
				<title>KreateSell | Dashboard</title>
			</Head>
			<div
				className={`${styles.dashBoardContainer} ${
					isMobileSideBarOpen ? styles.mobileSideBarInView : ''
				}`}
			>
				<header className={styles.boardSection}>
					<DashboardFilters
						data={[]}
						setFiltered={setFiltered}
						handleFilterSubmit={(cb) => {
							handleFilterSubmit();
							cb?.();
						}}
						{...{
							setFilters,
							filters,
							getSalesStatistics,
							getAffiliateSalesStatistics,
						}}
					/>
				</header>
				<section>
					<div className={styles.stats__container}>
						<StatsHeader
							title="Kreator"
							url="/account/dashboard/kreator"
							isAffiliateCard={false}
							isAnAffiliate={isAnAffiliate}
						/>
						<StatsCard
							totalVisits={salesStatistics.total_visits}
							unitSales={salesStatistics.total_sales}
							grossSales={salesStatistics.gross_sales}
							profit={salesStatistics.profits}
							currency={salesStatistics.currency}
						/>
					</div>
					{/* show only when user is an affiliate */}
					{/* {isAffiliate && ( */}
					<div
						className={`${styles.stats__container} ${
							isAnAffiliate ? styles.isAnAffiliate : ''
						}`}
					>
						<StatsHeader
							title="Affiliate"
							url="/account/dashboard/affiliate"
							isAnAffiliate={isAnAffiliate}
							isAffiliateCard={true}
						/>

						<StatsCard
							isAnAffiliate={isAnAffiliate}
							isAffiliateCard={true}
							totalVisits={
								typeof affiliateSalesStatistics === 'string'
									? 0
									: affiliateSalesStatistics.total_visits ===
									  null
									? 0
									: affiliateSalesStatistics.total_visits
							}
							unitSales={
								typeof affiliateSalesStatistics === 'string'
									? 0
									: affiliateSalesStatistics.total_sales ===
									  null
									? 0
									: affiliateSalesStatistics.total_sales
							}
							grossSales={
								typeof affiliateSalesStatistics === 'string'
									? 0
									: affiliateSalesStatistics.gross_sales ===
									  null
									? 0
									: affiliateSalesStatistics.gross_sales
							}
							profit={
								typeof affiliateSalesStatistics === 'string'
									? 0
									: affiliateSalesStatistics.total_commission_earned ===
									  null
									? 0
									: affiliateSalesStatistics.total_commission_earned
							}
							currency={
								affiliateSalesStatistics.affiliate_currency
							}
						/>
					</div>
					{/* )} */}
				</section>
			</div>
		</AuthLayout>
	);
};

export default Dashboard;
