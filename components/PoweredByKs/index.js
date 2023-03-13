import {RenderIf, SuccessKreatesellLogo} from 'utils';
import Image from 'next/image';
import styles from './poweredByKs.module.scss';

export const PoweredByKS = ({showDisclaimer = false, storename = ''}) => {
	return (
		<footer className={styles.PoweredByKS}>
			<p className={styles.poweredBy}>
				Powered by&nbsp;{' '}
				<Image
					src={SuccessKreatesellLogo}
					alt="powered by KreateSell"
				/>
			</p>
			{/* <RenderIf condition={showDisclaimer}> */}
			<h5 className={styles.disclaimer}>
				<span>DISCLAIMER NOTICE: </span>
				This store has no relationship with Facebook, Google or any of
				the advertising platforms you may have seen our ads on.
				Additionally, this site is NOT endorsed by Facebook, Google or
				any advertising platforms in any way. This website and all of
				it&apos;s contents is a property of {storename}.
			</h5>
			{/* </RenderIf> */}
		</footer>
	);
};
