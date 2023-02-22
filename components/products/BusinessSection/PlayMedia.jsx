import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import styles from './MembershipTab.module.scss';
import Image from 'next/image';
import { CloseIcon } from 'utils';

export default function PlayMedia({ type, open, source, closePlay, title }) {
	const [isOpen, setIsOpen] = useState(open);
	return (
		<Modal
			title={null}
			footer={null}
			visible={isOpen}
			onCancel={() => {
				setIsOpen(false);
				closePlay(false);
			}}
			closable={false}
		>
			<div className="flex justify-between items-center">
				<p className={styles.previewModalTitle}>{title}</p>
				{/* <Image 
				src={CloseIcon} 
				width={27}  
				height={27} 
				objectFit="contain"
				 className={styles.previewCancelIcon}
				//  onClick={setIsOpen(false)}
				 /> */}
			</div>
			{type === 'image' && (
				<Image
					src={source}
					alt=""
					height={680}
					width={535}
					objectFit="cover"
				/>
			)}
			{type === 'audio' && (
				<audio controls className="mx-auto">
					<source src={source} type="audio/mpeg" />
				</audio>
			)}
			{type === 'video' && (
				<video
					controls
					loop
					src={source}
					alt=""
					className={styles.previewVideo}
				/>
			)}
			{type === 'text' ||
				(type === 'applicaation' && (
					<div>
						<iframe src={`https://docs.google.com/gview?url=${source}&embedded=true`}
							style={{ width: '100%', height: '800px', border: 'none' }}>
						</iframe>
					</div>
				))}
		</Modal>
	);
}
