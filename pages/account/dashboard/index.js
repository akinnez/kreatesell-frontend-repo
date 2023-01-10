import {useState, useEffect, useCallback, useRef} from 'react';
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
// import {RenderIf, CloseIcon} from 'utils';
// import {dashboardGuideData} from '../../../Models/onboardingGuideData';

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

	// get position refs of filter and the dashboard pointers

	// const [currentDataIndex, setCurrentDataIndex] = useState(0);

	// const guideDataObj = dashboardGuideData[currentDataIndex];

	// console.log(guideDataObj,'guideDataObjguideDataObjguideDataObj')

	// const changeContents = () => {
	// 	setCurrentDataIndex(currentDataIndex + 1);
	// };

	// const setPreviousContents = () => {
	// 	setCurrentDataIndex(currentDataIndex - 1);
	// };

	// const hideDashboardGuideModal = () => {
	// 	setHideDahboardGuideModal(true);
	// 	setProceedToOnboard(true)
	// };

	// const positionRef = useRef();
	// const [currentPosition, setCurrentPosition] = useState({
	// 	top: 0,
	// 	left: 0,
	// 	loaded: false,
	// });

	// const offsetCalculate = () => {
	// 	setCurrentPosition({
	// 		top: positionRef.current.getBoundingClientRect().top - 60,
	// 		left: positionRef.current.getBoundingClientRect().left - 550,
	// 		loaded: true,
	// 	});
	// };

	// console.log(positionRef.current,'positionRef.current')

	// useEffect(() => {
	// 	if (typeof window !== undefined && document) {
	// 		offsetCalculate();
	// 	}
	// }, [currentDataIndex]); //fill this array up with dependency

	// useEffect(() => {
	// 	window.addEventListener('scroll', offsetCalculate, true);
	// 	return () => {
	// 		window.removeEventListener('scroll', offsetCalculate, true);
	// 	};
	// }, []);

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
					// ref={positionRef}
					// guideDataObj={guideDataObj}
					// ref={ref}
				/>
			</header>
			<section>
				<div className={styles.stats__container}>
					<StatsHeader
						title="Kreator"
						url="/account/dashboard/kreator"
						isAffiliateCard={false}
						isAnAffiliate={isAnAffiliate}
						// positionRef={positionRef}
						// guideDataObj={guideDataObj}
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
			{/* {isFirstTimer */}
			{/* {proceedToOnboard && (
				<Modal
					title={null}
					footer={null}
					closable={false}
					onCancel={hideModal}
					visible={modalVisible}
					maskClosable={false}
					width={700}
				>
					<div className={styles.modal__wrapper}>
						<header className={styles.header}>
							<Title>Thrilled to welcome you on board </Title>
						</header>
						<div className={styles.content}>
							<p>
								<Text>
									You&apos;re few minutes away from selling
									your e-books, online courses, templates,
									memberships and subscriptions on an amazing
									all-in-one edtech platform.
								</Text>
							</p>
						</div>
						<footer className={styles.footer}>
							<Link href="/account/dashboard/affiliate">
								<a>Tips to sell your contents</a>
							</Link>
							<Button
								size="large"
								type="primary"
								onClick={hideModal}
							>
								Proceed to Dashboard
							</Button>
						</footer>
					</div>
				</Modal>
			)} */}

			{/* <RenderIf condition={currentPosition.loaded}>
				<div
					style={{
						background: 'rgba(0,0,0,0.7)',
						position: 'fixed',
						top: 0,
						left: 250,
						right: 0,
						bottom: 0,
						zIndex: 5000,
					}}
				></div>
				<div
					id="website-guide"
					style={{
						position: 'absolute',
						left: `${currentPosition.left}px`,
						top: `${currentPosition.top}px`,
						zIndex: 5000,
					}}
					className={styles.onboardingTooltip}
				>
					<div className={styles.dashboardGuideArrow}></div>
					<div className={styles.toolTipTitleContainer}>
						<p className={styles.toolTipModalTitle}>
							{guideDataObj.modalTitle}
						</p>
					</div>
					<p className={styles.toolTipText}>
						{guideDataObj.modalText}
					</p>
					<div className={styles.toolTipTitleContainer}>
						<p className={styles.toolTipBtnText}>{guideDataObj.index}/9</p>
						<div className={styles.toolTipBtnContainer}>
							<button
								disabled={guideDataObj.menuItem === 'dashboard'}
								className={styles.toolTipBtn}
								onClick={setPreviousContents}
							>
								Prev
							</button>

							{guideDataObj.menuItem !== 'settings' && (
								<button
									className={styles.toolTipNextBtn}
									onClick={changeContents}
								>
									Next
								</button>
							)}

							{guideDataObj.menuItem === 'settings' && (
								<button
									className={styles.toolTipNextBtn}
									onClick={hideDashboardGuideModal}
								>
									Got it
								</button>
							)}
						</div>
					</div>
				</div>
			</RenderIf> */}

			{/* {hideDahboardGuideModal && (
				<DashboardGuide
					setHideDahboardGuideModal={setHideDahboardGuideModal}
				/>
			)} */}
		</AuthLayout>
	);
};

export default Dashboard;
