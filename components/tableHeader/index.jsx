import Image from 'next/image';
import {useState, useContext} from 'react';
import {useRouter} from 'next/router';

import {format, parseISO} from 'date-fns';
import {Modal, Tag, Tooltip, Popover, Popconfirm, Input, Select} from 'antd';
import {useSelector} from 'react-redux';

import {
	MailClipboard,
	_copyToClipboard,
	DeactvateProduct,
	DuplicateProduct,
	EditProduct,
	ManageProduct,
	ViewSales,
	MobileIcon,
	EmptyDataTable,
	DeleteIcon,
	Subscribers2,
	RenderIf,
	PlusIcon,
	SuccessCheck,
	GreenCancel,
	MinusIcon,
	LinkCopy,
} from 'utils';
import styles from '../../public/css/AllProducts.module.scss';
import {Button} from 'components';
import {
	DuplicateProductAction,
	GetProducts,
	CreateProduct,
	SetProductID,
	SetProductTab,
	AddSalesPage,
	DisconnectSalesPage,
} from 'redux/actions';
import CloseIcon from 'components/affiliates/CloseIcon';
import {SalesPageContext} from 'context/AddSalesPageContext';

const {Option} = Select;
const buttonLinks = [
	'https://res.cloudinary.com/salvoagency/image/upload/v1679919368/Button1.png',
	'https://res.cloudinary.com/salvoagency/image/upload/v1679494367/Button2.png',
	'https://res.cloudinary.com/salvoagency/image/upload/v1679494367/Button3.png',
	'https://res.cloudinary.com/salvoagency/image/upload/v1679494366/Button4.png',
	'https://res.cloudinary.com/salvoagency/image/upload/v1679494367/Button5.png',
	'https://res.cloudinary.com/salvoagency/image/upload/v1679918396/Button6.png',
	'https://res.cloudinary.com/salvoagency/image/upload/v1679918397/Button7.png',
	'https://res.cloudinary.com/salvoagency/image/upload/v1679918395/Button8.png',
	'https://res.cloudinary.com/salvoagency/image/upload/v1679918395/Button9.png',
	'https://res.cloudinary.com/salvoagency/image/upload/v1679918398/Button10.png',
	'https://res.cloudinary.com/salvoagency/image/upload/v1679918395/Button11.png',
	'https://res.cloudinary.com/salvoagency/image/upload/v1679918399/Button12.png',
];

const generateSalesPageScript = () => {
	return " \
  <script> \n \
  // Get the query params \
      const queryString = window.location.search; \n \
      const urlParams = new URLSearchParams(queryString);\n \
      let ref = urlParams.get('ref')||0;\n \
      let uniqkey = urlParams.get('uniqkey')||0;\n \
      let prodId = urlParams.get('prodId');\n \
      let storename = urlParams.get('storename');\n \
    // Get all elements with class \"kreatesell-btn\"\n \
  const kreatesellBtns = document.querySelectorAll('.kreatesell-btn');\n \
  // Add an onclick event listener to each element\n \
  kreatesellBtns.forEach(btn => {\n \
    btn.addEventListener('click', function() {\n \
      console.log('clicked')\n \
       if (prodId && storename) { \n\
          window.location.href = `https://dev.kreatesell.com/store/${storename}/product/${prodId}?ref=${ref}&uniqkey=${uniqkey}`;\n \
        } \n\
     else if(!prodId || !storename){\n \
       if(btn.alt){ \
          //format for alt will be \"prod_id;storename\" \n\
          let splittedValue = btn?.alt?.split(';')\n \
          if(splittedValue.length === 2){\n \
             window.location.href = `https://dev.kreatesell.com/store/${splittedValue[1]}/product/${splittedValue[0]}?ref=${ref}&uniqkey=${uniqkey}`;\n \
          }\n \
       }\n \
    }\n \
    });\n \
  });\n \
  </script>";
};

