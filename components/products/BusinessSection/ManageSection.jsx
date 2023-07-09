import Image from 'next/image';
import {useState, useEffect} from 'react';
import {ArrowLeft, WhiteEye} from 'utils';
import {Button} from 'antd';
import styles from './MembershipTab.module.scss';
import PlayMedia from './PlayMedia';
import {useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {useFormik} from 'formik';
import {CreateSection, AuthGetProductById, CreateContent} from 'redux/actions';

import ManageSectionSegment from 'components/products/components/ManageSection/ManageSection';

export default function ManageSection({
	setIsTabsActive,
	setMajorPage,
	toSection,
}) {
	const [mediaContent, setMediaContent] = useState(null);
	const [productSection, setProductSection] = useState(null);
	const {product, productID} = useSelector((state) => state.product);
	const getProduct = AuthGetProductById();
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

	const route = useRouter();

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
	return (
		<div className="">
			{play && (
				<PlayMedia
					source={
						mediaContent?.files[mediaContent?.files.length - 1]
							.filename
					}
					open={play}
					closePlay={setPlay}
					type={
						mediaContent?.files[mediaContent?.files.length - 1].type
					}
					title={mediaContent?.product_section_name}
				/>
			)}

			<div className="flex justify-between">
				<div
					onClick={() => goBack()}
					className="inline-flex justify-start cursor-pointer items-center mb-4"
				>
					<Image alt="" src={ArrowLeft} />
					<h3 className="uppercase text-blue-600 font-semibold text-base mb-0 ml-3">
						Back
					</h3>

					<div className="flex items-center justify-between mb-7"></div>
				</div>
				<div className={styles.miniSaveButtons + ' flex'}>
					<Button type="primary" style={{color: '#0072ef'}}>
						+ Add Section
					</Button>
					<Button
						type="primary"
						icon={
							<Image color="white" src={WhiteEye} alt="empty" />
						}
						onClick={() =>
							route.push(
								`/account/kreator/products/preview-membership/${product.product_details.kreasell_product_id}`
							)
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
