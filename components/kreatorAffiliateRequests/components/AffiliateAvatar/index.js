import Image from 'next/image';
import {Avatar} from 'antd';
import {FaRegUser} from 'react-icons/fa';
import styles from './index.module.scss';

const AffiliateAvatar = ({image, affiliateName}) => (
	<header className={styles.header}>
		{!image || image === 'Images\\ProfilePicture\\imageIcon' ? (
			<Avatar size={100} icon={<FaRegUser />} />
		) : (
			<Avatar
				size={100}
				src={
					<Image
						src={image}
						layout="fill"
						alt={`${affiliateName}`}
						objectFit="cover"
					/>
				}
			/>
		)}
	</header>
);

export default AffiliateAvatar;