const generateImageTag = (prodID, storename, selectedBtn) => {
	return `<img width="300" height="100" alt = ""+${prodID};${storename} class="kreatesell-btn" src=""+${selectedBtn} />`;
	// return `<img width="300" height="100" alt = \`${prodID};${storename}\` class="kreatesell-btn" src=\`${selectedBtn}\` />`;
};
export const SalesPageModal = ({
	showModal = true,
	closeModal = () => {},
	type = 'connectSalesModal',
}) => {
	const [salesPageUrl, setSalesPageUrl] = useState('');
	const [linkImage, setLinkImage] = useState({link: '', imageLink: ''});
	const addSalesPage = AddSalesPage();
	const disconnectSalesPage = DisconnectSalesPage();
	const getProducts = GetProducts();
	const {salesPage, salesPageDispatch} = useContext(SalesPageContext);
	const {addSalesPageLoading} = useSelector((state) => state.product);
	const {store} = useSelector((state) => state.store);

	// NOTE:type can be connectSalesModal, salesPageConnected, disconnectSalesPage, salesPageDisconnected, generateLinkStepOne, generateLinkStepTwo
	if (type === 'connectSalesModal') {
		return (
			<Modal
				title={null}
				footer={null}
				visible={showModal}
				onCancel={() => closeModal()}
				maskClosable={true}
				closeIcon={<CloseIcon />}
				className={styles.modalContainer}
				width={'500px'}
			>
				<br />
				<h1 className={`${styles.modalTitle}`}>Connect Sales Page</h1>
				<div style={{width: '70%', margin: 'auto'}}>
					<p className={`mb-1 ${styles.subtitle} text-left mt-7`}>
						Enter the URL of your sales page
					</p>
					<Input
						placeholder="https://olumidej.kreatesell.com"
						className={`${styles.input}`}
						onChange={(e) => setSalesPageUrl(e.target.value)}
						value={salesPageUrl}
						style={{height: '2.5rem'}}
					/>
				</div>
				<Button
					text="Submit"
					className="mt-4"
					style={{width: '65%'}}
					bgColor="blue"
					onClick={() => {
						addSalesPage(
							{
								productId: salesPage?.productId,
								salesPageUrl,
							},
							() => {
								setSalesPageUrl('');
								salesPageDispatch({
									type: 'CHANGE_MODAL_TYPE',
									payload: {modalType: 'salesPageConnected'},
								});
								getProducts();
							}
						);
					}}
					loading={addSalesPageLoading}
				/>
				<div className={styles.view_guide}>View guide</div>
			</Modal>
		);
	}
	if (type === 'salesPageConnected') {
		return (
			<Modal
				title={null}
				footer={null}
				visible={showModal}
				onCancel={() => closeModal()}
				maskClosable={false}
				closeIcon={<CloseIcon />}
				className={styles.modalContainer}
				width={'600px'}
			>
				<br />
				<br />
				<Image src={SuccessCheck} alt="Success checkmark" />
				<h1 className={styles.modalTitle}>Sales Page Connected</h1>
				<p className={`mb-3 ${styles.action}`}>
					{/* TODO: Icon comes here */}
					Make sure you copy the link below and <br />
					<span>view the guide</span> to complete the setup
				</p>
				<div className={styles.copyInput + ' flex'}>
					<Input
						readOnly
						bordered
						className="rounded-lg"
						// placeholder={`${salesPage?.productId};${store?.store_details?.store_name}`}
						value={`${salesPage?.productId};${store?.store_details?.store_name}`}
					/>
					<span
						onClick={() =>
							_copyToClipboard(
								`${salesPage?.productId};${store?.store_details?.store_name}`,
								'The product link was successfully copied!'
							)
						}
						className="cursor-pointer"
					>
						<Image src={LinkCopy} alt="copy" />
					</span>
				</div>
				<Button
					text="Continue Sales Page Setup"
					className="mt-3"
					style={{width: '75%'}}
					bgColor="blue"
					onClick={() => {
						salesPageDispatch({
							type: 'CHANGE_MODAL_TYPE',
							payload: {modalType: 'generateLinkStepOne'},
						});
					}}
				/>
				<div className={styles.view_guide}>View guide</div>
			</Modal>
		);
	}
	if (type === 'generateLinkStepOne') {
		return (
			<Modal
				title={null}
				footer={null}
				visible={showModal}
				onCancel={() => closeModal()}
				maskClosable={false}
				closeIcon={<CloseIcon />}
				className={`${styles.modalContainer}`}
				width={'600px'}
			>
				<br />
				<br />
				<div className={styles.container}>
					<p className={styles.number}>
						1. Paste the link you copied on the previous page here
					</p>
					<Input
						value={linkImage.link}
						onChange={(e) =>
							setLinkImage((prev) => ({
								...prev,
								link: e.target.value,
							}))
						}
						placeholder="Paste the link here - KREATE-storename63810919410833;storename"
					/>
					<br />
					<br />
					<p className={styles.number}>
						2. Select the desired button for your sales page
					</p>
					<Select
						className={styles.selectDropdown}
						// defaultValue={buttonLinks[0]}
						placeholder="Select Option"
						onChange={(e) => {
							setLinkImage((prev) => ({...prev, imageLink: e}));
						}}
					>
						{buttonLinks.map((btnLink, idx) => (
							<Option
								key={idx}
								value={btnLink}
								style={{display: 'flex', alignItems: 'center'}}
							>
								<Image
									alt={`button ${idx + 1} image`}
									src={btnLink}
									width={60}
									height={30}
								/>{' '}
								&nbsp;&nbsp; Button {idx + 1}
							</Option>
						))}
					</Select>
				</div>

				<Button
					text="Submit"
					className="mt-3"
					style={{width: '75%'}}
					bgColor="blue"
					onClick={() => {
						salesPageDispatch({
							type: 'CHANGE_MODAL_TYPE',
							payload: {
								modalType: 'generateLinkStepTwo',
								linkImage,
							},
						});
					}}
				/>
			</Modal>
		);
	}
	if (type === 'generateLinkStepTwo') {
		return (
			<Modal
				title={null}
				footer={null}
				visible={showModal}
				onCancel={() => closeModal()}
				maskClosable={false}
				closeIcon={<CloseIcon />}
				className={styles.modalContainer}
				width={'700px'}
			>
				{/* <br /> */}
				{/* <br /> */}

				<h1 className={styles.modalSubtitle}>Almost Done...</h1>
				<div className={styles.container}>
					<p className={styles.number}>
						1. Copy and paste this link in the footer section of
						your store front.
					</p>
					<div className={styles.copyInput2 + ' flex'}>
						<Input
							readOnly
							bordered
							className="rounded-lg"
							value={generateSalesPageScript()}
						/>
						<span
							onClick={() =>
								_copyToClipboard(
									generateSalesPageScript(),
									'The product link was successfully copied!'
								)
							}
							className="cursor-pointer"
						>
							<Image src={LinkCopy} alt="copy" />
						</span>
					</div>
					<br />
					<br />
					<p className={styles.number}>
						2. Copy and paste this code in the HTML for your Sales
						Page button.
					</p>
					<div className={styles.copyInput2 + ' flex'}>
						<Input
							readOnly
							bordered
							className="rounded-lg"
							value={generateImageTag(
								salesPage?.productId,
								store?.store_details?.store_name,
								linkImage?.imageLink
							)}
						/>
						<span
							onClick={() =>
								_copyToClipboard(
									generateImageTag(
										salesPage?.productId,
										store?.store_details?.store_name,
										linkImage?.imageLink
									),
									'The product link was successfully copied!'
								)
							}
							className="cursor-pointer"
						>
							<Image src={LinkCopy} alt="copy" />
						</span>
					</div>
				</div>
				<Button
					text="Done"
					className="mt-3"
					style={{width: '75%'}}
					bgColor="blue"
					onClick={() => {
						salesPageDispatch({
							type: 'CLOSE_MODAL',
						});
					}}
				/>
			</Modal>
		);
	}
	if (type === 'disconnectSalesPage') {
		return (
			<Modal
				title={null}
				footer={null}
				visible={showModal}
				onCancel={() => closeModal()}
				maskClosable={false}
				closeIcon={<CloseIcon />}
				className={styles.modalContainer}
				width={'600px'}
			>
				<h1 className={`${styles.modalTitle} mt-7`}>
					Disconnect Sales Page
				</h1>
				<p className={`mb-3 mt-5 ${styles.subtitle}`}>
					Are you sure you want to disconnect <br /> this sales page?
				</p>
				<div className={`flex justify-center gap-5`}>
					<Button
						text="Yes"
						className="mt-3"
						style={{width: '30%'}}
						bgColor="blue"
						onClick={() => {
							disconnectSalesPage(
								{
									productId: salesPage?.productId,
								},
								() => {
									salesPageDispatch({
										type: 'CHANGE_MODAL_TYPE',
										payload: {
											modalType: 'salesPageDisconnected',
										},
									});
									getProducts();
								}
							);
						}}
						loading={addSalesPageLoading}
					/>
					<Button
						text="No"
						className="mt-3"
						style={{width: '30%'}}
						bgColor="white"
						onClick={() => {
							salesPageDispatch({type: 'CLOSE_MODAL'});
						}}
					/>
				</div>
			</Modal>
		);
	}
	if (type === 'salesPageDisconnected') {
		return (
			<Modal
				title={null}
				footer={null}
				visible={showModal}
				onCancel={() => closeModal()}
				maskClosable={false}
				closeIcon={<CloseIcon />}
				className={styles.modalContainer}
				width={'600px'}
			>
				<Image src={GreenCancel} alt="" />
				<h1 className={styles.modalTitle}>Sales Page Disconnected</h1>
				<p className={`mb-0 ${styles.subtitle}`}>
					You’ve disconnected your sales page{' '}
				</p>
				<Button
					text="Close"
					className="mt-3"
					style={{width: '60%'}}
					bgColor="blue"
					onClick={() => {
						salesPageDispatch({type: 'CLOSE_MODAL'});
					}}
				/>
			</Modal>
		);
	}
};

