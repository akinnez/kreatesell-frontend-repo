import { Button, Input, Tooltip } from 'antd';
import styles from './MembershipTab.module.scss';
import { DeleteProduct, DuplicateProduct } from 'utils';
import Image from 'next/image';
import {
	HandleBar,
	EditPen,
	AddLecture,
	MobileCopyIcon,
	MobileSettingsIcon,
	MobileSettingsIconGreen,
	MobileTrashIcon,
	MobileViewSubscribers,
} from 'utils';
import { useFormik } from 'formik';
import { BsFillPencilFill, BsFillXCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { CreateSection, AuthGetProductById, CreateContent } from 'redux/actions';
import { useRouter } from 'next/router';

export default function AddSection({ toSection }) {
	const [productSection, setProductSection] = useState(null);
	const { product } = useSelector((state) => state.product);
	const [openInput, setOpenInput] = useState(false);
	const [openLectureInput, setOpenLectureInput] = useState(false);
	const router = useRouter();

	const prodId = router.query.productId

	const createSection = CreateSection();
	const getProduct = AuthGetProductById();
	const createContent = CreateContent();
	const initialValues = {
		product_id: 0,
		kreatesell_id: '',
		product_content_name: '',
		action: 'e',
		frequency_of_availability: 1,
		is_access_control_set: false,
		is_available_to_all_subscriber: true,
	};
	const initialSub = {
		section_id: '',
		product_section_name: ``,
		product_section_description: '',
		upload_product_file: true,
		product_visibility_status: 1,
		is_content_downloadable: true,
		product_file_details: {
			product_files: null,
		},
		action: 'e',
		sub_section_id: 0,
	};
	const handleSubmit = (data) => {
		createSection(data, () => {
			getProduct(prodId);
		});
	};

	const submitSub = (data) => {
		createContent(data, () => {
			getProduct(prodId);
		});
	};
	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: '',
		validateOnChange: false,
	});
	const subFormik = useFormik({
		initialValues: initialSub,
		onSubmit: submitSub,
		validationSchema: '',
		validateOnChange: false,
	});
	const { setFieldValue } = formik;

	const { setFieldValue: setSubValue } = subFormik;
	const addSection = () => {
		createSection(
			{
				product_id: product?.product_details?.id,
				kreatesell_id: product?.product_details?.kreasell_product_id,
				product_content_name: `Section ${product?.product_content.length + 1
					}`,
				action: 'c',
			},
			() => {
				getProduct(prodId);
			}
		);
	};
	const deleteSection = (item) => {
		createSection(
			{
				product_id: item.product_id,
				kreatesell_id: item.kreate_sell_product_id,
				product_content_name: item.section_name,
				action: 'r',
				content_id: item.id,
			},
			() => {
				getProduct(prodId);
			}
		);
	};
	const handleChange = (value, item) => {
		setFieldValue('product_content_name', value);
		setFieldValue('content_id', item.id);
		setFieldValue('kreatesell_id', item.kreate_sell_product_id);
		setFieldValue('product_id', item.product_id);
	};
	const handleLectureChange = (value, lecture) => {
		setSubValue('product_section_name', value);
		setSubValue('section_id', lecture.product_content_id);
		setSubValue(
			'product_section_description',
			lecture.product_section_description
		);
		setSubValue('is_content_downloadable', lecture.is_content_downloadable);
		setSubValue('sub_section_id', lecture.id);
	};
	const duplicateSection = (item) => {
		createSection(
			{
				product_id: item.product_id,
				kreatesell_id: item.kreate_sell_product_id,
				product_content_name: item.section_name,
				action: 'p',
				content_id: item.id,
			},
			() => {
				getProduct(prodId);
			}
		);
	};
	const handleClick = (target) => {
		const { nextElementSibling: element } = target;
		target.style.display = 'none';
		element.style.display = 'block';
	};
	const handleSectionChange = () => {
		// const { previousElementSibling: element } = target;
		// target.style.display = 'none';
		// element.style.display = 'block';
		formik.handleSubmit();
		setOpenInput(false)
	};
	const handleLectureInputChange = () => {
		// const { previousElementSibling: element } = target;
		// target.style.display = 'none';
		// element.style.display = 'block';
		subFormik.handleSubmit();
		setOpenLectureInput(false)
	};
	const addNewLecture = (item) => {
		createContent(
			{
				section_id: item.id,
				product_section_name: `Lecture ${item.product_subsection.length + 1
					}`,
				product_section_description: 'Kindly add a brief description',
				upload_product_file: true,
				product_visibility_status: 1,
				is_content_downloadable: true,
				product_file_details: {
					product_files: null,
				},
				action: 'c',
			},
			() => {
				getProduct(prodId);
			}
		);
	};

	const deleteLecture = (lecture) => {
		createContent(
			{
				section_id: lecture.product_content_id,
				action: 'r',
				sub_section_id: lecture.id,
				product_section_name: lecture.product_section_name,
				product_section_description:
					lecture.product_section_description,
				product_file_details: lecture.product_file_details ?? {
					product_files: null,
				},
			},
			() => {
				getProduct(prodId);
			}
		);
	};
	const duplicateLecture = (lecture) => {
		createContent(
			{
				section_id: lecture.product_content_id,
				action: 'p',
				sub_section_id: lecture.id,
				product_section_name: lecture.product_section_name,
				product_section_description:
					lecture.product_section_description,
				product_file_details: lecture.product_file_details ?? {
					product_files: null,
				},
			},
			() => {
				getProduct(prodId);
			}
		);
	};
	useEffect(() => {
		if (Object.keys(product).length > 0) {
			const { product_content } = product;
			setProductSection(product_content);
		}
	}, [product]);
	return (
		<div className={styles.allSection}>
			{productSection !== null &&
				productSection.length > 0 &&
				productSection.map((item, index) => (
					<div key={index} className={styles.section}>
						<div className="flex justify-between items-center">
							<div className="flex items-center">
								<Image
									className="mr-4"
									src={HandleBar}
									alt="handle"
								/>
								{!openInput && (
									<div className='flex items-center'>
										<h2 className="text-base mb-0 ml-2 font-medium cursor-pointer">
											{item.section_name}
										</h2>
										<div className='ml-4 cursor-pointer' onClick={() => setOpenInput(true)}>
											<BsFillPencilFill className='text-gray-500' />
										</div>
									</div>
								)}

								{openInput &&  (
									<div className='flex items-center ml-3'>
										<Input
											autoFocus={true}
											value={formik.values.product_content_name}
											onFocus={() =>
												setFieldValue(
													'product_content_name',
													item.section_name
												)
											}
											onChange={(e) =>
												handleChange(e.target.value, item)
											}
											placeholder="Introduction"
										/>
										<div className='flex items-center ml-3 gap-2 cursor-pointer'>
											<BsFillCheckCircleFill className='text-blue-500 text-lg' onClick={() => handleSectionChange()} />
											<BsFillXCircleFill className='text-gray-500 text-lg' onClick={() => setOpenInput(false)} />
										</div>
									</div>
								)}
							</div>
							<div className="flex items-center">
								<div className={styles.manageButton + ' mr-3'}>
									<Button
										onClick={() =>
											toSection('manage-section')
										}
										type="primary"
										style={{
											color: '#0072ef',
											border: ' 2px solid #0072ef',
										}}
									>
										Manage Section
									</Button>
								</div>
								<div
									className={
										styles.mobileManageButton + ' mr-3'
									}
								>
									<Button
										onClick={() =>
											toSection('manage-section')
										}
										type="primary"
										style={{
											color: '#0072ef',
											border: 'none',
											boxShadow: 'none',
										}}
									>
										<Image
											src={MobileSettingsIcon}
											width={15}
											height={25}
											alt=""
										/>
									</Button>
								</div>
								<Tooltip
									color="white"
									overlayInnerStyle={{ color: 'black' }}
									placement="top"
									title="Duplicate"
								>
									<div
										onClick={() => duplicateSection(item)}
										className={styles.manageIcon + ' mr-3'}
									>
										<Image
											width={100}
											height={100}
											src={DuplicateProduct}
											alt="duplicate"
										/>
									</div>
								</Tooltip>
								<Tooltip
									color="white"
									overlayInnerStyle={{ color: 'black' }}
									overlayClassName={styles.toolTip}
									placement="top"
									title="Delete"
								>
									<div
										onClick={() => deleteSection(item)}
										className={styles.manageIcon}
									>
										<Image
											width={100}
											height={100}
											src={DeleteProduct}
											alt="delete"
										/>
									</div>
								</Tooltip>
							</div>
						</div>
						{item?.product_subsection?.map((lecture, idx) => (
							<div
								key={idx}
								className="flex mt-5 ml-5 justify-between items-center"
							>
								<div className="flex items-center">
									<Image
										className="mr-2"
										src={HandleBar}
										alt="handle"
									/>
									{!openLectureInput && (
										<div className='flex items-center'>
											<h2
												// onClick={(e) => handleClick(e.target)}
												className="text-base mb-0 ml-2 font-medium cursor-pointer"
											>
												{lecture.product_section_name}
											</h2>
											<div className='ml-4 cursor-pointer' onClick={() => setOpenLectureInput(true)}>
												<BsFillPencilFill className='text-blue-500' />
											</div>
										</div>
									)}
									
									{openLectureInput && item?.product_subsection.indexOf(lecture) === idx && (
										<div className='flex items-center ml-3'>
											<Input
												autoFocus={true}
												value={
													subFormik.values
														.product_section_name
												}
												onFocus={() =>
													setSubValue(
														'product_section_name',
														lecture.product_section_name
													)
												}
												onChange={(e) =>
													handleLectureChange(
														e.target.value,
														lecture
													)
												}
												placeholder="Add lecture"
											/>
											<div className='flex items-center ml-3 gap-2 cursor-pointer'>
												<BsFillCheckCircleFill className='text-blue-500 text-lg' onClick={()=> handleLectureInputChange()}/>
												<BsFillXCircleFill className='text-gray-500 text-lg' onClick={() => setOpenLectureInput(false)} />
											</div>
										</div>
									)}
								</div>
								<div className="flex items-center">
									<div
										className={
											styles.manageButton + ' mr-3'
										}
									>
										<Button
											onClick={() =>
												toSection(
													'manage-content',
													lecture
												)
											}
											type="primary"
											style={{
												color: '#00b140',
												border: ' 2px solid #00b140',
											}}
										>
											Manage Lecture
										</Button>
									</div>
									<div
										className={
											styles.mobileManageButton + ' mr-3'
										}
									>
										<Button
											onClick={() =>
												toSection(
													'manage-content',
													lecture
												)
											}
											type="primary"
											style={{
												border: 'none',
												boxShadow: 'none',
											}}
										>
											<Image
												src={MobileSettingsIconGreen}
												width={15}
												height={20}
												alt=""
											/>
										</Button>
									</div>
									<Tooltip
										color="white"
										overlayInnerStyle={{ color: 'black' }}
										overlayStyle={{
											backgroundColor: 'white',
										}}
										placement="top"
										title="Duplicate"
									>
										<div
											onClick={() =>
												duplicateLecture(lecture)
											}
											className={
												styles.manageIcon + ' mr-3'
											}
										>
											<Image
												width={100}
												height={100}
												src={DuplicateProduct}
												alt="duplicate"
											/>
										</div>
									</Tooltip>
									<Tooltip
										color="white"
										overlayInnerStyle={{ color: 'black' }}
										overlayStyle={{
											backgroundColor: 'white',
										}}
										placement="top"
										title="Delete"
									>
										<div
											onClick={() =>
												deleteLecture(lecture)
											}
											className={styles.manageIcon}
										>
											<Image
												width={100}
												height={100}
												src={DeleteProduct}
												alt="delete"
											/>
										</div>
									</Tooltip>
								</div>
							</div>
						))}
						<div
							onClick={() => addNewLecture(item)}
							className="inline-flex items-center cursor-pointer mt-5"
						>
							<Image src={AddLecture} alt="add" />
							<h2 className="text-base mb-0 ml-2 font-medium">
								Add a Lecture
							</h2>
						</div>
					</div>
				))}
			<div className={styles.miniSaveButton + 'flex mt-5'}>
				<Button
					className={styles.addSectionBtn}
					onClick={() => addSection()}
					type="primary"
				>
					+ Add New Section
				</Button>
			</div>
		</div>
	);
}
