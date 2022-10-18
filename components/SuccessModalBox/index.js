import Image from 'next/image';
import {Modal, Button} from 'antd';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import Img from 'public/images/CheckMark.png';
import styles from './index.module.scss';

const CloseIcon = () => (
	<span
		role="img"
		aria-label="close"
		className="anticon anticon-close ant-modal-close-icon"
	>
		<AiOutlineCloseCircle />
	</span>
);

const SuccessModalBox = ({
	children,
	modalIsVisible,
	closeModal,
	closeButton = true,
	closable = true,
}) => (
	<Modal
		className={styles.modal}
		title={null}
		footer={null}
		onCancel={closeModal}
		visible={modalIsVisible}
		closeIcon={<CloseIcon />}
		closable={closable}
		maskClosable={closable}
		width={700}
	>
		<header className={styles.header}>
			<div>
				<Image src={Img} alt="success icon" />
			</div>
		</header>
		{children}
		{closeButton && (
			<footer className={styles.footer}>
				<Button size="large" type="primary" onClick={closeModal}>
					Go Back
				</Button>
			</footer>
		)}
	</Modal>
);

export default SuccessModalBox;
