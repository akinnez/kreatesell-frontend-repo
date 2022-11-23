import { Button } from 'components';
import { CreateEditDomain, SetDomainScreen, GetDomains } from 'redux/actions';
import styles from './Domain.module.scss';
import Link from 'next/link'

export const EmptyDomain = ({ showHeader = true }) => {
	const setDomainScreen = SetDomainScreen();

	return (
		<div>
			{showHeader && (
				<div className="flex justify-between items-center pt-2">
					<h3 className="text-black-100 font-medium text-2xl">
						Domains
					</h3>
					<div>
						<Button
							text="Connect a domain"
							bgColor="blue"
							className={styles.btnStyle}
							onClick={() => setDomainScreen(3)}
						/>
					</div>
				</div>
			)}

			<div className="productBorder mt-4 flex items-center flex-col bg-white rounded-lg">
				<div className="text-base text-black-100 font-medium">
					Connect an existing domain
				</div>
				<p className="text-xs text-base-gray-200 pt-2">
					Have a domain? Connect it here.
				</p>
				<div className="my-4">
					<Button
						text="Connect a domain"
						bgColor="blue"
						className={styles.btnStyle}
						onClick={() => setDomainScreen(3)}
					/>
				</div>
				<Link href="/account/kreator/settings/about-domain">
					<a
						target="_blank"
						rel="noopener norefferer"
						className="text-primary-blue text-base"
					>
						View Guide
					</a>
				</Link>
			</div>
		</div>
	);
};
