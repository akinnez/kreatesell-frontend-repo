import Link from 'next/link';
import {Menu} from 'antd';
import style from './sidebar.module.scss';
import {useRouter} from 'next/router';
import {SetProductDefault, SetProductID} from 'redux/actions';
import Image from 'next/image';
import {mutate} from 'swr';
import {
	Shop,
	Dashboard,
	Product,
	Wallet,
	Ticket,
	Help,
	Setting,
	Logout,
	CloseSubMenu,
	AffiliatesIcon,
	KreatorsIcon,
	SalesIcon,
} from '../IconPack';
import {
	useState,
	memo,
	useEffect,
	useRef,
	forwardRef,
	useCallback,
} from 'react';
import {BusinessPlanBox, OpenSubMenu} from '../../utils/assets';
import {RenderIf, CloseIcon} from 'utils';
import {guideDataObject} from '../../Models/onboardingGuideData';
import axiosAPI from 'utils/axios';

import {Logout as LogoutAction} from '../../redux/actions/auth.actions';
import Timer from './Timer';

const menuItemStyle = {
	display: 'flex',
	alignItems: 'center',
};

const MenuItem = memo(
	forwardRef(({Icon = () => <></>, title, target = '#', ...rest}, ref) => {
		const {pathname} = useRouter();
		const isPath = target.split('/')[3] == pathname.split('/')[3];

		return (
			<Menu.Item
				{...rest}
				style={menuItemStyle}
				icon={
					<Icon
						className={style.icon}
						active={isPath}
						height={20}
						width={20}
					/>
				}
				title={title}
				className={isPath ? style.active : style.menuitem}
			>
				<Link href={target}>
					<a ref={ref}>{title}</a>
				</Link>
			</Menu.Item>
		);
	})
);
MenuItem.displayName = 'MenuItem';

const LogoutItem = ({Icon = () => <></>, title, target = '#', ...rest}) => {
	const {pathname} = useRouter();
	const logout = LogoutAction();
	const isPath = target.split('/')[3] == pathname.split('/')[3];

	return (
		<Menu.Item
			{...rest}
			style={{background: '#0072EF', color: 'white', ...menuItemStyle}}
			icon={
				<Icon
					className={style.icon}
					active={true}
					height={20}
					width={20}
				/>
			}
			title={title}
			className={style.active}
			onClick={() => logout()}
		>
			{title}
		</Menu.Item>
	);
};

// console.log(OpenSubMenu);

