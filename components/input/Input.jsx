import styles from "./Input.module.scss";
import { Input as AntInput } from "antd";

const { Password } = AntInput;

export const Input = ({
	type,
	placeholder,
	label,
	name,
	labelStyle,
	errorMessage,
	...rest
}) => {
	return (
		<div className={`${rest.containerstyle} ${styles.inputContainer}`}>
			<label htmlFor={name} className={`${styles.label} ${labelStyle}`}>
				{label}
			</label>
			<input
				{...rest}
				type={type}
				placeholder={placeholder}
				name={name}
				className={`${rest.className} ${type === "search" && styles.search} ${
					styles.input
				}`}
			/>
			{errorMessage && (
				<p className="text-red-600 text-sm pt-2">{errorMessage}</p>
			)}
		</div>
	);
};

export const PasswordInput = ({ type, placeholder, label, name, ...rest }) => {
	return (
		<div className={`${rest.containerstyle} ${styles.inputContainer}`}>
			<label htmlFor={name} className={styles.label}>
				{label}
			</label>
			<Password
				{...rest}
				placeholder={placeholder}
				name={name}
				className={`${rest.className} ${styles.input}`}
			/>
		</div>
	);
};
