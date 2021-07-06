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
			${styles.button}
			${bgColor === "white" && styles.btnWhite} 
			${bgColor === "blue" && styles.btnBlue}`}
		>
			{text}
		</button>
	);
};
