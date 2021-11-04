import React, { useState, useRef } from "react";
import Select from "react-select";
import {
	DropdownIndicator,
	ProfileInputIcon,
	UploaderIcon,
	CheckMark,
} from "../IconPack";
import Calendar from "../calendar";

export const TextInput = ({
	disabled,
	labelStyle,
	name,
	type = "text",
	value,
	onChange = () => {},
	onBlur = () => {},
	label,
	placeholder,
	labelExtra,
	...rest
}) => {
	return (
		<>
			<label style={labelStyle}>
				{label} {labelExtra ? <span>- {labelExtra}</span> : null}
			</label>
			<input
				type={type}
				name={name}
				disabled={disabled}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				onBlur={(e) => onBlur(e.target.value)}
				{...rest}
			/>

			<style jsx>{`
				label {
					font-weight: 500;
					font-size: 16px;
					line-height: 26px;
					display: block;
				}

				label span {
					color: #8c8c8c;
				}

				input {
					outline: none;
					border: none;
					height: 45 px;
					width: 100%;
					border: 1px solid #d9d9d9;
					border-radius: 8px;
					padding: 13px;
					margin: 8px 0px;
					color: #8c8c8c;
					font-size: 14px;
				}

				@media screen and (max-width: 600px) {
					input {
						font-size: 12px;
					}
				}
			`}</style>
		</>
	);
};

export const TextArea = ({
	disabled,
	name,
	type = "text",
	value,
	onChange = () => {},
	onBlur = () => {},
	label,
	placeholder,
	labelExtra,
	...rest
}) => {
	return (
		<>
			<label>
				{label} {labelExtra ? <span>- {labelExtra}</span> : null}
			</label>
			<textarea
				type={type}
				name={name}
				disabled={disabled}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				onBlur={(e) => onBlur(e.target.value)}
				rows="8"
				{...rest}
			/>

			<style jsx>{`
				label {
					font-weight: 500;
					font-size: 16px;
					line-height: 26px;
					display: block;
				}

				label span {
					color: #8c8c8c;
				}

				textarea {
					outline: none;
					border: none;
					height: 45 px;
					width: 100%;
					border: 1px solid #d9d9d9;
					border-radius: 8px;
					padding: 13px;
					margin: 8px 0px;
					color: #8c8c8c;
					font-size: 14px;
					resize: none;
					font-family: "Inter";
				}

				@media screen and (max-width: 600px) {
					textarea {
						font-size: 12px;
					}
				}
			`}</style>
		</>
	);
};

export const CustomSelect = ({
	label,
	width,
	margin = "8px 0px",
	labelStyle,
	disabled,
	onChange = () => {},
	isMultiple = false,
	value,
	error,
	placeholder,
	list = [],
	...rest
}) => {
	const selectStyle = {
		control: (base) => ({
			...base,
			height: 45,
			minHeight: 45,
			border: "1px solid #D9D9D9",
			fontSize: "14px",
			color: "#8C8C8C",
			background: "#fff",
			borderRadius: 8,
			margin,
		}),
		indicatorSeparator: () => {},
	};

	const handleChange = (v) => {
		if (isMultiple) {
			const val = v?.map(({ value }) => value);
			onChange(val);
		} else {
			onChange(v?.value);
		}
	};

	const handleLabel = () => {
		if (isMultiple) {
			const arr = [];
			value?.forEach((item) => {
				const index = list?.findIndex((el) => el.value == item);
				arr.push({ label: list[index].label, value: item });
			});
			return arr;
		} else {
			const index = list?.findIndex((el) => el.value == value);

			if (index > -1) {
				return { label: list[index].label, value };
			}
			return "";
		}
	};

	return (
		<>
			<div className="input-wrapper">
				<div className="input-plus-label-wrapper">
					<label style={labelStyle}>{label}</label>
					<Select
						isDisabled={disabled}
						styles={selectStyle}
						isMulti={isMultiple}
						placeholder={placeholder}
						options={list}
						value={handleLabel()}
						components={{ DropdownIndicator }}
						getOptionLabel={(opt) => opt.label}
						getOptionValue={(opt) => opt.value}
						onChange={(value) => handleChange(value)}
					/>
					<span className={error ? "error" : null}>{error}</span>
				</div>
			</div>

			<style jsx>{`
				.input-wrapper {
					position: relative;
					width: ${width};
					min-height: 20px;
				}

				label {
					font-weight: 500;
					font-size: 16px;
					line-height: 26px;
					display: block;
				}

				.error {
					color: red;
				}
			`}</style>
		</>
	);
};

