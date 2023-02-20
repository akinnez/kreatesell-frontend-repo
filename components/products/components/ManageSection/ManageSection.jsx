import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import axios from 'axios';

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

	// console.log(items, 'items');
	// console.log(items?.product_subsection, 'items?.product_subsection');

	// const getMediaIconType = (iconObj) => {
	// 	if()
	// }

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

		useEffect(() => {
			extractFileSize(cloudinaryUrl).then((size) => {
				setFileSize(size);
			});
		}, [cloudinaryUrl]);

		return fileSize !== null ? (
			<h2
				className={`text-base font-medium mt-0 ${styles.digitalProductSize}`}
			>
				{fileSize > 1000000
					? `${Number(fileSize / 1000000).toFixed(2)}MB`
					: `${Number(fileSize / 1000).toFixed(2)}KB`}
			</h2>
		) : (
			<p>Loading file size</p>
		);
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
							onChange={(e) => handleChange(items, e)}
							defaultValue={true}
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
					{!formik.values.is_available_to_all_subscriber && (
						<div
							className={styles.in + ' flex flex-col w-1/3 mt-4'}
						>
							<label className="text-lg font-medium mb-3">
								Number of Times
							</label>
							<Input
								onChange={(e) =>
									setFieldValue(
										'frequency_of_availability',
										e.target.value
									)
								}
								placeholder="1"
							/>
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
											item?.files[0]?.type === 'audio'
												? Audio
												: item?.files[0]?.type ===
												  'video'
												? Video
												: item?.files[0]?.type ===
												  'image'
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
								<CloudinaryFileSize
									cloudinaryUrl={item?.files[0]?.filename}
								/>
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
