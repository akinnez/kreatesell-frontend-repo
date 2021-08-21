import { useState, useEffect } from "react";
import Image from "next/image";
import { CloseIcon } from "../../utils";
import styles from "./Modal.module.scss";

export const Modal = ({
	children,
	visible,
	onClose,
	containerStyle,
	cancelPropagation = false,
	closeButton = false,
	...rest
}) => {
	const [_visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(visible);
	}, [visible]);

	return (
		<div
			{...rest}
			className={`
			${styles.modal}
			${!_visible && "hidden"} 
			${_visible && styles.styleDisplay} 
			${rest.className}
			`}
			onClick={() => (cancelPropagation ? null : onClose && onClose())}
		>
			{closeButton && (
				<div className={styles.closeIcon} onClick={() => setVisible(!visible)}>
					<Image src={CloseIcon} />
				</div>
			)}

			<div
				className={`${styles.container} ${containerStyle}`}
				onClick={(e) => e.stopPropagation()}
			>
				{visible && <div className={styles.modalContent}>{children}</div>}
			</div>
		</div>
	);
};
