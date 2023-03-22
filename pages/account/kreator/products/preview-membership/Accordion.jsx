import React, { memo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { AccordionDown, AccordionRight, PlayIcon2 } from 'utils';
import styles from 'public/css/PreviewMembership.module.scss';
export const pathsName = typeof window !== 'undefined' && window;

const Accordion = ({
	title,
	subList,
	setActiveLink,
	activeLink,
	product,
	setActiveSectionName
	// pathname,
}) => {
	const [isActive, setIsActive] = useState(false);
	const totalPayments = pathsName.localStorage?.getItem(
		'total_payments_made'
	);

	const router = useRouter();
	const { pathname } = router;

	const path = pathname.split('/');
	const linkPath = path[path.length - 2];

	const handleSectionOpen = () => {
		if (
			totalPayments < product?.frequency_of_availability &&
			linkPath !== 'preview-membership'
		) {
			setActiveSectionName(true)
			return;
		}
		setIsActive(!isActive);
	};

	return (
		<div className={styles.accordionItem}>
			<div
				className={`${styles.accordionTitle
					} flex text-gray-700 cursor-pointer ${totalPayments < product?.frequency_of_availability &&
					linkPath !== 'preview-membership' &&
					'bg-gray-300 text-grey-100'
					}cursor-pointer`}
			>
				<div
					className={styles.title}
					onClick={() => handleSectionOpen()}
				>
					{product?.section_name}
				</div>
				<div
					className={styles.icon}
					onClick={() => handleSectionOpen()}
				>
					{isActive ? (
						<Image
							src={AccordionDown}
							width={20}
							height={10}
							alt=""
						/>
					) : (
						<Image
							src={AccordionRight}
							width={10}
							height={20}
							alt=""
						/>
					)}
				</div>
			</div>
			{isActive && (
				<>
					<div className={styles.accordionContent}>
						{product?.product_subsection.map((itm) => (
							<div
								className={`cursor-pointer flex justify-between ${styles.subTextContainer
									} ${activeLink?.id === itm.id &&
									styles.activeSublist
									}`}
								key={itm?.id}
								onClick={() => {
									setActiveLink(itm);
								}}
							>
								<span className={`${styles.subText}`}>
									{itm.product_section_name}
								</span>
								<div className="flex">
									<Image
										src={PlayIcon2}
										width={20}
										height={15}
										alt=""
									/>
								</div>
							</div>
						))}
					</div>
					<hr />
				</>
			)}
		</div>
	);
};

export default memo(Accordion);