export const Button = ({
	onClick = () => {},
	Icon = () => <></>,
	label = "Submit",
	disabled,
	loading,
	...rest
}) => {
	return (
		<>
			<button
				{...rest}
				onClick={() => onClick()}
				disabled={disabled || loading}
			>
				{loading ? (
					"Loading..."
				) : (
					<>
						<Icon /> {label}
					</>
				)}
			</button>

			<style jsx>{`
				button {
					padding: 10px 16px;
					outline: none;
					border: none;
					background: #0072ef;
					color: #fff;
					border-radius: 8px;
					font-weight: 700;
					font-size: 14px;
					min-width: 160px;
				}

				button:not(:disabled) {
					cursor: pointer;
				}

				button:disabled {
					background-color: #b0b3c5;
				}
			`}</style>
		</>
	);
};

export const FileInput = ({
	onChange,
	value,
	placeholder,
	label = "Profile picture",
	disabled,
	extralable = "- Your profile picture",
}) => {
	const handleChange = (e) => {
		onChange(e.target.value);
	};

	return (
		<>
			<div className="label"></div>
			<span className="label-text">{label}</span>{" "}
			<span className="extralable">{extralable}</span>
			<div className="input-group-wrapper">
				<div className="profile-input-icon">
					<ProfileInputIcon />
				</div>
				<label className="file-input-label">
					<input
						type="file"
						accept="image/*"
						onChange={(e) => handleChange(e)}
					/>
					{value != "" ? (
						value
					) : (
						<span>
							upload a profile picture of 300 X 300 pixel not exceed 300KB
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
				}

				.label {
					font-weight: 500;
					font-size: 16px;
					line-height: 26px;
					display: block;
				}

				span.extralable {
					color: #8c8c8c;
				}

				.file-input-label input[type="file"] {
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

export const Uploader = ({
	disabled,
	label,
	extralable,
	value,
	onChange = () => {},
	onBlur = () => {},
}) => {
	const [file, setFile] = useState("");
	const inputFileRef = useRef(null);

	const handleChange = (e) => {
		const file = e.target.files[0];
		if (file !== undefined) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = ({ currentTarget }) => {
				setFile(currentTarget?.result);
			};
		}
	};

	const handleClick = () => {
		inputFileRef.current.click();
	};

	return (
		<>
			<div className="label"></div>
			<span className="label-text">{label}</span>{" "}
			<span className="extralable">{extralable}</span>
			<label
				className={`uploader-wrapper ${file ? "filled" : ""}`}
				style={{ backgroundImage: `url(${file})` }}
			>
				<input
					type="file"
					accept="image/*"
					ref={inputFileRef}
					onChange={(e) => handleChange(e)}
				/>
				<UploaderIcon />
				<button className="upload-cta" onClick={() => handleClick()}>
					Upload Cover
				</button>
				<span className="info-text">
					Recommended minimum image ratio is 400 x 800 pixels and not exceed
					500kb
				</span>
			</label>
			<style jsx>{`
				.uploader-wrapper {
					border: 1px dashed #d9d9d9;
					height: 262px;
					border-radius: 8px;
					margin: 8px 0px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					background-size: cover;
					background-position: center;
					background-repeat: no-repeat;
					padding: 10px;
				}

				.uploader-wrapper input[type="file"] {
					display: none;
				}

				.filled:hover svg {
					display: none;
				}

				.label {
					font-weight: 500;
					font-size: 16px;
					line-height: 26px;
					display: block;
				}

				span.extralable {
					color: #8c8c8c;
				}

				.upload-cta {
					background: #f5f5f5;
					box-shadow: 0px 0px 2.17863px rgba(0, 0, 0, 0.084),
						0px 1.45242px 2.17863px rgba(0, 0, 0, 0.168);
					border-radius: 5.80968px;
					width: 400px;
					outline: none;
					border: none;
					height: 32px;
				}

				.info-text {
					color: #8c8c8c;
					font-size: 14px;
					margin-top: 10px;
				}
			`}</style>
		</>
	);
};

export const Checkbox = ({ value, onChange = () => {}, label, extralable }) => {
	return (
		<>
			<div className="checkbox-wrapper">
				<span
					className={`indicator ${value ? "checked" : ""}`}
					onClick={() => onChange(!value)}
				>
					<CheckMark />
				</span>
				<span className="label">
					{label} <span className="extra">{extralable}</span>
				</span>
			</div>

			<style jsx>{`
				.checkbox-wrapper {
					display: flex;
					margin: 10px 0;
				}

				.checkbox-wrapper span.indicator {
					height: 20px;
					width: 20px;
					border-radius: 2px;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.checkbox-wrapper span.indicator:not(.checked) {
					border: 1px solid #d9d9d9;
					background-color: #ffffff;
				}
				.checked {
					background: #0072ef;
				}

				.label {
					margin-left: 10px;
					font-weight: 500;
					font-size: 16px;
					flex: 1;
				}

				.extra {
					color: #8c8c8c;
				}
			`}</style>
		</>
	);
};

export const Radio = ({
	value,
	content,
	onChange = () => {},
	label,
	extralable,
	labelStyle,
	extralableStyle,
}) => {
	return (
		<>
			<div className="radio-wrapper">
				<div
					className={`radio ${value == content ? "checked" : ""}`}
					onClick={() => onChange(content)}
				>
					{value == content ? <div className="indicator" /> : null}
				</div>
				<span className={`label ${labelStyle}`}>
					{label}{" "}
					<span className={`extra ${extralableStyle}`}>{extralable}</span>
				</span>
			</div>

			<style jsx>{`
				.radio-wrapper {
					display: flex;
					margin: 15px 0;
				}

				.radio {
					height: 20px;
					width: 20px;
					border-radius: 50%;
					border: 2px solid #8c8c8c;
					display: flex;
					align-items: center;
					justify-content: center;
					transition: all 400ms ease-in;
					cursor: pointer;
				}

				.checked {
					border-color: #0072ef;
					transition: all 400ms ease-in;
				}

				.radio .indicator {
					width: 10px;
					height: 10px;
					background: #0072ef;
					border-radius: 50%;
					transition: all 400ms ease-in;
				}

				.label {
					margin-left: 10px;
					font-weight: 500;
					font-size: 16px;
					flex: 1;
					color: #595959;
				}

				.extra {
					color: #8c8c8c;
				}
			`}</style>
		</>
	);
};

export const DatePicker = ({ onChange = () => {}, value, format }) => {
	return (
		<>
			<Calendar
				CustomInput={TextInput}
				value={value}
				onChange={(e) => onChange(e)}
				format={format}
			/>
		</>
	);
};

export const Switch = ({ value, onChange = () => {}, label }) => {
	return (
		<>
			<div className="switch-wrapper">
				<span className="label">{label}</span>
				<label className="switch">
					<input
						type="checkbox"
						checked={value}
						onChange={(e) => onChange(e.target.checked)}
					/>
					<span className="slider round"></span>
				</label>
			</div>

			<style jsx>{`
				.label {
					margin-right: 20px;
					color: #8c8c8c;
				}
				.switch {
					position: relative;
					display: inline-block;
					width: 53px;
					height: 28px;
				}

				.switch input {
					opacity: 0;
					width: 0;
					height: 0;
				}

				.slider {
					position: absolute;
					cursor: pointer;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-color: #d9d9d9;
					-webkit-transition: 0.4s;
					transition: 0.4s;
				}

				.slider:before {
					position: absolute;
					content: "";
					height: 28px;
					width: 28px;
					left: 0;
					bottom: 0px;
					background-color: white;
					-webkit-transition: 0.4s;
					transition: 0.4s;
				}

				input:checked + .slider {
					background-color: #0072ef;
					left: -10px;
				}

				input:focus + .slider {
					box-shadow: 0 0 1px #2196f3;
				}

				input:checked + .slider:before {
					-webkit-transform: translateX(36px);
					-ms-transform: translateX(36px);
					transform: translateX(36px);
				}

				.slider.round {
					border-radius: 34px;
				}

				.slider.round:before {
					border-radius: 50%;
				}

				.switch-wrapper {
					display: flex;
					justify-content: space-between;
					margin: 20px 0;
				}
			`}</style>
		</>
	);
};

export const Percentage = ({ value, onChange = () => {}, name }) => {
	return (
		<>
			<div className="perc-wrapper">
				<label>How much percentage are you willing to pay affiliate</label>
				<div className="perc-input-wrapper">
					<input
						type="number"
						placeholder="0"
						value={value}
						onChange={(e) => onChange(e.target.value)}
						name={name}
					/>
					<span>%</span>
				</div>
			</div>

			<style jsx>{`
				.perc-wrapper {
					display: flex;
					justify-content: space-between;
					align-items: center;
					background: #f5f5f5;
					padding: 10px;
					gap: 10px;
					margin: 10px 0;
				}

				label {
					flex: 1;
					font-size: 14px;
					color: #8c8c8c;
				}

				.perc-input-wrapper {
					width: 60px;
					height: 26px;
					display: flex;
				}

				.perc-input-wrapper input[type="number"] {
					width: 50%;
					outline: none;
					border: none;
					text-align: center;
					color: #8c8c8c;
				}

				input[type="number"]::-webkit-outer-spin-button,
				input[type="number"]::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
					-moz-appearance: textfield;
				}

				.perc-input-wrapper input:placeholder {
					color: #8c8c8c;
				}

				.perc-input-wrapper span {
					flex: 1;
					background: #0072ef;
					color: #ffffff;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			`}</style>
		</>
	);
};
