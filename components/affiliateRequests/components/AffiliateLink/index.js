import {useRef} from 'react';
import {Button} from 'antd';
import {RenderIf, showToast} from 'utils';
import styles from './index.module.scss';
import Loader from 'components/loader';

const AffiliateLink = ({affiliateLink, salesPage}) => {
	const linkElement = useRef();
	const link2Element = useRef();

	const handleCopy = async (
		linkType = 'Affiliate',
		linkRef = linkElement
	) => {
		try {
			const link = linkRef.current.textContent;

			if ('clipboard' in navigator) {
				await navigator.clipboard.writeText(link);
				showToast(`${linkType} link copied`, 'success');
			} else {
				showToast(
					'Unable to copy affiliate link in this browser',
					'info'
				);
			}
		} catch (err) {
			showToast(
				'Something went wrong. Can not copy link at this time',
				'warn'
			);
		}
	};
	if (salesPage === undefined) return <Loader />;

	const showSalesPageLink = (salesPage) => {
		if (typeof salesPage !== 'string') return false;
		if (salesPage?.includes('not connected yet')) {
			return false;
		} else if (salesPage?.includes('uniqkey')) {
			return true;
		}
	};

	return (
		<section className={styles.section}>
			<RenderIf condition={showSalesPageLink(salesPage)}>
				<div className={styles.label}>
					<span>Affiliate Sales Page Link</span>
				</div>
				<div className={styles.link__container}>
					<div className={styles.link}>
						<span ref={link2Element}>{salesPage}</span>
					</div>
					<Button
						className={styles.link__btn}
						onClick={() => handleCopy('Sales Page', link2Element)}
					>
						Copy Link
					</Button>
				</div>
			</RenderIf>
			<br />
			<div>
				<div className={styles.label}>
					<span>Affiliate Product Page Link</span>
				</div>
				<div className={styles.link__container}>
					<div className={styles.link}>
						<span ref={linkElement}>{affiliateLink}</span>
					</div>
					<Button
						className={styles.link__btn}
						onClick={() => handleCopy()}
					>
						Copy Link
					</Button>
				</div>
			</div>
		</section>
	);
};

export default AffiliateLink;
