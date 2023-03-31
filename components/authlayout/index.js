import React, {useEffect, useState, useCallback} from 'react';

import useSWR from 'swr';
import {Layout, Modal, Typography} from 'antd';
import {Spin, Dropdown} from 'antd';
import {ToastContainer} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import Router, {useRouter} from 'next/router';

import styles from './sidebar.module.scss';
import Sidebar from './sidebar';
import Logo from './logo';
import Nav from './header';
import ApiService from '../../utils/axios';
import * as types from '../../redux/types';
import fetcher from '../../utils/fetcher';
import {
	checkExpiredUserToken,
	getUser,
	getUserToken,
	showToast,
	_isUserLoggedIn,
	isAnEmpytyObject,
	NavCloseDropdownIcon,
	SideBarLoginProfile,
	PromptInfoIcon,
	Congratulations,
} from 'utils';
import {Logout} from '../../redux/actions';
import {USER} from 'redux/types/auth.types';
import {GetProductTypes} from 'redux/actions/product.actions';
import useFetchUtilities from 'hooks/useFetchUtilities';
import useFetchStore from 'hooks/useFetchStore';
import useFetchNotifications from 'hooks/useFetchNotifications';
import {menu} from './header';
import CloseIcon from 'components/affiliates/CloseIcon';
import {Button} from 'components';
import axiosAPI from 'utils/axios';
import {SuccessfulAffiliateSales} from 'redux/actions/affiliate.actions';
import {TOGGLE_SIDEBAR, CLOSE_SIDEBAR} from '../../redux/types';

const Loader = () => {
	return (
		<>
			<div className="loader">
				<Spin size="large" />
				<p>Please wait...</p>
			</div>

			<style jsx>{`
				.loader {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;
					flex-direction: column;
				}
			`}</style>
		</>
	);
};

const Index = ({
	loading,
	children,
	contentStyle,
	mobilePadding = false,
	headerTitle,
}) => {
	const {Header, Footer, Sider, Content} = Layout;
	const router = useRouter();
	const [info, setInfo] = useState('');
	const pathname = router.pathname;

	const {
		store: {store_details, require_approval_message},
	} = useSelector((state) => state.store);

	const {data} = useSWR('v1/kreatesell/store/me', fetcher);
	// console.log("data from store = ", data?.user);

	const userPlan = data?.user?.user_plan;
	const percentageCompleted = data?.percentage_completed;

	const storeSetupPromptIsShown = useCallback(() => {
		return (
			percentageCompleted <= 80 &&
			(pathname === '/account/kreator/store' ||
				pathname === '/account/dashboard')
		);
	}, [percentageCompleted, pathname]);

	// console.log("prompt is Visible = ", storeSetupPromptIsShown);

	useEffect(() => {
		checkExpiredUserToken();
	}, []);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		// const user = JSON.parse(sessionStorage.getItem("user"));
		setInfo(user);
	}, []);

	// console.log("info = ", info);
	// console.log("store details = ", store_details);
	//* uncomment - temp by-pass
	useEffect(() => {
		if (!_isUserLoggedIn()) {
			showToast('Login required to view page', 'info');
			return router.push('/login');
		}
	}, []);

	//* uncomment

	const user = useSelector((state) => state.auth);
	const [userName, setUserName] = useState('');
	const dispatch = useDispatch();
	const userIsEmpty = isAnEmpytyObject(user.user);
	const productTypes = GetProductTypes();
	const logout = Logout();
	useEffect(() => {
		if (userIsEmpty) {
			dispatch({type: USER.REQUEST});

			const userStorage = getUser();

			setUserName(userStorage?.full_name);

			if (userStorage) {
				dispatch({type: USER.SUCCESS, payload: userStorage});
			}
		}
	}, [dispatch, userIsEmpty]);

	useEffect(() => {
		productTypes();
	}, []);

	useFetchUtilities();
	useFetchStore();
	useFetchNotifications();

	// const [isMobileSideBarOpen, setIsMobileSideBarOpen] = useState(false);
	const isMobileSideBarOpen = useSelector(
		(state) => state.mobileSideBar.isMobileSideBarOpen
	);

	useEffect(() => {
		if (isMobileSideBarOpen) {
			Router.events.on('routeChangeComplete', () => {
				dispatch({type: CLOSE_SIDEBAR});
			});
		}
	}, [isMobileSideBarOpen]);

	const toggleView = () => {
		dispatch({type: TOGGLE_SIDEBAR});
	};

	const [showOverlayOnClick, setShowOverlayOnClick] = useState(false);

	const [proceedToOnboard, setProceedToOnboard] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	useEffect(() => {
		if (require_approval_message) {
			setShowSuccessModal(require_approval_message);
		}
	}, [require_approval_message]);

	const [hideSider, setHideSider] = useState(false);
	const route = router.pathname.split('/');

	useEffect(() => {
		if (route.includes('preview') && route.includes('products')) {
			setHideSider(true);
		}
	}, [route]);

	return (
		<section className={styles.layoutMain}>
			{storeSetupPromptIsShown() && (
				<SetUpPrompt show={storeSetupPromptIsShown()} />
			)}
			<Layout>
				<Sider
					width={250}
					theme="light"
					style={
						hideSider
							? {display: 'none'}
							: {
									height: '100vh',
									position: 'sticky',
									top: '0',
									left: '0',
									zIndex: '1000',
							  }
					}
					trigger={null}
					breakpoint="lg"
					collapsedWidth={0}
				>
					<div
						style={{
							padding: '0 5px',
							position: 'relative',
							zIndex: 1000,
						}}
					>
						<Logo />
						<div style={{position: 'relative'}}>
							<Sidebar
								setProceedToOnboard={setProceedToOnboard}
							/>
						</div>
					</div>
				</Sider>
				{isMobileSideBarOpen && (
					<div className={styles.mobileSideBar}>
						<div className={styles.profile}>
							<div className={styles.profileImgBox}>
								{store_details?.display_picture ? (
									<Image
										src={store_details?.display_picture}
										alt="profile"
										width={'100%'}
										height={'100%'}
										objectFit="cover"
									/>
								) : (
									<Image
										src={SideBarLoginProfile}
										alt="profile"
									/>
								)}
							</div>
							<div className={styles.details}>
								<p>{info?.full_name ? info.full_name : ''}</p>
								<div
									className={
										userPlan === 'Business'
											? styles.businessPlan
											: styles.basicPlan
									}
								>
									{userPlan === 'Business'
										? 'Business Account'
										: 'Basic Account'}
								</div>
							</div>
							<Dropdown
								overlay={menu(logout)}
								placement="bottomRight"
								arrow
								visible={showOverlayOnClick}
								onClick={() => {
									setShowOverlayOnClick(!showOverlayOnClick);
								}}
							>
								<div className={styles.dropDown}>
									<Image
										src={NavCloseDropdownIcon}
										alt="closeDropdownIcon"
									/>
								</div>
							</Dropdown>
						</div>
						<Sidebar isMobileView={true} />
					</div>
				)}
				<Layout>
					<Nav
						headerTitle={headerTitle}
						toggleView={toggleView}
						isMobileSideBarOpen={isMobileSideBarOpen}
					/>

					<Content
						// The previous style above was replaced with the one below cos a different bg needed to be dynamically rendered for mobile view.
						className={`content ${styles.content} ${
							mobilePadding && `authLayout-no-mobile-padding`
						}`}
					>
						<ToastContainer
							position="top-right"
							autoClose={5000}
							hideProgressBar={true}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
						/>
						{loading ? <Loader /> : children}
					</Content>
				</Layout>
			</Layout>

			<style jsx>{`
				.content {
					background-color: rgba(245, 245, 245, 1);
					padding: 50px 30px 10px 30px;
				}
			`}</style>
			{proceedToOnboard && <WelcomeOnBoard />}

			<SuccesfulSalesModal
				showModal={showSuccessModal}
				{...{setShowSuccessModal}}
			/>
		</section>
	);
};

