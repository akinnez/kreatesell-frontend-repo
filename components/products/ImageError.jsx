import Image from 'next/image';
import {DeleteIcon} from 'components/IconPack';
import {placeholder1} from 'utils';
import ImageLoad from 'components/imageLoading/imageLoad';
import styles from './CreateProduct.module.scss';

export default function ImageError({file, errors, deleteFile}) {
	return (
		<li
			className={
				styles.imageContent +
				' bg-white flex justify-between w-full rounded-lg p-1'
			}
		>
			<div className={styles.imageWrap}>
				<Image
					width="100"
					height="100"
					objectFit="cover"
					src={placeholder1}
					alt="user"
				/>
			</div>
			<div className="w-2/3">
				<ImageLoad
					isError={true}
					errors={errors}
					imageName={`${file.name} (${40}%)`}
					progress={40}
				/>
			</div>
			<div
				className="w-1/6 flex justify-center cursor-pointer"
				onClick={() => deleteFile(file)}
			>
				<DeleteIcon color="#F5F5F5" width="40" height="40" />
			</div>
		</li>
	);
}
