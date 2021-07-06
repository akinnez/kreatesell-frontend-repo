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
			className={`button
			 ${bgColor === "white" && "btn-white"} 
			 ${bgColor === "blue" && "btn-blue"}
			 `}
		>
			{text}
		</button>
	);
};
