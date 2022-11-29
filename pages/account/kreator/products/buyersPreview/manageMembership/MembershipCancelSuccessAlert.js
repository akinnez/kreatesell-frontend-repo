import React, {useState, useEffect, useMemo} from 'react';
import styles from 'public/css/PreviewMembership.module.scss';
import {CancelAlert, CancelMembershipSuccessIcon} from 'utils';
import Image from 'next/image';

const MembershipCancelSuccessAlert = () => {
	return (
		<div
			className={`absolute top-0 left-0 w-full h-screen flex items-center justify-center ${styles.cancelMembershipModal}`}
		>
			<div className={`bg-white ${styles.successCancelPromptModal}`}>
				<Image src={CancelMembershipSuccessIcon} alt="" />
				<p className={styles.unSubscribeText}>
					You have successfully unsubscribed
				</p>
				<p className={styles.unSubscribeDetails}>
					You would no longer be able to access this product. We will
					miss you! However, If you change your mind, feel free to
					subscribe again.
				</p>
			</div>
		</div>
	);
};

export default MembershipCancelSuccessAlert;
