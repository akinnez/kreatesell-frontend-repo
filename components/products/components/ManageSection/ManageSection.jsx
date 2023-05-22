import React, {useState, useEffect, useMemo} from 'react';
import Image from 'next/image';
import axios from 'axios';
import {Button} from 'antd';

import {Switch, Radio, Input, Popconfirm} from 'antd';

import {
	ViewSales,
	Audio,
	Video,
	Pdf,
	EditPen,
	FileDelete,
	ImageIcon,
	PdfIcon,
} from 'utils';
import styles from '../../BusinessSection/MembershipTab.module.scss';
import {useRouter} from 'next/router';
import {CreateSection, AuthGetProductById, CreateContent} from 'redux/actions';

const ManageSection = ({
	items,
	index,
	setProductSection,
	handleChange,
	formik,
	setFieldValue,
	openMedia,
	deleteLecture,
	toSection,
}) => {
	const [isTitleEditable, setIsTitleEditable] = useState(false);
	const [sectionName, setSectionName] = useState(items.section_name);
	const [frequency, setFrequency] = useState('');
	const [accessControl, setAccessControl] = useState(
		items?.is_available_to_all_subscriber
	);

	const createSection = CreateSection();
	const getProduct = AuthGetProductById();
	// console.log(items?.product_subsection, 'items?.product_subsection');

	// const getMediaIconType = (iconObj) => {
	// 	if()
	// }

	console.log(items, '	items	items	items');

	const router = useRouter();
	const productID = router.query.productId;

	async function extractFileSize(cloudinaryUrl) {
		try {
			const response = await axios.head(cloudinaryUrl, {
				headers: {
					'Accept-Encoding': 'identity',
				},
			});
			const size = response.headers['content-length'];
			return size;
		} catch (error) {
			console.log(error);
			return 0;
		}
	}

	const CloudinaryFileSize = ({cloudinaryUrl}) => {
		const [fileSize, setFileSize] = useState(null);

		const memoizedExtractFileSize = useMemo(() => {
			return extractFileSize(cloudinaryUrl);
		}, [cloudinaryUrl]);

		// useEffect(() => {
		// 	extractFileSize(cloudinaryUrl).then((size) => {
		// 		setFileSize(size);
		// 	});
		// }, [cloudinaryUrl]);

		useEffect(() => {
			memoizedExtractFileSize.then((size) => {
				setFileSize(size);
			});
		}, [memoizedExtractFileSize]);

		return (
			fileSize !== null && (
				<h2
					className={`text-base font-medium mt-0 ${styles.digitalProductSize}`}
				>
					{fileSize > 1000000
						? `${Number(fileSize / 1000000).toFixed(2)}MB`
						: `${Number(fileSize / 1000).toFixed(2)}KB`}
				</h2>
			)
		);
	};

	// useEffect(() => {
	// 	if(accessControl === null) {
	// 		setAccessControl(items?.is_available_to_all_subscriber)
	// 	}
	// },[items])

	const handleAccessControlChange = (e) => {
		if (e === true) {
			setAccessControl(e);
			createSection(
				{
					product_content_name: items.section_name,
					action: 'e',
					content_id: items.id,
					kreatesell_id: items.kreate_sell_product_id,
					product_id: items.product_id,
					is_access_control_set: true,
					is_available_to_all_subscriber: e,
					frequency_of_availability: e === true ? 0 : frequency,
				},
				() => {
					getProduct(productID);
				}
			);
		} else {
			setAccessControl(false);
		}
	};

	const handleSectionChange = () => {
		createSection(
			{
				product_content_name: items.section_name,
				action: 'e',
				content_id: items.id,
				kreatesell_id: items.kreate_sell_product_id,
				product_id: items.product_id,
				is_access_control_set: true,
				is_available_to_all_subscriber: accessControl,
				frequency_of_availability:
					accessControl === true ? 0 : frequency,
			},
			() => {
				getProduct(productID);
			}
		);
		window.location.reload();
	};

	return (
		<div className="flex flex-col mt-7">
			<div className="flex justify-between items-center">
				<div className="flex items-center">
					{isTitleEditable ? (
						<Input
							onChange={(e) => setSectionName(e.target.value)}
							placeholder="Section title"
							value={sectionName}
							className={`text-2xl font-semibold ${styles.titleMain2}`}
							style={{width: '9rem'}}
						/>
					) : (
						<h1
							className={`text-2xl font-semibold mb-0 ${styles.titleMain2}`}
						>
							{items.section_name}
						</h1>
					)}

					<button
						className="ml-3"
						onClick={() => setIsTitleEditable((prev) => !prev)}
					>
						Edit
					</button>
				</div>
				<div className="flex item-center">
					<Switch
						onChange={() =>
							setProductSection((prev) => {
								prev[index].is_access_control_set =
									!prev[index].is_access_control_set;
								return [...prev];
							})
						}
						checked={items.is_access_control_set ? true : false}
					/>
					<h2 className="text-base ml-3 font-semibold">
						{items.is_access_control_set ? 'ON' : 'OFF'}
					</h2>
				</div>
			</div>
			{items?.is_access_control_set && (
				<div className="mb-5">
					<div className="inline-flex">
						<h2 className="text-base mb-0 font-medium mr-2">
							Access Control
						</h2>
						<p className="text-sm mb-0">
							- Set the subscribers who access this module
						</p>
					</div>
					<div className="mt-3">
						<Radio.Group
							className={styles.rad}
							onChange={(e) =>
								handleAccessControlChange(e.target.value)
							}
							defaultValue={items?.is_available_to_all_subscriber}
						>
							<Radio
								className={`text-xl font-semibold items-center ${styles.accessControl}`}
								value={true}
							>
								Available to all Subscribers
							</Radio>
							<Radio
								className={`text-xl font-semibold items-center ${styles.accessControl}`}
								value={false}
							>
								Only available to subscribers who has made
								payment up to:
							</Radio>
						</Radio.Group>
					</div>
					{!accessControl && (
						<div
							className={styles.in + ' flex flex-col w-1/4 mt-4'}
						>
							<label className="text-lg font-medium mb-3">
								Number of Times
							</label>
							<div className="flex items-center">
								<Input
									onChange={(e) =>
										setFrequency(e.target.value)
									}
									placeholder={
										items?.frequency_of_availability
									}
								/>
								<Button
									type="primary"
									onClick={() => handleSectionChange()}
								>
									Submit
								</Button>
							</div>
						</div>
					)}
				</div>
			)}
			{items?.product_subsection?.length > 0 ? (
				items?.product_subsection?.map((item, indx) => (
					<div
						key={indx}
						className={
							styles.managedContent +
							' bg-white flex justify-between mt-5 items-center rounded-lg mb-1'
						}
					>
						<div className="flex items-center">
							<div className={styles.fileImage}>
								{
									<Image
										width={25}
										height={25}
										src={
											item?.files[item?.files.length - 1]
												?.type === 'audio'
												? Audio
												: item?.files[
														item?.files.length - 1
												  ]?.type === 'video'
												? Video
												: item?.files[
														item?.files.length - 1
												  ]?.type === 'image'
												? ImageIcon
												: PdfIcon
										}
										alt="file"
									/>
								}
							</div>
							<div className="flex flex-col">
								<h1
									className={`text-xl font-semibold ${styles.productName}`}
								>
									{item.product_section_name}
								</h1>
								{/* {
									<h2
										className={`text-base font-medium ${styles.digitalProductSize}`}
									>{item?.files[0]?.filename}</h2>
								} */}
								{/* <div className='flex items-center'>
									<p>File size:</p> */}
								<CloudinaryFileSize
									cloudinaryUrl={item?.files[0]?.filename}
								/>
								{/* </div> */}
							</div>
						</div>
						<div className={styles.managedControls}>
							<div
								className="p-4"
								onClick={() => openMedia(item)}
							>
								<Image
									width={15}
									height={15}
									src={ViewSales}
									alt="icon"
								/>
							</div>
							<div
								onClick={() =>
									toSection('manage-content', item)
								}
								className="p-4"
							>
								<Image
									width={15}
									height={15}
									src={EditPen}
									alt="icon"
								/>
							</div>
							<div>
								<Popconfirm
									placement="bottom"
									overlayClassName={styles.popConfirm}
									onConfirm={() => deleteLecture(item)}
									okText="Delete"
									cancelText="Cancel"
									cancelButtonProps={{
										type: 'default',
										size: 'large',
									}}
									okButtonProps={{
										type: 'danger',
										size: 'large',
									}}
									overlayInnerStyle={{textAlign: 'center'}}
									overlayStyle={{
										width: '350px',
										padding: '20px',
									}}
									icon={<></>}
									title={`Are you sure you want to delete this File?`}
								>
									<Image
										width={15}
										height={15}
										src={FileDelete}
										alt="icon"
									/>
								</Popconfirm>
							</div>
						</div>
					</div>
				))
			) : (
				<div className="w-full bg-white py-10 rounded-lg flex items-center justify-center">
					<h2 className="text-2xl font-semibold text-gray-300">
						No Contents Available
					</h2>
				</div>
			)}
		</div>
	);
};

export default ManageSection;
