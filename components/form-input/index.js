import React, {useState, useEffect} from 'react';
import {
	Form,
	Input as AntInput,
	Select as AntSelect,
	Upload as AntUpload,
	Image,
	Button as AntButton,
} from 'antd';
import style from './Index.module.scss';
import {Popover} from '../../components/popover/Popover';
import {UploaderIcon, ProfileInputIcon} from '../../components/IconPack';
import {toast} from 'react-toastify';
import {MdDelete} from 'react-icons/md';
import NImg from 'next/image';
import {DeleteImage} from '../../redux/actions';
import {showToast} from 'utils';

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

const UploadPlaceholder = () => {
	return (
		<>
			<div className="upload-placeholder">
				<UploaderIcon />
				<div className="upload-btn">Upload Cover</div>
			</div>
			<style jsx>{`
				.upload-placeholder {
					height: 200px;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
				}

				.upload-btn {
					width: 50%;
					height: 32px;
					background: #f5f5f5;
					box-shadow: 0px 0px 2.17863px rgba(0, 0, 0, 0.084),
						0px 1.45242px 2.17863px rgba(0, 0, 0, 0.168);
					border-radius: 5.80968px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			`}</style>
		</>
	);
};

export const Input = ({
	CustomInput,
	type = 'text',
	maxLength = 700,
	placeholder,
	size = 'large',
	disabled,
	label,
	extraLabel,
	row,
	addonBefore,
	subText,
	...rest
}) => {
	return (
		<>
			<Form.Item
				{...rest}
				label={
					<label className={style.label}>
						{label} <span>{extraLabel}</span>
					</label>
				}
			>
				{CustomInput ? (
					<CustomInput
						rows={row}
						className={style.input}
						size={size}
						placeholder={placeholder}
						maxLength={maxLength}
					/>
				) : (
					<AntInput
						addonBefore={addonBefore}
						maxLength={maxLength}
						className={`${style.input} ${
							type === 'tel' && 'telInput'
						}`}
						{...{placeholder, size, type, disabled}}
					/>
				)}
			</Form.Item>
		</>
	);
};
export const TextAreaWithExtraLabel = ({
	CustomInput,
	type = 'text',
	placeholder,
	size = 'large',
	disabled,
	label,
	extraLabel,
	row,
	addonBefore,
	subText,
	handleTextChange,
	name,
	...rest
}) => {
	return (
		<>
			<Form.Item
				{...rest}
				label={
					<label className={style.label}>
						{label} <span>{extraLabel}</span>
					</label>
				}
			>
				{subText && <p className={style.subtext}>{subText}</p>}
				<Form.Item {...{name}}>
					<CustomInput
						onChange={handleTextChange}
						rows={row}
						className={style.input}
						size={size}
						placeholder={placeholder}
					/>
				</Form.Item>
			</Form.Item>
		</>
	);
};

/**
 * @description Input Variant 2 component: It has a Prefix text and Input field too
 *
 */
export const InputV2 = ({
	type = 'text',
	placeholder,
	size = 'large',
	prefixText,
	disabled,
	label,
	extraLabel,
	row,
	...rest
}) => {
	return (
		<div className={style.container}>
			<label className={style.label}>
				{label} <span>{extraLabel}</span>
			</label>
			<div className={style.inputV2Container}>
				<p>{prefixText}</p>
				<Form.Item {...rest} className={style.inputV2FormItem}>
					<AntInput
						disabled={disabled}
						className={style.inputV2}
						type={type}
						size={size}
						placeholder={placeholder}
					/>
				</Form.Item>
			</div>
		</div>
	);
};

