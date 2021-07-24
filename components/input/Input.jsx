import styles from "./Input.module.scss";

export const Input = ({ type, placeholder, label, name, ...rest }) => {
	return (
		<div className={`${rest.containerstyle} ${styles.inputContainer}`}>
			<label htmlFor={name} className={styles.label}>
				{label}
			</label>
			<input
				{...rest}
				type={type}
				placeholder={placeholder}
				name={name}
				// className={`${rest.className} ${styles.input}`}
				className={`${rest.className} ${type === "search" && styles.search} ${
					styles.input
				}`}
			/>
		</div>
	);
};
