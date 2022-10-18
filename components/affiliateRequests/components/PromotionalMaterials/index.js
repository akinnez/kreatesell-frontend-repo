import Image from 'next/image';
import {Typography} from 'antd';
import {MdOutlineCloudDownload} from 'react-icons/md';
import FileImg from 'public/images/success_file.png';
import ClipboardImg from 'public/images/clipboards.png';
import styles from './index.module.scss';

const {Text} = Typography;

const PromotionalMaterials = ({productFile}) => (
	<section className={styles.section}>
		{productFile ? (
			<div className={styles.materials}>
				<div>
					<Image src={FileImg} alt="File image" />
				</div>
				<p>
					<Text>The Kreator has this materials for you </Text>
				</p>
				<p>
					<Text>
						Here is a promotional material that will help you in
						marketing the product
					</Text>
				</p>
				<div>
					<a
						href={productFile}
						target="_blank"
						rel="noreferrer"
						download
					>
						Download File&nbsp;&nbsp; <MdOutlineCloudDownload />
					</a>
				</div>
			</div>
		) : (
			<div className={styles.no__materials}>
				<div>
					<Image src={ClipboardImg} alt="Clipboard image" />
				</div>
				<Text>No material was uploaded</Text>
			</div>
		)}
	</section>
);

export default PromotionalMaterials;
