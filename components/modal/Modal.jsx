import { useState, useEffect } from "react";
import styles from "./Modal.module.scss";

export const Modal = ({
	children,
	visible,
	onClose,
	cancelPropagation = false,
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
			<div className={styles.container} onClick={(e) => e.stopPropagation()}>
				{visible && <div className={styles.modalContent}>{children}</div>}
			</div>
		</div>
	);
};
