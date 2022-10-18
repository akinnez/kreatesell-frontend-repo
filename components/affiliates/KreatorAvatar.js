import Image from 'next/image';

const KreatorAvatar = ({image, name}) => (
	<Image src={image} alt={name} layout="fill" objectFit="cover" />
);

export default KreatorAvatar;
