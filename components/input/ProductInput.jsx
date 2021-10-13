import styles from "./ProductInput.module.scss";

export const ProductInput = ({
	type = "text",
	prefix,
	placeholder,
	name,
	errorMessage,
	...rest
}) => {
	return (
		<>
			<div className={`w-full flex ${styles.container}`}>
				<div
					className={`pt-1 flex justify-center items-center h-10 text-xs text-base-gray-200 ${styles.prefix}`}
				>
					{prefix}
				</div>
				<input
					{...rest}
					type={type}
					placeholder={placeholder}
					name={name}
					className={`p-1 w-full h-10 ${styles.input}`}
				/>
			</div>

			{errorMessage && (
				<p className="text-red-600 text-sm pt-2">{errorMessage}</p>
			)}
		</>
	);
};
