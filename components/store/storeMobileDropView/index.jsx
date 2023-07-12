import Image from 'next/image';

import {Input} from 'antd';
import {Button} from 'components';

const StoreMobileDropView = ({
	isVariant = false,
	nameOfStore = '',
	dp = '',
}) => {
	const {singleStoreDetails} = useSelector((state) => state.product);

	const displayPicture = singleStoreDetails?.display_picture;

	const storeName = singleStoreDetails?.store_name;
	return (
		<div
			className={`${styles.mobileDropView} ${
				isVariant ? styles.isVariant : ''
			}`}
		>
			<div
				className={`${styles.profile} ${
					!displayPicture || !dp ? styles.noDp : ''
				}`}
			>
				{displayPicture || dp ? (
					<Image
						src={displayPicture || dp}
						alt="dp"
						layout="fill"
						className={styles.image}
					/>
				) : (
					<div className={styles.image_intro_text}>
						{/* <Avatar
							shape="square"
							className={styles.avatar}
							size={70}
							icon={<UserOutlined />}
						/> */}
					</div>
				)}
				<p>{storeName || nameOfStore}</p>
			</div>
			<div className={styles.storeLink}>
				<span>store link </span>
				<Image src={ExternalLink2} alt="external link" />
			</div>
			<div className={styles.text}>
				<h2>
					Host your <span>Digital Product</span> <br />
					online under minutes.
				</h2>
				<p>
					Seamlessly sell your content to audience without any
					marketing knowledge
				</p>
			</div>
			<div>
				<div className={styles.mobileInput}>
					<Input type="" placeholder="Enter your email.." />
				</div>
				<div
					className={styles.mobileButton}
					onClick={() => router.push('/signup')}
				>
					<Button
						text="Get Started Free"
						bgColor="blue"
						className={styles.freeBtn}
					/>
				</div>
				<div className={styles.benefits}>
					<span className={styles.benefitSpan}>Signup for free</span>
					<span className={styles.benefitSpan}>• Easy setup</span>
					<span className={styles.benefitSpan}>• Fast payout</span>
				</div>
			</div>
		</div>
	);
};

export default StoreMobileDropView;
