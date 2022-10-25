import {SuccessKreatesellLogo} from 'utils';
import Image from 'next/image';
import styles from './poweredByKs.module.scss';

export const PoweredByKS = () => {
	return (
		<footer className={styles.PoweredByKS}>
			<p>
				Powered by&nbsp;{' '}
				<Image
					src={SuccessKreatesellLogo}
					alt="powered by KreateSell"
				/>
			</p>
		</footer>
	);
};
