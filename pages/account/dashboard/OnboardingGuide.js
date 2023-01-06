import {useState, useEffect} from 'react';
import Image from 'next/image';
import styles from '../../../components/modal/Modal.module.scss';
import {CloseIcon} from '../../../utils';
import {
	guideDataObject,
	guideDataObjectMobiles,
	dashboardGuideData,
} from '../../../Models/onboardingGuideData';

const OnboardingGuide = ({
	// visible,
	// setProceedToOnboard,
	// setGuideModalVisible,
	// setIsmobile,
	guideDataObject,
	goToNext
}) => {
	// const [index, setIndex] = useState(0);
	// const [mindex, setMIndex] = useState(0);
	// const [toogleMobile, setToogleMobile] = useState(false);

	// const changeContents = () => {
	// 	setIndex(index + 1);
	// };

	// const changeContentsMobile = () => {
	// 	setMIndex(mindex + 1);
	// };

	// const setPreviousContents = () => {
	// 	setIndex(index - 1);
	// 	setToogleMobile(true);
	// };
	// const setPreviousMobile = () => {
	// 	setMIndex(mindex - 1);
	// };

	// const proceedToDashboard = () => {
	// 	setProceedToOnboard(true);
	// 	setGuideModalVisible(true);
	// 	toogleMobile ? setIsmobile(true) : setIsmobile(false);
	// };

	// const guideInfoObject = guideDataObject[index];
	// const guideInfoObjectMobile = guideDataObjectMobiles[mindex];

	// const [_visible, setVisible] = useState(false);

	// useEffect(() => {
	// 	setVisible(visible);
	// }, [visible]);

	return (
		<div
			className={styles.onboardingGuideModal} 
		>
			{/* desktop view */}
			{/* <div style={{postion: 'relative', width: '100%', height: '100%'}}> */}
				<div
					className={styles.onboardingTooltip}
					style={{
						left: guideDataObject.positionLeft,
						top: guideDataObject.positionTop
					}}
				>
					<div className={styles.guideArrow}></div>
					<div className={styles.toolTipTitleContainer}>
						<p className={styles.toolTipModalTitle}>
							{/* {guideInfoObject.modalTitle} */}
							{guideDataObject.modalTitle}
						</p>
						<div>
							<Image
								src={CloseIcon}
								className={styles.toolTipCloseIcon}
								// onClick={proceedToDashboard}
							/>
						</div>
					</div>
					<p className={styles.toolTipText}>
						{/* {guideInfoObject.modalText} */}
						{guideDataObject.modalText}
					</p>
					<div className={styles.toolTipTitleContainer}>
						<p className={styles.toolTipBtnText}>2/9</p>
						<div className={styles.toolTipBtnContainer}>
							<button
								// disabled={index === 0}
								className={styles.toolTipBtn}
								// onClick={setPreviousContents}
							>
								Prev
							</button>
							{/* {index !== guideDataObject.length - 1 && ( */}
								<button
									// disabled={
									// 	index === guideDataObject.length - 1
									// }
									className={styles.toolTipNextBtn}
									onClick={()=> goToNext()}
								>
									Next
								</button>
							{/* )} */}
							{/* {index === guideDataObject.length - 1 && (
								<button
									className={styles.toolTipNextBtn}
									onClick={proceedToDashboard}
								>
									Next
								</button>
							)} */}
						</div>
					</div>
				</div>
			{/* </div> */}

			{/* mobiles */}
			{/* <div
				className={styles.onboardingTooltipMobile}
				style={{
					left: guideInfoObjectMobile.positionLeft,
					top: guideInfoObjectMobile.positionTop,
				}}
			>
				<div className={styles.guideArrowMobile}></div>
				<div className={styles.toolTipTitleContainer}>
					<p className={styles.toolTipModalTitle}>
						{guideInfoObjectMobile.modalTitle}
					</p>
					<div>
						<Image
							src={CloseIcon}
							className={styles.toolTipCloseIcon}
							onClick={proceedToDashboard}
						/>
					</div>
				</div>
				<p className={styles.toolTipText}>
					{guideInfoObjectMobile.modalText}
				</p>
				<div className={styles.toolTipTitleContainer}>
					<p className={styles.toolTipBtnText}>{mindex + 1}/3</p>
					<div className={styles.toolTipBtnContainer}>
						<button
							disabled={mindex === 0}
							className={styles.toolTipBtn}
							onClick={setPreviousMobile}
						>
							Prev
						</button>
						{mindex !== guideDataObjectMobiles.length - 1 && (
							<button
								disabled={
									mindex === guideInfoObjectMobile.length - 1
								}
								className={styles.toolTipNextBtn}
								onClick={changeContentsMobile}
							>
								Next
							</button>
						)}
						{mindex === guideDataObjectMobiles.length - 1 && (
							<button
								className={styles.toolTipNextBtn}
								onClick={proceedToDashboard}
							>
								Next
							</button>
						)}
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default OnboardingGuide;

export const DashboardGuide = ({setHideDahboardGuideModal}) => {
	// const [_visible, setVisible] = useState(false);
	const [index, setIndex] = useState(0);

	// useEffect(() => {
	// 	setVisible(visible);
	// }, [visible]);

	const hideDashboardGuideModal = () => {
		setHideDahboardGuideModal(false);
	};

	const changeContents = () => {
		setIndex(index + 1);
	};

	const setPreviousContents = () => {
		setIndex(index - 1);
	};

	const dashboardGuideObject = dashboardGuideData[index];

	return (
		// desktop
		<div
			className={`
			${styles.onboardingGuideModal}
			
			`}
		>
			<div style={{postion: 'relative', width: '100%', height: '100%'}}>
				<div
					className={styles.onboardingTooltip}
					style={{
						left: dashboardGuideObject.positionLeft,
						top: dashboardGuideObject.positionTop,  
					}}
				>
					<div className={styles.dashboardGuideArrow}></div>
					<div className={styles.toolTipTitleContainer}>
						<p className={styles.toolTipModalTitle}>
							{dashboardGuideObject.modalTitle}
						</p>
						<div>
							<Image
								src={CloseIcon}
								className={styles.toolTipCloseIcon}
								onClick={hideDashboardGuideModal}
							/>
						</div>
					</div>
					<p className={styles.toolTipText}>
						{dashboardGuideObject.modalText}
					</p>
					<div className={styles.toolTipTitleContainer}>
						<p className={styles.toolTipBtnText}>{index + 1}/3</p>
						<div className={styles.toolTipBtnContainer}>
							<button
								disabled={index === 0}
								className={styles.toolTipBtn}
								onClick={setPreviousContents}
							>
								Prev
							</button>
							{index !== dashboardGuideData.length - 1 && (
								<button
									disabled={
										index === dashboardGuideData.length - 1
									}
									className={styles.toolTipNextBtn}
									onClick={changeContents}
								>
									Next
								</button>
							)}
							{index === dashboardGuideData.length - 1 && (
								<button
									className={styles.toolTipNextBtn}
									onClick={hideDashboardGuideModal}
								>
									Got it
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
