import {memo} from 'react';
import Image from 'next/image';

import NoData from 'components/NoData';
import formatNumber from 'utils/formatNumber';
import dateFormat from 'utils/dateFormat';
import Basket from 'public/images/basket-grayed.png';
import styles from './index.module.scss';
import {RenderIf, EarnedAsAffiliateTag} from 'utils';

const PayoutsMobileView = ({payouts}) => {
	// console.log('payouts = ', payouts);
	return (
		<div>
			{payouts?.length === 0 || !payouts ? (
				<NoData />
			) : (
				<ul className={styles.payouts}>
					{payouts?.map((payout) => (
						<li key={payout.id} className={styles.payouts__item}>
							<div className={styles.payout__header}>
								<div className={styles['payout__date-info']}>
									<div>
										<p>Transaction Date:</p>
										<p>
											{dateFormat(
												payout?.transaction_date
											)}
										</p>
									</div>
									<div className={styles.divider} />
									<div>
										<p>Settlement Date:</p>
										<p>
											{/* {dateFormat(payout.settlement_date)} */}
											{dateFormat(
												payout?.settlement_date
											)}
										</p>
									</div>
								</div>
								<div className={styles['payout__product-name']}>
									<span>
										<Image
											alt="product icon"
											src={Basket}
											width={14}
											height={14}
										/>
									</span>
									<strong>{payout?.product}</strong>
								</div>
							</div>
							<ol>
								<li className={styles.payout__detail}>
									<strong>Customer Name</strong>
									<span>{payout?.customer_fullname}</span>
								</li>
								<li className={styles.payout__detail}>
									<strong>Customer Email</strong>
									<span>
										{payout?.customer_email_address}
									</span>
								</li>
								<li className={styles.payout__detail}>
									<strong>Amount</strong>
									<span className={`flex gap-2`}>
										{payout.currency}{' '}
										{formatNumber(payout.amount)}
										<RenderIf
											condition={
												payout?.earned_as ===
												'Earned as Affiliate'
											}
										>
											<div style={{}}>
												<Image
													width={40}
													height={20}
													alt="Earned as Affiliate Tag"
													src={EarnedAsAffiliateTag}
												/>
											</div>
										</RenderIf>
									</span>
								</li>
							</ol>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default memo(PayoutsMobileView);