export const Select = ({
	placeholder,
	size = 'large',
	onChange = () => {},
	loading,
	label,
	extraLabel,
	list = [],
	...rest
}) => {
	return (
		<Form.Item
			{...rest}
			label={
				<label className={style.label}>
					{label} <span>{extraLabel}</span>
				</label>
			}
		>
			{
				<AntSelect
					showSearch
					optionFilterProp="children"
					filterOption={(input, option) =>
						option.children
							.toLowerCase()
							.indexOf(input.toLowerCase()) >= 0
					}
					onChange={(e) => onChange(e)}
					loading={loading}
					className={style.input}
					size={size}
					placeholder={placeholder}
				>
					{list?.map(({label, value}, i) => (
						<AntSelect.Option key={i} value={value}>
							{label}
						</AntSelect.Option>
					))}
				</AntSelect>
			}
		</Form.Item>
	);
};
export const SelectV2 = ({
	placeholder,
	size = 'large',
	onChange = () => {},
	loading,
	label,
	extraLabel,
	list = [],
	setCountry,
	isCheckout = false,
	...rest
}) => {
	return (
		<>
			<Form.Item
				{...rest}
				label={
					<label className={style.label}>
						{label} <span>{extraLabel}</span>
					</label>
				}
			>
				{
					<AntSelect
						showSearch
						optionFilterProp="value"
						filterOption={(input, option) =>
							option.value
								.toLowerCase()
								.indexOf(input.toLowerCase()) >= 0
						}
						onChange={(e) => {
							setCountry(e);
							onChange(e);
						}}
						loading={loading}
						className={style.input}
						size={size}
						placeholder={placeholder}
					>
						{list?.map(({name, flag, country_code}, i) => (
							<AntSelect.Option key={i} value={name}>
								<div className={style.select}>
									{label === 'Country' && (
										<NImg
											style={{borderRadius: '5px'}}
											objectFit="cover"
											width={40}
											height={30}
											src={flag}
										/>
									)}
									{name}
									{isCheckout && (
										<span>({country_code})</span>
									)}
								</div>
							</AntSelect.Option>
						))}
					</AntSelect>
				}
			</Form.Item>
		</>
	);
};

export const Dropzone = ({
	label,
	value,
	onChange = () => {},
	extraLabel,
	name,
	updateUiOnDelete,
	...rest
}) => {
	const [showDeletePopover, setShowDeletePopover] = useState(false);
	const deleteImage = DeleteImage();
	const [imgUrl, setImgUrl] = useState();
	const handleDelete = () => {
		deleteImage(name, () => {
			onChange(null);
			updateUiOnDelete();

			setTimeout(() => {
				setShowDeletePopover(false);
			}, 1000);
		});
	};

	const handleBeforeUpload = (info, inp) => {
		const isImage = info?.type?.split('/')[0] == 'image';

		if (!isImage) {
			toast.error('File must be an image');
		} else {
			onChange(inp[0]);
			getBase64(inp[0], (imageUrl) => setImgUrl(imageUrl));
		}
		return false;
	};

	const content = (
		<div>
			<p className={style.popOverDescription}>
				Are you sure you want to delete <br /> your profile picture
			</p>
			<div className={style.popOverButtonContainer}>
				<Button
					className={style.dullFilled}
					onClick={() => setShowDeletePopover(false)}
					label="Cancel"
				/>
				<Button
					className={style.danger}
					onClick={handleDelete}
					label="Delete"
				/>
			</div>
		</div>
	);

	return (
		<div className={style.dragger_wrapper}>
			{/* {(imgUrl || value) && ( */}
			{value && (
				<div className={style.deleteContainer}>
					<Popover
						trigger="click"
						title="title"
						placement="bottom"
						visible={showDeletePopover}
						popoverActive={true}
						content={content}
					>
						<div
							// id="fi"
							className={style.popOverTriggerButtonContainer}
						>
							<MdDelete
								onClick={() => setShowDeletePopover(true)}
								className={style.icon}
							/>
						</div>
					</Popover>
				</div>
			)}
			<label className={style.label}>
				{label} <span>{extraLabel}</span>
			</label>
			<AntUpload.Dragger
				{...rest}
				previewFile={false}
				style={{padding: 0, height: '200px'}}
				beforeUpload={handleBeforeUpload}
				listType="picture-card"
				showUploadList={false}
			>
				{/* {imgUrl || value ? (/ */}
				{value ? (
					<Image
						src={imgUrl || value}
						alt="avatar"
						height={300}
						preview={false}
					/>
				) : (
					<UploadPlaceholder />
				)}
			</AntUpload.Dragger>
		</div>
	);
};

export const Button = ({label, type, className = '', ...rest}) => {
	return (
		<AntButton
			className={`${style.btn} ${className}`}
			type={type || ''}
			{...rest}
		>
			{label}
		</AntButton>
	);
};