export const MobileProductCard = ({item}) => {
	const [showAction, setShowAction] = useState(false);

	const time = parseISO(item?.date_created);
	const formatTime = format(time, 'PPpp');

	const statusList = {
		1: 'Draft',
		2: 'Live',
		3: 'Deativate',
		4: 'Flagged',
		5: 'Revoked',
	};

	const status = statusList[item?.status]?.toLowerCase();

	return (
		<div
			className="block lg:hidden bg-white my-4 rounded-lg p-4"
			key={item?.product_details?.id}
		>
			<div className="flex justify-between items-center">
				<div className="text-base-gray text-sm">{formatTime}</div>
				<div className={`status-${status}`}>{status}</div>
				<div>
					<div
						onClick={() => {
							setShowAction((value) => !value);
						}}
					>
						<Image alt="" src={MobileIcon} />
					</div>
					<div className="z-10">
						{showAction && (
							<ActionComponent
								item={item}
								showAction={showAction}
							/>
						)}
					</div>
				</div>
			</div>
			<div className="divider"></div>

			<div className="mt-8">
				<div className="flex w-full">
					<div className="w-1/2">
						<h4 className="text-black-100 text-sm font-semibold">
							Product
						</h4>
						<p className=" text-base-gray text-sm pt-2">
							{item?.product_name}
						</p>
					</div>
					<div className="w-1/2">
						<h4 className="text-black-100 text-sm font-semibold">
							Product Link
						</h4>
						<p className="text-base-gray text-sm pt-2 overflow-hidden overflow-ellipsis">
							<a
								href={item?.product_link}
								target="_blank"
								rel="noopener noreferrer"
								className={`${
									status === 'revoked' &&
									'text-base-gray cursor-default pointer-events-none'
								} ${
									status === 'flagged' &&
									'text-base-gray cursor-default pointer-events-none'
								}`}
								onClick={() => {
									if (status == 'flagged' || 'revoked') {
										return false;
									}
								}}
							>
								{item?.product_link}
							</a>
						</p>
					</div>
				</div>

				<div className="flex w-full">
					<div className="w-1/2">
						<h4 className="text-black-100 text-sm font-semibold pt-4">
							Product Type
						</h4>
						<p className="text-base-gray text-sm pt-2">
							Membership
						</p>
					</div>
					<div className="w-1/2">
						<h4 className="text-black-100 text-sm font-semibold pt-4">
							Price
						</h4>
						<p className="text-base-gray text-sm pt-2">
							{item.price.currency} {item?.price?.productPrice}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const ModalPrompt = ({handleCancel, onOk, modalText, productName}) => {
	const {loading} = useSelector((state) => state.product);

	return (
		<div className={`py-4 ${styles.modalPrompt}`}>
			<div className="text-base-gray text-sm">
				Are you sure you want to {modalText} <br />{' '}
				<span className="font-normal text-base text-black">
					{productName}?
				</span>
			</div>
			<p className="text-base-gray-200 text-sm py-4">
				You can not undo this action
			</p>

			<div className="">
				<Button
					text="Cancel"
					className={styles.cancelBtn}
					onClick={handleCancel}
				/>

				<Button
					text={modalText}
					className={styles.deleteBtn}
					onClick={onOk}
					loading={loading}
				/>
			</div>
		</div>
	);
};

export const StatusComponent = (item) => {
	const statusTextList = {
		1: {
			type: 'draft',
			styles: {background: 'rgba(255, 214, 102, 0.2)', color: '#FBB500'},
			contents:
				'You need to complete the editing of this product before it is published.',
		},
		2: {
			type: 'live',
			styles: {background: '#F1FCF8', color: '#2DC071'},
			contents:
				'Your product will go live and visible to audience for purchase once you complete creating the sales page.',
		},
		3: {
			type: 'deactivated',
			styles: {background: 'rgba(255, 77, 79, 0.1)', color: '#F90005'},
			contents:
				' No one can see this product. You may reactivate it anytime you like.',
		},
		4: {
			type: 'flagged',
			styles: {background: '#F5F5F5', color: '#595959'},
			contents:
				"Product draws our attention and it's temporarily deactivated; Might be restored if it passes our assessment.",
		},
		5: {
			type: 'revoked',
			styles: {background: '#F5F5F5', color: '#595959'},
			contents:
				'Product violated copyright terms and has been removed permanently.',
		},
		6: {
			type: 'unlisted',
			styles: {background: '#E6F7FF', color: '#0072EF'},
			contents:
				'Product would not be visible on your store page but anyone with its direct link can purchase it.Product violated copyright terms and has been removed permanently.',
		},
	};
	let tagStyles = statusTextList[item].styles;
	let content = statusTextList[item].contents;
	const mainType = statusTextList[item].type;
	return (
		<Tooltip
			overlayInnerStyle={{fontSize: '10px', textAlign: 'center'}}
			overlayStyle={{
				width: '150px',
				borderRadius: '10px',
				padding: '20px 8px',
			}}
			className="text-xs"
			placement="top"
			title={content}
		>
			<div className={styles.tags} style={tagStyles}>
				{mainType.charAt(0).toUpperCase() + mainType.slice(1)}
			</div>
		</Tooltip>
	);
};
const CouponStatusComponent = (item) => {
	const statusTextList = {
		Pending: {
			type: 'Pending',
			styles: {background: 'rgba(255, 214, 102, 0.2)', color: '#FBB500'},
		},
		Active: {
			type: 'Active',
			styles: {background: '#F1FCF8', color: '#2DC071'},
		},
		Finished: {
			type: 'Finished',
			styles: {background: 'rgba(255, 77, 79, 0.1)', color: '#F90005'},
		},
		Expired: {
			type: 'Expired',
			styles: {background: 'rgba(255, 77, 79, 0.1)', color: '#F90005'},
		},
	};

	let tagStyles = statusTextList[item].styles;
	const mainType = statusTextList[item].type;
	return (
		<div className={styles.tags} style={tagStyles}>
			{mainType.charAt(0).toUpperCase() + mainType.slice(1)}
		</div>
	);
};

const ActionComponent = ({item}, all) => {
	const router = useRouter();
	// const [domainLink, setDomainLink] = useState('');
	// const {store} = useSelector((state) => state.store);
	const duplicateProduct = DuplicateProductAction();
	const getProducts = GetProducts();
	const createEditDeleteProduct = CreateProduct();
	const setProductID = SetProductID();
	const setProductTab = SetProductTab();
	const id = item?.product_details?.id;
	const kreasell_product_id = item?.product_details?.kreasell_product_id;
	const {salesPageDispatch} = useContext(SalesPageContext);
	// const productLink = item?.product_details?.product_link
	// const productLink = "scam";

	// useEffect(() => {
	// 	if (Object.keys(store).length > 0) {
	// 		const {domain_details} = store.domain_details;
	// 		setDomainLink(domain_details[0].domain_url);
	// 	}
	// }, [store]);

	/**Used to delete and deactivate product */
	const handleModalOk = (action) => {
		return new Promise((resolve) => {
			const formdata = new FormData();
			formdata.append('product_id', id);
			formdata.append('action', action);
			createEditDeleteProduct(formdata, () => {
				getProducts();
				resolve();
			});
		});
	};

	let content = (
		<ul>
			<li
				className="flex items-center cursor-pointer"
				onClick={() => {
					setProductID(kreasell_product_id);
					router.push(
						{
							pathname: `/account/kreator/products/create`,
							query: {
								productId: kreasell_product_id,
							},
						}
						// '/account/kreator/products/create',
					);
					setProductTab(0);
				}}
			>
				<span className="flex">
					<Image alt="" src={EditProduct} />
				</span>
				<p className="mb-0 ml-3">Edit Product</p>
			</li>

			{/* <li
				className="flex items-center cursor-pointer"
				onClick={() =>
					_copyToClipboard(
						`${domainLink}/product/${kreasell_product_id}`,
						'Product Link Copied'
					)
				}
			>
				<span>
					<Image alt="" src={ManageProduct} />
				</span>
				<p className="mb-0 ml-3">Copy Link</p>
			</li> */}

			<li
				onClick={() =>
					router.push(
						`/account/kreator/products/preview/${kreasell_product_id}`
					)
				}
				className="flex items-center cursor-pointer"
			>
				<span className="flex">
					<Image alt="" src={ViewSales} />
				</span>
				<p className="mb-0 ml-3"> Preview</p>
			</li>
			{/* set show modal */}
			<RenderIf condition={all.salespageurl === null}>
				<li
					onClick={() =>
						salesPageDispatch({
							payload: {
								modalType: 'connectSalesModal',
								productId: kreasell_product_id,
							},
							type: 'OPEN_MODAL',
						})
					}
				>
					<span className="flex">
						<Image src={PlusIcon} alt="sales page" />
					</span>
					<p className="mb-0 ml-3">Connect Sales Page</p>
				</li>
			</RenderIf>
			<RenderIf condition={all.salespageurl !== null}>
				{/* <RenderIf condition={true}> */}
				<li
					onClick={() =>
						salesPageDispatch({
							payload: {
								modalType: 'disconnectSalesPage',
								productId: kreasell_product_id,
							},
							type: 'OPEN_MODAL',
						})
					}
				>
					<span className="flex">
						<Image src={MinusIcon} alt="sales page" />
					</span>
					<p className="mb-0 ml-3">Disconnect Sales Page</p>
				</li>
			</RenderIf>
			<RenderIf condition={all.product_type !== 'Digital Download'}>
				<li
					onClick={() => {
						all.product_type === 'One-Time Subscription'
							? router.push(
									`/account/kreator/products/view-onetime-subscribers?KreatorProductId=${id}`
							  )
							: router.push(
									`/account/kreator/products/view-subscribers?KreatorProductId=${id}`
							  );
					}}
					className="flex items-center cursor-pointer"
				>
					<span className="flex">
						<Image alt="" src={Subscribers2} />
					</span>
					<p className="mb-0 ml-3"> Subscribers</p>
				</li>
			</RenderIf>

			<li
				className="flex items-center cursor-pointer"
				onClick={() => duplicateProduct(id, () => getProducts())}
			>
				<span className="flex">
					<Image alt="" src={DuplicateProduct} />
				</span>
				<p className="mb-0 ml-3">Duplicate</p>
			</li>

			{[2].includes(all?.status) && (
				<li
					className={
						styles.deletePop + ` flex items-center cursor-pointer`
					}
					style={{
						color: all?.status === 1 && '#a1a1a1',
						cursor: all?.status === 1 && 'auto',
					}}
				>
					<Popconfirm
						title={
							<pre className="mb-0 text-sm ">
								Are you sure to{' '}
								<h2 className="text-base text-base-gray-400 mb-0 font-semibold">
									Deactivate
								</h2>{' '}
								this product?
							</pre>
						}
						onConfirm={() =>
							all?.status === 1 ? {} : handleModalOk('d')
						}
						// onCancel={cancel}
						okText="Deactivate"
						cancelText="Cancel"
						icon={<></>}
						placement="bottom"
						overlayClassName={styles.popConfirm}
					>
						<span>
							<Image alt="" src={DeactvateProduct} />
						</span>
						<p className="mb-0 ml-3">
							Deactivate
							<br /> (Unpublish)
						</p>
					</Popconfirm>
				</li>
			)}
			{[3].includes(all?.status) && (
				<li
					className={
						styles.deletePop + ` flex items-center cursor-pointer`
					}
					style={{
						color: all?.status === 1 && '#a1a1a1',
						cursor: all?.status === 1 && 'auto',
					}}
				>
					<Popconfirm
						title={
							<pre className="mb-0 text-sm ">
								Are you sure to{' '}
								<h2 className="text-base text-base-gray-400 mb-0 font-semibold">
									Activate
								</h2>{' '}
								this product?
							</pre>
						}
						onConfirm={() => handleModalOk('a')}
						// onCancel={cancel}
						okText="Activate"
						cancelText="Cancel"
						icon={<></>}
						placement="bottom"
						overlayClassName={styles.popConfirm}
					>
						<span>
							<Image alt="" src={DeactvateProduct} />
						</span>
						<p className="mb-0 ml-3">
							Activate
							<br /> (Publish)
						</p>
					</Popconfirm>
				</li>
			)}
			<li
				className={
					styles.deletePop + ' flex items-center cursor-pointer'
				}
			>
				<Popconfirm
					title={
						<pre className="mb-0 text-sm ">
							Are you sure to{' '}
							<h2 className="text-base text-base-red-400 mb-0 font-semibold">
								Delete
							</h2>{' '}
							this product?
						</pre>
					}
					onConfirm={() => handleModalOk('r')}
					// onCancel={cancel}
					okText="Delete"
					cancelText="Cancel"
					icon={<></>}
					placement="left"
					overlayClassName={styles.popConfirm}
				>
					<span>
						<Image alt="" src={DeleteIcon} />
					</span>
					<p className="mb-0 ml-3">
						Delete
						<br />
					</p>
				</Popconfirm>
			</li>
		</ul>
	);
	return (
		<>
			<Popover
				overlayStyle={{width: '150px', padding: '0'}}
				placement="bottomLeft"
				overlayClassName={styles.action}
				content={content}
				title=""
				trigger="click"
			>
				<h2 className="font-semibold cursor-pointer text-lg">...</h2>
			</Popover>
		</>
	);
};
export const CouponActionComponent = ({item}) => {
	const router = useRouter();
	const id = item?.id;
	let content = (
		<ul>
			<li
				className={
					styles.deletePop + ' flex items-center cursor-pointer'
				}
			>
				<Popconfirm
					title={
						<pre className="mb-0 text-sm ">
							Are you sure to{' '}
							<h2 className="text-base text-base-gray-400 mb-0 font-semibold">
								Deactivate
							</h2>{' '}
							this coupon?
						</pre>
					}
					// onConfirm={handleModalOk}
					// onCancel={cancel}
					okText="Deactivate"
					cancelText="Cancel"
					icon={<></>}
					placement="bottom"
					overlayClassName={styles.popConfirm}
				>
					<span>
						<Image alt="" src={DeactvateProduct} />
					</span>
					<p className="mb-0 ml-3">Deactivate</p>
				</Popconfirm>
			</li>
			<li
				className={
					styles.deletePop + ' flex items-center cursor-pointer'
				}
			>
				<Popconfirm
					title={
						<pre className="mb-0 text-sm ">
							Are you sure to{' '}
							<h2 className="text-base text-base-gray-400 mb-0 font-semibold">
								Delete
							</h2>{' '}
							this coupon?
						</pre>
					}
					// onConfirm={handleModalOk}
					// onCancel={cancel}
					okText="Delete"
					cancelText="Cancel"
					icon={<></>}
					placement="bottom"
					overlayClassName={styles.popConfirm}
				>
					<span>
						<Image alt="" src={DeleteIcon} />
					</span>
					<p className="mb-0 ml-3">Delete</p>
				</Popconfirm>
			</li>
			<li
				className="flex items-center cursor-pointer"
				onClick={() => {
					localStorage.setItem('couponId', id);
					router.push('/account/kreator/products/coupons/edit', '', {
						id,
					});
				}}
			>
				<span>
					<Image alt="" src={EditProduct} />
				</span>
				<p className="mb-0 ml-3">Edit</p>
			</li>
		</ul>
	);
	return (
		<Popover
			overlayStyle={{width: '150px', padding: '0'}}
			placement="bottomLeft"
			overlayClassName={styles.action}
			content={content}
			title=""
			trigger="click"
		>
			<h2
				className={
					styles.spanCont +
					' text-sm mb-0 font-semibold inline-flex flex-col cursor-pointer text-lg'
				}
			>
				<span>.</span>
				<span>.</span>
				<span>.</span>
			</h2>
		</Popover>
	);
};

const productAvailabilityStatus = (item) => {
	const statusTextList = {
		'Unlimited Copies': {
			type: 'Pending',
			styles: {background: 'rgba(255, 214, 102, 0.2)', color: '#FBB500'},
		},
		'In Stock': {
			type: 'Active',
			styles: {background: '#F1FCF8', color: '#2DC071'},
		},
		'Out of Stock': {
			type: 'Finished',
			styles: {background: 'rgba(255, 77, 79, 0.1)', color: '#F90005'},
		},
		Expired: {
			type: 'Expired',
			styles: {background: 'rgba(255, 77, 79, 0.1)', color: '#F90005'},
		},
	};

	let tagStyles = statusTextList[item].styles;
	const mainType = statusTextList[item].type;
	return (
		<div className={styles.tags} style={tagStyles}>
			{mainType.charAt(0).toUpperCase() + mainType.slice(1)}
		</div>
	);
};

const renderProductType = ({product_price_type, price}) => {
	if (['Pay What You Want', 'Fixed Price'].includes(product_price_type)) {
		return (
			<div className="text-center w-9/12">
				{price?.currency} {price?.productPrice || '0.00'}
			</div>
		);
	} else if (product_price_type === 'Make it Free') {
		return (
			<p
				className="text-center w-9/12 mb-0"
				style={{
					background: '#2DC071',
					color: '#fff',
					fontWeight: 700,
					fontSize: '1rem',
				}}
			>
				FREE
			</p>
		);
	} else if (product_price_type === 'Fixed Price') {
		return (
			<>
				{price?.currency} {price?.productPrice || '0.00'}
			</>
		);
	}
	return;
};

export const AllProductsTableHeader = [
	{
		title: '',
		dataIndex: 'product_image',
		width: 120,
		fixed: 'left',
		render: (item) => {
			return (
				<div className={styles.productTableImage}>
					{item !== undefined &&
						item.length > 0 &&
						item[0] !== null &&
						item[0] !== '' && (
							<Image
								src={item[0]}
								width="100"
								height={100}
								objectFit="cover"
								alt="Product"
							/>
						)}
				</div>
			);
		},
	},
	{
		title: 'Product',
		dataIndex: 'product_name',
		width: 210,
		fixed: 'left',
		render: (item, record) => {
			return (
				<div className={styles.productTableName + ' flex flex-col'}>
					<h2 className="text-lg mb-1 font-semibold">{item}</h2>
					<p className="text-xs mb-2 w-3/4 text-green-600 py-1 text-center border-green-400 rounded-md px-2 border">
						{' '}
						Unlimited Copies
					</p>
					{!record.product_details.is_show_number_of_sales && (
						<p className="text-xs font-normal">
							{' '}
							{record?.number_sold} copies sold
						</p>
					)}
				</div>
			);
		},
	},
	{
		title: 'Product Type',
		dataIndex: 'product_type',
	},
	{
		title: 'Price',
		dataIndex: 'price',
		render: (item, record) => <div>{renderProductType(record)}</div>,
	},
	{
		title: 'Date Added',
		dataIndex: 'date_created',
		render: (item) => {
			const time = parseISO(item);

			const formatTime = format(time, 'PPPp');
			const formatDate = format(time, 'PPP');
			return (
				<div className="flex flex-col items-center">
					<div>
						{`${formatDate.split('at')[0]},`}{' '}
						{formatTime.split('at')[1]}
					</div>
					{/* <div>{formatTime.split('at')[1]}</div> */}
				</div>
			);
		},
	},
	{
		title: 'Status',
		dataIndex: 'status',
		render: (item) => StatusComponent(item),
	},
	{
		title: 'Actions',
		dataIndex: 'actions',
		render: (item, all) => ActionComponent({item}, all),
		width: 100,
		fixed: 'right',
	},
];

export const AllCouponTableHeader = [
	{
		title: 'S/N',
		dataIndex: 'numbers',
	},
	{
		title: 'Products',
		dataIndex: 'product_name',
	},
	{
		title: 'Code',
		dataIndex: 'code',
	},
	{
		title: 'Discount',
		dataIndex: 'discount',
	},
	{
		title: 'Quantity',
		dataIndex: 'quantity',
	},
	{
		title: 'Usages',
		dataIndex: 'usages',
		// render: (item) => StatusComponent({ item }),
	},
	{
		title: 'Max Usages',
		dataIndex: 'max_usages',
		// render: (item) => ActionComponent({ item }),
	},
	{
		title: 'Start Date',
		dataIndex: 'start_date',
		render: (item) => {
			const time = parseISO(item);
			const formatTime = format(time, 'PPPp');
			return (
				<div
					style={{whiteSpace: 'pre'}}
					className="flex flex-col items-center"
				>
					<div>{`${formatTime.split('at')[0]},`}</div>
					<div>{formatTime.split('at')[1]}</div>
				</div>
			);
		},
		// width: 150
	},
	{
		title: 'End Date',
		dataIndex: 'end_date',
		render: (item) => {
			const time = parseISO(item);
			const formatTime = format(time, 'PPPp');
			return (
				<div
					style={{whiteSpace: 'pre'}}
					className="flex flex-col items-center"
				>
					<div>{`${formatTime.split('at')[0]},`}</div>
					<div>{formatTime.split('at')[1]}</div>
				</div>
			);
		},
	},
	{
		title: 'Status',
		dataIndex: 'status',
		render: (item) => CouponStatusComponent(item),
	},
	{
		title: 'More',
		dataIndex: 'more',
		render: (item) => CouponActionComponent({item}),
		// fixed: "right",
		// width: 80
	},
];

export const emptyComponent = (text) => {
	return (
		<div className={styles.emptyTable + ' flex flex-col'}>
			<Image alt="" src={EmptyDataTable} />
			<h2 className={'text-black mt-5 font-semibold text-lg'}>
				{text ? text : 'No content has been added'}
			</h2>
		</div>
	);
};

export const MobileCouponActionComponent = ({item}) => {
	const router = useRouter();
	const id = item?.coupons?.id;
	return (
		<ul>
			<li
				className={
					styles.deletePop + ' flex items-center cursor-pointer'
				}
			>
				<Popconfirm
					title={
						<pre className="mb-0 text-sm ">
							Are you sure to{' '}
							<h2 className="text-base text-base-gray-400 mb-0 font-semibold">
								Deactivate
							</h2>{' '}
							this coupon?
						</pre>
					}
					// onConfirm={handleModalOk}
					// onCancel={cancel}
					okText="Deactivate"
					cancelText="Cancel"
					icon={<></>}
					placement="bottom"
					overlayClassName={styles.popConfirm}
				>
					<span>
						<Image alt="" src={DeactvateProduct} />
					</span>
					<p className="mb-0 ml-3">Deactivate</p>
				</Popconfirm>
			</li>
			<li
				className={
					styles.deletePop + ' flex items-center cursor-pointer'
				}
			>
				<Popconfirm
					title={
						<pre className="mb-0 text-sm ">
							Are you sure to{' '}
							<h2 className="text-base text-base-gray-400 mb-0 font-semibold">
								Delete
							</h2>{' '}
							this coupon?
						</pre>
					}
					// onConfirm={handleModalOk}
					// onCancel={cancel}
					okText="Delete"
					cancelText="Cancel"
					icon={<></>}
					placement="bottom"
					overlayClassName={styles.popConfirm}
				>
					<span>
						<Image alt="" src={DeleteIcon} />
					</span>
					<p className="mb-0 ml-3">Delete</p>
				</Popconfirm>
			</li>
			<li
				className="flex items-center cursor-pointer"
				onClick={() => {
					localStorage.setItem('couponId', id);
					router.push('/account/kreator/products/coupons/edit', '', {
						id,
					});
				}}
			>
				<span>
					<Image alt="" src={EditProduct} />
				</span>
				<p className="mb-0 ml-3">Edit</p>
			</li>
		</ul>
	);
};

export const GetCouponStatus = (statusText) => {
	const statusTextList = {
		active: {
			color: '#2DC071;',
			backgroundColor: '#F1FCF8;',
		},
		pending: {
			color: '#FBB500',
			backgroundColor: ' rgba(255, 214, 102, 0.2);',
		},
		finished: {
			color: '#F90005;',
			backgroundColor: 'rgba(255, 77, 79, 0.1);',
		},
		expired: {
			color: '#F90005;',
			backgroundColor: 'rgba(255, 77, 79, 0.1);',
		},
	};

	return statusTextList[statusText?.toLowerCase()];
};
