import RSelect from "react-select";
import styles from "./Select.module.scss";

export const Select = ({
	options,
	name,
	placeholder,
	arrowIconColor,
	border,
	borderColor = "#d9dbe1",
	transparentBg,
	placeholderStyle,
	bgColor = "#ffffff",
	placeHolderColor,
	height = "38px",
	label,
	...rest
}) => {
	const customStyles = {
		control: (provided, state) => ({
			...provided,
			borderColor,
			border: border === `none` ? "none" : `1px solid ${borderColor}`,
			borderRadius: "8px",
			background: transparentBg ? "transparent" : bgColor,
			minHeight: height,
		}),
		indicatorSeparator: (provided, state) => ({
			...provided,
			display: "none",
		}),
		placeholder: (provided, state) => ({
			...provided,
			color: placeHolderColor,
		}),
		dropdownIndicator: (provided, state) => ({
			...provided,
			color: arrowIconColor ? arrowIconColor : `#d9dbe1`,
		}),
	};

	return (
		<div className={styles.select}>
			<label htmlFor={rest?.name} className={styles.label}>
				{label}
			</label>
			<RSelect
				{...rest}
				styles={customStyles}
				name={rest.name}
				options={options}
				defaultValue={options?.[0]}
				placeholder={placeholder || options?.[0]?.label}
				className={`${styles.selectOptions} ${rest.className}`}
			/>
		</div>
	);
};
