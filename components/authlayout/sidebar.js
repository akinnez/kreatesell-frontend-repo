import {useState, memo, useEffect, useRef, forwardRef} from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {Menu} from 'antd';
import style from './sidebar.module.scss';
import {useRouter} from 'next/router';
import {SetProductDefault, SetProductID} from 'redux/actions';
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
import {BusinessPlanBox, OpenSubMenu} from '../../utils/assets';

import {Logout as LogoutAction} from '../../redux/actions/auth.actions';
import Timer from './Timer';
import {RenderIf, CloseIcon} from 'utils';
import {
	guideDataObject,
	guideDataObjectMobiles,
	dashboardGuideData,
} from '../../Models/onboardingGuideData';

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
// const globalState = {
//   position: ['dashboard', 'store', 'products'],
//   progress: {
//     dashboard:{
//       isActive: true,
//       content: '',
//       hasPrev: false,
//       hasNext: true
//     },
//     store:{
//       isActive: false,
//       content: '',
//       hasPrev: true,
//       hasNext: true
//     },
//   }
// }

// const [currentActiveIndex, setCurrentActiveIndex] = useState(0);

// const handleNextClick = () => {
//   setCurrentActiveIndex(prev=>prev+1);
// }

// globalState.progress[globalState[currentActiveIndex]]

const SubmenuComp = memo(
	forwardRef(({Icon = () => <>

			</>, title, target = '#', isProductOpen, onOpenChange, ...rest}, ref) => {
		const {pathname} = useRouter();
		const isPath = target.split('/')[3] == pathname.split('/')[3];

		const {SubMenu} = Menu;

		return (
			<div ref={ref}>
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
			</div>
		);
	})
);
SubmenuComp.displayName = 'SubMenuContainer';

const Sidebar = ({isMobileView = false}) => {
	const {SubMenu} = Menu;
	const router = useRouter();
	const setProductId = SetProductID();
	const setProductDefault = SetProductDefault();
	const positionRef = useRef();

	// const [isOpen, setIsOpen] = useState(false);

	const [currentDataIndex, setCurrentDataIndex] = useState(0);

	const guideDataObj = guideDataObject[currentDataIndex];

	console.log('guideDataObj', guideDataObj);

	guideDataObj.menuItem === 'products' &&
		console.log(positionRef.current.getBoundingClientRect(), 'current');
	const changeContents = () => {
		setCurrentDataIndex(currentDataIndex + 1);
	};

	const setPreviousContents = () => {
		setCurrentDataIndex(currentDataIndex - 1);
	};

	const [isOpen, setIsOpen] = useState({
		isProductOpen: false,
		isKreatorOpen: false,
		isAffiliateOpen: false,
		isSalesOpen: false,
	});

	const [currentPosition, setCurrentPosition] = useState({
		top: 0,
		left: 0,
		loaded: false,
	});
	const [isActive, setIsActive] = useState(() => {
		let route = router.pathname.split('/');
		return route[route.length - 1];
	});

	const {isAffiliateOpen, isKreatorOpen, isProductOpen, isSalesOpen} = isOpen;
	const onOpenChange = (id) => {
		// setIsOpen((isOpen) => !isOpen);
		setIsOpen((prev) => ({...isOpen, [id]: !isOpen[id]}));
	};
	const offsetCalculate = () => {
		setCurrentPosition({
			top: positionRef.current.getBoundingClientRect().top,
			left: positionRef.current.getBoundingClientRect().left + 150,
			loaded: true,
		});
	};

	useEffect(() => {
		if (typeof window !== undefined && document) {
			offsetCalculate();
		}
	}, [currentDataIndex]);

	useEffect(() => {
		window.addEventListener('scroll', offsetCalculate, true);
		return () => {
			window.removeEventListener('scroll', offsetCalculate, true);
		};
	}, []);

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
				{/* <MenuItem
					key={3}
					Icon={Product}
					title="Products"
					target="/account/kreator/products"
				/> */}
				<SubmenuComp
					ref={
						guideDataObj.menuItem === 'products'
							? positionRef
							: null
					}
					isProductOpen={isProductOpen}
					onOpenChange={onOpenChange}
				/>
				{/* <div
					ref={guideDataObj.menuItem === 'products' ? positionRef : null}
					style={{ border: guideDataObj.menuItem === 'products' ? '2px solid red' : "" }}
				>
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
										console.log('ytrfghjuytrdfgh');
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
				</div> */}
				<SubMenu
					key="kreators-menu"
					ref={
						guideDataObj.menuItem === 'kreators'
							? positionRef
							: null
					}
					onClick={() => setIsActive('kreators')}
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
				<SubMenu
					key="affiliates-menu"
					ref={
						guideDataObj.menuItem === 'affiliates'
							? positionRef
							: null
					}
					onClick={() => setIsActive('affiliates')}
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
				<SubMenu
					key="sales-menu"
					ref={guideDataObj.menuItem === 'sales' ? positionRef : null}
					onClick={() => setIsActive('sales')}
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
				<MenuItem
					ref={guideDataObj.menuItem === 'help' ? positionRef : null}
					key={5}
					Icon={Help}
					isHelp={true}
					title="Help"
					target="/account/kreator/help"
					onClick={() => setIsActive('help')}
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
					onClick={() => setIsActive('integrations')}
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
			<RenderIf condition={currentPosition.loaded}>
				<div
					id="website-guide"
					style={{
						position: 'absolute',
						left: `${currentPosition.left}px`,
						top: `${currentPosition.top}px`,
						zIndex: 5,
					}}
					className={style.onboardingTooltip}
				>
					<div className={style.dashboardGuideArrow}></div>
					<div className={style.toolTipTitleContainer}>
						<p className={style.toolTipModalTitle}>
							{guideDataObj.modalTitle}
						</p>
						<div>
							<Image
								src={CloseIcon}
								className={style.toolTipCloseIcon}
								// onClick={hideDashboardGuideModal}
							/>
						</div>
					</div>
					<p className={style.toolTipText}>
						{guideDataObj.modalText}
					</p>
					<div className={style.toolTipTitleContainer}>
						<p className={style.toolTipBtnText}>1/3</p>
						<div className={style.toolTipBtnContainer}>
							<button
								// disabled={index === 0}
								className={style.toolTipBtn}
								onClick={setPreviousContents}
							>
								Prev
							</button>
							{/* {index !== dashboardGuideData.length - 1 && ( */}
							<button
								// disabled={
								// 	index === dashboardGuideData.length - 1
								// }
								className={style.toolTipNextBtn}
								onClick={changeContents}
							>
								Next
							</button>
							{/* )} */}
							{/* {index === dashboardGuideData.length - 1 && (
								<button
									className={styles.toolTipNextBtn}
									onClick={hideDashboardGuideModal}
								>
									Got it
								</button>
							)} */}
						</div>
					</div>
				</div>
			</RenderIf>
			{!isMobileView && <Timer />}
		</div>
	);
};

export default Sidebar;
