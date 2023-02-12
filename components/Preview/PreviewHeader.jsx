import {useEffect, useState} from 'react';
import Image from 'next/image';

import {useSelector} from 'react-redux';
import {Button, Form, Input, Modal, Select, Tooltip} from 'antd';

import {Button as NormalButton} from 'components';
import {
	ProductHeaderLogo,
	CopyLink,
	_copyToClipboard,
	transformToFormData,
	NavCloseIcon,
} from 'utils';
import {MdOutlineMenu} from 'react-icons/md';
import {MobileLogo} from 'components/authlayout/logo';
import {Button as CButton, Select as CSelect} from 'components';
import {
	ArrowLeft,
	PublishProduct,
	UnPublishProduct,
	SearchIcon,
	LinkCopy,
	MobileBackArrow,
} from 'utils';
import styles from './PreviewHeader.module.scss';
import CloseIcon from 'components/affiliates/CloseIcon';
import {useRouter} from 'next/router';
import {useFormik} from 'formik';
import {PublishProducts, Logout} from 'redux/actions';
import Link from 'next/link';
import useCurrency from 'hooks/useCurrency';

import * as ROUTES from 'routes';
import {StoreMobileDropView} from 'pages/store/[storename]';

export default function PreviewHeader({
	id,
	showNavLinks = true,
	formattedCurrencies,
	setActiveCurrency,
	isPreviewMain = false,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [isResponse, setIsResponse] = useState(false);
	const [isError, setIsError] = useState(false);
	const [title, setTitle] = useState('');
	const [link, setLink] = useState('');
	const [mobileSideBarIsOpen, setMobileSidebarIsOpen] = useState(false);
	const {product, loading} = useSelector((state) => state.product);
	const [domainLink, setDomainLink] = useState('');
	const {store} = useSelector((state) => state.store);
	const {Option} = Select;
	const router = useRouter();
	const publishProduct = PublishProducts();

	const storeName = store?.store_details?.store_name;
	const {singleStoreDetails} = useSelector((state) => state.product);

	const displayPicture = product?.store_dto?.profile_pix;

	const nameOfStore = product?.store_dto?.store_name;

	const {
		// allowedCurrencies: currencyOptions,
		loading: currencyLoading,
	} = useCurrency();

	const logout = Logout();
	const handleSubmit = (data) => {
		publishProduct(
			data,
			() => {
				setIsOpen(false);
				setIsResponse(true);
			},
			() => {
				setIsOpen(false);
				setIsError(true);
			}
		);
	};

	const initialValues = {
		product_id: '',
		publish: 'live',
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validateOnChange: false,
	});

	const {setFieldValue, values} = formik;
	const productId = product?.product_details?.kreasell_product_id;
	useEffect(() => {
		setTitle(product?.product_details?.product_name);
		// * try this

		setLink(
			`http://dev.kreatesell.com/store/${storeName}/product/${productId}`
		);
	}, [product, productId, storeName]);

	useEffect(() => {
		if (Object.keys(product).length > 0) {
			setFieldValue('product_id', product?.product_details?.id);
		}
	}, [product]);

	useEffect(() => {
		if (Object.keys(store).length > 0) {
			const {domain_details} = store.domain_details;
			setDomainLink(domain_details[0].domain_url);
		}
	}, [store]);

	const toggleView = () => setMobileSidebarIsOpen(!mobileSideBarIsOpen);

	const renderElipsis = (str) => {
		if (typeof str !== 'string') return;
		return str.length > 15;
	};

	return (
		<header
			className={`flex items-center justify-between bg-white px-10 py-6 ${styles.header}`}
		>
			<div className={`${styles.lgLeft} flex items-center`}>
				<div className="flex">
					<MobileLogo />
				</div>
			</div>

			{/* // * Mobile   -- */}
			<div
				className={`${styles.mobileLeft} ${
					isPreviewMain ? styles.isPreviewMain : ''
				}`}
			>
				<div
					className={`${styles.mobileMenu} 
					}`}
				>
					{isPreviewMain && (
						<>
							<span className={styles.backArrow}>
								<Image
									src={MobileBackArrow}
									alt="backArrow"
									onClick={() => router.back()}
								/>
							</span>
							<span>
								{`${product?.product_details?.product_name?.substring(
									0,
									15
								)}${
									renderElipsis(
										product?.product_details?.product_name
									) && '...'
								}`}
							</span>
							<div className={styles.btnBox}>
								<Button
									// size="small"
									type="default"
									icon={<Image src={CopyLink} alt="copy" />}
									onClick={() =>
										_copyToClipboard(
											link,
											'The product link was successfully copied!'
										)
									}
								></Button>
								<Tooltip
									title="Product is deactivated, activate it to publish"
									visible={
										product?.product_details?.status ===
											3 ||
										product?.product_listing_status_type ===
											'Deactivated'
									}
									placement="bottomRight"
								>
									<Button
										type="primary"
										onClick={() => setIsOpen(true)}
										disabled={
											product?.product_details?.status ===
												3 ||
											product?.product_listing_status_type ===
												'Deactivated'
										}
									>
										Publish
									</Button>
								</Tooltip>
							</div>
						</>
					)}
					<>
						{!isPreviewMain && (
							<>
								{mobileSideBarIsOpen ? (
									<Image
										src={NavCloseIcon}
										alt="navClose"
										onClick={() =>
											setMobileSidebarIsOpen(false)
										}
									/>
								) : (
									<div className={styles.Init}>
										<Button
											type="text"
											shape="circle"
											icon={
												<MdOutlineMenu
													onClick={toggleView}
												/>
											}
										/>

										<MobileLogo />
									</div>
								)}
							</>
						)}
					</>
				</div>
			</div>
			{mobileSideBarIsOpen && (
				<StoreMobileDropView
					isVariant={true}
					dp={displayPicture}
					nameOfStore={nameOfStore}
				/>
			)}
			{showNavLinks ? (
				<div className={styles.miniSaveButtons + ' flex self-end'}>
					<Button
						type="default"
						icon={<Image src={CopyLink} alt="copy" />}
						onClick={() =>
							_copyToClipboard(
								link,
								'The product link was successfully copied!'
							)
						}
					>
						Copy Link
					</Button>
					<Button
						onClick={() => router.push(ROUTES.ALL_PRODUCTS)}
						type="primary"
					>
						Exit Preview
					</Button>
					<Tooltip
						title="Product is deactivated, activate it to publish"
						visible={
							product?.product_details?.status === 3 ||
							product?.product_listing_status_type ===
								'Deactivated'
						}
						placement="bottomRight"
					>
						<Button
							type="primary"
							onClick={() => setIsOpen(true)}
							disabled={
								product?.product_details?.status === 3 ||
								product?.product_listing_status_type ===
									'Deactivated'
							}
						>
							Publish
						</Button>
					</Tooltip>
				</div>
			) : (
				<div className="flex justify-end items-center">
					{mobileSideBarIsOpen ? (
						<div
							className={`${styles.mobileLoginLink} ${
								mobileSideBarIsOpen ? styles.showLogin : ''
							}`}
						>
							<div
								className={styles.loginBtn}
								onClick={() => router.push('/login')}
							>
								<NormalButton
									text="Login"
									className={styles.loginBtnStyle}
								/>
							</div>
						</div>
					) : (
						<div className={styles.lgOnly}>
							<div className={styles.mobileSearch}>
								<div className="w-10">
									<Image src={SearchIcon} alt="search" />
								</div>
							</div>
							<div className={styles.desktopSearch}>
								<Image src={SearchIcon} alt="search" />
								<input
									type="text"
									placeholder="Click here to Search"
								/>
							</div>
							<div className={styles.selectAndButtons}>
								<div className="w-20  mx-4">
									<CSelect
										options={[
											// ...[{ label: 'Select currency', value: '' }],
											...formattedCurrencies,
										]}
										border="none"
										loading={currencyLoading}
										defaultValue={'NGN'}
										cb={(e) => setActiveCurrency(e)}
									/>
								</div>
								<div className={styles.btns}>
									<div
										className={styles.loginBtn}
										onClick={() => router.push('/login')}
									>
										<NormalButton
											text="Login"
											className={styles.loginBtnStyle}
										/>
									</div>
									<div
										className={styles.signUpBtn}
										onClick={() => router.push('/signup')}
									>
										<NormalButton
											text="Signup Free"
											bgColor="blue"
											className={styles.signUpBtnStyle}
										/>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
			{isOpen && (
				<Modal
					title={null}
					footer={null}
					visible={isOpen}
					onCancel={() => setIsOpen(false)}
					// maskClosable={false}
					closeIcon={<CloseIcon />}
					// className={styles.affiliate__modal}
				>
					<div className={styles.publishModal + ' p-5'}>
						<h2 className="mb-4 text-lg font-semibold">Publish</h2>
						<Form layout="vertical" onFinish={formik.handleSubmit}>
							<Form.Item
								label={
									<h2 className="font-semibold text-sm mb-0">
										Product Link
									</h2>
								}
							>
								<div className={styles.copyInput + ' flex'}>
									<Input
										readOnly
										bordered
										className="rounded-lg"
										placeholder={`${domainLink}/${id}`}
									/>
									<span
										onClick={() =>
											_copyToClipboard(
												`${domainLink}/${values.product_id}`,
												'The product link was successfully copied!'
											)
										}
										className="cursor-pointer"
									>
										<Image src={LinkCopy} alt="copy" />
									</span>
								</div>
							</Form.Item>
							<Form.Item
								label={
									<h2 className="font-semibold text-sm mb-0">
										Domain name
									</h2>
								}
							>
								<Select defaultValue={domainLink}>
									<Option value={domainLink}>
										{domainLink}
									</Option>
								</Select>
							</Form.Item>
							<p
								style={{marginTop: '-10px'}}
								className="text-xs font-normal"
							>
								Will you like to customize your domain? You can
								do that{' '}
								<Link href="/account/kreator/settings">
									here
								</Link>{' '}
							</p>
							<div className={styles.submitBtn}>
								<Button
									loading={loading}
									type="primary"
									htmlType="submit"
								>
									Publish
								</Button>
							</div>
						</Form>
					</div>
				</Modal>
			)}
			{isResponse && (
				<Modal
					title={null}
					footer={null}
					visible={isResponse}
					onCancel={() => {
						setIsResponse(false);
						router.push('/account/kreator/products/all');
					}}
					closable={false}
				>
					<div className={styles.publishModal + ' p-5'}>
						<div className="flex flex-col">
							<div className={styles.publishImage + ' mx-auto'}>
								<Image
									layout="fill"
									src={PublishProduct}
									alt="publish"
								/>
							</div>
							<h1 className="text-2xl text-center my-3 font-bold">
								{"You've Successfully Published a Product"}
							</h1>
							<p className="text-sm text-center my-2 font-normal">
								{
									'Congratulations! Your digital product is now live. You can now start earning massively from it.'
								}
							</p>
							<div className={styles.submitBtn}>
								<Button
									onClick={() =>
										router.push(
											'/account/kreator/products/all'
										)
									}
									className="text-lg h-12"
									type={'primary'}
								>
									{'See Product Listing'}
								</Button>
							</div>
						</div>
					</div>
				</Modal>
			)}
			{isError && (
				<Modal
					title={null}
					footer={null}
					visible={isError}
					onCancel={() => setIsError(false)}
					closable={false}
				>
					<div className={styles.publishModal + ' p-5'}>
						<div className="flex flex-col">
							<div className={styles.publishImage + ' mx-auto'}>
								<Image
									layout="fill"
									src={UnPublishProduct}
									alt="publish"
								/>
							</div>
							<h1 className="text-2xl text-center my-3 font-bold">
								{'Publishing Failed'}
							</h1>
							<p className="text-sm text-center my-2 font-normal">
								{
									'Oops! We encountered a problem while publishing your product. Please, try again.'
								}
							</p>
							<div className={styles.failedBtn}>
								<Button
									loading={loading}
									onClick={() => formik.handleSubmit()}
									className="text-lg h-12"
									type={'danger'}
								>
									{'Try Again'}
								</Button>
							</div>
						</div>
					</div>
				</Modal>
			)}
			<style>
				{`
          .ant-tooltip-inner{
            border-radius: 8px !important;
          }
        `}
			</style>
		</header>
	);
}

const MobileDropContents = () => {
	return <div>mobile drop contents</div>;
};
