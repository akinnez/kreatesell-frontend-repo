import styles from "./TextArea.module.scss";

export const TextArea = ({
	name,
	label,
	errorMessage,
	rows = 2,
	cols = 36,
	placeholder,
	labelStyle,
	...rest
}) => {
	return (
		<div className={`flex flex-col my-2 ${styles.textareaContainer}`}>
			<label
				htmlFor={name}
				className={`text-xs pb-2 text-base-gray-100 font-semi-medium capitalize ${labelStyle}`}
			>
				{label}
			</label>

			<div>
				<textarea
					{...rest}
					name={name}
					placeholder={placeholder}
					id=""
					cols={cols}
					rows={rows}
				></textarea>
			</div>

			{errorMessage && (
				<p className="text-sm py-2 text-red-700">{errorMessage}</p>
			)}
		</div>
	);
};
