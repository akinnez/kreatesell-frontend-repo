import styles from './Input.module.scss';
import {Input as AntInput} from 'antd';
import {useState} from 'react';

const {Password} = AntInput;

export const PhoneNumberInput = ({
	type,
	placeholder,
	label,
	name,
	formik,
	labelStyle,
	errorMessage,
	// onChange,
	value = '',
	height = 'default', //default or small
	...rest
}) => {
	// const [val, setVal] = useState(value);
	// const inputVal = type === "tel" ? value.replace(/[^0-9]/g, "") : value;
	return (
		<div
			className={`${rest.containerstyle} ${styles.inputContainer} ${styles.phoneNumberInput}`}
		>
			{label && (
				<label
					htmlFor={name}
					className={`${styles.label} ${labelStyle}`}
				>
					{label}
				</label>
			)}
			<>
				{errorMessage && (
					<p className={`text-red-600 text-sm ${styles.errorMsg}`}>
						{errorMessage}
					</p>
				)}
			</>
			<input
				{...rest}
				type={type}
				placeholder={placeholder}
				name={name}
				// onChange={(e) => {
				//   const valueModified =
				//     typeof e.target.value !== "number"
				//       ? e.target.value.replace(/[^0-9]/g, "")
				//       : "";
				//   setVal(valueModified);
				// }}
				// value={value}
				// value={val}
				className={`${rest.className} ${
					height === 'small' && styles.smallHeight
				} ${type === 'search' && styles.search} ${styles.input}`}
			/>
			{/* {
        errorMessage && (
          <p className="text-red-600 text-sm pt-2">{errorMessage}</p>
        )
        // !val && <p className="text-red-600 text-sm pt-2">{errorMessage}</p>
      } */}
		</div>
	);
};

export const PasswordInput = ({type, placeholder, label, name, ...rest}) => {
	return (
		<div className={`${rest.containerstyle} ${styles.inputContainer}`}>
			<label htmlFor={name} className={styles.label}>
				{label}
			</label>
			<Password
				{...rest}
				placeholder={placeholder}
				name={name}
				className={`${rest.className} ${styles.input} ${styles.Password}`}
			/>
		</div>
	);
};

export const Input = ({
	type,
	placeholder,
	label,
	name,
	labelStyle,
	errorMessage,
	height = 'default', //default or small
	containerStyle,
	...rest
}) => {
	return (
		<div
			className={`${rest.containerstyle} ${styles.inputContainer}`}
			style={containerStyle && containerStyle}
		>
			{label && (
				<label
					htmlFor={name}
					className={`${styles.label} ${labelStyle}`}
				>
					{label}
				</label>
			)}
			<input
				{...rest}
				type={type}
				placeholder={placeholder}
				name={name}
				className={`${rest.className} ${
					height === 'small' && styles.smallHeight
				} ${type === 'search' && styles.search} ${styles.input}`}
			/>
			{errorMessage && (
				<p className="text-red-600 text-sm pt-2">{errorMessage}</p>
			)}
		</div>
	);
};
