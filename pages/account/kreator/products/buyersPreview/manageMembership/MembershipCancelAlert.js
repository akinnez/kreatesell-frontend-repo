import React, {useState, useEffect, useMemo} from 'react';
import styles from 'public/css/PreviewMembership.module.scss';
import {CancelAlert, CancelMembershipSuccessIcon} from 'utils';
import Image from 'next/image';

const MembershipCancelAlert = ({
	setShowCancelAlert,
	setShowSuccessCancel,
	handleCancelMembership,
}) => {
	const ShowSuccessModal = () => {
		handleCancelMembership();
		setShowCancelAlert(false);
	};

	return (
		<div
			className={`absolute top-0 left-0 w-full h-screen flex items-center justify-center ${styles.cancelMembershipModal}`}
		>
			<div className={`bg-white ${styles.cancelPromptModal}`}>
				<p className={styles.cancelPromptTitle}>
					It is sad to see you go.
				</p>
				<p className={styles.cancelPromptText}>
					Are you sure you want to UNSUBSCRIBE from this membership
					product?
				</p>
				<Image src={CancelAlert} width={14} height={14} alt="" />
				<p className={styles.cancelPromptRedText}>
					If you unsubscribe, you would no longer have access to this
					product.
				</p>
				<div className="flex items-center justify-center">
					<div
						className={styles.canceBtn}
						onClick={() => setShowCancelAlert(false)}
					>
						<p className={styles.cancelText}>No</p>
					</div>
					<div
						className={`ml-6 ${styles.canceBtnRed}`}
						onClick={ShowSuccessModal}
					>
						<p className={styles.cancelRedText}>Yes</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MembershipCancelAlert;