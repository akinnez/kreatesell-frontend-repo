import React, {memo, useState} from 'react';
import Image from 'next/image';

import {AccordionDown, AccordionRight, PlayIcon2} from 'utils';
import styles from 'public/css/PreviewMembership.module.scss';

const Accordion = ({title, subList, setActiveLink, activeLink}) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className={styles.accordionItem}>
			<div className={`${styles.accordionTitle} flex  cursor-pointer`}>
				<div className={styles.title} style={{display: 'inline-block'}}>
					{title}
				</div>
				<div
					className={styles.icon}
					style={{display: 'inline-block'}}
					onClick={() => setIsActive(!isActive)}
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
						{subList.map((itm) => (
							<div
								className={`cursor-pointer flex justify-between ${
									styles.subTextContainer
								} ${
									activeLink?.id === itm.id &&
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
