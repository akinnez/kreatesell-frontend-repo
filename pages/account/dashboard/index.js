import {useState, useEffect, useCallback} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {Modal, Button, Typography} from 'antd';
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

const {Text, Title} = Typography;

const Dashboard = () => {
	const [modalVisible, setModalVisible] = useState(true);
	const [_, setFiltered] = useState(null);
	const [isAnAffiliate, setIsAnAffiliate] = useState(false);

	const getSalesStatistics = GetSalesStatistics();
	const getAffiliateSalesStatistics = GetAffiliateSalesStatistics();

	const [filters, setFilters] = useState({
		currency: '',
		fromDate: '',
		toDate: '',
	});
	const [proceedToOnboard, setProceedToOnboard] = useState(false);
	const [guideModalVisible, setGuideModalVisible] = useState(false);
	const [hideDahboardGuideModal, setHideDahboardGuideModal] = useState(false);
	const [isMobile, setIsmobile] = useState(false);

	const {salesStatistics} = useSelector((state) => state.store);
	const {affiliateSalesStatistics} = useSelector((state) => state.store);

	const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
	const mainStoreUrl = `${process.env.BASE_URL}v1/kreatesell/store/me`;

	const hideModal = async () => {
		setModalVisible(false);
		try {
			const response = await axios.get(
				`${process.env.BASE_URL}v1/kreatesell/store/welcome-message`
			);
			console.log(response?.data);
			isMobile
				? setHideDahboardGuideModal(false)
				: setHideDahboardGuideModal(true);
		} catch (error) {
			console.log(error);
		}
	};
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

		console.log('isFirstTimeUser  from useEffect = ', isFirstTimeUser);
	}, [isFirstTimeUser, getUserVisitStatus]);
	// console.log('filters', filters);
	return (
		<AuthLayout>
			<Head>
				<title>KreateSell | Dashboard</title>
			</Head>
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
							affiliateSalesStatistics.total_visits === null
								? 0
								: affiliateSalesStatistics.total_visits
						}
						unitSales={
							affiliateSalesStatistics.total_sales === null
								? 0
								: affiliateSalesStatistics.total_sales
						}
						grossSales={
							affiliateSalesStatistics.gross_sales === null
								? 0
								: affiliateSalesStatistics.gross_sales
						}
						profit={
							affiliateSalesStatistics.total_commission_earned ===
							null
								? 0
								: affiliateSalesStatistics.total_commission_earned
						}
						currency={affiliateSalesStatistics.affiliate_currency}
					/>
				</div>
				{/* )} */}
			</section>
		</AuthLayout>
	);
};

export default Dashboard;
