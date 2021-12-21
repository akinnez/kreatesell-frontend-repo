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
	closeBtnAction,
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
			<div
				className={`${styles.container} ${containerStyle}`}
				onClick={(e) => e.stopPropagation()}
			>
				{closeButton && (
					<div
						className={styles.closeIcon}
						onClick={closeBtnAction || setVisible((value) => !value)}
					>
						<Image src={CloseIcon} />
					</div>
				)}
				{visible && <div className={styles.modalContent}>{children}</div>}
			</div>
		</div>
	);
};
