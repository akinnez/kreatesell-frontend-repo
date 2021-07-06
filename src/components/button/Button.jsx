import styles from "./Button.module.scss";

export const Button = ({
	type,
	text = "Submit",
	loading,
	disabled,
	bgColor = "white",
	...rest
}) => {
	return (
		<button
			{...rest}
			disabled={loading || rest.disabled}
			type={type}
			className={`
			${rest.className}
			${styles.button}
			${bgColor === "white" && styles.btnWhite} 
			${bgColor === "blue" && styles.btnBlue}
			${bgColor === "primaryBlue" && styles.primaryBlue}
			`}
		>
			{text}
		</button>
	);
};
