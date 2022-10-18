import Image from 'next/image';
import {useState, useEffect} from 'react';
import {ArrowLeft, WhiteEye} from 'utils';
import {Button} from 'antd';
import styles from './MembershipTab.module.scss';
import PlayMedia from './PlayMedia';
import {useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {CreateSection, GetProductByID, CreateContent} from 'redux/actions';

import ManageSectionSegment from 'components/products/components/ManageSection/ManageSection';

export default function ManageSection({
	setIsTabsActive,
	setMajorPage,
	toSection,
}) {
	const [mediaContent, setMediaContent] = useState(null);
	const [productSection, setProductSection] = useState(null);
	const {product, productID} = useSelector((state) => state.product);
	const getProduct = GetProductByID();
	const createContent = CreateContent();
	const [play, setPlay] = useState(false);
	const goBack = () => {
		setIsTabsActive(true);
		setMajorPage('index');
	};
	const openMedia = (media) => {
		setMediaContent(media);
		setPlay(true);
	};

	const initialValues = {
		product_id: 0,
		kreatesell_id: '',
		product_content_name: '',
		action: 'e',
		frequency_of_availability: 1,
		is_access_control_set: false,
		is_available_to_all_subscriber: true,
	};

	const handleSubmit = (data) => {};
	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: '',
		validateOnChange: false,
	});

	const {setFieldValue} = formik;
	useEffect(() => {
		if (Object.keys(product).length > 0) {
			const {product_content} = product;
			setProductSection(product_content);
		}
	}, [product]);

	const handleChange = (item, e) => {
		setFieldValue('product_content_name', item.section_name);
		setFieldValue('content_id', item.id);
		setFieldValue('kreatesell_id', item.kreate_sell_product_id);
		setFieldValue('product_id', item.product_id);
		setFieldValue('is_access_control_set', true);
		setFieldValue('is_available_to_all_subscriber', e.target.value);
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
				getProduct(productID);
			}
		);
	};
	// console.log("Product section", productSection)
	return (
		<div className="">
			{play && (
				<PlayMedia
					source={mediaContent}
					open={play}
					closePlay={setPlay}
				/>
			)}
			<div
				onClick={() => goBack()}
				className="inline-flex justify-start cursor-pointer items-center mb-4"
			>
				<Image alt="" src={ArrowLeft} />
				<h3 className="uppercase text-blue-600 font-semibold text-base mb-0 ml-3">
					Back
				</h3>
			</div>
			<div className="flex items-center justify-between mb-7">
				<h1
					className={`text-2xl text-blue-600 font-bold ${styles.titleMain}`}
				>
					How to Invest in Crypocurrency
				</h1>

				<div className={styles.miniSaveButtons + ' flex'}>
					<Button type="primary" style={{color: '#0072ef'}}>
						+ Add Section
					</Button>
					<Button
						type="primary"
						icon={
							<Image color="white" src={WhiteEye} alt="empty" />
						}
					>
						{' '}
						&nbsp;Preview Membership
					</Button>
				</div>
			</div>

			{productSection !== null &&
				productSection.length > 0 &&
				productSection.map((items, index) => (
					<ManageSectionSegment
						key={index}
						{...{
							items,
							index,
							setProductSection,
							handleChange,
							formik,
							setFieldValue,
							openMedia,
							deleteLecture,
							toSection,
						}}
					/>
				))}
		</div>
	);
}
