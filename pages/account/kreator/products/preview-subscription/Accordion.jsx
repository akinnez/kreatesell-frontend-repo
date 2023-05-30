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
	setShowMobileContents
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
		)
			return;
		setIsActive(!isActive);
	};

	return (
		<div className={`${styles.accordionItem} py-3 md:py-1 px-2 md:px-1 border md:border-0 rounded-xl mb-2`}>
			<div
				className={`${styles.accordionTitle
					} flex justify-between text-gray-700 cursor-pointer ${totalPayments < product?.frequency_of_availability &&
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
							<>
								<div
									className={`cursor-pointer hidden md:flex gap-5 md:gap-3 rounded-xl py-2 md:py-0 px-4 md:px-0 ${styles.subTextContainer
										} ${activeLink?.id === itm.id &&
										styles.activeSublist
										}`}
									key={itm?.id}
									onClick={() => {
										setActiveLink(itm);
									}}
								>
									<div className={`${styles.subText} md:text-base text-sm`}>
										{itm.product_section_name}
									</div>
									<div className={`${styles?.subBtn} flex justify-end`}>
										<Image
											src={PlayIcon2}
											width={20}
											height={15}
											alt=""
										/>
									</div>
								</div>

								{/* //mobile layout till i find a way to make sure the onclick functions don't get call unecessarily */}
								<div
									className={`cursor-pointer md:hidden flex justify-between rounded-xl py-4 md:py-0 px-2 md:px-0 ${styles.subTextContainer
										} ${activeLink?.id === itm.id &&
										styles.activeSublist
										}`}
									key={itm?.id}
									onClick={() => {
										setShowMobileContents(true)
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
							</>

						))}
					</div>
					<hr />
				</>
			)}
		</div>
	);
};

export default memo(Accordion);