const Sidebar = ({isMobileView = false, setProceedToOnboard}) => {
	const {SubMenu} = Menu;
	const router = useRouter();
	const setProductId = SetProductID();
	const setProductDefault = SetProductDefault();
	const positionRef = useRef();

	const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);

	const [hideDahboardGuideModal, setHideDahboardGuideModal] = useState(false);

	const [currentDataIndex, setCurrentDataIndex] = useState(0);

	const guideDataObj = guideDataObject[currentDataIndex];

	const changeContents = () => {
		setCurrentDataIndex(currentDataIndex + 1);
	};

	const setPreviousContents = () => {
		setCurrentDataIndex(currentDataIndex - 1);
	};

	const [currentPosition, setCurrentPosition] = useState({
		top: 0,
		left: 0,
		loaded: false,
	});

	const route = router.pathname.split('/')[2];

	// const [isOpen, setIsOpen] = useState(false);
	const [isOpen, setIsOpen] = useState({
		isProductOpen: false,
		isKreatorOpen: false,
		isAffiliateOpen: false,
		isSalesOpen: false,
	});

	const {isAffiliateOpen, isKreatorOpen, isProductOpen, isSalesOpen} = isOpen;
	const onOpenChange = (id) => {
		// setIsOpen((isOpen) => !isOpen);
		setIsOpen((prev) => ({...isOpen, [id]: !isOpen[id]}));
	};

	const offsetCalculate = () => {
		setCurrentPosition({
			top: positionRef.current.getBoundingClientRect().top - 95,
			left: positionRef.current.getBoundingClientRect().left + 160,
			loaded: true,
		});
	};

	useEffect(() => {
		if (typeof window !== undefined && document && route === 'dashboard') {
			offsetCalculate();
		}
	}, [currentDataIndex]);

	useEffect(() => {
		if (route === 'dashboard') {
			window.addEventListener('scroll', offsetCalculate, true);
		}
		return () => {
			window.removeEventListener('scroll', offsetCalculate, true);
		};
	}, []);

	const hideDashboardGuideModal = () => {
		setHideDahboardGuideModal(true);
		setProceedToOnboard(true);
	};

	const mainStoreUrl = `${process.env.BASE_URL}v1/kreatesell/store/me`;

	const getUserVisitStatus = useCallback(() => {
		axiosAPI.request(
			'get',
			mainStoreUrl,
			(res) => {
				// console.log(
				// 	'isAnAffiliate from endpoint = ',
				// 	res?.data?.user?.is_affiliate
				// );
				setIsFirstTimeUser(res?.data?.user?.is_first_time);
				mutate(mainStoreUrl);
			},
			(err) => {
				console.log('error = ', err);
			}
		);
	}, [mainStoreUrl]);

	useEffect(() => {
		getUserVisitStatus();
		console.log('isFirstTimeUser  from useEffect = ', isFirstTimeUser);
	}, [isFirstTimeUser, getUserVisitStatus]);

	return (
		<div className={style.sidebar}>
			<Menu
				mode="inline"
				theme="light"
				className={style.menu}
				// onClick={handleClick}
			>
				<MenuItem
					ref={
						guideDataObj.menuItem === 'dashboard'
							? positionRef
							: null
					}
					key={1}
					Icon={Dashboard}
					title="Dashboard"
					target="/account/dashboard"
				/>
				<MenuItem
					ref={guideDataObj.menuItem === 'store' ? positionRef : null}
					key={2}
					Icon={Shop}
					title="Store"
					target="/account/kreator/store"
				/>
				{guideDataObj.menuItem === 'products' ? (
					<MenuItem
						ref={
							guideDataObj.menuItem === 'products'
								? positionRef
								: null
						}
						key="sub1"
						Icon={Product}
						title="Products"
						target="/account/kreator/products/all"
					/>
				) : (
					<SubMenu
						key="sub1"
						onTitleClick={() => onOpenChange('isProductOpen')}
						icon={
							<Product
								className={style.icon}
								height={20}
								width={20}
							/>
						}
						title="Products"
						className={style.subMenu}
						id="isProductOpen"
						expandIcon={() => {
							return isProductOpen ? (
								<CloseSubMenu className={style.closeIcon} />
							) : (
								<Image
									src={OpenSubMenu.src}
									alt="open"
									width={14}
									height={14}
									// onClick={handleClick}
								/>
							);
						}}
					>
						<Menu.Item key={35}>
							<Link href="/account/kreator/products/all">
								<a>All Products</a>
							</Link>
						</Menu.Item>
						<Menu.Item key={36}>
							<Link href="/account/kreator/products/create">
								<a
									onClick={(e) => {
										e.preventDefault();
										setProductId('');
										setProductDefault();
										router.push(
											'/account/kreator/products/create'
										);
									}}
								>
									Create Product
								</a>
							</Link>
						</Menu.Item>
						<Menu.Item key={37}>
							<Link href="/account/kreator/products/coupons">
								<a>Coupon Codes</a>
							</Link>
						</Menu.Item>
					</SubMenu>
				)}
				{guideDataObj.menuItem === 'kreators' ? (
					<MenuItem
						ref={
							guideDataObj.menuItem === 'kreators'
								? positionRef
								: null
						}
						key="kreators-menu"
						Icon={KreatorsIcon}
						title="Kreators"
						target="/account/kreator/affiliates-requests"
					/>
				) : (
					<SubMenu
						key="kreators-menu"
						// onClick={() => setIsActive('kreators')}
						icon={
							<KreatorsIcon
								className={style.icon}
								height={20}
								width={20}
							/>
						}
						title="Kreators"
						className={style.subMenu}
						onTitleClick={() => onOpenChange('isKreatorOpen')}
						id="isKreatorOpen"
						expandIcon={() => {
							return isKreatorOpen ? (
								<CloseSubMenu className={style.closeIcon} />
							) : (
								<Image
									src={OpenSubMenu.src}
									alt="open"
									width={14}
									height={14}
									// onClick={handleClick}
								/>
							);
						}}
					>
						<Menu.Item key={41}>
							<Link href="/account/kreator/affiliates-requests">
								<a>Affiliates Requests</a>
							</Link>
						</Menu.Item>
						<Menu.Item key={40}>
							<Link href="/account/kreator/abandoned-carts">
								<a>Abandoned Carts</a>
							</Link>
						</Menu.Item>
					</SubMenu>
				)}
				{guideDataObj.menuItem === 'affiliates' ? (
					<MenuItem
						ref={
							guideDataObj.menuItem === 'affiliates'
								? positionRef
								: null
						}
						key="affiliates-menu"
						Icon={AffiliatesIcon}
						title="Affiliates"
						target="/account/kreator/affiliates-requests"
					/>
				) : (
					<SubMenu
						key="affiliates-menu"
						// onClick={() => setIsActive('affiliates')}
						icon={
							<AffiliatesIcon
								className={style.icon}
								height={20}
								width={20}
							/>
						}
						title="Affiliates"
						className={style.subMenu}
						onTitleClick={() => onOpenChange('isAffiliateOpen')}
						id="iisAffiliateOpen"
						expandIcon={() => {
							return isAffiliateOpen ? (
								<CloseSubMenu className={style.closeIcon} />
							) : (
								<Image
									src={OpenSubMenu.src}
									alt="open"
									width={14}
									height={14}
									// onClick={handleClick}
								/>
							);
						}}
					>
						<Menu.Item key={38}>
							<Link href="/account/affiliate/market-place">
								<a>Market Place</a>
							</Link>
						</Menu.Item>
						<Menu.Item key={39}>
							<Link href="/account/affiliate/requests">
								<a>Requests</a>
							</Link>
						</Menu.Item>
					</SubMenu>
				)}
				{guideDataObj.menuItem === 'sales' ? (
					<MenuItem
						ref={
							guideDataObj.menuItem === 'sales'
								? positionRef
								: null
						}
						key="sales-menu"
						Icon={SalesIcon}
						title="Sales"
						target="/account/sales/payouts"
					/>
				) : (
					<SubMenu
						key="sales-menu"
						// onClick={() => setIsActive('sales')}
						icon={
							<SalesIcon
								className={style.icon}
								height={20}
								width={20}
							/>
						}
						title="Sales"
						className={style.subMenu}
						onTitleClick={() => onOpenChange('isSalesOpen')}
						id="isSalesOpen"
						expandIcon={() => {
							return isSalesOpen ? (
								<CloseSubMenu className={style.closeIcon} />
							) : (
								<Image
									src={OpenSubMenu.src}
									alt="open"
									width={14}
									height={14}
									// onClick={handleClick}
								/>
							);
						}}
					>
						<Menu.Item key="sales-payouts">
							<Link href="/account/sales/payouts">
								<a>Payouts</a>
							</Link>
						</Menu.Item>
						<Menu.Item key="sales-transactions">
							<Link href="/account/sales/transactions">
								<a>Transactions</a>
							</Link>
						</Menu.Item>
						<Menu.Item key="sales-revenue">
							<Link href="/account/sales/revenue">
								<a>Revenue</a>
							</Link>
						</Menu.Item>
					</SubMenu>
				)}
				<MenuItem
					ref={guideDataObj.menuItem === 'help' ? positionRef : null}
					key={5}
					Icon={Help}
					isHelp={true}
					title="Help"
					target="/account/kreator/help"
					// onClick={() => setIsActive('help')}
				/>
				<MenuItem
					ref={
						guideDataObj.menuItem === 'integrations'
							? positionRef
							: null
					}
					key={6}
					Icon={Ticket}
					title="Integrations"
					target="/account/kreator/integrations"
					// onClick={() => setIsActive('integrations')}
				/>{' '}
				<MenuItem
					ref={
						guideDataObj.menuItem === 'settings'
							? positionRef
							: null
					}
					key={7}
					Icon={Setting}
					title="Settings"
					target="/account/kreator/settings"
				/>
				<LogoutItem key={8} Icon={Logout} title="Logout" />
			</Menu>
			<RenderIf
				condition={
					route === 'dashboard' &&
					!hideDahboardGuideModal &&
					!isMobileView &&
					isFirstTimeUser
				}
			>
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
					className={style.modal_wrapper}
				></div>
				<div
					id="website-guide"
					style={{
						position: 'absolute',
						left: `${currentPosition.left}px`,
						top: `${currentPosition.top}px`,
						zIndex: 5000,
					}}
					className={style.onboardingTooltip}
				>
					<div className={style.guideArrow}></div>
					<div className={style.toolTipTitleContainer}>
						<p className={style.toolTipModalTitle}>
							{guideDataObj.modalTitle}
						</p>
						<div>
							<Image
								src={CloseIcon}
								className={style.toolTipCloseIcon}
								onClick={hideDashboardGuideModal}
							/>
						</div>
					</div>
					<p className={style.toolTipText}>
						{guideDataObj.modalText}
					</p>
					<div className={style.toolTipTitleContainer}>
						<p className={style.toolTipBtnText}>
							{guideDataObj.index}/9
						</p>
						<div className={style.toolTipBtnContainer}>
							<button
								disabled={guideDataObj.menuItem === 'dashboard'}
								className={style.toolTipBtn}
								onClick={setPreviousContents}
							>
								Prev
							</button>

							{guideDataObj.menuItem !== 'settings' && (
								<button
									className={style.toolTipNextBtn}
									onClick={changeContents}
								>
									Next
								</button>
							)}

							{guideDataObj.menuItem === 'settings' && (
								<button
									className={style.toolTipNextBtn}
									onClick={hideDashboardGuideModal}
								>
									Got it
								</button>
							)}
						</div>
					</div>
				</div>
			</RenderIf>
			{!isMobileView && <Timer />}
		</div>
	);
};

export default Sidebar;