export const FileInput = ({
	onChange = () => {},
	value,
	placeholder,
	label = 'Profile picture',
	disabled,
	extralable = '- Your profile picture',
	name,
}) => {
	const deleteImage = DeleteImage();
	const [file, setFile] = useState('');
	const [showDeletePopover, setShowDeletePopover] = useState(false);
	const [fileDataURL, setFileDataURL] = useState(null);

	const handleDelete = () => {
		deleteImage(name, () => {
			setFile(null);
			onChange(null);
			setFileDataURL(null);
			setTimeout(() => {
				setShowDeletePopover(false);
			}, 1000);
		});
	};

	const handleChange = (e) => {
		{
			/* console.log('e', e.target.files[0].size); */
		}

		if (e.target.files[0].size > 1048576) {
			showToast('Selected file is larger than 1mb', 'warn');
			return;
		}
		setFile(e.target.files[0].name);
		onChange(e.target.files[0]);
	};

	useEffect(() => {
		let fileReader,
			isCancel = false;
		if (value && value instanceof Blob) {
			fileReader = new FileReader();
			fileReader.onload = (e) => {
				const {result} = e.target;
				if (result && !isCancel) {
					setFileDataURL(result);
				}
			};
			fileReader.readAsDataURL(value);
		}
		return () => {
			isCancel = true;
			if (fileReader && fileReader.readyState === 1) {
				fileReader.abort();
			}
		};
	}, [value]);

	const content = (
		<div>
			<p className={style.popOverDescription}>
				Are you sure you want to delete <br /> your profile picture
			</p>
			<div className={style.popOverButtonContainer}>
				<Button
					className={style.dullFilled}
					onClick={() => setShowDeletePopover(false)}
					label="Cancel"
				/>
				<Button
					className={style.danger}
					onClick={handleDelete}
					label="Delete"
				/>
			</div>
		</div>
	);

	return (
		<>
			<div className="label">
				<span className="label-text">{label}</span>{' '}
				<span className="extralable">{extralable}</span>
			</div>
			<div className="input-group-wrapper">
				<div className="profile-input-icon">
					{!!value && !value?.name ? (
						<NImg
							objectFit="cover"
							width={42}
							height={45}
							src={value}
						/>
					) : fileDataURL ? (
						<NImg
							objectFit="cover"
							width={42}
							height={45}
							src={fileDataURL}
						/>
					) : (
						<ProfileInputIcon />
					)}
				</div>
				<label className="file-input-label">
					<input
						type="file"
						disabled={!!value}
						accept="image/*"
						maxLength={'1048576'}
						onChange={(e) => handleChange(e)}
						multiple={false}
					/>
					{!!value ? (
						<div style={{display: 'flex'}}>
							<Popover
								trigger="click"
								title="title"
								placement="bottom"
								visible={showDeletePopover}
								// triggerButton={

								// }
								content={content}
							/>
							<div
								id="fi"
								className={style.popOverTriggerButtonContainer}
							>
								<MdDelete
									onClick={() => setShowDeletePopover(true)}
									style={{
										fontSize: '20px',
										cursor: 'pointer',
										position: 'relative',
										zIndex: '3',
									}}
									color="red"
								/>
							</div>
							Click to delete the profile picture
						</div>
					) : (
						<span>
							upload a profile picture not exceeding 1MB, 300 x
							300 pixel is the ideal dimension
						</span>
					)}
				</label>
			</div>

			<style jsx>{`
				.file-input-label {
					height: 45px;
					width: 100%;
					border: 1px solid #d9d9d9;
					border-radius: 8px;
					padding: 13px;
					padding-left: 50px;
					margin: 8px 0px;
					color: #8c8c8c;
					font-size: 14px;
					display: block;
					text-align: left;
					cursor: pointer;
				}

				.label {
					font-weight: 500;
					font-size: 14px;
					line-height: 26px;
					display: block;
					font-weight: 600;
					text-align: left;
				}
				.icon {
					font-size: 25px;
					color: red !important;
				}
				.img {
					border-radius: 5px;
					height: 100%;
					width: 100%;
					object-fit: cover;
				}

				span.extralable {
					color: #8c8c8c;
				}

				.file-input-label input[type='file'] {
					display: none;
				}

				.profile-input-icon {
					width: 42px;
					height: 45px;
					background: #0072ef;
					position: absolute;
					top: 0px;
					border-radius: 8px;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.input-group-wrapper {
					position: relative;
				}

				@media screen and (max-width: 600px) {
					.file-input-label {
						font-size: 12px;
					}
				}
			`}</style>
		</>
	);
};