const SetUpPrompt = ({show}) => {
	return (
		<div className={`${styles.setUpPrompt} ${show ? styles.show : ''}`}>
			<div className={styles.promptHeader}>
				<Image src={PromptInfoIcon} alt="prompt info" />
				<h4> Finish your store set up</h4>
			</div>
			<p>
				Provide all the required information for your store to be fully
				setup and activated.{' '}
				<Link href="/account/kreator/store/edit">
					Click here to proceed
				</Link>
				.
			</p>
		</div>
	);
};

const SuccesfulSalesModal = ({showModal = false, setShowSuccessModal}) => {
	const router = useRouter();
	const successfulAffiliateSales = SuccessfulAffiliateSales();
	const {loading} = useSelector((state) => state.Affiliate);
	const handleSubmit = () => {
		successfulAffiliateSales(
			() => {
				setTimeout(() => {
					setShowSuccessModal(false);
					router.push('/account/affiliate/market-place');
				}, 1000);
			},
			() => console.log('error')
		);
	};

	return (
		<Modal
			title={null}
			footer={null}
			visible={showModal}
			onCancel={() => setShowSuccessModal(false)}
			maskClosable={false}
			closeIcon={<CloseIcon />}
			className={styles.affiliate__modal}
			style={{textAlign: 'center'}}
			width={800}
		>
			<Image src={Congratulations} alt="" />
			<h5>Congratulations, you have made your 5th sale!</h5>
			<p className={`mb-0`}>
				You now have unrestricted access to market any product without
				requesting for <br />
				access.
			</p>
			<Button
				bgColor="primaryBlue"
				text="Go To MarketPlace"
				className={`py-3 mt-5 ${styles.modalBtn}`}
				onClick={handleSubmit}
				{...{loading}}
			/>
		</Modal>
	);
};

const WelcomeOnBoard = () => {
	const [modalVisible, setModalVisible] = useState(true);
	const {Text, Title} = Typography;

	const hideModal = async () => {
		setModalVisible(false);
		try {
			await axiosAPI.request(
				'get',
				`v1/kreatesell/store/welcome-message`,
				(res) => {
					console.log(res);
				},
				(error) => {
					console.log(error);
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal
			title={null}
			footer={null}
			closable={false}
			// onCancel={()=> console.log('hghgh')}
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
							You&apos;re few minutes away from selling your
							e-books, online courses, templates, memberships and
							subscriptions on an amazing all-in-one edtech
							platform.
						</Text>
					</p>
				</div>
				<footer className={styles.footer}>
					{/* {user?.percentage_completed !== 100 && ( */}
					<Link href="/account/dashboard/affiliate">
						<a>Tips to sell your contents</a>
					</Link>
					<Button
						bgColor="primaryBlue"
						text="Proceed to Dashboard"
						className={`py-3 ${styles.modalBtn}`}
						onClick={hideModal}
					/>
				</footer>
			</div>
		</Modal>
	);
};

export default Index;
