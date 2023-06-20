import Image from 'next/image';

import {Tooltip} from 'antd';

import {ActivePrice, RenderIf} from '../../utils';
import styles from './PricingCard.module.scss';
import {Button} from '../index';
import Spinner from 'components/Spinner';

const TooltipOption = {
	'Multi-Currency - 21 Currencies': 'Receive payments globally',
	'Customize your store URL':
		'Switch from (www.kreatesell.com/storename) to your custom domain (http://ww.yourname.com )',
};
export const PricingCard = ({
	title,
	subTitle,
	price,
	btnText,
	priceType,
	subPriceType = '',
	btnOnClick,
	currentPlan = false,
	selectedCurrency,
	loading = false,
}) => {
	const Features = title === 'basic' ? BasicFeatures : BusinessFeatures;

	return (
		<div className={styles.priceCard}>
			<div className={styles.header}>
				<h3 className={styles.title}>{title}</h3>
				<h5 className={styles.subTitle}>{subTitle}</h5>
				<hr />
			</div>

			{loading ? (
				<div style={{height: '80px'}}>
					<Spinner />
				</div>
			) : (
				<>
					<div className={styles.price}>
						<p className={styles.currency}>{selectedCurrency}</p>{' '}
						<p className={styles.price2}>
							{price !== '0' ? Number(price).toFixed(2) : price}{' '}
						</p>
						<p className={styles.month}>/ Month</p>
					</div>

					<h5 className={styles.priceType}>
						{priceType}{' '}
						{![0, '0'].includes(subPriceType) && subPriceType && (
							<span className={styles.subPriceType}>
								- Save{' '}
								{`${selectedCurrency} ${
									subPriceType !== '0'
										? Number(subPriceType).toFixed(2)
										: subPriceType
								}`}
							</span>
						)}
					</h5>
				</>
			)}

			{btnText && !currentPlan && (
				<div className={styles.button}>
					<Button
						type="button"
						className={`${styles.btn} ${
							currentPlan && styles.selectedBtn
						}`}
						text={btnText}
						bgColor={currentPlan ? '' : 'blue'}
						onClick={() => btnOnClick()}
					/>
				</div>
			)}

			<div className={styles.featuresCont}>
				{Features?.map((features, i) => (
					<div className={styles.features} key={i}>
						<div className={styles.featuresIcons}>
							<Image src={ActivePrice} height="15" width="15" />
						</div>
						<h6 className={styles.featuresContent}>
							{features}
							<RenderIf
								condition={[
									'Multi-Currency - 21 Currencies',
									'Customize your store URL',
								].includes(features)}
							>
								<Tooltip
									overlayStyle={{
										width: '400px',
										borderRadius: '10px',
									}}
									title={TooltipOption[features]}
									// placement="topCenter"
								>
									<b className="cursor-pointer">&nbsp;?</b>
								</Tooltip>
							</RenderIf>
						</h6>
					</div>
				))}
			</div>

			{currentPlan && (
				<h3 className="text-primary-blue font-bold text-xl pb-8">
					Current Plan
				</h3>
			)}
		</div>
	);
};

const BasicFeatures = [
	'Unlimited Products',
	'Unlimited Army of Affiliates ',
	'Fully customizable storefront',
	'Robust dashboard analytics.',
	'Set unique prices in multiple currencies',
	'Multi-Currency - 21 Currencies',
	'1 Abandoned Cart Follow up Email ',
	'Instant Sales Notification',
	'Pixel Tracking',
	'Instant Sales Notification',
	'Affiliate Instant Commission',
	'Customizable Checkout CTA Button ',
	'Pay what you want payment option',
	'Advanced Issue Resolution Ticketing System',
	'Cryptocurrency Payment option',
];

const BusinessFeatures = [
	'Everything in Basic Plan + ',
	'3 Abandoned Cart Follow up Emails',
	'Automated WhatsApp Successful Purchase Messages',
	'Automated WhatsApp Abandoned Cart Messages',
	'Set Pre-orders',
	'Create “Make it free” products',
	'One-time subscription course creation',
	'Membership Course Creation with customized billing frequency',
	'Create Coupons',
	'Paypal for Verified Kreators',
	'Stripe for Verified Kreators',
	'KreateSell Verified blue tick badge for verified users',
	'Customize your store URL',
];
