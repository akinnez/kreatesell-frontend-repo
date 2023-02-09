import React from 'react';
import Image from 'next/image';
import styles from './Index.module.scss';

import {Modal} from 'antd';

export const VerifiedModal = ({showModal, setShowModal, children}) => {
	return (
		<>
			<Modal
				title={null}
				footer={null}
				visible={showModal}
				onCancel={() => setShowModal(false)}
				maskClosable={true}
				className={styles.modalContainer}
				width={550}
				closeIcon={<></>}
				centered
			>
				{children}
			</Modal>
		</>
	);
};
